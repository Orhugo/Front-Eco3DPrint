import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/volume",
  test: {
    globals: true,
    base: "/volume",
    environment: "happy-dom",
  },
});
