# 모듈 페더레이션 설정 가이드

## 1. 프로젝트 생성
```bash
# Host 프로젝트 생성
npm create vite@latest HostProject -- --template vue

# Remote 프로젝트들 생성
npm create vite@latest RemoteProjectA -- --template vue
npm create vite@latest RemoteProjectB -- --template vue
npm create vite@latest RemoteProjectC -- --template vue
2. 모듈 페더레이션 패키지 설치
bashCopynpm i @originjs/vite-plugin-federation
3. Remote 프로젝트 설정
vite.config.js:
javascriptCopyimport { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remoteA",           // Remote 프로젝트의 고유 이름
      filename: "remoteA.js",    // 빌드될 Remote 진입점 파일명
      exposes: {
        // 외부로 노출할 컴포넌트 설정
        "./compA": "./src/components/compA.vue",
        "./utils": "./src/utils/index.js"
      }
    })
  ]
})
exposes 설정 상세
javascriptCopyexposes: {
  // "외부에서 접근할 경로": "실제 파일 경로"
  "./Button": "./src/components/Button.vue",    // 단일 컴포넌트 노출
  "./utils/*": "./src/utils/*",                 // 디렉토리 전체 노출
  "./feature": "./src/features/index.js"        // 모듈 노출
}
4. Host 프로젝트 설정
vite.config.js:
javascriptCopyimport { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        // Remote 프로젝트 연결 설정
        remoteA: "http://localhost:5180/remoteA.js",
        remoteB: "http://localhost:5181/remoteB.js",
        remoteC: "http://localhost:5182/remoteC.js"
      },
      shared: ["vue"]  // 공유할 디펜던시
    })
  ]
})
remotes 설정 상세
javascriptCopyremotes: {
  // "프로젝트별칭": "Remote 프로젝트 URL/빌드파일명"
  remoteA: {
    external: "http://localhost:5180/remoteA.js",
    format: "esm",            // 모듈 포맷
    from: "vite"             // 빌드 도구
  },
  // 간단한 문자열 형태도 가능
  remoteB: "http://localhost:5181/remoteB.js"
}
5. 컴포넌트 사용 예시
vueCopy<script setup>
// Remote 프로젝트의 컴포넌트 import
import RemoteButton from "remoteA/Button"
import { useFeature } from "remoteA/feature"
</script>

<template>
  <RemoteButton />
</template>
주의사항

빌드 후 Host와 Remote 모두 실행 중이어야 함
shared 옵션으로 중복 라이브러리 방지
Remote 프로젝트의 URL은 실제 배포 환경에 맞게 수정 필요
TypeScript 사용 시 추가 설정 필요