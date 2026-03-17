import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { generateIndex } from "./scripts/generate-recipes-index.js";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    recipesIndexPlugin(),
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    watch: {
      disableGlobbing: false,
    },
  },
});

function recipesIndexPlugin() {
  return {
    name: "recipe-index-generator",
    async buildStart() {
      try {
        await generateIndex();
      } catch (error) {
        if (error instanceof Error) {
          console.error("[recipes] Indexing failed:", error.message);
        } else {
          console.error("[recipes] Indexing failed:", error);
        }
      }
    },
    /**
     * @param {import('vite').ViteDevServer} server
     */
    configureServer(server) {
      server.watcher.on("all", async (event, path) => {
        // Fast normalization for cross-platform support
        const normalizedPath = path.replace(/\\/g, "/");
        if (normalizedPath.endsWith(".md") && normalizedPath.includes("src/content")) {
          console.info(`[recipes] Event '${event}' detected at: ${path}`);
          try {
            await generateIndex();
            console.info("[recipes] Index successfully regenerated.");
          } catch (err) {
            console.error("[recipes] Indexing failed:", err);
          }
        }
      });
    },
  };
}
