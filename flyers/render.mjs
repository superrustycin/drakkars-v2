// Exporta los 5 diseños en formato post (1080×1350) y story (1080×1920)
// a flyers/mockups/ en alta resolución (2× → 2160 px de ancho).
// Uso:  node flyers/render.mjs            (todos)
//       node flyers/render.mjs 2 story    (solo diseño 2, formato story)
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import fs from "node:fs";

const require = createRequire(import.meta.url);
let chromium;
try { ({ chromium } = require("playwright")); }
catch { ({ chromium } = require(path.join(process.env.NODE_PATH || "", "playwright"))); }

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, "mockups");
fs.mkdirSync(out, { recursive: true });

const [onlyV, onlyF] = process.argv.slice(2);
const variants = onlyV ? [Number(onlyV)] : [1, 2, 3, 4, 5];
const formats = onlyF ? [onlyF] : ["post", "story"];
const names = { 1: "oro-y-vino", 2: "aurora", 3: "duo", 4: "editorial", 5: "art-deco" };

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 2 });
for (const v of variants) {
  for (const f of formats) {
    const url = pathToFileURL(path.join(dir, "flyer.html")).href + `?v=${v}&f=${f}&export`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForFunction(() => window.FLYER_READY === true, null, { timeout: 20000 });
    const file = path.join(out, `flyer-${v}-${names[v]}-${f}.png`);
    await page.locator("#flyer").screenshot({ path: file });
    console.log("✓", path.relative(process.cwd(), file));
  }
}
await browser.close();
