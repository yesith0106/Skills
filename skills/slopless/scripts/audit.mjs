#!/usr/bin/env node
// Audit a page: every design value it actually renders, grouped by the 8 settings,
// plus floor-rule breaks (FAIL), likely problems (WARN) and AI tells (../ai-tells.md).
// Usage: node audit.mjs <url-or-file> [--json] [--expressive] [--ignore=<css selector>]
// Product mockups and graphics (class names with illustration/graphic/mockup/
// screenshot/preview, aria-hidden, role=img, [data-slopless-ignore]) are left out of the
// page counts, since their values belong to the product, not the page design.
// Rule ids (T1, S2, C4…) match the setting files in ../settings/.

import { loadPlaywright, toUrl, openPage, scrollThrough, waitForUncover } from "./lib.mjs";

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith("--"));
const asJson = args.includes("--json");
const expressive = args.includes("--expressive"); // ../expressive.md: unlocks some tells, adds checks
const ignoreArg = (args.find((a) => a.startsWith("--ignore=")) || "").slice(9);
if (!target) {
  console.error("Usage: node audit.mjs <url-or-file> [--json] [--expressive]");
  process.exit(1);
}
const url = toUrl(target);

// ---------------------------------------------------------------- in-page collector
// Runs inside the browser. Reads computed styles of every visible element.
function collect(ignoreSel) {
  const vw = innerWidth, vh = innerHeight;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const colorCache = new Map();
  // Normalise any CSS color (rgb, oklch, color(), named) to [r,g,b,a].
  const rgba = (str) => {
    if (!str || str === "transparent") return [0, 0, 0, 0];
    if (colorCache.has(str)) return colorCache.get(str);
    let out;
    const m = str.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)$/);
    if (m) {
      let a = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
      out = [+m[1], +m[2], +m[3], a];
    } else {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#000";
      ctx.fillStyle = str;
      ctx.fillRect(0, 0, 1, 1);
      const d = ctx.getImageData(0, 0, 1, 1).data;
      out = [d[0], d[1], d[2], +(d[3] / 255).toFixed(3)];
    }
    colorCache.set(str, out);
    return out;
  };
  const px = (v) => (v && v.endsWith("px") ? parseFloat(v) : null);
  const describe = (el) => {
    let s = el.tagName.toLowerCase();
    if (el.id) s += "#" + el.id;
    else if (typeof el.className === "string" && el.className.trim())
      s += "." + el.className.trim().split(/\s+/).slice(0, 2).join(".");
    return s.slice(0, 60);
  };
  const isVisible = (el, r, cs) =>
    r.width >= 2 && r.height >= 2 && cs.display !== "none" && cs.visibility !== "hidden";
  const effectiveBg = (el) => {
    let node = el, layers = [], img = false;
    while (node && node.nodeType === 1) {
      const cs = getComputedStyle(node);
      if (cs.backgroundImage && cs.backgroundImage !== "none") img = true;
      const c = rgba(cs.backgroundColor);
      if (c[3] > 0) {
        layers.push(c);
        if (c[3] >= 0.99) break;
      }
      node = node.parentElement;
    }
    const solid = layers.length && layers[layers.length - 1][3] >= 0.99;
    if (!solid && layers.length) img = true; // translucent panels over unknown content
    let base = [255, 255, 255];
    for (let i = layers.length - 1; i >= 0; i--) {
      const [r, g, b, a] = layers[i];
      base = [r * a + base[0] * (1 - a), g * a + base[1] * (1 - a), b * a + base[2] * (1 - a)];
    }
    return { bg: base.map(Math.round), uncertain: img };
  };
  const directText = (el) => {
    let t = "";
    for (const n of el.childNodes) if (n.nodeType === 3) t += n.textContent;
    return t.replace(/\s+/g, " ").trim();
  };

  const GRAPHIC_RE = /(^|[\s_-])(illustration|graphic|mockup|screenshot|preview|product-ui|app-frame|showcase)/i;
  const gCache = new Map();
  const isGraphic = (el) => {
    const chain = [];
    let n = el, res = false;
    while (n && n !== document.body) {
      if (gCache.has(n)) { res = gCache.get(n); break; }
      chain.push(n);
      const cls = typeof n.className === "string" ? n.className : (n.getAttribute && n.getAttribute("class")) || "";
      if (
        n.getAttribute("aria-hidden") === "true" || n.getAttribute("role") === "img" || n.hasAttribute("inert") ||
        n.hasAttribute("data-slopless-ignore") || n.hasAttribute("data-taste-ignore") || GRAPHIC_RE.test(cls) || (ignoreSel && n.matches(ignoreSel))
      ) { res = true; break; }
      n = n.parentElement;
    }
    for (const c of chain) gCache.set(c, res);
    return res;
  };
  let graphicText = 0;
  const graphicRoots = [], textBlocks = [];
  const scrollY0 = scrollY;
  const all = [...document.body.querySelectorAll("*")];
  const text = [], spacing = [], radii = [], shadows = [], bgs = [], borders = [];
  const transitions = [], animations = [], maxWidths = [], images = [], controls = [];
  const gradients = [], hiddenText = [], nested = [];
  // AI tells (see ../ai-tells.md)
  const tells = { gradText: [], stripe: [], glow: [], hardShadow: [], ghost: [], iconTile: [], glyph: [], pattern: [], halo: [], purple: [], nestedCards: [], kicker: [], numbered: [], rhythm: { crowded: 0, measured: 0, ex: null } };
  const hslB = ([r, g, b]) => {
    r /= 255; g /= 255; b /= 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
    if (mx === mn) return [0, 0, l];
    const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
    const h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return [h * 60, s, l];
  };
  const lumB = ([r, g, b]) => (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  const COLOR_RE = /(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)/g;
  const shadowLayers = (v) => (v && v !== "none" ? v.split(/,(?![^(]*\))/) : []).map((layer) => {
    const col = (layer.match(COLOR_RE) || [])[0];
    const nums = layer.replace(COLOR_RE, "").match(/-?[\d.]+px/g) || [];
    const [x = 0, y = 0, blur = 0] = nums.map(parseFloat);
    return { c: col ? rgba(col) : [0, 0, 0, 1], x, y, blur, inset: /inset/.test(layer) };
  });
  const cardSet = new Set();

  for (const el of all) {
    const tag = el.tagName.toLowerCase();
    if (["script", "style", "noscript", "template", "head", "meta", "link", "br"].includes(tag)) continue;
    if (el.closest("svg") && tag !== "svg") continue;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    if (!isVisible(el, r, cs)) continue;
    const top = r.top + scrollY0;
    const sel = describe(el);
    const graphic = isGraphic(el);
    if (graphic) {
      if (directText(el).length) graphicText++;
      if ((!el.parentElement || !isGraphic(el.parentElement)) && !/^(h[1-6]|p|span|a|li|label|strong|em)$/.test(tag)) graphicRoots.push({ sel, area: r.width * r.height, top });
      if (["img", "video", "canvas", "iframe"].includes(tag)) images.push({ sel, kind: tag, w: Math.round(r.width), h: Math.round(r.height), top, alt: tag === "img" ? el.getAttribute("alt") ?? "" : "n/a", sized: true, graphic: true });
      continue;
    }

    // Typography + color (text-bearing elements)
    const t = directText(el);
    if (t.length > 0) {
      const size = parseFloat(cs.fontSize);
      const lhPx = px(cs.lineHeight);
      const lsPx = cs.letterSpacing === "normal" ? 0 : px(cs.letterSpacing) ?? 0;
      const { bg, uncertain } = effectiveBg(el);
      const op = parseFloat(cs.opacity);
      text.push({
        sel, tag, size,
        lh: lhPx ? +(lhPx / size).toFixed(2) : null,
        ls: +(lsPx / size).toFixed(3),
        weight: parseInt(cs.fontWeight, 10),
        italic: cs.fontStyle === "italic" || cs.fontStyle.startsWith("oblique"),
        footer: !!el.closest("footer"),
        family: cs.fontFamily.split(",")[0].replace(/["']/g, "").trim(),
        upper: cs.textTransform === "uppercase" || cs.fontVariantCaps === "all-small-caps",
        color: rgba(cs.color), bg, bgUncertain: uncertain,
        len: t.length, sample: t.slice(0, 70),
        width: r.width, top, height: r.height,
        tnum: /tabular-nums/.test(cs.fontVariantNumeric) || /tnum/.test(cs.fontFeatureSettings),
        wrap: cs.textWrap || cs.textWrapStyle || "",
        heading: /^h[1-6]$/.test(tag),
        block: (() => { const b = el.closest("h1,h2,h3,h4,h5,h6,p,li,blockquote,figcaption,button,a"); return b ? describe(b) + Math.round(b.getBoundingClientRect().top + scrollY0) : sel + Math.round(top); })(),
        hidden: op === 0,
      });
      textBlocks.push({ sel, left: Math.round(r.left), width: Math.round(r.width), top, align: cs.textAlign, sample: t.slice(0, 40), fixed: cs.position === "fixed" || cs.position === "sticky" || !!el.closest("header, nav, footer") });
      if (op === 0 && t.length > 10 && !/skip to/i.test(t)) hiddenText.push({ sel, sample: t.slice(0, 50) });
    }

    // Spacing
    for (const p of ["paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "marginTop", "marginBottom"]) {
      const v = px(cs[p]);
      if (v && v > 0) spacing.push({ v, kind: p.startsWith("padding") ? "padding" : "margin" });
    }
    if (/flex|grid/.test(cs.display)) {
      for (const p of ["rowGap", "columnGap"]) {
        const v = px(cs[p]);
        if (v && v > 0) spacing.push({ v, kind: "gap" });
      }
    }

    // Surfaces
    const bgc = rgba(cs.backgroundColor);
    const bw = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderBottomWidth) + parseFloat(cs.borderRightWidth);
    const isMedia = ["img", "video", "picture", "canvas", "iframe"].includes(tag);
    const hasSurface = bgc[3] > 0 || bw > 0 || isMedia || cs.boxShadow !== "none";
    const rad = px(cs.borderTopLeftRadius) ?? (cs.borderTopLeftRadius.endsWith("%") ? 9999 : 0);
    if (hasSurface && rad > 0) {
      const full = rad >= Math.min(r.width, r.height) / 2 - 0.5;
      radii.push({ v: full ? "full" : Math.round(rad * 2) / 2, sel });
      // nested radius check
      const pad = px(cs.paddingTop) || 0;
      if (!full && pad > 0 && pad < 48) {
        for (const child of el.children) {
          const ccs = getComputedStyle(child);
          const cr = px(ccs.borderTopLeftRadius) || 0;
          const crect = child.getBoundingClientRect();
          const inset = crect.left - r.left;
          const childFull = cr >= Math.min(crect.width, crect.height) / 2 - 0.5;
          if (!childFull && cr > 0 && cr >= rad && inset > 2 && inset < 48 && rad > inset) {
            nested.push({ sel, outer: rad, inner: cr, inset: Math.round(inset) });
            break;
          }
        }
      }
    }
    if (cs.boxShadow !== "none") shadows.push({ v: cs.boxShadow, sel });
    if (bgc[3] > 0) bgs.push({ c: bgc, area: r.width * r.height, top, sel });
    if (bw > 0) borders.push({ c: rgba(cs.borderTopColor) });
    if (/gradient/.test(cs.backgroundImage)) {
      let sat = 0;
      for (const c of cs.backgroundImage.match(/(rgba?|oklch|oklab|lab|lch|hsla?|color)\([^)]*\)/g) || []) {
        const [cr, cg, cb, ca] = rgba(c);
        const mx = Math.max(cr, cg, cb) / 255, mn = Math.min(cr, cg, cb) / 255, l = (mx + mn) / 2;
        const sv = mx === mn ? 0 : (mx - mn) / (1 - Math.abs(2 * l - 1));
        sat = Math.max(sat, sv * ca);
      }
      gradients.push({ sel, area: r.width * r.height, top, sat: +sat.toFixed(2) });
    }

    // ---- AI tells
    const area = r.width * r.height, vpArea = vw * vh;
    if (t.length && (cs.backgroundClip === "text" || cs.webkitBackgroundClip === "text") && /gradient/.test(cs.backgroundImage))
      tells.gradText.push(`\`${sel}\` "${t.slice(0, 40)}"`);
    {
      const bl = parseFloat(cs.borderLeftWidth) || 0, br = parseFloat(cs.borderRightWidth) || 0;
      const bt = parseFloat(cs.borderTopWidth) || 0, bb = parseFloat(cs.borderBottomWidth) || 0;
      const side = Math.max(bl, br);
      if (side > 1 && side >= 2 * Math.max(bt, bb, 0.5) && r.width >= 120 && r.height >= 24 && tag !== "blockquote") {
        const sc = rgba(bl >= br ? cs.borderLeftColor : cs.borderRightColor);
        const [, s, l] = hslB(sc);
        if (s > 0.3 && l > 0.15 && l < 0.9 && sc[3] > 0.3) tells.stripe.push(`\`${sel}\` ${side}px`);
      }
    }
    if (cs.boxShadow !== "none" || cs.textShadow !== "none") {
      const pageDark = lumB(effectiveBg(el).bg) < 0.12;
      for (const L of [...shadowLayers(cs.boxShadow), ...shadowLayers(cs.textShadow)]) {
        if (L.inset) continue;
        const [, s, l] = hslB(L.c);
        const colored = s > 0.4 && l > 0.2 && l < 0.85 && L.c[3] > 0.15;
        if (colored && L.blur >= 6 && ((L.x === 0 && L.y === 0) || pageDark)) { tells.glow.push(`\`${sel}\``); break; }
        if (L.blur === 0 && (Math.abs(L.x) >= 4 || Math.abs(L.y) >= 4) && L.c[3] > 0.5) { tells.hardShadow.push(`\`${sel}\` ${L.x}px ${L.y}px 0`); break; }
      }
      if (bw > 0 && bw <= 6 && shadowLayers(cs.boxShadow).some((L) => !L.inset && L.blur >= 16) && r.width >= 160) tells.ghost.push(sel);
    }
    if (/repeating-(linear|radial)-gradient/.test(cs.backgroundImage) && area > 20000) tells.pattern.push(`\`${sel}\` repeating gradient`);
    else if ((cs.backgroundImage.match(/linear-gradient/g) || []).length >= 2 && /\d+px/.test(cs.backgroundSize) && area > vpArea * 0.2) tells.pattern.push(`\`${sel}\` tiled line grid`);
    if (/radial-gradient/.test(cs.backgroundImage) && area > vpArea * 0.1) {
      const sat = (cs.backgroundImage.match(COLOR_RE) || []).map((c) => { const v = rgba(c); const [, s, l] = hslB(v); return l > 0.15 && l < 0.85 ? s * v[3] : 0; });
      if (Math.max(0, ...sat) > 0.3) tells.halo.push(`\`${sel}\``);
    }
    if (/gradient/.test(cs.backgroundImage) && area > vpArea * 0.03) {
      const hues = (cs.backgroundImage.match(COLOR_RE) || []).map((c) => hslB(rgba(c))).filter(([, s, l]) => s > 0.4 && l > 0.2 && l < 0.85).map(([h]) => h);
      if (hues.some((h) => h >= 245 && h <= 310)) tells.purple.push(`\`${sel}\``);
    }
    if (!isMedia && rad >= 6 && r.width >= 160 && r.height >= 100 && (el.innerText || "").trim().length > 20 && (bw > 0 || cs.boxShadow !== "none" || (bgc[3] > 0.5 && el.parentElement && effectiveBg(el.parentElement).bg.join() !== effectiveBg(el).bg.join()))) {
      let p = el.parentElement, outer = null;
      while (p && p !== document.body) { if (cardSet.has(p)) { outer = p; break; } p = p.parentElement; }
      if (outer && outer.getBoundingClientRect().width < vw * 0.9) tells.nestedCards.push(`\`${describe(outer)}\` > \`${sel}\``);
      cardSet.add(el);
    }
    if (r.width >= 28 && r.width <= 72 && Math.abs(r.width - r.height) < 4 && rad > 0 && (bgc[3] > 0 || bw > 0) && el.querySelector("svg, img, i") ) {
      const nx = el.nextElementSibling;
      if (nx && (/^H[2-4]$/.test(nx.tagName) || (nx.firstElementChild && /^H[2-4]$/.test(nx.firstElementChild.tagName)))) tells.iconTile.push(sel);
    }
    if (t.length && t.length <= 2 && /[\p{Extended_Pictographic}\u2190-\u21FF\u2600-\u27BF\u2B50]/u.test(t) && parseFloat(cs.fontSize) >= 16) tells.glyph.push(`"${t}"`);

    // Motion
    const durs = cs.transitionDuration.split(",").map((d) => parseFloat(d) * (d.includes("ms") ? 0.001 : 1));
    if (durs.some((d) => d > 0)) {
      transitions.push({
        sel, tag, top,
        prop: cs.transitionProperty,
        dur: Math.max(...durs),
        ease: cs.transitionTimingFunction,
        interactive: ["a", "button", "input", "select", "textarea", "summary"].includes(tag) || el.getAttribute("role") === "button",
      });
    }
    if (cs.animationName && cs.animationName !== "none") {
      animations.push({ sel, name: cs.animationName, dur: cs.animationDuration, iter: cs.animationIterationCount, top, w: Math.round(r.width), h: Math.round(r.height), ease: cs.animationTimingFunction, text: (el.innerText || "").trim().slice(0, 4) });
    }

    // Layout
    const mw = px(cs.maxWidth);
    if (mw && mw >= 320) maxWidths.push(Math.round(mw));

    // Controls
    const buttonLike =
      tag === "button" || el.getAttribute("role") === "button" ||
      (tag === "a" && (bgc[3] > 0 || bw > 0) && r.height < 80 && r.width < 400);
    if (buttonLike || ["input", "select"].includes(tag)) {
      controls.push({
        sel, tag, h: Math.round(r.height), top,
        label: (el.innerText || el.value || "").replace(/\s+/g, " ").trim().slice(0, 40),
        filled: bgc[3] > 0.5, bg: bgc,
        toggle: /^(checkbox|switch|radio|tab|menuitem\w*|option)$/.test(el.getAttribute("role") || "") || ["checkbox", "radio", "range"].includes(el.type),
      });
    }

    // Imagery
    if (tag === "img") {
      const fit = cs.objectFit;
      const nr = el.naturalWidth && el.naturalHeight ? el.naturalWidth / el.naturalHeight : null;
      const rr = r.width / r.height;
      images.push({
        sel, src: (el.currentSrc || el.src || "").startsWith("data:") ? "data:" : (el.currentSrc || el.src || "").slice(-60),
        alt: el.hasAttribute("alt") ? el.getAttribute("alt") : null,
        w: Math.round(r.width), h: Math.round(r.height), top,
        natW: el.naturalWidth,
        srcset: el.hasAttribute("srcset") || !!el.closest("picture"),
        distorted: nr && fit === "fill" && Math.abs(nr - rr) / nr > 0.03,
        sized: el.hasAttribute("width") || el.hasAttribute("height") || cs.aspectRatio !== "auto",
      });
    } else if (["video", "canvas", "iframe"].includes(tag)) {
      images.push({ sel, kind: tag, w: Math.round(r.width), h: Math.round(r.height), top, alt: "n/a", sized: true });
    }
  }

  // Sections: descend from main/body while there is a single wrapping child.
  let root = document.querySelector("main") || document.body;
  for (let i = 0; i < 6; i++) {
    const kids = [...root.children].filter((k) => {
      const rr = k.getBoundingClientRect();
      return rr.height > 40 && getComputedStyle(k).display !== "none";
    });
    if (kids.length === 1) root = kids[0];
    else break;
  }
  const contentRect = (sec) => {
    let t = Infinity, b = -Infinity;
    for (const d of sec.querySelectorAll("*")) {
      const tg = d.tagName.toLowerCase();
      const isContent = ["img", "video", "canvas", "svg", "input", "button", "iframe"].includes(tg) || directText(d).length > 0;
      if (!isContent) continue;
      const rr = d.getBoundingClientRect();
      if (rr.height < 2 || rr.width < 2) continue;
      const dcs = getComputedStyle(d);
      if (dcs.visibility === "hidden" || dcs.display === "none") continue;
      t = Math.min(t, rr.top + scrollY0);
      b = Math.max(b, rr.bottom + scrollY0);
    }
    return t === Infinity ? null : { t, b };
  };
  const sections = [...root.children]
    .filter((k) => k.getBoundingClientRect().height > 120)
    .map((k) => ({ sel: describe(k), rect: contentRect(k), height: Math.round(k.getBoundingClientRect().height) }))
    .filter((s) => s.rect);
  const sectionGaps = [];
  for (let i = 0; i < sections.length - 1; i++) {
    const g = Math.round(sections[i + 1].rect.t - sections[i].rect.b);
    if (g >= 0) sectionGaps.push({ between: `${sections[i].sel} → ${sections[i + 1].sel}`, gap: g });
  }

  // Headings: kickers above them, numbered labels, space above vs below.
  for (const h of document.querySelectorAll("h1, h2, h3")) {
    const hr = h.getBoundingClientRect();
    if (hr.height < 2 || isGraphic(h)) continue;
    const hs = parseFloat(getComputedStyle(h).fontSize);
    let prev = h.previousElementSibling;
    if (!prev && h.parentElement && h.parentElement.firstElementChild === h) prev = h.parentElement.previousElementSibling;
    if (prev && !isGraphic(prev) && !prev.querySelector("h1,h2,h3,h4,button,input,nav")) {
      const pr = prev.getBoundingClientRect();
      const txt = (prev.innerText || "").replace(/\s+/g, " ").trim();
      if (pr.height > 0 && txt.length >= 1 && txt.length <= 48 && hr.top - pr.bottom < 48) {
        const pcs = getComputedStyle(prev);
        const fs = parseFloat(pcs.fontSize);
        const ls = pcs.letterSpacing === "normal" ? 0 : parseFloat(pcs.letterSpacing) / fs;
        const upper = pcs.textTransform === "uppercase" || (txt === txt.toUpperCase() && /[A-Z]{2}/.test(txt));
        const pill = rgba(pcs.backgroundColor)[3] > 0 && (parseFloat(pcs.borderTopLeftRadius) || 0) >= 8;
        if (/^(0?\d{1,2})([.)]|\s*[\/·—–-]\s*\S.*)?$/.test(txt) && fs < hs * 0.7) tells.numbered.push(`"${txt}" above "${h.innerText.trim().slice(0, 30)}"`);
        else if (fs <= 15 && fs < hs * 0.6 && (upper || ls >= 0.05 || pill)) tells.kicker.push(`"${txt}" above "${h.innerText.trim().slice(0, 30)}"`);
      }
    }
    if (h.tagName !== "H1" && prev && h.nextElementSibling) {
      const pr = prev.getBoundingClientRect(), nr = h.nextElementSibling.getBoundingClientRect();
      const above = hr.top - pr.bottom, below = nr.top - hr.bottom;
      // Only when the block above is real content (not an icon, label or decoration that belongs to the heading).
      const prevIsContent = pr.height >= Math.max(hr.height, 32) && (prev.innerText || "").trim().length > 40;
      if (prevIsContent && nr.height > 0 && above >= 0 && below > 0 && above < 400) {
        tells.rhythm.measured++;
        if (above <= below) { tells.rhythm.crowded++; tells.rhythm.ex ||= `"${h.innerText.trim().slice(0, 40)}" (${Math.round(above)}px above, ${Math.round(below)}px below)`; }
      }
    }
  }
  // Dashboards and app UI (see ../dashboards.md)
  const dash = { tables: 0, rows: 0, sidebar: false, numLeft: [], numCells: 0, centered: 0, bareDelta: [], deltas: 0, placeholder: [], greeting: null };
  const NUM_RE = /^[−\-+]?\s?[$€£¥]?\s?\d[\d,.\s]*\s?(%|[kKmMbB]|ms|s|h|GB|MB)?$/;
  const cellsOf = (root) => [...root.querySelectorAll('td, [role="cell"], [role="gridcell"]')];
  for (const t of document.querySelectorAll('table, [role="grid"], [role="table"]')) {
    const tr = t.getBoundingClientRect();
    if (tr.width < 300 || isGraphic(t)) continue;
    const rows = t.querySelectorAll('tbody tr, [role="row"]').length;
    if (rows < 3) continue;
    dash.tables++; dash.rows += rows;
    for (const c of cellsOf(t)) {
      const txt = (c.innerText || "").trim();
      if (!txt || txt.length > 24) continue;
      const cs = getComputedStyle(c);
      if (NUM_RE.test(txt)) {
        dash.numCells++;
        const range = document.createRange(); range.selectNodeContents(c);
        const rr = range.getBoundingClientRect(), cr = c.getBoundingClientRect();
        const padL = parseFloat(cs.paddingLeft) || 0, padR = parseFloat(cs.paddingRight) || 0;
        const leftGap = rr.left - cr.left - padL, rightGap = cr.right - padR - rr.right;
        if (rr.width > 0 && rightGap > 12) dash.numLeft.push(`"${txt}"`);
      } else if (cs.textAlign === "center" && txt.length > 3) dash.centered++;
    }
  }
  for (const a of document.querySelectorAll('aside, nav, [data-sidebar], [role="navigation"]')) {
    const r = a.getBoundingClientRect();
    if (r.left <= 8 && r.width >= 160 && r.width <= 340 && r.height >= vh * 0.7 && a.querySelectorAll("a, button").length >= 5) { dash.sidebar = true; break; }
  }
  const DELTA_RE = /^[+−\-↑↓▲▼]\s?\d+(\.\d+)?\s?%$/;
  const BASE_RE = /\b(vs\.?|versus|from|since|last|previous|prior|than|over|this (week|month|quarter|year)|per|mom|yoy|wow|qoq|today|yesterday|week|month|quarter|year|days?)\b/i;
  for (const el of document.querySelectorAll("body *")) {
    if (el.children.length > 2) continue;
    const txt = (el.innerText || "").trim();
    if (!DELTA_RE.test(txt)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 2 || isGraphic(el)) continue;
    if (el.closest("td, [role='cell'], [role='gridcell']")) continue;
    dash.deltas++;
    let box = el.parentElement;
    for (let i = 0; i < 5 && box && box.parentElement && box.parentElement.getBoundingClientRect().width < 640; i++) box = box.parentElement;
    if (!BASE_RE.test((box?.innerText || "").replace(txt, ""))) dash.bareDelta.push(`"${txt}"`);
  }
  for (const el of document.querySelectorAll("body *")) {
    const cs = getComputedStyle(el);
    if (cs.borderTopStyle !== "dashed" && cs.borderLeftStyle !== "dashed") continue;
    const r = el.getBoundingClientRect();
    if (r.width * r.height < 30000 || (el.innerText || "").trim() || el.querySelector("img, svg, canvas, video, input, button, a")) continue;
    dash.placeholder.push(`\`${describe(el)}\` ${Math.round(r.width)}×${Math.round(r.height)}`);
  }
  const greet = [...document.querySelectorAll("h1, h2")].find((h) => /^(welcome back|good (morning|afternoon|evening)|hey|hi|hello)\b/i.test((h.innerText || "").trim()));
  if (greet) dash.greeting = greet.innerText.trim().slice(0, 50);

  // Browser details nobody draws
  const probeP = document.querySelector("p") || document.body;
  const pageBg = effectiveBg(document.querySelector("main") || document.body).bg;
  tells.details = {
    selection: getComputedStyle(probeP, "::selection").backgroundColor !== "rgba(0, 0, 0, 0)",
    accent: getComputedStyle(document.body).accentColor !== "auto",
    hasFormBits: !!document.querySelector('input[type="checkbox"], input[type="radio"], input[type="range"], progress'),
    scrollbar: getComputedStyle(document.documentElement).scrollbarColor !== "auto",
    dark: lumB(pageBg) < 0.12,
  };
  tells.pageBg = pageBg;

  // Copy
  const visibleText = document.body.innerText || "";
  const headings = [...document.querySelectorAll("h1, h2, h3")]
    .filter((h) => h.getBoundingClientRect().height > 0)
    .map((h) => ({ tag: h.tagName.toLowerCase(), text: h.innerText.replace(/\s+/g, " ").trim() }))
    .filter((h) => h.text);

  return {
    vw, vh,
    docHeight: document.documentElement.scrollHeight,
    overflowX: document.documentElement.scrollWidth > vw + 1 &&
      ![getComputedStyle(document.documentElement).overflowX, getComputedStyle(document.body).overflowX].some((o) => o === "hidden" || o === "clip"),
    text, spacing, radii, shadows, bgs, borders, gradients, transitions, animations,
    maxWidths, controls, images, sections: sections.map((s) => s.sel), sectionGaps,
    hiddenText, nested, tells, dash, headings, visibleText: visibleText.slice(0, 60000), graphicText, graphicRoots, textBlocks,
    title: document.title,
  };
}

// Minimal mobile pass
function collectMobile() {
  const vw = innerWidth;
  const h1 = document.querySelector("h1");
  let h1Lines = null;
  if (h1) {
    const cs = getComputedStyle(h1);
    const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    h1Lines = Math.round(h1.getBoundingClientRect().height / lh);
  }
  const small = [];
  const targets = [];
  for (const el of document.body.querySelectorAll("*")) {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) continue;
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden") continue;
    const tag = el.tagName.toLowerCase();
    const t = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("").trim();
    if (t.length > 30 && parseFloat(cs.fontSize) < 12) small.push(t.slice(0, 40));
    const inGraphic = el.closest('[aria-hidden="true"], [role="img"], [inert], [data-slopless-ignore], [data-taste-ignore]') ||
      (() => { for (let n = el; n && n !== document.body; n = n.parentElement) { const c = typeof n.className === "string" ? n.className : ""; if (/(^|[\s_-])(illustration|graphic|mockup|screenshot|preview|product-ui|app-frame|showcase)/i.test(c)) return true; } return false; })();
    if (!inGraphic && el.tabIndex >= 0 && !el.disabled && (tag === "button" || (tag === "a" && el.closest("nav, header")) || el.getAttribute("role") === "button") && r.height < 40 && r.width < 300) {
      targets.push({ label: (el.innerText || el.getAttribute("aria-label") || tag).trim().slice(0, 30), h: Math.round(r.height), w: Math.round(r.width) });
    }
  }
  return {
    vw,
    overflowX: document.documentElement.scrollWidth > vw + 1 &&
      ![getComputedStyle(document.documentElement).overflowX, getComputedStyle(document.body).overflowX].some((o) => o === "hidden" || o === "clip"),
    scrollWidth: document.documentElement.scrollWidth,
    h1Lines, small: small.slice(0, 5), targets: targets.slice(0, 8),
  };
}

// ---------------------------------------------------------------- run
const T0 = Date.now();
const debug = (m) => process.env.SLOPLESS_DEBUG && console.error(`[${((Date.now() - T0) / 1000).toFixed(1)}s] ${m}`);
const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
debug("launched");

const desk = await openPage(browser, url, { width: 1440, height: 900 });
debug("desktop loaded");
const uncover = await waitForUncover(desk.page); // let a preloader finish before measuring
await scrollThrough(desk.page);
debug("scrolled");
const D = await desk.page.evaluate(collect, ignoreArg);
debug("collected");

// Focus visibility: tab through the first few focusable elements.
const focus = [];
for (let i = 0; i < 6; i++) {
  await desk.page.keyboard.press("Tab");
  const f = await desk.page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const cs = getComputedStyle(el);
    const outline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0;
    const ring = cs.boxShadow !== "none";
    return { tag: el.tagName.toLowerCase(), label: (el.innerText || el.getAttribute("aria-label") || "").trim().slice(0, 30), visible: outline || ring };
  });
  if (f) focus.push(f);
}
debug("focus checked");
await desk.context.close();

const mob = await openPage(browser, url, { width: 390, height: 844 });
await scrollThrough(mob.page);
debug("mobile loaded");
const M = await mob.page.evaluate(collectMobile);
debug("mobile collected");
await mob.context.close();

let reducedLeft = null, reducedCover = null;
if (expressive) {
  const red = await openPage(browser, url, { width: 1440, height: 900, reducedMotion: "reduce" });
  reducedCover = await waitForUncover(red.page, 4000);
  await red.context.close();
}
if (D.animations.some((a) => a.iter === "infinite")) {
  const red = await openPage(browser, url, { width: 1440, height: 900, reducedMotion: "reduce" });
  reducedLeft = await red.page.evaluate(() =>
    [...document.querySelectorAll("*")].filter((el) => {
      const cs = getComputedStyle(el);
      return cs.animationName !== "none" && cs.animationIterationCount === "infinite" && parseFloat(cs.animationDuration) > 0.05;
    }).length
  );
  await red.context.close();
}
await browser.close();

if (asJson) {
  console.log(JSON.stringify({ url, desktop: D, mobile: M, focus, reducedLeft, uncover, reducedCover }, null, 2));
  process.exit(0);
}

// ---------------------------------------------------------------- analysis helpers
const findings = { layout: [], spacing: [], typography: [], motion: [], color: [], surfaces: [], imagery: [], copy: [], restraint: [], tells: [], dash: [], expr: [] };
const inv = { layout: [], spacing: [], typography: [], motion: [], color: [], surfaces: [], imagery: [], copy: [], restraint: [], tells: [], dash: [], expr: [] };
const fail = (s, id, msg) => findings[s].push(`**FAIL** ${id}: ${msg}`);
const warn = (s, id, msg) => findings[s].push(`WARN ${id}: ${msg}`);
const count = (arr, key = (x) => x) => {
  const m = new Map();
  for (const x of arr) { const k = key(x); m.set(k, (m.get(k) || 0) + 1); }
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};
const fmtCounts = (entries, n = 20, unit = "") => entries.slice(0, n).map(([k, c]) => `${k}${unit} ×${c}`).join(", ") + (entries.length > n ? `, … (+${entries.length - n})` : "");
const hex = ([r, g, b, a = 1]) => "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("") + (a < 1 ? ` @${Math.round(a * 100)}%` : "");
const blend = ([r, g, b, a], bg) => [r * a + bg[0] * (1 - a), g * a + bg[1] * (1 - a), b * a + bg[2] * (1 - a)];
const lum = ([r, g, b]) => {
  const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
const hsl = ([r, g, b]) => {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
};
// Values that make up `share` of all uses; the rest are one-offs.
const core = (entries, share = 0.9) => {
  const total = entries.reduce((n, [, c]) => n + c, 0);
  let acc = 0; const out = [];
  for (const e of entries) { if (acc >= total * share) break; out.push(e); acc += e[1]; }
  return out;
};
const median = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const ex = (r) => `\`${r.sel}\` "${r.sample}"`;

// ---------------------------------------------------------------- 3. Typography
const T = D.text.filter((t) => !t.hidden);
const sizes = count(T, (t) => Math.round(t.size * 2) / 2);
const weights = count(T, (t) => t.weight);
const families = count(T, (t) => t.family);
inv.typography.push(`Families: ${fmtCounts(families, 6)}`);
if (D.graphicText) inv.typography.push(`(${D.graphicText} text elements inside product mockups/graphics left out of these counts)`);
inv.typography.push(`Sizes (${sizes.length}): ${fmtCounts([...sizes].sort((a, b) => a[0] - b[0]), 30, "px")}`);
inv.typography.push(`Weights (${weights.length}): ${fmtCounts(weights)}`);
const styles = count(T, (t) => `${Math.round(t.size)}px / ${t.lh ?? "normal"} / ${t.ls}em / ${t.weight}`);
inv.typography.push(`Top text styles (size / line height / tracking / weight): ${fmtCounts(styles, 12)}`);

if (sizes.length > 12) fail("typography", "T3", `${sizes.length} distinct font sizes (max 12). Consolidate onto one scale.`);
if (weights.length > 4) fail("typography", "T4", `${weights.length} distinct weights (max 4): ${weights.map((w) => w[0]).join(", ")}`);
if (families.length > 3) warn("typography", "T-fam", `${families.length} font families: ${families.map((f) => f[0]).join(", ")}`);

const noTnum = [], noBalance = [];
const seen = new Set();
const once = (key) => (seen.has(key) ? false : (seen.add(key), true));
for (const t of T) {
  const lh = t.lh ?? 1.2;
  const display = /display|headline|title/i.test(t.family);
  if (t.size >= 40 && lh > 1.2 && once(`T1a${Math.round(t.size)}${lh}`))
    fail("typography", "T1", `${Math.round(t.size)}px text with line height ${t.lh ?? "normal"} (use 1.0–1.1): ${ex(t)}`);
  if (t.size >= 14 && t.size <= 20 && t.len > 80 && lh < 1.3 && once(`T1b${t.size}${lh}`))
    fail("typography", "T1", `Body text ${t.size}px with line height ${t.lh ?? "normal"} (min 1.35): ${ex(t)}`);
  if (t.size >= 14 && t.size <= 20 && t.len > 80 && lh > 1.8 && once(`T1c${t.size}${lh}`))
    warn("typography", "T1", `Body text ${t.size}px with line height ${t.lh} (max ~1.6): ${ex(t)}`);
  if (t.size >= 32 && t.ls >= 0 && !display && once(`T2a${Math.round(t.size)}${t.ls}`))
    fail("typography", "T2", `${Math.round(t.size)}px text with letter-spacing ${t.ls}em (use −0.02 to −0.03em unless the font is a display cut): ${ex(t)}`);
  if (t.upper && t.size <= 14 && t.ls <= 0 && t.len >= 3 && once(`T2b${t.size}`))
    fail("typography", "T2", `Uppercase ${t.size}px text with letter-spacing ${t.ls}em (use +0.04 to +0.1em): ${ex(t)}`);
  if (["p", "li", "dd", "blockquote"].includes(t.tag) && t.len > 120 && t.size >= 14) {
    const cpl = Math.round(t.width / (t.size * 0.5));
    if (cpl > 85 && once(`T5${Math.round(t.width)}`))
      fail("typography", "T5", `~${cpl} characters per line (max ~75): ${ex(t)}`);
  }
  if (t.ls < -0.04 && t.len >= 3 && once(`T2c${Math.round(t.size)}${t.ls}`))
    fail("typography", "T2", `Letter-spacing ${t.ls}em on ${Math.round(t.size)}px text is tighter than −0.04em: ${ex(t)}`);
  if (t.size < 11 && t.len > 25 && once(`T7${t.size}`))
    warn("typography", "T7", `${t.size}px text: ${ex(t)}`);
  if (t.size >= 24 && !["sup", "sub"].includes(t.tag) && /^[\s$€£¥+\-–~<>]*[\d][\d.,\s]*[%kKmMbBxX×+]*\s*$/.test(t.sample) && !t.tnum && t.sample.replace(/\D/g, "").length >= 2) noTnum.push(t);
  if (t.heading && t.size >= 28 && t.wrap && !/balance|pretty/.test(t.wrap)) noBalance.push(t);
}
if (noTnum.length) warn("typography", "T8", `${noTnum.length} numbers without tabular figures, e.g. ${noTnum.slice(0, 3).map((t) => `"${t.sample}"`).join(", ")}`);
if (noBalance.length) warn("typography", "T6", `${noBalance.length} large headings without text-wrap: balance, e.g. ${ex(noBalance[0])}`);
const bigHeavy = T.filter((t) => t.size >= 48 && t.weight >= 700);
if (bigHeavy.length && !expressive) warn("typography", "default", `Display text at weight ${bigHeavy[0].weight} (${Math.round(bigHeavy[0].size)}px). Fine for bold styles; needs a reason in the decisions file.`);

// ---------------------------------------------------------------- 2. Spacing
const spInt = D.spacing.map((s) => Math.round(s.v * 10) / 10);
const spEntries = count(spInt);
const integers = spEntries.filter(([v]) => Number.isInteger(v));
const fluid = spEntries.filter(([v]) => !Number.isInteger(v));
inv.spacing.push(`Spacing values (${integers.length} fixed${fluid.length ? `, ${fluid.length} fluid` : ""}): ${fmtCounts([...integers].sort((a, b) => a[0] - b[0]), 40, "px")}`);
let gaps = count(D.spacing.filter((s) => s.kind === "gap" && s.v <= 24), (s) => Math.round(s.v));
if (!gaps.length) gaps = count(D.spacing.filter((s) => s.v <= 24), (s) => Math.round(s.v));
const commonGap = gaps.length ? gaps[0][0] : null;
inv.spacing.push(`Most common in-component gap: ${commonGap ?? "n/a"}px (aim: 4–16px)`);
const spCore = core(integers);
inv.spacing.push(`Core spacing values (90% of uses): ${spCore.length} — ${[...spCore].map(([v]) => v).sort((a, b) => a - b).join(", ")}px`);
if (spCore.length > 16) fail("spacing", "S1", `${spCore.length} spacing values make up 90% of uses (max ~16). Snap to a 4px-based scale.`);
else if (integers.length > 40) warn("spacing", "S1", `${integers.length} distinct spacing values in total; ${integers.length - spCore.length} are one-offs. Snap them to the scale.`);
const odd = spCore.filter(([v]) => v % 2 === 1 && v > 1).map(([v]) => v);
if (odd.length) warn("spacing", "S1", `Odd values off the scale: ${odd.slice(0, 12).join(", ")}px`);
const tallGaps = D.sectionGaps.filter((g) => g.gap > D.vh * 1.2);
const sg = D.sectionGaps.filter((g) => g.gap <= D.vh * 1.2).map((g) => g.gap);
if (tallGaps.length) inv.spacing.push(`(${tallGaps.length} gap(s) over ${Math.round(D.vh * 1.2)}px left out: likely scroll-driven sections)`);
inv.spacing.push(`Whitespace between top-level sections (${sg.length}): ${sg.join(", ") || "n/a"}px (aim: 96–160px on desktop, similar to each other)`);
const medSec = median(sg);
if (medSec !== null && sg.length >= 2) {
  if (medSec < 64) fail("spacing", "S2", `Median space between sections is ${medSec}px on desktop (aim for 96–160px of whitespace).`);
  if (commonGap && medSec / commonGap < 4) warn("spacing", "S2", `Sections only ${(medSec / commonGap).toFixed(1)}× the common gap (${commonGap}px): spacing feels even. Aim for 8–16×.`);
  const spread = Math.max(...sg) - Math.min(...sg);
  if (sg.length >= 3 && spread > medSec) warn("spacing", "S2", `Section spacing is inconsistent (${Math.min(...sg)}–${Math.max(...sg)}px).`);
} else {
  inv.spacing.push("(Could not detect top-level sections; check rhythm on the screenshots.)");
}

// ---------------------------------------------------------------- 1. Layout
const mws = count(D.maxWidths);
inv.layout.push(`Container widths (max-width ≥ 320px): ${fmtCounts(mws, 8, "px")}`);
inv.layout.push(`Page height: ${D.docHeight}px at 1440px wide (${(D.docHeight / D.vh).toFixed(1)} screens). Sections detected: ${D.sections.length}`);
const frames = mws.filter(([v]) => v >= 900);
if (frames.length > 3) warn("layout", "L2", `${frames.length} different large container widths (${frames.map((f) => f[0]).join(", ")}px). Use one frame width.`);
if (D.overflowX) fail("layout", "L4", "Horizontal scrolling at 1440px.");
if (M.overflowX) fail("layout", "L4", `Horizontal scrolling on mobile (page is ${M.scrollWidth}px wide at 390px).`);
inv.layout.push(`Mobile: H1 wraps to ${M.h1Lines ?? "n/a"} lines`);
if (M.h1Lines && M.h1Lines > 5) warn("layout", "L4", `H1 wraps to ${M.h1Lines} lines on mobile (aim for 2–4). Reduce the mobile hero size or shorten it.`);
// Left edge: the most common left x among left-aligned blocks; flag blocks that start just left of it.
const blocks = D.textBlocks.filter((b) => !b.fixed && b.align !== "center" && b.align !== "right" && b.width < D.vw * 0.95 && b.sample.length >= 2);
const edges = count(blocks.filter((b) => b.left < D.vw * 0.35), (b) => b.left);
if (edges.length) {
  const edge = edges[0][0];
  inv.layout.push(`Main left edge: ${edge}px (${edges[0][1]} blocks start there)`);
  const off = blocks.filter((b) => b.left < edge - 2 && b.left > edge - 96 && b.left > 0);
  // Many blocks on the same other edge = a deliberate second container; a few = a mistake.
  for (const [left, n] of count(off, (b) => b.left)) {
    if (n >= 4) { inv.layout.push(`Second left edge: ${left}px (${n} blocks; a wider container, fine if deliberate)`); continue; }
    const b = off.find((x) => x.left === left);
    warn("layout", "L5", `\`${b.sel}\` "${b.sample}" starts at ${left}px, ${edge - left}px left of the main edge (${edge}px).`);
  }
}

// ---------------------------------------------------------------- 5. Color
const textColors = count(T, (t) => hex(t.color));
inv.color.push(`Text colors (${textColors.length}): ${fmtCounts(textColors, 12)}`);
const bgColors = count(D.bgs, (b) => hex(b.c));
inv.color.push(`Background colors (${bgColors.length}): ${fmtCounts(bgColors, 12)}`);
const borderColors = count(D.borders, (b) => hex(b.c));
inv.color.push(`Border colors (${borderColors.length}): ${fmtCounts(borderColors, 8)}`);
const tcCore = core(textColors.filter(([h]) => !h.endsWith("@0%")), 0.95);
if (tcCore.length > 8) fail("color", "C3", `${tcCore.length} text colors make up 95% of text (aim for 3–4 levels plus accent and on-accent).`);
else if (tcCore.length > 6) warn("color", "C3", `${tcCore.length} text colors make up 95% of text (aim for 3–4 levels plus accent and on-accent).`);
const black = T.filter((t) => t.color[0] + t.color[1] + t.color[2] === 0 && t.color[3] > 0.95);
if (black.length) fail("color", "C1", `Pure black text in ${black.length} elements, e.g. ${ex(black[0])}. Use a tinted ink.`);
const whiteOnDark = T.filter((t) => t.color.slice(0, 3).every((v) => v === 255) && lum(t.bg) < 0.05 && t.len > 60);
if (whiteOnDark.length) fail("color", "C1", `Pure white body text on dark background, e.g. ${ex(whiteOnDark[0])}. Use ~#f2f3f5–#f7f8f8.`);
const lowC = [];
for (const t of T) {
  if (t.bgUncertain) continue;
  const fg = blend(t.color, t.bg);
  const c = contrast(fg, t.bg);
  const large = t.size >= 24 || (t.size >= 18.6 && t.weight >= 700);
  if (c < (large ? 3 : 4.5) && t.len > 2) lowC.push({ t, c });
}
const pairs = new Map();
for (const x of lowC) {
  const k = `${hex(x.t.color)} on ${hex(x.t.bg)}`;
  if (!pairs.has(k)) pairs.set(k, { ...x, n: 0 });
  pairs.get(k).n++;
}
const pairList = [...pairs.values()].sort((a, b) => b.n - a.n);
for (const { t, c, n } of pairList.slice(0, 8)) {
  if (c < 1.3) warn("color", "C4", `Text ${hex(t.color)} on ${hex(t.bg)} (${c.toFixed(2)}:1) is probably over an image or video; check on the screenshot: ${ex(t)}`);
  else fail("color", "C4", `Contrast ${c.toFixed(2)}:1, ${hex(t.color)} on ${hex(t.bg)} (${n} element${n > 1 ? "s" : ""}, e.g. ${Math.round(t.size)}px ${ex(t)})`);
}
if (pairList.length > 8) findings.color.push(`…and ${pairList.length - 8} more low-contrast color pairs.`);
const uncertain = T.filter((t) => t.bgUncertain).length;
if (uncertain) inv.color.push(`${uncertain} text elements sit on images or gradients; check their contrast on the screenshots.`);
// saturated hues
const satColors = [...T.map((t) => t.color), ...D.bgs.filter((b) => b.area > 400).map((b) => b.c)]
  .filter((c) => c[3] > 0.3)
  .map((c) => hsl(c))
  .filter(([, s, l]) => s > 0.45 && l > 0.2 && l < 0.85);
const hueBuckets = count(satColors, ([h]) => Math.round(h / 30) % 12).map(([b, c]) => [`${b * 30}°`, c]);
inv.color.push(`Saturated hue families: ${fmtCounts(hueBuckets, 12) || "none"}`);
if (hueBuckets.length > 3) warn("color", "C5", `${hueBuckets.length} saturated hue families. Outside status colors, use one accent.`);
// near duplicates
const allHex = [...new Set([...textColors, ...bgColors].map(([h]) => h).filter((h) => !h.includes("@")))];
const toRgb = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const dupes = [];
for (let i = 0; i < allHex.length; i++)
  for (let j = i + 1; j < allHex.length; j++) {
    const a = toRgb(allHex[i]), b = toRgb(allHex[j]);
    const d = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
    if (d > 0 && d < 6) dupes.push(`${allHex[i]}≈${allHex[j]}`);
  }
if (dupes.length) warn("color", "C6", `Near-duplicate colors to merge: ${dupes.slice(0, 8).join(", ")}${dupes.length > 8 ? ", …" : ""}`);

// ---------------------------------------------------------------- 6. Surfaces
const rads = count(D.radii, (r) => r.v);
inv.surfaces.push(`Corner radii (${rads.length}): ${fmtCounts([...rads].sort((a, b) => (a[0] === "full" ? 1e9 : a[0]) - (b[0] === "full" ? 1e9 : b[0])), 15)}`);
const radCore = core(rads, 0.95);
if (radCore.length > 6) fail("surfaces", "R1", `${radCore.length} corner radii make up 95% of surfaces (max 6). Pick one corner character and scale.`);
else if (rads.length > 8) warn("surfaces", "R1", `${rads.length} distinct radii in total (${rads.length - radCore.length} one-offs). Snap them to the scale.`);
for (const n of D.nested.slice(0, 4))
  warn("surfaces", "R2", `\`${n.sel}\` radius ${n.outer}px holds a child with radius ${n.inner}px at ${n.inset}px inset (inner should be ~${Math.max(0, n.outer - n.inset)}px).`);
const shadowList = count(D.shadows, (s) => s.v);
inv.surfaces.push(`Shadows (${shadowList.length} distinct): ${shadowList.slice(0, 5).map(([v, c]) => `\`${v.slice(0, 90)}\` ×${c}`).join("; ") || "none"}`);
for (const [v] of shadowList) {
  const layers = v.split(/,(?![^(]*\))/);
  const m = v.match(/rgba?\(0,\s*0,\s*0(?:,\s*([\d.]+))?\)\s+[-\d.]+px\s+[-\d.]+px\s+([\d.]+)px/);
  if (layers.length === 1 && m && parseFloat(m[2]) >= 20) {
    warn("surfaces", "R3", `Single-layer black shadow \`${v.slice(0, 80)}\`. Use 2 layers, tinted, lower opacity.`);
    break;
  }
}
const ctrlHeights = count(D.controls.filter((c) => c.tag !== "input"), (c) => c.h);
inv.surfaces.push(`Button heights: ${fmtCounts(ctrlHeights, 10, "px")}`);
if (ctrlHeights.length > 5) warn("surfaces", "R4", `${ctrlHeights.length} different button heights. Use a set of 3–4 sizes.`);
if (focus.length) {
  const noRing = focus.filter((f) => !f.visible);
  inv.surfaces.push(`Focus check: ${focus.length - noRing.length}/${focus.length} tabbed elements show a visible ring`);
  if (noRing.length) fail("surfaces", "R5", `No visible focus state on ${noRing.map((f) => `<${f.tag}> "${f.label}"`).slice(0, 3).join(", ")}.`);
}

// ---------------------------------------------------------------- 4. Motion
const tr = D.transitions;
const trGroups = count(tr, (t) => `${t.prop.slice(0, 40)} ${t.dur}s ${t.ease.slice(0, 40)}`);
inv.motion.push(`Transitions (${tr.length} elements): ${fmtCounts(trGroups, 8)}`);
inv.motion.push(`Durations: ${fmtCounts(count(tr, (t) => t.dur), 10, "s")}`);
inv.motion.push(`Curves: ${fmtCounts(count(tr.flatMap((t) => t.ease.split(/,(?![^(]*\))/).map((e) => e.trim()))), 8)}`);
const anims = count(D.animations, (a) => `${a.name} ${a.dur}${a.iter === "infinite" ? " ∞" : ""}`);
inv.motion.push(`Animations: ${fmtCounts(anims, 10) || "none"}`);
const all = tr.filter((t) => /(^|,\s*)all(\s|,|$)/.test(t.prop));
if (all.length) fail("motion", "M3", `\`transition: all\` on ${all.length} elements, e.g. \`${all[0].sel}\`. Name the properties.`);
const lin = tr.filter((t) => /(^|,\s*)linear/.test(t.ease));
const linI = lin.filter((t) => t.interactive);
if (linI.length) fail("motion", "M2", `Linear easing on ${linI.length} buttons/links, e.g. \`${linI[0].sel}\`. Use an ease-out curve.`);
if (lin.length - linI.length > 0) warn("motion", "M2", `Linear easing on ${lin.length - linI.length} other transitions, e.g. \`${lin.find((t) => !t.interactive).sel}\`. Fine for continuous loops only.`);
const slow = tr.filter((t) => t.interactive && t.dur > 0.4);
if (slow.length) fail("motion", "M1", `${slow.length} buttons/links transition over ${slow[0].dur}s, e.g. \`${slow[0].sel}\` (feedback ≤ 0.3s).`);
const def = tr.filter((t) => t.ease.trim() === "ease");
if (def.length > tr.length / 2 && tr.length > 4) warn("motion", "M2", `Most transitions use the browser default \`ease\`. Pick a deliberate curve, e.g. cubic-bezier(.25, 1, .5, 1).`);
if (reducedLeft) warn("motion", "M4", `${reducedLeft} looping animations keep running with reduced motion on.`);
if (D.hiddenText.length) warn("motion", "M5", `${D.hiddenText.length} text elements still at opacity 0 after scrolling (stuck reveals?), e.g. \`${D.hiddenText[0].sel}\` "${D.hiddenText[0].sample}". Content should be visible at rest.`);
const reveals = new Set(D.animations.filter((a) => a.iter !== "infinite").map((a) => a.name));
if (reveals.size > 3) warn("motion", "M5", `${reveals.size} different entrance animations (${[...reveals].slice(0, 6).join(", ")}). Use one reveal style.`);

// ---------------------------------------------------------------- 7. Imagery
const imgs = D.images;
inv.imagery.push(`Images/media: ${imgs.length} (${imgs.filter((i) => i.w * i.h > D.vw * D.vh * 0.15).length} large)`);
const noAlt = imgs.filter((i) => i.alt === null && !i.graphic);
if (noAlt.length) fail("imagery", "I5", `${noAlt.length} images without an alt attribute, e.g. \`${noAlt[0].sel}\` ${noAlt[0].src}`);
const dist = imgs.filter((i) => i.distorted);
if (dist.length) fail("imagery", "I5", `${dist.length} stretched images, e.g. \`${dist[0].sel}\`. Use object-fit or the right aspect ratio.`);
const unsized = imgs.filter((i) => !i.sized && i.w > 100);
if (unsized.length) warn("imagery", "I5", `${unsized.length} images without width/height or aspect-ratio (layout shift).`);
const lowres = imgs.filter((i) => i.natW >= 64 && !i.srcset && !/^data:/.test(i.src || "") && i.w > 200 && i.natW < i.w * 1.5);
if (lowres.length) warn("imagery", "I5", `${lowres.length} images not sharp on 2× screens, e.g. ${lowres[0].src} (${lowres[0].natW}px file shown at ${lowres[0].w}px).`);
const placeholder = D.visibleText.match(/lorem ipsum|john doe|jane doe|\bacme\b|feature (one|two|three|\d)\b|\$1,234|your (company|logo) here/gi);
if (placeholder) fail("imagery", "I3", `Placeholder content: ${[...new Set(placeholder.map((p) => p.toLowerCase()))].join(", ")}`);

// ---------------------------------------------------------------- 8. Copy
const h1s = D.headings.filter((h) => h.tag === "h1");
inv.copy.push(`H1: ${h1s.map((h) => `"${h.text.slice(0, 100)}" (${h.text.split(/\s+/).length} words)`).join(" | ") || "none"}`);
inv.copy.push(`H2s: ${D.headings.filter((h) => h.tag === "h2").slice(0, 8).map((h) => `"${h.text.slice(0, 60)}"`).join(", ")}`);
const ctaLabels = count(D.controls.filter((c) => c.filled && c.label), (c) => c.label);
inv.copy.push(`Filled buttons: ${fmtCounts(ctaLabels, 10)}`);
if (!h1s.length) warn("copy", "W1", "No <h1> on the page.");
if (h1s.length > 1) warn("copy", "W1", `${h1s.length} <h1> elements.`);
for (const h of h1s) if (h.text.split(/\s+/).length > 12) warn("copy", "W1", `Headline has ${h.text.split(/\s+/).length} words (aim for 3–10).`);
const generic = ctaLabels.filter(([l]) => /^(submit|click here|learn more|read more|get started now|send)$/i.test(l));
if (generic.length) warn("copy", "W5", `Generic button labels: ${generic.map((g) => `"${g[0]}"`).join(", ")}. Say what happens.`);
const fillers = D.visibleText.match(/\b(seamless(ly)?|cutting[- ]edge|revolutioni[sz]e|unlock|empower|leverage|supercharge|game[- ]chang\w*|next[- ]gen(eration)?|world[- ]class|best[- ]in[- ]class|robust|synerg\w*|elevate|streamlin\w*|effortless(ly)?|enterprise[- ]grade|reimagin\w*|unleash\w*|state[- ]of[- ]the[- ]art)\b/gi);
if (fillers) warn("copy", "W7", `Filler words: ${fmtCounts(count(fillers.map((f) => f.toLowerCase())), 10)}`);
const small = new Set(["a", "an", "the", "and", "or", "for", "to", "of", "in", "on", "at", "by", "with", "your", "is"]);
const titleCase = D.headings.filter((h) => {
  const w = h.text.split(/\s+/).filter((x) => /^[A-Za-z]/.test(x) && !small.has(x.toLowerCase()));
  return w.length >= 3 && w.every((x) => /^[A-Z]/.test(x)) && h.text !== h.text.toUpperCase();
});
if (titleCase.length >= 2) warn("copy", "W6", `${titleCase.length} headings in Title Case, e.g. "${titleCase[0].text.slice(0, 60)}". Use sentence case.`);
const emoji = D.headings.filter((h) => /\p{Extended_Pictographic}/u.test(h.text));
if (emoji.length) warn("copy", "W-emoji", `Emoji in headings: "${emoji[0].text.slice(0, 50)}"`);

// ---------------------------------------------------------------- Restraint (first screen)
const fold = D.vh;
const loud = [];
const dispBlocks = new Map();
const h1Block = (T.find((t) => t.tag === "h1" || /^h1/.test(t.block)) || {}).block;
for (const t of T) if (t.top < fold && t.size >= 56 && t.block !== h1Block && !/^h1/.test(t.block) && !dispBlocks.has(t.block)) dispBlocks.set(t.block, t);
for (const t of dispBlocks.values()) loud.push(`display text ${Math.round(t.size)}px "${t.sample.slice(0, 30)}"`);
for (const b of D.bgs) {
  const [, s, l] = hsl(b.c);
  if (b.top < fold && s > 0.45 && l > 0.15 && l < 0.85 && b.area > D.vw * D.vh * 0.05) loud.push(`saturated area ${hex(b.c)} \`${b.sel}\``);
}
for (const g of D.gradients) if (g.top < fold && g.area > D.vw * D.vh * 0.1 && g.sat > 0.3) loud.push(`large saturated gradient \`${g.sel}\``);
for (const i of imgs) if (!i.graphic && i.top < fold && i.w * i.h > D.vw * D.vh * 0.25) loud.push(`large media \`${i.sel}\``);
for (const g of D.graphicRoots) if (g.top < fold && g.area > D.vw * D.vh * 0.12) loud.push(`product visual / graphic \`${g.sel}\``);
const loopsAbove = D.animations.filter((a) => a.iter === "infinite" && a.top < fold);
if (loopsAbove.length) loud.push(`${loopsAbove.length} looping animation(s)`);
const uniqLoud = [...new Set(loud)];
inv.restraint.push(`Loud elements in the first screen besides the H1 (${uniqLoud.length}): ${uniqLoud.slice(0, 8).join("; ") || "none"}`);
if (expressive) inv.restraint.push("Expressive page: the loud-move budget is replaced by the premise and swap test (expressive.md).");
else if (uniqLoud.length > 2) warn("restraint", "budget", `${uniqLoud.length} loud elements compete with the headline in the first screen (aim for 1).`);
const ctasAbove = D.controls.filter((c) => c.filled && c.top < fold && c.tag !== "input");
const ctaColors = new Set(ctasAbove.map((c) => hex(c.bg)));
inv.restraint.push(`Filled buttons in the first screen: ${ctasAbove.length} (${ctaColors.size} colors)`);
if (ctasAbove.length > 3) warn("restraint", "CTA", `${ctasAbove.length} filled buttons in the first screen (aim for 1 primary, 1 secondary).`);
const loops = D.animations.filter((a) => a.iter === "infinite");
if (new Set(loops.map((a) => a.name)).size > 2) warn("restraint", "motion", `${new Set(loops.map((a) => a.name)).size} different looping animations on the page.`);

// ---------------------------------------------------------------- AI tells (../ai-tells.md)
{
  const X = D.tells;
  const UNLOCKED = new Set(["eyebrow", "numbered", "marquee", "oversized-h1", "mono-costume", "bg-pattern"]);
  const unlocked = [];
  const tell = (id, msg) => (expressive && UNLOCKED.has(id) ? unlocked.push(id) : warn("tells", id, msg));
  const list = (a, n = 3) => [...new Set(a)].slice(0, n).join(", ");
  // Structure
  if (X.kicker.length) tell("eyebrow", `${X.kicker.length} eyebrow/kicker label(s) above headings, e.g. ${list(X.kicker, 2)}. Delete them; the heading carries its own weight.`);
  if (X.numbered.length >= 2) tell("numbered", `${X.numbered.length} numbered section labels, e.g. ${list(X.numbered, 2)}. Remove unless the order is real information.`);
  if (X.iconTile.length >= 3) tell("icon-tile", `${X.iconTile.length} rounded icon tiles stacked above card headings (the default AI feature card). Icon inline, or show the feature.`);
  if (X.nestedCards.length) tell("nested-cards", `${X.nestedCards.length} card(s) inside cards, e.g. ${list(X.nestedCards, 2)}. Flatten.`);
  if (X.glyph.length >= 3) tell("glyph-icons", `${X.glyph.length} emoji/Unicode glyphs used like icons (${list(X.glyph, 6)}). Use one real icon set.`);
  // Surfaces and color
  if (X.gradText.length) tell("gradient-text", `Gradient text on ${list(X.gradText, 2)}. Use a solid color.`);
  if (X.stripe.length) tell("side-stripe", `Colored side-stripe borders on ${X.stripe.length} element(s), e.g. ${list(X.stripe, 2)}. Remove.`);
  if (X.glow.length) tell("glow", `Colored glow shadows on ${X.glow.length} element(s), e.g. ${list(X.glow, 2)}. Neutral elevation or tone steps instead.`);
  if (X.hardShadow.length) tell("hard-shadow", `Hard offset shadows on ${X.hardShadow.length} element(s), e.g. ${list(X.hardShadow, 2)}. Fine only for a chosen brutalist style.`);
  if (X.ghost.length >= 3) tell("ghost-card", `${X.ghost.length} elements wear a hairline border AND a wide soft shadow. Pick one.`);
  if (X.halo.length) tell("halo", `Saturated radial-gradient glow behind ${list(X.halo, 2)}. Use a solid or subtly stepped ground.`);
  if (X.purple.length) tell("purple-gradient", `Purple/violet gradient on ${list(X.purple, 2)}: the default SaaS look. Only if it's the brand.`);
  if (X.pattern.length) tell("bg-pattern", `Decorative background pattern on ${list(X.pattern, 2)}. Plain surface unless it's a real canvas or map.`);
  const [ph, ps, pl] = hsl(X.pageBg);
  if (ph >= 25 && ph <= 60 && ps >= 0.25 && pl >= 0.84 && pl <= 0.97) tell("cream", `Page background ${hex(X.pageBg)} is cream/beige, the default "tasteful" AI ground. Keep it only with a reason from the subject.`);
  if (X.details.dark) {
    const neon = [...T.map((t) => t.color), ...D.bgs.filter((b) => b.area > 400).map((b) => b.c)]
      .map((c) => hsl(c)).filter(([h, s, l]) => s > 0.6 && l > 0.45 && ((h >= 165 && h <= 200) || (h >= 70 && h <= 110) || (h >= 255 && h <= 300)));
    if (neon.length >= 3) tell("dark-neon", `Near-black page with a neon cyan/lime/violet accent: the default "dev tool" look. Decide from the use scene and the brand.`);
  }
  // Type
  const big = [...T].sort((a, b) => b.size - a.size);
  const disp = T.find((t) => t.tag === "h1") || big[0];
  const REFLEX = /^(inter|inter display|roboto|geist|fraunces|playfair( display)?|cormorant( garamond)?|lora|crimson( pro| text)?|newsreader|syne|space grotesk|space mono|ibm plex( sans| serif| mono)?|dm sans|dm serif( display| text)?|outfit|plus jakarta sans|instrument (sans|serif))$/i;
  if (disp && REFLEX.test(disp.family)) tell("reflex-font", `Display face is ${disp.family}, one of the reflex fonts in ai-tells.md. Fine for app UI; on a pitch page it needs a reason.`);
  const italicDisp = T.find((t) => t.size >= 40 && t.italic && t.len >= 3);
  if (italicDisp) tell("italic-display", `Italic display text at ${Math.round(italicDisp.size)}px (${italicDisp.family}): the AI-startup hero. Set roman unless the brief is editorial: ${ex(italicDisp)}`);
  const body = count(T.filter((t) => ["p", "li"].includes(t.tag) && t.len > 60 && !t.footer), (t) => Math.round(t.size))[0]?.[0];
  if (body && disp) {
    const h2s = T.filter((t) => t.tag === "h2" && t.len >= 8).map((t) => t.size);
    const h2 = h2s.length >= 2 ? Math.round(Math.max(...h2s)) : null;
    if (disp.size / body < 1.8) tell("flat-hierarchy", `Largest heading ${Math.round(disp.size)}px is only ${(disp.size / body).toFixed(2)}× the ${body}px body. Make the steps visible.`);
    else if (h2 && h2 / body < 1.25) tell("flat-hierarchy", `H2s (${h2}px) are only ${(h2 / body).toFixed(2)}× the ${body}px body (aim ≥ 1.25×).`);
  }
  const h1t = T.find((t) => t.tag === "h1");
  if (h1t && h1t.size >= 72 && (D.headings.find((h) => h.tag === "h1")?.text.split(/\s+/).length || 0) > 8) tell("oversized-h1", `A ${D.headings.find((h) => h.tag === "h1").text.split(/\s+/).length}-word headline at ${Math.round(h1t.size)}px fills the first screen. Shorten it or set it smaller.`);
  const monoText = T.filter((t) => /mono|courier|consolas|menlo/i.test(t.family) && !["code", "pre", "kbd", "samp"].includes(t.tag) && !/\d/.test(t.sample));
  if (monoText.length >= 8) tell("mono-costume", `${monoText.length} non-code text elements set in a monospace face. Mono is for code, data and measurements.`);
  if (X.rhythm.measured >= 3 && X.rhythm.crowded / X.rhythm.measured >= 0.5) tell("heading-rhythm", `${X.rhythm.crowded}/${X.rhythm.measured} headings sit as close or closer to the block above as to their own content, e.g. ${X.rhythm.ex}. More space above a heading than below.`);
  // Motion
  const inf = D.animations.filter((a) => a.iter === "infinite");
  const pulse = inf.filter((a) => a.w <= 20 && a.h <= 20 && a.w >= 4);
  if (pulse.length) tell("pulsing-dot", `${pulse.length} small looping element(s) (pulsing "live" dots?), e.g. \`${pulse[0].sel}\`. Only on data that is really live.`);
  const cursor = inf.filter((a) => (a.w <= 6 && a.h >= 10) || /^[|▍▌█_]$/.test(a.text));
  if (cursor.length) tell("blinking-cursor", `Looping cursor-like element \`${cursor[0].sel}\`. A fake typing cursor is a tell; remove it.`);
  const marquee = inf.filter((a) => /marquee|ticker|scroll|slide|loop/i.test(a.name) || a.w > D.vw * 1.2);
  if (marquee.length) tell("marquee", `Auto-scrolling marquee \`${marquee[0].sel}\`. A static row, unless it's the page's one loud move.`);
  const bouncy = [...tr.map((t) => t.ease), ...D.animations.map((a) => a.ease || "")].flatMap((e) => e.match(/cubic-bezier\([^)]*\)/g) || [])
    .filter((cb) => { const v = cb.match(/-?[\d.]+/g).map(Number); return v[1] < -0.2 || v[1] > 1.2 || v[3] < -0.2 || v[3] > 1.2; });
  if (bouncy.length) tell("bounce", `Overshooting/bouncy curve ${bouncy[0]} on ${bouncy.length} transition(s). Fine for playful styles; otherwise ease-out.`);
  const revealT = tr.filter((t) => !t.interactive && ((/opacity/.test(t.prop) && /transform|translate/.test(t.prop)) || /(^|,\s*)all/.test(t.prop)) && t.dur >= 0.5);
  const revealTops = new Set(revealT.map((t) => Math.floor(t.top / D.vh)));
  const reveal = revealTops.size >= 4 ? revealT : [];
  const enter = count(D.animations.filter((a) => a.iter !== "infinite"), (a) => a.name).filter(([, n]) => n >= 4);
  if (reveal.length >= 5 || enter.length) tell("same-reveal", `${enter.length ? `Entrance animation "${enter[0][0]}" runs on ${enter[0][1]} elements` : `${reveal.length} non-interactive elements carry slow opacity/transform transitions`}: likely the same fade-up on every section. Content visible at rest; spend motion on one moment.`);
  // Copy
  const txt = D.visibleText;
  const dashes = (txt.match(/—|\s--\s/g) || []).length;
  if (dashes >= 8 && dashes / (txt.length / 500) >= 0.8) tell("em-dash", `${dashes} em dashes (~${(dashes / (txt.length / 500)).toFixed(1)} per 500 characters). Use commas, periods and colons.`);
  const apho = [
    ...(txt.match(/\bNot (just )?(a |an |the )?[\w'-]+( [\w'-]+)?[.,] (A|An|The|It's|Just)\b[^.\n]{0,40}\./g) || []),
    ...(txt.match(/(^|\n|\. )(No|Zero) [\w' -]{2,30}\. (Just|Only) [^.\n]{2,40}\./g) || []),
  ];
  if (apho.length >= 3) tell("cadence", `${apho.length} manufactured-contrast lines, e.g. "${apho[0].trim().slice(0, 60)}". Once is voice; a pattern is a tell.`);
  const theater = txt.match(/\b\w+ theat(er|re)\b/gi);
  if (theater) tell("theater", `"${theater[0]}": say plainly what it does or doesn't do.`);
  // Details
  const miss = [];
  if (!X.details.selection) miss.push("::selection");
  if (X.details.hasFormBits && !X.details.accent) miss.push("accent-color");
  if (X.details.dark && !X.details.scrollbar) miss.push("scrollbar-color");
  if (miss.length) tell("details", `Browser defaults left unthemed: ${miss.join(", ")}. Theme them from the palette.`);
  if (unlocked.length) inv.tells.push(`Unlocked on expressive pages, check each meets its condition in expressive.md: ${unlocked.join(", ")}.`);
  inv.tells.push(`${findings.tells.length} tell(s) found. Each one gets fixed or a reason under "AI tells kept on purpose" in the decisions file.`);
}

// ---------------------------------------------------------------- Dashboards (../dashboards.md)
{
  const X = D.dash;
  const isTool = X.tables > 0 || X.sidebar;
  if (!isTool) inv.dash.push("No data table or app sidebar found, so this doesn't look like a tool page. Skipped.");
  else {
    inv.dash.push(`Tool-page signals: ${X.tables} table(s) with ${X.rows} rows, sidebar ${X.sidebar ? "yes" : "no"}. Numeric cells: ${X.numCells}. Change figures (±%): ${X.deltas}.`);
    const d = (id, msg) => warn("dash", id, msg);
    const btnH = count(D.controls.filter((c) => c.tag !== "input" && !c.toggle && c.h >= 20), (c) => c.h);
    if (btnH.length > 4) d("D2", `${btnH.length} different button heights (${fmtCounts(btnH, 6, "px")}). Tool pages use one ladder of at most 4: 24 / 32 / 36 / 40px.`);
    if (X.numLeft.length >= 3) d("D4", `${X.numLeft.length} numeric table cells are left-aligned or centered, e.g. ${[...new Set(X.numLeft)].slice(0, 3).join(", ")}. Right-align numbers and their headers.`);
    if (X.bareDelta.length) d("D4", `${X.bareDelta.length} change figure(s) with no baseline nearby, e.g. ${[...new Set(X.bareDelta)].slice(0, 3).join(", ")}. Say what it's compared to ("vs last month").`);
    if (X.centered >= 6) d("table", `${X.centered} text cells are centered. Text left, numbers right.`);
    if (X.placeholder.length) d("placeholder", `${X.placeholder.length} empty dashed panel(s), e.g. ${X.placeholder.slice(0, 2).join(", ")}. Build the view or remove it.`);
    if (X.greeting) d("greeting", `Greeting header "${X.greeting}". Use the page title and what needs attention.`);
    const bigBody = count(T.filter((t) => ["p", "li", "td", "span", "a"].includes(t.tag) && t.len > 10 && !t.footer), (t) => Math.round(t.size))[0]?.[0];
    if (bigBody && bigBody > 15) d("density", `Most common UI text is ${bigBody}px. Tool pages run at 13–14px.`);
    if (!findings.dash.length) inv.dash.push("No dashboard problems found. Still screenshot every state (dashboards.md, \"Reviewing a tool page\").");
  }
}

// ---------------------------------------------------------------- Expressive (../expressive.md)
if (!expressive) inv.expr.push("Not run. Add --expressive for portfolio, studio and campaign pages.");
else {
  const e = (id, msg) => warn("expr", id, msg);
  inv.expr.push(uncover.had ? `Preloader/intro overlay: content showed after ${uncover.ms == null ? "more than 10s" : (uncover.ms / 1000).toFixed(1) + "s"}.` : "No preloader overlay found: the intro shows straight away.");
  if (uncover.had && (uncover.ms == null || uncover.ms > 2500)) fail("expr", "E2", `The preloader hides the page for ${uncover.ms == null ? "over 10" : (uncover.ms / 1000).toFixed(1)}s (max 2.5s).`);
  if (reducedCover?.had) fail("expr", "E4", `The preloader still runs with reduced motion on${reducedCover.ms ? ` (${(reducedCover.ms / 1000).toFixed(1)}s)` : ""}. Skip it and show final states.`);
  if (reducedLeft) fail("expr", "E4", `${reducedLeft} looping animation(s) keep running with reduced motion on.`);
  const maxSize = Math.max(0, ...T.map((t) => t.size));
  inv.expr.push(`Largest type: ${Math.round(maxSize)}px (${(maxSize / D.vw * 100).toFixed(1)}vw).`);
  if (maxSize < D.vw * 0.06) e("scale", `Largest type is ${Math.round(maxSize)}px (${(maxSize / D.vw * 100).toFixed(1)}vw). Expressive statements run 8–12vw.`);
  const upperBody = T.filter((t) => t.upper && t.len > 120 && t.size < 32);
  if (upperBody.length) e("E6", `${upperBody.length} uppercase paragraph(s), e.g. "${upperBody[0].sample.slice(0, 40)}". Uppercase is for display lines and short labels.`);
  const dimBody = T.filter((t) => t.len > 60 && !t.bgUncertain && t.color[3] < 0.45 && t.size < 24);
  if (dimBody.length) e("E6", `${dimBody.length} text block(s) dimmed below 45% opacity at rest, e.g. "${dimBody[0].sample.slice(0, 40)}". Dim items keep ≥ 3:1.`);
  if (M.overflowX) e("E7", "Display type or a track runs wider than the 390px screen. Re-set it for mobile.");
  if (!D.animations.length && !D.transitions.length) inv.expr.push("No CSS animations or transitions found. Motion may run from JavaScript; judge it from the recording.");
  inv.expr.push("Not checked automatically: the premise and swap test, choreography quality (record it), scroll behavior, keyboard order through the work.");
}

// ---------------------------------------------------------------- report
const order = [["layout", "1. Layout"], ["spacing", "2. Spacing"], ["typography", "3. Typography"], ["motion", "4. Motion"], ["color", "5. Color"], ["surfaces", "6. Surfaces"], ["imagery", "7. Imagery"], ["copy", "8. Copy"], ["restraint", "Restraint"], ["tells", "AI tells (see ai-tells.md)"], ["dash", "Dashboards (see dashboards.md)"], ["expr", "Expressive (see expressive.md)"]];
const nFail = Object.values(findings).flat().filter((f) => f.startsWith("**FAIL")).length;
const nWarn = Object.values(findings).flat().filter((f) => f.startsWith("WARN")).length;
let out = `# Design audit: ${D.title || url}\n\n${url}\nDesktop 1440×900, mobile 390×844. **${nFail} FAIL, ${nWarn} WARN.**\n\n`;
out += "| Setting | FAIL | WARN |\n|---|---|---|\n";
for (const [k, name] of order) {
  out += `| ${name} | ${findings[k].filter((f) => f.startsWith("**FAIL")).length} | ${findings[k].filter((f) => f.startsWith("WARN")).length} |\n`;
}
for (const [k, name] of order) {
  out += `\n## ${name}\n`;
  for (const l of inv[k]) out += `- ${l}\n`;
  if (findings[k].length) {
    out += "\n";
    for (const f of findings[k]) out += `- ${f}\n`;
  }
}
if (M.small.length) out += `\nMobile: text under 12px: ${M.small.map((s) => `"${s}"`).join(", ")}\n`;
if (M.targets.length) out += `Mobile: small tap targets (<40px tall): ${M.targets.map((t) => `"${t.label}" ${t.w}×${t.h}`).join(", ")}\n`;
out += `\nNot checked automatically: the category test, reading order, coherence, fit, image quality, hover/empty/error states (edges are only partly checked). Check them on the screenshots (see review.md).\n`;
console.log(out);
