// Shared helpers for screenshot.mjs and audit.mjs
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

export async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error(
      "Playwright is not installed. Run:\n  cd " +
        new URL(".", import.meta.url).pathname +
        " && npm install && npx playwright install chromium"
    );
    process.exit(2);
  }
}

// Accepts a URL, a local HTML file, or a bare host like "localhost:3000".
export function toUrl(target) {
  if (!target) return null;
  if (/^(https?|file):\/\//i.test(target)) return target;
  if (existsSync(target)) return pathToFileURL(resolve(target)).href;
  if (/^(localhost|127\.0\.0\.1|\[::1\])(:\d+)?/i.test(target)) return "http://" + target;
  return "https://" + target;
}

export async function openPage(browser, url, { width, height, reducedMotion = "no-preference" }) {
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion,
  });
  const page = await context.newPage();
  // Busy pages (analytics, video) may never go idle: fall back to DOM ready + a short wait.
  try {
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
  } catch {
    if (page.url() === "about:blank") await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(3000);
  }
  await page.evaluate(() => document.fonts && document.fonts.ready);
  return { context, page };
}

// Scroll through the page so lazy images and scroll reveals trigger, then return to top.
// Waits run in Node, not in the page: headless Chrome can throttle in-page timers.
export async function scrollThrough(page) {
  const go = (y) =>
    page.evaluate((top) => {
      // Smooth-scroll CSS and scroll libraries delay jumps; force instant scrolling.
      document.documentElement.style.setProperty("scroll-behavior", "auto", "important");
      window.scrollTo({ top, left: 0, behavior: "instant" });
      return { y: window.scrollY, h: document.documentElement.scrollHeight, vh: window.innerHeight };
    }, y);
  let { h, vh } = await go(0);
  const step = Math.max(200, Math.floor(vh * 0.6));
  for (let y = step; y < h && y < 40000; y += step) {
    ({ h } = await go(y));
    await page.waitForTimeout(120);
  }
  await go(h);
  await page.waitForTimeout(400);
  for (let i = 0; i < 20; i++) {
    const { y } = await go(0);
    await page.waitForTimeout(150);
    if (y === 0 && i > 0) break;
  }
  await page.waitForTimeout(800); // let scroll-linked styles settle at the top
}

// Preloaders and intro overlays: poll until no fixed layer covers the viewport.
// Returns { had, ms } where ms is time since navigation start when the page was uncovered
// (null if still covered after maxMs).
export async function waitForUncover(page, maxMs = 10000) {
  const probe = () => page.evaluate(() => {
    const vw = innerWidth, vh = innerHeight;
    // Scan fixed layers directly: preloaders often use pointer-events: none, so hit-testing misses them.
    // A layer counts as covering when an opaque piece of it (its own fill, or a fill or media inside it)
    // covers at least 60% of the viewport. Finished preloaders often stay in the DOM, slid away or faded.
    const vpArea = vw * vh;
    const shown = (n, root) => {
      let op = 1;
      for (let m = n; m; m = m === root ? null : m.parentElement) {
        const c = getComputedStyle(m);
        if (c.visibility === "hidden" || c.display === "none") return 0;
        op *= parseFloat(c.opacity);
      }
      return op;
    };
    const piece = (n) => {
      const r = n.getBoundingClientRect();
      const w = Math.min(r.right, vw) - Math.max(r.left, 0), h = Math.min(r.bottom, vh) - Math.max(r.top, 0);
      return w > 0 && h > 0 ? w * h : 0;
    };
    const opaque = (n) => {
      if (/^(IMG|VIDEO|CANVAS)$/.test(n.tagName)) return true;
      const bg = getComputedStyle(n).backgroundColor.match(/[\d.]+/g);
      return !!bg && (bg.length < 4 || parseFloat(bg[3]) > 0.5);
    };
    const covered = [...document.body.querySelectorAll("*")].some((root) => {
      if (getComputedStyle(root).position !== "fixed" || root.querySelector("h1, main") || piece(root) < vpArea * 0.6) return false;
      return [root, ...[...root.querySelectorAll("*")].slice(0, 400)].some((n) => opaque(n) && piece(n) >= vpArea * 0.6 && shown(n, root) > 0.1);
    });
    return { covered, t: performance.now() };
  }).catch(() => ({ covered: false, t: 0 }));
  let had = false, last;
  for (let waited = 0; waited <= maxMs; waited += 150) {
    last = await probe();
    if (!last.covered) return { had, ms: had ? Math.round(last.t) : null };
    had = true;
    await page.waitForTimeout(150);
  }
  return { had, ms: null };
}
