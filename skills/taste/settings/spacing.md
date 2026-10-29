# Spacing

Spacing works at **two scales**: tight inside components, generous between sections, and almost nothing in between. AI-made pages space everything evenly at 24–48px, which is the main reason they feel flat.

## Floor (never break)

**S1. Use a spacing scale.**
- Base unit 4px, with these steps: 2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80, 96, 128, 160, 192, 224.
- Check: more than about 16 distinct spacing values fails. Odd values (5, 7, 13, 15px…) fail.

**S2. Two scales.**
- **Inside components:** mostly 4, 6, 8, 12 and 16px.
- **Between sections (desktop):** 96–160px.
- **Ratio:** section spacing should be about 8–16× the most common gap inside components.
- Check: section padding under 64px on desktop fails. A section-to-component ratio under 4× fails ("evenly spaced").

**S3. Proximity shows grouping.**
- Space inside a group is smaller than the space between groups. A label sits closer to its input than to the next field, and a heading closer to its paragraph than to the previous section.
- Typical steps: heading → its text 12–24px; text → its CTA 24–40px; section header → section content 48–96px.

**S4. Mobile is roughly half.**
- Section spacing on mobile is about 40–60% of desktop: 128 → 64, 96 → 56. Component spacing stays the same or shrinks by one step.

**S5. Consistent page edges.**
- One outer page padding value per breakpoint (e.g. 20 → 32 → 48px). Every section's content starts on the same left edge.

## Defaults (break with a reason)

- **Section padding:** 128px desktop, 96px tablet, 64px mobile.
- **Section header → content:** 64–96px.
- **Before the final CTA:** extra space (160–224px) to give the last ask room.
- **How to read the audit:** "whitespace between sections" should be 96–160px on desktop and similar across sections. Its "in-component gap" should be 4–16px.
- **Hero:** more space below the hero text than above it (e.g. 72 above, 96 below), so it sits optically centered.
- **Card padding:** 24–32px. Card grid gaps: 16–24px.
- **Buttons:** horizontal padding about 1.25–1.5× the font size; height from the button size set (see `surfaces.md`).
- **Icon to label:** 6–8px.

## Range

| Choice | Feels |
|---|---|
| Tight components (4–8px) + huge sections (128–224px) | Precise, premium, calm |
| Generous components (16–24px) + large sections | Friendly, relaxed, consumer |
| Tight everything, small sections (48–64px) | Dense, energetic, information-rich (docs, dashboards, editorial indexes) |
| Very large margins, few elements | Luxury, editorial |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Every section `py-24` (96px) and every gap `gap-8` (32px) | Apply two scales: components 4–16px, sections 128px+ |
| Equal space above and below headings | Heading closer to its own content (S3) |
| Cards with 16px padding in a 48px gap | Padding ≥ gap, or the cards feel like loose boxes |
| Arbitrary values (`mt-[37px]`) | Snap to the scale |
| Same section padding on mobile as desktop | Halve it |
| Text almost touching its card or button edge | Padding at least about 1× the font size on small elements, 24px+ on cards |
| Body text touching the screen edge on mobile | Page padding of at least 16–20px |

## In app UI and dashboards

- Base 4px. Gaps mostly 4–12px. Cards padded 24px, 16px apart. Content padding 16px on mobile, 24px on desktop.
- Table rows 36–48px tall (36px only in compact, expert tools). List and nav items 32–40px.
- Values for every part are in `dashboards.md`.
- Density comes from small gaps, never from removing alignment.

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Base | 4px (6px used heavily) | 8px with 4px half steps | 4px (fluid named gaps) |
| Common gaps | 8, 6, 4, 12, 16 | 8, 4, 16, 6 | 8–12, 16–24, 16–32 |
| Sections (desktop / mobile) | 128 / 48 | 96 / 56 | 80–128 (up to 144) / 56 |
| Header → content | 96 | ~64 | 56–80 |
| Before final CTA | 224 | — | 96–144 |
| Hero | — | 72 above, 88 below | — |
