#!/usr/bin/env node

import { createServer } from "vite";
import express from "express";
import { routes as filesRoutes } from "./fake/files-manager.js";
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

  app.get("/api/files", async (req, res) => {
    res.removeHeader("ETag");
    res.removeHeader("Last-Modified");

    return res.json(filesRoutes["/api/files"].response(req.query));
  });

  app.get("/api/status", async (req, res) => {
    return res.json(filesRoutes["/api/status"].response(req.query));
  });

  app.post("/api/delete", async (req, res) => {
    res.json(filesRoutes["/api/delete"].response(req.body));

    return res.sendStatus(200).end();
  });

  app.post("/api/move", async (req, res) => {
    res.json(filesRoutes["/api/move"].response(req.body));

    return res.sendStatus(200).end();
  });

  app.post("/api/mkdir", async (req, res) => {
    res.json(filesRoutes["/api/mkdir"].response(req.body));

    return res.sendStatus(200).end();
  });

  app.use(server.middlewares);

  app.disable("etag");

  app.listen(port, () => {
    console.log(`Crosspoint dev server running at http://localhost:${port}`);
  });
}

startDevServer();
