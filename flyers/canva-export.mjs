// Genera PDFs editables para Canva de un diseño (por defecto el 6 · Eclipse).
// Salida en flyers/canva/: fondo PNG + PDF (post y story) con textos vivos.
// Uso: node flyers/canva-export.mjs [diseño]
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require(path.join(process.env.NODE_PATH || "", "playwright"))); }

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "canva");
fs.mkdirSync(out, { recursive: true });
const v = Number(process.argv[2] || 6);
const base = pathToFileURL(path.join(dir, "flyer.html")).href;
const sizes = { post: [1080, 1350], story: [1080, 1920] };

const browser = await chromium.launch();
for (const [f, [w, h]] of Object.entries(sizes)) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 2 });
  const bg = `canva/flyer-${v}-${f}-fondo.png`;
  await page.goto(`${base}?v=${v}&f=${f}&export&canva=bg`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.FLYER_READY === true);
  await page.locator("#flyer").screenshot({ path: path.join(dir, bg) });
  await page.goto(`${base}?v=${v}&f=${f}&export&canva=text&bg=${encodeURIComponent(bg)}`, { waitUntil: "networkidle" });
  await page.waitForFunction(() => window.FLYER_READY === true);
  await page.addStyleTag({ content: "@page{margin:0} html,body{margin:0;padding:0;background:none}" });
  const pdf = path.join(out, `flyer-${v}-${f}-editable.pdf`);
  await page.pdf({ path: pdf, width: `${w}px`, height: `${h}px`, printBackground: true, pageRanges: "1" });
  console.log("✓", path.relative(process.cwd(), pdf));
  await page.close();
}
await browser.close();
