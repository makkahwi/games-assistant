import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: ["assets", "components", "consts", "redux", "services", "views"].map(
      (directory) => ({
        find: new RegExp(`^${directory}/`),
        replacement: fileURLToPath(new URL(`./src/${directory}/`, import.meta.url)),
      }),
    ),
  },
  build: { outDir: "build" },
});
