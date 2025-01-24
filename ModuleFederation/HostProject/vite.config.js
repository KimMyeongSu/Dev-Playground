import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import federation from "@originjs/vite-plugin-federation"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        remoteA: "http://localhost:5180/assets/remoteA.js",
        remoteB: "http://localhost:5181/assets/remoteB.js",
        remoteC: "http://localhost:5182/assets/remoteC.js",
      },
      shared: ["vue"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
