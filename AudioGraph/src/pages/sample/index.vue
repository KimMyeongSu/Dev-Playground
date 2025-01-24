<script setup>
import { ref, onMounted } from "vue"
import WaveSurfer from "wavesurfer.js"
import audio from "@/assets/audio/C050_C_03.wav"

const wavesurfer = ref(null)
const recordedWaveSurfer = ref(null)
const combinedWaveSurfer = ref(null)
const isPlaying = ref(false)
const isPlayingRecorded = ref(false)
const isPlayingCombined = ref(false)
const isRecording = ref(false)
const mediaRecorder = ref(null)
const recordedChunks = ref([])

onMounted(() => {
  // 원본 오디오 웨이브폼
  wavesurfer.value = WaveSurfer.create({
    container: "#waveform",
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: audio,
    height: 100,
    normalize: true,
  })

  // 녹음된 오디오를 위한 웨이브폼
  recordedWaveSurfer.value = WaveSurfer.create({
    container: "#waveform",
    waveColor: "rgba(0, 200, 0, 0.5)",
    progressColor: "rgba(0, 100, 0, 0.5)",
    height: 100,
    normalize: true,
  })

  // 비교를 위한 컨테이너 설정
  const compareContainer = document.querySelector("#compare-waveform")
  compareContainer.style.position = "relative"
  compareContainer.style.height = "100px"

  // 원본 파형 (보라색)
  const originalCompare = WaveSurfer.create({
    container: compareContainer,
    waveColor: "rgba(200, 0, 200, 0.7)",
    progressColor: "rgb(100, 0, 100)",
    url: audio,
    height: 100,
    normalize: true,
    interact: false, // 상호작용 비활성화
  })

  navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    mediaRecorder.value = new MediaRecorder(stream)

    mediaRecorder.value.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.value.push(e.data)
      }
    }

    mediaRecorder.value.onstop = async () => {
      const blob = new Blob(recordedChunks.value, { type: "audio/wav" })
      const audioUrl = URL.createObjectURL(blob)

      // 녹음된 오디오 로드
      await recordedWaveSurfer.value.load(audioUrl)

      // 비교 파형에 녹음된 파형 추가 (녹색)
      const recordedCompare = WaveSurfer.create({
        container: compareContainer,
        waveColor: "rgba(0, 200, 0, 0.7)",
        progressColor: "rgba(0, 100, 0, 0.5)",
        height: 100,
        normalize: true,
        interact: false, // 상호작용 비활성화
      })
      await recordedCompare.load(audioUrl)
    }
  })

  wavesurfer.value.on("play", () => {
    isPlaying.value = true
  })

  wavesurfer.value.on("pause", () => {
    isPlaying.value = false
  })

  recordedWaveSurfer.value.on("play", () => {
    isPlayingRecorded.value = true
  })

  recordedWaveSurfer.value.on("pause", () => {
    isPlayingRecorded.value = false
  })

  combinedWaveSurfer.value.on("play", () => {
    isPlayingCombined.value = true
  })

  combinedWaveSurfer.value.on("pause", () => {
    isPlayingCombined.value = false
  })
})

// 원본 오디오 재생/일시정지
const togglePlay = () => {
  wavesurfer.value.playPause()
}

// 녹음된 오디오 재생/일시정지
const togglePlayRecorded = () => {
  recordedWaveSurfer.value.playPause()
}

// 합쳐진 파형 재생/일시정지 - 원본 오디오만 재생
const togglePlayCombined = () => {
  combinedWaveSurfer.value.playPause()
}

const startRecording = () => {
  recordedChunks.value = []
  mediaRecorder.value.start()
  isRecording.value = true
}

const stopRecording = () => {
  mediaRecorder.value.stop()
  isRecording.value = false
}
</script>

<template>
  <div class="audio-player">
    <h3>원본 & 녹음 파형 (개별 재생 가능)</h3>
    <div id="waveform"></div>

    <h3>파형 비교</h3>
    <div id="compare-waveform"></div>

    <div class="controls">
      <button @click="togglePlay">
        {{ isPlaying ? "원본 일시정지" : "원본 재생" }}
      </button>
      <button @click="togglePlayRecorded" v-if="recordedWaveSurfer" :class="{ playing: isPlayingRecorded }">
        {{ isPlayingRecorded ? "녹음 일시정지" : "녹음 재생" }}
      </button>
      <button @click="isRecording ? stopRecording() : startRecording()" :class="{ recording: isRecording }">
        {{ isRecording ? "녹음 중지" : "녹음 시작" }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.audio-player {
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

h3 {
  margin: 20px 0 10px 0;
  color: #333;
}

#waveform,
#combined-waveform {
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
}

.controls {
  margin-top: 20px;
  text-align: center;
}

button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #4f4a85;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #383351;
}

.playing {
  background-color: #44ff44 !important;
}

#combined-waveform {
  position: relative;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
  margin-bottom: 20px;
}

#combined-waveform > wave {
  position: absolute !important;
  top: 10px !important;
  left: 0 !important;
  pointer-events: none;
}
</style>
