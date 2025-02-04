import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  css: { preprocessorOptions: { scss: { api: "modern", silenceDeprecations: ["import"], prependData: `@import 'src/styles/_head.scss';` } } }, // global styles / remove warnings for deprecated @import scss
  plugins: [react()],
});
