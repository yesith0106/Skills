# Benchmark: Scale (light infrastructure platform)

A financial infrastructure platform serving everyone from first-time sellers to global enterprises, presented on a light marketing page. Measured from live CSS.
Use it as a reference for craft and coherence. Don't reproduce its look.

## The story
- **Belief:** "This runs at global scale and won't break."
- **Audience:** very broad: small businesses, enterprises, platforms and developers.
- **Feeling words:** serious, airy, dependable.
- **Loud moves:** an animated multi-color gradient field behind the hero; a live counter of total volume processed.

## 1. Layout
- Max width 1264px. 12/8/4-column grid with 16px gutters.
- Thin vertical lines frame the content column, and sections are divided by solid or dashed hairlines, so the grid itself is visible.
- Left-aligned hero inset one column. Height `min(68svh, 826px)`.
- Order:
  1. Hero with logo marquee.
  2. Bento grid of products.
  3. 4-number stats band.
  4. One section per audience segment.
  5. News.
  6. Final CTA.
  7. Mega-footer.
- Text widths capped in characters: 24 / 32 / 36 / 42ch.

## 2. Spacing
- 8px base with 4px half steps. Scale 2, 4, 6, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80 … 200.
- Component gaps 8 / 4 / 16 / 6.
- Sections 96px desktop, 64px tablet, 56px mobile. Hero 72px above, 88px below.
- Grid gaps 16px, with 32–40px between hero rows.

## 3. Typography
- One light grotesque family for everything. Mono for code.
- **Weight 300 for headings and body.** "Bold" is 400–500.
- Body 16px / 1.4 / 0. Small 14 and 12px at 1.4–1.45.
- Headings 18 → 22 → 26 → 32 → 48 → 56px:
  - 56px at 1.03 / −0.025em.
  - 48px at 1.03.
  - 32px at 1.1.
  - 26px at 1.12.
- Hero headline fluid: 6vh clamped 34–44px, at 1.15, max 36ch, `text-wrap: pretty`.
- Two-tone hero: the headline in navy and the follow-on sentence in gray, inside one H1.
- Tabular figures on stats and the counter.

## 4. Color
- Text #061b31 (navy, never black). Grays #50617a / #64748d / #7d8ba4 (blue-tinted).
- Backgrounds #ffffff, #f8fafd, #f6f9fc. Borders #e5edf5.
- One saturated indigo brand color (about 20% darker on hover) with a full tint scale.
- A 3-color signature gradient (yellow → magenta → indigo), used only for the hero field and small accents.
- Accent families per product area, each with a soft background, border and solid color.
- Shadows tinted `rgba(50,50,93,…)`.

## 5. Surfaces
- Radius 2 / 4 / 6 / 16 / 32. Cards 6px, buttons 4px: small and crisp.
- Two-layer shadows: `0 27px 40px -27px rgba(50,50,93,.25), 0 16px 32px -16px rgba(0,0,0,.1)`.
- 1px blue-gray hairlines, sometimes dashed, used to show structure.
- Light blur (2.5–12px) on overlays only.

## 6. Imagery
- Animated gradient field behind the hero.
- Grayscale customer logo marquee.
- Bento cards each show a small product fragment (usage meter, pricing, payment UI).
- Real-world photography in case studies, with the brand mark worked into the composition.
- Data-visualization graphics in the stats band.

## 7. Motion
- Main curve `cubic-bezier(.25, 1, .5, 1)` (strong ease-out).
- Buttons 0.3s. Cards 800ms ease-out-quart. Accordions 0.36s. Stats 1.2s in-out. Graphic reveals 300ms.
- The live counter ticks continuously, with digits sliding in and out.
- Reduced motion sets everything to 0s.

## 8. Copy
- Eyebrow is the live volume counter. Headline about 7 words, benefit-led. Subhead lists capabilities.
- Headlines often lead with a metric.
- Stats: currencies supported, annual volume, 99.999% uptime (linked to the status page), subscriptions managed.
- Tone works for every size of customer.
- Proof everywhere: logos, named quotes with titles, case studies with numbers.

## How the settings agree
Light-weight type keeps an information-heavy page airy. Navy and blue-tinted grays feel trustworthy rather than harsh. Crisp 6px corners and visible grid lines feel engineered. Slow, smooth easing feels calm and dependable. Together they say *serious infrastructure, made approachable*. The gradient is the one loud element, and everything else supports the numbers.
