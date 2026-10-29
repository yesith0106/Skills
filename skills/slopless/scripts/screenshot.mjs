#!/usr/bin/env node
// Screenshot a page at desktop and mobile widths.
// Usage: node screenshot.mjs <url-or-file> [out-dir] [--widths=1440,390] [--dark]
// Output per width: <w>-first.png (first screen), <w>-full.png (whole page),
// <w>-part-NN.png (the page cut into screen-sized parts, readable at full size).

import { mkdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { loadPlaywright, toUrl, openPage, scrollThrough, waitForUncover } from "./lib.mjs";

const args = process.argv.slice(2);
const flags = Object.fromEntries(
  args.filter((a) => a.startsWith("--")).map((a) => {
    const [k, v] = a.slice(2).split("=");
    return [k, v ?? true];
  })
);
const [target, outArg] = args.filter((a) => !a.startsWith("--"));
if (!target) {
  console.error("Usage: node screenshot.mjs <url-or-file> [out-dir] [--widths=1440,390] [--dark]");
  process.exit(1);
}

const url = toUrl(target);
const outDir = resolve(outArg || "screenshots");
mkdirSync(outDir, { recursive: true });
const widths = String(flags.widths || "1440,390").split(",").map(Number);
const MAX_PARTS = 16;

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const files = [];

for (const width of widths) {
  const height = width >= 1024 ? 900 : width >= 700 ? 1024 : 844;
  const { context, page } = await openPage(browser, url, { width, height });
  if (flags.dark) await page.emulateMedia({ colorScheme: "dark" });
  await waitForUncover(page); // skip past a preloader
  await scrollThrough(page);

  const first = join(outDir, `${width}-first.png`);
  await page.screenshot({ path: first });
  files.push(first);

  const full = join(outDir, `${width}-full.png`);
  await page.screenshot({ path: full, fullPage: true });
  files.push(full);

  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  const parts = Math.min(MAX_PARTS, Math.ceil(total / height));
  for (let i = 0; i < parts; i++) {
    const y = i * height;
    const h = Math.min(height, total - y);
    if (h < 50) break;
    const p = join(outDir, `${width}-part-${String(i + 1).padStart(2, "0")}.png`);
    await page.screenshot({ path: p, fullPage: true, clip: { x: 0, y, width, height: h } });
    files.push(p);
  }
  await context.close();
}

await browser.close();
console.log(`Screenshots of ${url}`);
for (const f of files) console.log("  " + f);
