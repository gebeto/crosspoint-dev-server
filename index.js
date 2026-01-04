#!/usr/bin/env node

import { createServer } from "vite";
import express from "express";
import { routes as filesRoutes } from "./fake/files-manager.js";

const rootFile = "HomePage.html";

async function startDevServer() {
  const app = express();

  const port = 3000;
  const server = await createServer({
    root: process.cwd(),
    appType: "spa",
    server: {
      port: port,
      open: rootFile,
      middlewareMode: true,
    },
  });

  // await server.listen();

  // filesRoutes.forEach(({ url, response }) => {
  //   app.use(url, async (_req, res) => {
  //     const resp = response(_req.params);
  //     res.json(resp);
  //   });
  // });

  app.get("/", async (_req, res) => {
    return res.redirect("/HomePage.html");
  });

  app.get("/api/files", async (req, res) => {
    return res.json(filesRoutes["/api/files"].response(req.query));
  });

  app.get("/api/status", async (req, res) => {
    return res.json(filesRoutes["/api/status"].response(req.query));
  });

  app.use(server.middlewares);

  app.listen(port, () => {
    console.log(`Crosspoint dev server running at http://localhost:${port}`);
  });
}

startDevServer();
