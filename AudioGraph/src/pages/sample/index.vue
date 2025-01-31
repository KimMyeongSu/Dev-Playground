<script setup>
import { ref, onMounted } from "vue"
import WaveSurfer from "wavesurfer.js"
import audio from "@/assets/audio/C050_C_03.wav"

const wavesurfer = ref(null)
const recordedWaveSurfer = ref(null)
const resultWaveSurfer = ref(null)

const isPlaying = ref(false)
const isPlayingRecorded = ref(false)
const isPlayingResult = ref(false)

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
    container: "#recorded-waveform",
    waveColor: "rgba(0, 200, 0, 0.5)",
    progressColor: "rgba(0, 100, 0, 0.5)",
    height: 100,
    normalize: true,
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

      // 녹음된 오디오를 recordedWaveSurfer에 로드
      await recordedWaveSurfer.value.load(audioUrl)

      // 결과 화면의 이전 웨이브폼들 제거
      if (resultWaveSurfer.value) {
        resultWaveSurfer.value.destroy()
      }

      const resultContainer = document.querySelector("#result-waveform")
      resultContainer.innerHTML = '<div class="original-wave"></div><div class="recorded-wave"></div>'

      // 원본 파형 생성
      resultWaveSurfer.value = WaveSurfer.create({
        container: "#result-waveform .original-wave",
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        height: 100,
        normalize: true,
      })

      // 녹음된 파형 생성
      const resultRecorded = WaveSurfer.create({
        container: "#result-waveform .recorded-wave",
        waveColor: "rgba(0, 200, 0, 0.3)",
        progressColor: "rgba(0, 100, 0, 0.3)",
        height: 100,
        normalize: true,
      })

      // 오디오 로드
      await resultWaveSurfer.value.load(audio)
      await resultRecorded.load(audioUrl)

      // 동기화를 위한 이벤트 리스너
      resultWaveSurfer.value.on("play", () => {
        isPlayingResult.value = true
        resultRecorded.play()
      })

      resultWaveSurfer.value.on("pause", () => {
        isPlayingResult.value = false
        resultRecorded.pause()
      })
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
})

// 원본 오디오 재생/일시정지
const togglePlay = () => {
  wavesurfer.value.playPause()
}

// 녹음된 오디오 재생/일시정지
const togglePlayRecorded = () => {
  recordedWaveSurfer.value.playPause()
}

// 결과 화면 재생/일시정지 토글 함수
const togglePlayResult = () => {
  if (resultWaveSurfer.value) {
    resultWaveSurfer.value.playPause()
  }
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
    <h3>원본 파형</h3>
    <div id="waveform"></div>

    <div>
      <h3>녹음된 파형</h3>
      <div id="recorded-waveform"></div>
    </div>
    <div>
      <h3>파형 비교</h3>
      <div id="result-waveform"></div>
    </div>

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
      <button v-if="resultWaveSurfer" @click="togglePlayResult" :class="{ playing: isPlayingResult }">
        {{ isPlayingResult ? "비교 일시정지" : "비교 재생" }}
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
  position: relative;
}

h3 {
  margin: 20px 0 10px 0;
  color: #333;
}

#waveform,
#recorded-waveform,
#result-waveform {
  margin-bottom: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
  min-height: 120px;
}

#result-waveform {
  position: relative;
}

.original-wave,
.recorded-wave {
  position: absolute !important;
  top: 10px !important;
  left: 10px !important;
  right: 10px !important;
  bottom: 10px !important;
  pointer-events: none;
}

.recorded-wave {
  z-index: 2;
}

.controls {
  margin-top: 20px;
  text-align: center;
  position: relative;
  z-index: 2;
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

.recording {
  background-color: #ff4444 !important;
}
</style>
