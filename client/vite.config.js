import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({  // shadcn/ui
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undes
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
