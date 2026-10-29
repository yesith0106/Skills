# Benchmark: Warm (premium consumer finance)

A banking product for founders and small businesses, presented on a light, editorial marketing page. Measured from live CSS.
Use it as a reference for craft and coherence. Don't reproduce its look.

## The story
- **Belief:** "My money is safe, and this is easy."
- **Audience:** startup founders and small businesses; also personal customers.
- **Feeling words:** warm, premium, calm.
- **Loud moves:** a full-bleed looping hero video with film grain; a short, bold 3-word headline.

## 1. Layout
- Very wide frame: grid up to 1952px, 12 columns (16 on large screens).
- **Centered** hero: headline over video, subhead capped at 688px.
- Signup in the hero: an inline email field plus the primary button, and a secondary "demo" link for skeptics.
- Order:
  1. Announcement bar.
  2. Hero.
  3. 4-column value overview.
  4. Customer testimonials.
  5. Feature sections (text + visual).
  6. Speed and fees.
  7. Stats.
  8. Security.
  9. Press.
  10. Final CTA.
  11. Business/personal split.
  12. Footer.
- Sections switch between muted color themes (neutral, beige, purple, green, blue, orange) to change mood down the page.

## 2. Spacing
- 1px-unit utility system with named fluid gaps:
  - xs 8–12, sm 16–24, md 16–32, lg 24–32, xl 32–40.
  - 2xl 56–80, 3xl 80–128.
- Section padding 56–80 (medium), 80–128 (large), 96–144 (extra large).
- Navbar 72px.

## 3. Typography
- A custom humanist sans with a separate display cut, a sharp editorial serif for display moments, and a mono for numbers.
- Many in-between weights: 300 / 360 / 400 / 420 / 480 / 500 / 530. Body at **360**.
- Body 16px / 1.35. Small 14px / 1.35. Captions 12–14px / 1.4 at 400.
- Sizes 10, 12, 14, 16, 18, 21, 24, 28, 32, 36, 42, 48, 55. Fluid display up to 96px.
- Hero H1 32 → 73px fluid, 1.1, weight 480.
- Heading 480 vs subheading 360 at the same size: hierarchy through weight alone.
- Serif display at 1.05, weight 300 or 500.
- **Tracking loosens as text shrinks:** 0 at display sizes, +1.5% at 28px, +2% at 18–24px, +3% at 10–18px labels.
- Line height 1.4 small → 1.35 body → 1.2 headings → 1.1 display → 1.05 serif display.

## 4. Color
- Background #fbfcfd (faintly cool off-white). Secondary #f4f5f9.
- Text #272735 / #1e1e2a (blue-violet ink, never black). Subdued #535461.
- One soft periwinkle primary: hover about 20% darker, pressed about 35% darker.
- Each theme has a muted "base" scale for surfaces and a brighter scale for accents.
- Borders and frosted surfaces use translucent tinted gray (~22% opacity) instead of solid lines.
- Avatar colors are muted and earthy (teal, olive, lavender, ochre).

## 5. Surfaces
- Radius 4 / 6 / 8 / 12 / 16 / 24 / 32 / 40. Buttons and tags are pills. Cards 12px and up.
- Almost no shadows. Separation comes from tone.
- Frosted translucent surfaces for overlays and controls.
- Primary button: pill, periwinkle fill, white text, 20px horizontal padding. Small button and tag: 24px tall, 12px text at 480.

## 6. Imagery
- Hero video with an animated film-grain overlay (0.2s stepped noise loop).
- Candid portraits of real founders beside their quotes.
- The product is shown through abstract geometric illustrations (stacked cards, circle grids, trend lines), not raw dashboards. The real UI sits behind a demo link.
- One playful animation.

## 7. Motion
- Default 0.15s `cubic-bezier(.4, 0, .2, 1)`.
- Slide-up reveals over 0.5s with `cubic-bezier(.16, 0, .13, 1)`. Springy ease-out `cubic-bezier(.2, 1, .4, 1)`.
- Fades: 0.15s in (after a 0.15s delay), 0.15s out. Tabs fade and slide. Width and expansion transitions about 0.6s.

## 8. Copy
- A 3-word headline making a bold claim. The subhead promises a 10-minute signup.
- Reframes tensions: names the old pain, then the new reality, in two short sentences.
- Aspirational, second-person tone.
- Proof: customer count (footnoted), share of startups served, monthly volume, app-store rating and press logos.
- Trust handled openly: deposit insurance amount, passkeys, fraud monitoring and the legal disclaimer all visible.

## How the settings agree
Light body weight, a serif for warmth, slightly loose small text, soft periwinkle instead of corporate blue, off-white backgrounds, pills, no hard shadows, film grain, real faces and gentle motion all say *calm, premium and human*. The loud moves are the centered video hero and the 3-word headline. For money, it chooses reassurance (people, security, simplicity) over raw data.
