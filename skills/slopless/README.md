# Slopless

An agent skill that designs like a designer. It works out who the page is for, invents a style that fits, builds from exact values, then screenshots and audits the result and fixes what it finds. It works for new sites and for improving existing ones.

Its main job is keeping AI-made pages from looking AI-made: it knows the looks and patterns models fall back on, and the audit flags them automatically.

## What it covers

- **Four kinds of page, plus one loud mode:**
  - **Pitch:** landing, marketing, pricing.
  - **Tool:** dashboards, admin, settings.
  - **Reading:** docs, articles, help.
  - **Showcase:** a quiet portfolio.
  - **Expressive:** creative portfolios, studios and campaigns, with giant type and full motion.
- **8 settings with exact values:** layout, spacing, typography, motion, color, surfaces, imagery and copy.
- **3 principles:** fit, coherence and restraint.
- **A catalog of AI tells:** the patterns that make a page look generated, and what to do instead.
- **Dashboards and app UI:** a full system (roles, radius, control sizes), the app shell, tables, charts, forms, overlays and every state.

## Setup

The screenshot and audit tools need Playwright (once):

```bash
cd scripts && npm install && npx playwright install chromium
```

Without them the skill still works, and reviews the code by reading it instead.

## Use

Ask your agent for a design, for example:
- "Build a landing page for…"
- "Make this dashboard look better"
- "Design my portfolio, go all out"

The skill starts automatically.

You can also run the tools on any page yourself:

```bash
node scripts/screenshot.mjs https://example.com shots/
node scripts/audit.mjs https://example.com > audit.md
node scripts/audit.mjs https://example.com --expressive > audit.md   # portfolios and creative sites
```

## What's inside

| Path | What it holds |
|---|---|
| `SKILL.md` | The workflow for creating and improving a page |
| `principles/` | Fit, coherence and restraint |
| `settings/` | One file per setting: layout, spacing, typography, motion, color, surfaces, imagery, copy |
| `ai-tells.md` | The patterns that make a page look AI-generated, and what to do instead |
| `dashboards.md` | Dashboards and app UI: the system, the shell, the standard parts, every state |
| `expressive.md` | Expressive, design-heavy pages: premise, giant type, motion choreography, and the floors that still hold |
| `benchmarks/` | Three high-quality styles, worked out in exact values |
| `review.md` | The final check |
| `assets/` | Decisions template and values file template |
| `scripts/` | Screenshots and audit (Playwright) |
