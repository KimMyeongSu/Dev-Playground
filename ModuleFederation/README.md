npm create vite@latest HostProject -- --template vue
npm create vite@latest RemoteProjectA -- --template vue
npm create vite@latest RemoteProjectB -- --template vue
npm create vite@latest RemoteProjectC -- --template vue

각 프로젝트 별로 패키지 설치
npm i @originjs/vite-plugin-federation

remote 프로젝트 별로 설정
vite.config.js

federation({ name: "remoteA", filename: "remoteA.js", exposes: { "./compA": "./src/components/compA.vue", }, })

각각 설정에 대한 설명 필요
\*exposes

host 프로젝트 별로 설정
vite.config.js

federation({ name: "host", remotes: { remoteA: "http://localhost:5180/remoteA.js", remoteB: "http://localhost:5181/remoteB.js", remoteC: "http://localhost:5182/remoteC.js", }, shared: ["vue"], })
각각 설정에 대한 설명 필요
\*remotes
