import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import federation from "@originjs/vite-plugin-federation"
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remoteA",
      filename: "remoteA.js",
      exposes: {
        "./compA": "./src/components/compA.vue",
      },
    }),
  ],
})
