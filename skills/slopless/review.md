# Review

Look at what you built before calling it done. Run this after every build and every significant change, for 2–3 rounds or until everything passes.

## 1. Capture

```bash
node scripts/screenshot.mjs <url-or-file> <out-dir>
node scripts/audit.mjs <url-or-file> > <out-dir>/audit.md
```

The screenshot script saves the full page and the first screen at 1440px (desktop) and 390px (mobile) wide. **Open and look at the images**: the first screens first, then the full pages.

The audit lists every value the page actually uses, grouped by the 8 settings, and flags floor-rule breaks. Fix every **FAIL**. Read every **WARN** and either fix it or note why it's intended. The audit is a helper, not a judge. Even excellent sites show a few FAILs (usually faint labels failing contrast), and it can't see layout problems like a block off the left edge. The screenshots matter more.

## 2. The looks (on the screenshots)

Do each of these and write one line on what you saw, under **Review notes** in the decisions file:

1. **First 5 seconds** (desktop first screen). What do you notice first, second and third? It should be the loud move or headline, then the subhead, then the CTA. Can you tell what this is and who it's for?
2. **Squint.** Zoom out to 25%, or imagine it blurred. Only the loud move and the main headline should stand out. If 3+ things fight, it fails restraint.
3. **Grayscale.** Without color, is the hierarchy still clear? If not, it relies on color instead of size, weight and space.
4. **Count the loud elements per screen.** At most 1 focal point per screen, and 1–2 loud moves on the whole page (`principles/restraint.md`). Tool and reading pages usually have no loud move at all.
5. **Rhythm.** Scroll the full page. Are the section gaps clearly larger than the gaps inside sections? Is spacing consistent between similar sections?
6. **Edges.** Do text, buttons and images share left edges? Is anything slightly off-grid?
7. **Mobile.** At 390px: does the headline fit in 2–4 lines, is the CTA in the first screen, are there no horizontal scrollbars or overlaps, and are touch targets at least 44px?
8. **Copy check.** Read only the headings and buttons. Do they tell the story by themselves?
9. **AI tells.** Go through the audit's **AI tells** section and `ai-tells.md` against the screenshots. Fix each tell, or confirm it's listed under "AI tells kept on purpose" in the decisions file with a reason.
10. **Category test.** Cover the logo and name. Could someone guess this look from the category alone? Does it match one of the five AI looks? If yes, the style isn't finished.
11. **States and real copy.** Check hover, focus, disabled, loading, error and empty states, not only the resting screen. Long names, long headlines and many items should not overflow at either width.
12. **Tool pages only.** Run the checks in "Reviewing a tool page" in `dashboards.md`: every state screenshotted (including filtered-empty, 100+ rows and the narrowest content area), keyboard pass, one control ladder, the audit's **Dashboards** section clean, and stat cards that agree with the table.
13. **Expressive pages only.** Run "Reviewing an expressive page" in `expressive.md`: record the motion, re-check with reduced motion, first content in ≤ 2.5s, mobile re-set, keyboard, and the premise and swap test. Audit with `--expressive`.

## 3. Principles

| Principle | Pass when |
|---|---|
| **Fit** | The visual proof matches the belief in the decisions file. An outsider would guess the right audience. |
| **Coherence** | All 8 settings express the 3 feeling words. No clashes from `principles/coherence.md`. |
| **Restraint** | Only the named loud moves are loud. One accent. One focal point per screen. |

## 4. Settings (quick checks; details in each setting file)

- **Layout:** one grid, one max width, clear reading order, sensible mobile stacking.
- **Spacing:** two scales, sections ≥ 8× component gaps, proximity shows grouping.
- **Typography:** line height and tracking follow the size tables, ≤ 12 sizes, ≤ 4 weights, line lengths capped.
- **Motion:** fast feedback, real curves, no `transition: all`, reduced motion handled.
- **Color:** no pure black, tinted neutrals, 3–4 text levels, contrast ≥ 4.5:1, one accent.
- **Surfaces:** one corner character, nested radii correct, depth from tone first, focus states visible.
- **Imagery:** every image proves something; real product UI; believable demo data.
- **Copy:** specific, short, no filler, verb-led buttons.

## 5. Quality bar

Ask both questions and answer them honestly:
1. **Would this hold up next to the benchmarks on craft?** Compare the type, spacing and detail, not the look.
2. **Does it look like a copy of a benchmark, or like a generic AI site?** Either one fails. A generic AI site lands in one of the five looks in `ai-tells.md` (cream and serif, dark and neon, broadsheet, brutalist costume, default SaaS), or shows a handful of the smaller tells: an eyebrow above every heading, icon-tile cards, fade-up on every section, even spacing everywhere, filler copy.

## 6. Fresh eyes

You built it, so you'll see what you meant, not what's there. If you can start a subagent, give a fresh one (no shared conversation) the screenshots, the decisions file, `ai-tells.md` and this file, and ask it to list every problem it sees, worst first. Fix what it finds. If you can't, wait until the end, reread the brief, and look at the screenshots as a first-time visitor before reading any code.

## 7. Report

After the final round, tell the user:
- What was built or changed, in plain words, tied to the story ("Made the product screenshot the hero, because it's the strongest proof for a technical audience").
- The audit numbers per setting (before → after in improve mode).
- Any default deliberately broken, and any AI tell kept on purpose, and why.
- Anything left open: missing real assets, copy to confirm, proposed layout changes waiting for a yes.
