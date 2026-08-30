import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    preview: {
      host: "0.0.0.0",
      port: 3000,
      allowedHosts: true,
    },
    server: {
      host: "0.0.0.0",
      allowedHosts: true,
    },
  },
});
