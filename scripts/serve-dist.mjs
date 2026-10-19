#!/usr/bin/env node
// Serves dist/ like production (Vercel): static assets + per-route
// prerendered index.html, falling back to the root index.html (SPA).
import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const distDir = path.join(root, "dist");
const PORT = Number(process.env.PORT || 4173);

const resolveOutputPath = (routePath) =>
  routePath === "/"
    ? path.join(distDir, "index.html")
    : path.join(distDir, routePath.replace(/^\//, ""), "index.html");

const app = express();
app.use(express.static(distDir, { index: false }));

app.get("*", (req, res) => {
  const normalizedPath = req.path === "/" ? "/" : `/${req.path.replace(/^\/+|\/+$/g, "")}`;
  const outputPath = resolveOutputPath(normalizedPath);
  if (fs.existsSync(outputPath)) {
    return res.sendFile(outputPath);
  }
  res.sendFile(path.join(distDir, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`serve-dist listening on http://localhost:${PORT} (${distDir})`);
});
