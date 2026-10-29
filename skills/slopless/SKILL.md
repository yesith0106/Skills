---
name: slopless
description: Design or redesign websites, landing pages and app UI with a designer's judgment. Frames the audience, invents a style that fits, sets exact values for layout, spacing, typography, motion, color, surfaces, imagery and copy, then screenshots and audits the result and fixes it. Use whenever the user wants to create a new site, page or interface, or improve, polish, redesign, modernize or fix the look of an existing one, including vague asks like "make it look better", "make it look professional" or "this looks off".
---

# Slopless

Design like a designer: decide what the page must prove, invent a style that fits, build it from exact values, then look at the result and fix it.

**Style is open, quality is fixed.** Every project gets its own style. Every style is held to the same floor rules: exact type, spacing and color relationships that great sites share regardless of their look.

## The model

Every design decision belongs to one of **8 settings**:
1. Layout
2. Spacing
3. Typography
4. Motion
5. Color
6. Surfaces
7. Imagery
8. Copy

A design has taste when it passes **3 principles** and shows none of the AI tells (`ai-tells.md`) without a reason:
- **Fit:** every choice suits the audience and what they must believe.
- **Coherence:** all 8 settings tell the same story.
- **Restraint:** one or two loud moves. Everything else is quiet. (Expressive pages trade this for one premise expressed loudly, see `expressive.md`.)

## Files: open only what the current step needs

| File | Open when |
|---|---|
| `principles/fit.md` | Starting any create or improve job |
| `principles/coherence.md` | Choosing the style (feeling words → settings) |
| `principles/restraint.md` | Choosing the loud moves; fixing a busy page |
| `settings/<setting>.md` | Setting or fixing that setting. Each file has: Floor, Defaults, Range, AI tells, Benchmarks |
| `benchmarks/*.md` | Calibrating quality: three complete, coherent styles worked out in exact values |
| `ai-tells.md` | Choosing the style, diagnosing, and every review: the patterns that make a page look generated |
| `expressive.md` | Expressive pages (creative portfolios, studios, campaigns, "go all out"): the premise, giant type, motion choreography, what unlocks, what still holds |
| `dashboards.md` | Any tool page (dashboard, admin, settings, internal tool): the app system, the standard parts, every state, and dashboard tells |
| `review.md` | After every build or change |
| `assets/decisions-template.md` | Writing the decisions file |
| `assets/tokens.css` | Writing the values file |
| `scripts/audit.mjs` | Measuring a page: every value it uses, grouped by setting, plus floor-rule breaks, AI tells and (on tool pages) dashboard checks |
| `scripts/screenshot.mjs` | Seeing a page at desktop and mobile widths |

**Floor** rules are never broken. **Defaults** may be broken on purpose, but every break needs a one-line reason in the decisions file. A break without a reason is a mistake.

## Setup (once per machine)

The scripts need Playwright:
```bash
cd <this skill folder>/scripts && npm install && npx playwright install chromium
```
If this can't be installed, do the review by reading the code against the setting files and say that screenshots were skipped.

## Pick the mode

- **Create:** there is no design yet, or the user wants a new one.
- **Improve:** a site or UI exists and should look better.
- **Small fix:** one component or one detail (e.g. "fix this button", "the hero looks off"). Open the relevant setting file, apply its floor rules and AI tells within the existing style, screenshot, and finish. No decisions file.

---

## Create mode

1. **Fit** (`principles/fit.md`). Work out the story from the brief:
   - The audience.
   - What they must believe.
   - What proves it.
   - What content exists.

   Infer what you can. Ask at most 2–3 questions, and only about things that would change the design.
2. **Coherence** (`principles/coherence.md`).
   - Choose 3 feeling words.
   - Skim the one benchmark closest to those words, to see a complete style worked out in exact values. Borrow the method, not the look.
   - For an expressive page (creative portfolio, studio, agency, campaign, or any "make it bold / award-level / animated" brief), open `expressive.md` first: write the premise and run the swap test before picking any effect.
   - For a tool page (dashboard, admin, settings), open `dashboards.md` first: its system (roles, radius, control ladder, shell) is the frame, and the feeling words tune it.
   - Go through the 8 setting files in order and choose values that express those words.
   - Start from each file's Defaults, and use its Range to move away from them.
   - Run the category test in `ai-tells.md`: if someone could guess this look from the category alone, rework it. Treat your first palette and font instinct as already spent.
3. **Restraint** (`principles/restraint.md`). Choose the 1–2 loud moves and make everything else quiet. On expressive pages, choose the 3–4 moves the premise explains instead (`expressive.md`).
4. **Decisions file.** Fill in `assets/decisions-template.md` as `design-decisions.md` in the project.
   - For a big or ambiguous brief, show it to the user and wait for their go-ahead.
   - For a clear, small brief, continue straight away and mention that the file exists.
5. **Values file.** Copy `assets/tokens.css` into the project and fill it from the decisions file.
   - If the project uses Tailwind, put the same values in the Tailwind theme instead.
   - Every size, space, color, radius, shadow, duration and curve used in the build must come from this file.
6. **Build.**
   - Use real, specific content: no lorem ipsum and no "Feature 1".
   - If something real is missing (quotes, logos, photos), write a believable stand-in, mark it with `data-placeholder` in the markup, and list it in the final report.
   - Show the actual product where one exists. Recreating a product UI as simple boxes is weaker than the real thing.
   - Build every state, not only the resting screen: hover, focus, disabled, loading, error and empty. On tool pages also filtered-empty, many rows and long values (`dashboards.md`).
   - Dashboards run on data: realistic demo data with noise, long values and totals that agree.
   - Theme the details models skip: text selection, caret, scrollbars, focus rings, underlines (`ai-tells.md`).
7. **Review** (`review.md`).
   - Run the screenshot and audit scripts.
   - Check every setting and every principle.
   - Fix the problems and repeat, 2–3 rounds or until review.md passes.

## Improve mode

1. **Capture.** Get the site running (dev server or live URL), then run:
   ```bash
   node scripts/screenshot.mjs <url> <out-dir>
   node scripts/audit.mjs <url> > <out-dir>/audit-before.md
   ```
   Look at the screenshots before reading the code.
2. **Fit** (`principles/fit.md`). Work out the story. Does the current look suit the audience?
3. **Lock the brand.** List what must not change: logo, brand colors, fonts, and anything the user names. Build the new values around them, e.g. derive tinted neutrals from the brand color instead of replacing it.
4. **Diagnose.** Use the audit and the screenshots. Rank problems by impact:
   1. **System:** too many values, no scale (spacing, typography, color).
   2. **Restraint:** too many loud elements competing.
   3. **Coherence:** settings that contradict each other.
   4. **Craft:** floor-rule breaks and AI tells (`ai-tells.md` and the audit's AI tells section; `dashboards.md` and the audit's Dashboards section for tool pages).
5. **Fix in order of risk.**
   1. **Values (do it):** build a values file and snap every existing size, space and color to the nearest step. This is the biggest gain at the lowest risk.
   2. **Components (do it):** surfaces, buttons, cards, nav, forms, motion.
   3. **Layout, imagery, copy (propose only):** describe the change and why, and apply it only after the user agrees.
6. **Prove it.**
   - Re-run the screenshots and the audit.
   - Show before and after screenshots side by side.
   - Report the numbers per setting, e.g. "Typography: 23 font sizes → 9. Spacing: 41 values → 12. Floor breaks: 14 → 0."

Edit in the stack that is already there: CSS variables, Tailwind config, CSS-in-JS or component props. Don't introduce a new styling system.

---

## Hard rules

- **The brief wins.** A look the user or brand asks for beats every tell list. The lists bind choices nobody made.
- **Never copy a benchmark's look.** Benchmarks show how a coherent style is built. If the result could pass for one of them, change it.
- **No hard-coded design values outside the values file.** Exception: the inside of a product mockup may use its own small sizes, but it still uses the page's fonts and palette.
- **Real content over placeholders, real product UI over illustrations of it.** When content is missing, write it; never fill the gap with decoration (gradients, glass, icon tiles, blobs).
- **Never call a design done without looking at a screenshot of it.**
- **Explain decisions in plain language.** Say what changed and why it helps the visitor, not just which CSS changed.
