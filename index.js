#!/usr/bin/env node

import { createServer } from "vite";
import express from "express";
import * as FilesApi from "./fake/files-manager.js";
import formData from "express-form-data";
import path from "path";
import os from "os";

const rootFile = "HomePage.html";

async function startDevServer() {
  const app = express();
  app.use(formData.parse());

  const port = 3000;
  const cacheDir = path.join(os.tmpdir(), "crosspoint-dev-server-cache");
  const server = await createServer({
    root: process.cwd(),
    appType: "spa",
    cacheDir: cacheDir,
    server: {
      port: port,
      open: rootFile,
      middlewareMode: true,
    },
  });

  app.get("/", async (_req, res) => {
    return res.redirect("/HomePage.html");
  });

  app.get("/files", async (_req, res) => {
    return res.redirect("/FilesPage.html");
  });

  app.use(async (req, res, next) => {
    if (req.url.startsWith("/api/")) {
      await new Promise((resolve) => setTimeout(resolve, 700));
    }
    next();
  });

  app.get("/api/files", async (req, res) => {
    res.removeHeader("ETag");
    res.removeHeader("Last-Modified");

    return res.json(FilesApi.filesRoute(req.query));
  });

  app.get("/api/status", async (req, res) => {
    return res.json(FilesApi.statusRoute(req.query));
  });

  app.post("/api/delete", async (req, res) => {
    res.json(FilesApi.deleteRoute(req.body));

    return res.sendStatus(200).end();
  });

  app.post("/api/move", async (req, res) => {
    res.json(FilesApi.moveRoute(req.body));

    return res.sendStatus(200).end();
  });

  app.post("/api/mkdir", async (req, res) => {
    res.json(FilesApi.mkdirRoute(req.body));

    return res.sendStatus(200).end();
  });

  app.use(server.middlewares);

  app.disable("etag");

  app.listen(port, () => {
    console.log(`Crosspoint dev server running at http://localhost:${port}`);
  });
}

startDevServer();
