import fs from "node:fs";
const dir = "dist-single";
let html = fs.readFileSync(`${dir}/index.html`, "utf8");
const js = fs.readFileSync(`${dir}/app.js`, "utf8").replace(/<\/script/gi, "<\\/script");
const css = fs.readFileSync(`${dir}/app.css`, "utf8");
const favicon = fs.readFileSync("public/favicon.svg", "utf8");

html = html
  .replace(/<script type="module" crossorigin src="[^"]+"><\/script>/, `<script type="module">${js}</script>`)
  .replace(/<link rel="stylesheet" crossorigin href="[^"]+">/, `<style>${css}</style>`)
  .replace(/<link rel="icon"[^>]*>/, `<link rel="icon" href="data:image/svg+xml;base64,${Buffer.from(favicon).toString("base64")}">`);

fs.mkdirSync("/mnt/user-data/outputs", { recursive: true });
fs.writeFileSync("/mnt/user-data/outputs/portfolio-live-preview.html", html);
console.log("inlined:", (html.length / 1024 / 1024).toFixed(2), "MB");
