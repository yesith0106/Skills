# Benchmark: Precise (dark product tool)

A software tool for product and engineering teams, presented on a dark marketing page. Measured from live CSS.
Use it as a reference for craft and coherence. Don't reproduce its look.

## The story
- **Belief:** "These people ship fast and care about craft."
- **Audience:** product and engineering teams.
- **Feeling words:** calm, exact, quiet.
- **Loud moves:** the real product UI as the hero visual; very generous section spacing.

## 1. Layout
- Frame max width 1344px plus 10–46px fluid outer padding. Text pages 1024px.
- 12/8/4-column grid with 32px gutters.
- Left-aligned hero. Headline and description sit side by side, aligned on the baseline.
- Section headers on a 2-column subgrid: title left, description right.
- Order:
  1. Hero.
  2. Product screenshot.
  3. 3 value pillars with "Fig." labels.
  4. 4 feature sections (text + UI).
  5. Shipping log.
  6. Quotes.
  7. Final CTA (the only centered section).
  8. Footer.

## 2. Spacing
- 4px base, with 6px used heavily as a half step.
- Component gaps 8 / 6 / 4 / 12 / 16.
- Sections 128px on desktop, 48–96px on mobile. Section header → content 96px. 224px before the final CTA.
- Two scales with almost nothing in between: about a 10× jump.

## 3. Typography
- Inter-class variable sans with alternate glyphs (`cv01`, `ss03`) and `font-optical-sizing: auto`. Mono for code, serif for rare editorial moments.
- Weights 400 / 510 / 590 / 680.
- Body 15px / 1.6 / −0.011em. Small sizes 14 / 13 / 12 / 10px at 1.4–1.5 and −0.01 to −0.015em.
- Headings 17, 20, 24, 32, 40, 48, 56, 64, 72px, stepping by 8px above 32.
- Tracking −0.012em up to 24px, −0.022em from 32px up. Line height 1.6 → 1.33 → 1.0–1.1.
- Hero H1 64px / 1.0 / weight 510, which is lighter than the 590 section titles. 56px and 40px on smaller screens.
- Section H2 48px / 510 with `text-wrap: balance`.
- Hero description 276–378px wide. Final CTA heading max 16ch.

## 4. Color
- Backgrounds #08090a → #0f1011 → #141516 → #191a1b. Each surface is one small step lighter.
- Text #f7f8f8 / #d0d6e0 / #8a8f98 / #62666d (cool-tinted).
- One indigo accent, used sparingly. Hover is `brightness(1.15)`.
- Borders are white at 8 / 12 / 15% opacity.
- Some large statements are set in tertiary gray: big but quiet.

## 5. Surfaces
- Radius 4 / 6 / 8 / 12 / 16 / 24 / 32 by element size. Buttons and nav links are pills.
- Button heights 24 / 32 / 40 / 44px, with text 12–16px, padding 10–20px, icons 12–18px and weight 510.
- Secondary button edge: inset top highlight + 1px dark ring + soft drop shadow.
- 5-layer stacked shadow for realistic edges. Partial edge highlights (hairline masked with a radial gradient).
- Header is transparent at the top. On scroll it gets an 8% white hairline and a 20px blur.
- Underlines 1.5px thick, 2.5px offset, in quaternary gray.
- Logo and nav links get a hit-area padding offset by a −8px margin, so visible edges align.

## 6. Imagery
- Real product UI everywhere: work items, boards, timelines, agent chat, code diffs.
- Demo data is specific and believable.
- No stock photos, no illustrated people, no decorative 3D.

## 7. Motion
- 0.1s quick, 0.16–0.18s most, 0.25s larger. Ease-out curves.
- Hover is on in 0s and off over 0.15s. Press is `scale(.97)`.
- Hero lines reveal one at a time from opacity 0, 10px blur and a 20% rise.

## 8. Copy
- Headline about 9 words saying exactly what it is. A one-line subhead.
- Pillar labels are 2–3 word declaratives.
- Technical-document voice ("Fig. 0.1").
- Proof: a shipping log on the homepage, named customer quotes and an exact team count.

## How the settings agree
Small body text, in-between weights, tight tracking, near-monochrome color, 4–6px component gaps, instant hover and real UI as the imagery all say *precise tool*. The loud moves are the product screenshot and the generous section spacing. Everything else stays quiet.
