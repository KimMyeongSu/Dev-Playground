import * as path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import Pages from "vite-plugin-pages"

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      onRoutesGenerated(routes: any[]) {
        const transformRoute = (route: { path: string; children?: any[] }): { path: string; children?: any[] } => ({
          ...route,
          path: route.path.replace("/:@", "/:"),
          children: route.children?.map(transformRoute) ?? [],
        })
        return routes.map(transformRoute)
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
      "~pages": path.join(__dirname, "src/pages"),
      "~": path.join(__dirname, "src"),
    },
  },
})
