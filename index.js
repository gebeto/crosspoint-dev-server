#!/usr/bin/env node

import { createServer } from "vite";
import { vitePluginFakeServer } from "vite-plugin-fake-server";

async function startDevServer() {
  const port = 3000;
  const server = await createServer({
    root: process.cwd(),
    server: {
      port: port,
      open: "HomePage.html",
    },
    plugins: [vitePluginFakeServer()],
  });

  await server.listen();

  console.log(`Crosspoint dev server running at http://localhost:${port}`);
}

startDevServer();
