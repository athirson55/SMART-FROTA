import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/SMART-FROTA/",
  build: {
    assetsDir: "ASSETS",
  },
  plugins: [react()],
});
