# Imagery

Imagery is proof, not decoration. Choose the type of image by what the visitor must believe (`principles/fit.md`).

## Floor (never break)

**I1. Every image proves something.**
- Product UI proves the product. Photos of real customers prove people trust it. Data graphics prove scale.
- An image that proves nothing (abstract blobs, generic 3D, stock handshakes) gets cut or replaced.

**I2. Real over recreated.**
- Use real product screenshots or live UI where they exist. A simplified boxes-and-lines version of the UI looks fake.
- If the product UI must be built for the page, build it with the product's real components and believable data.

**I3. Specific, believable content inside visuals.**
- Demo data looks real: real-sounding names, IDs, dates and numbers (e.g. "ENG-2481 · Faster cold start", "$48,210.55").
- Never "Lorem ipsum", "John Doe", "Project 1" or "$1,234".

**I4. One image style per page.**
- Photography, illustration, 3D and UI each have one treatment (crop, color grade, framing, radius). Don't mix three illustration styles.

**I5. Technical quality.**
- Correct aspect ratios (no stretching), `width`/`height` or `aspect-ratio` set to prevent layout shift, sharp at 2× density, and meaningful `alt` text.

## Defaults (break with a reason)

- **Product screenshots:** large (at least 8 of 12 columns, or full width under the hero). Frame them consistently: same radius, a 1px border, and at most a subtle shadow. Crop to the part that proves the point instead of shrinking the whole app.
- **Logos:** single-color (grayscale or text color at 50–70% opacity), same optical size, in one static row. A marquee only if it's the page's loud move.
- **People:** candid, well lit, consistent color grade. Name and role next to the quote.
- **Icons:** one real set (or authored SVG), line style, 16–20px, 1.5px stroke, single color. Never emoji or Unicode glyphs as icons.
- **Data graphics:** built from the page's own colors and type. No default chart-library styling.

## Range

| Choice | Feels / proves |
|---|---|
| Real product UI, cropped to the point | Craft, capability. Best for tools |
| UI fragments in cards (a meter, a chart, a receipt) | Breadth of a platform |
| Candid customer photography and portraits | Trust, humanity |
| Full-bleed video with film grain | Emotional, premium. A loud move |
| Abstract geometric illustration | Ideas the UI can't show (money moving, security). Weaker as proof |
| Hand-drawn or character illustration | Playful, approachable |
| Large editorial photography | Premium, lifestyle |
| Diagrams with technical labels ("Fig. 0.1") | Engineering voice |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Abstract gradient blob or 3D shape as the hero | The product, real people or real data |
| Fake dashboard made of gray bars | Real screenshot or real components with believable data |
| Emoji or colorful icon tiles as feature visuals | Show the feature itself |
| Stock photos of smiling people at laptops | Real customers, or no people at all |
| Generic placeholders ("Image here") | Real content, or a clearly specified asset request to the user |
| Phone and laptop mockups for everything | Crop the UI directly. Mockups only when the device matters |
| Emoji or glyphs (✓ ★ ⚡ 🚀) as feature icons | One real icon set, or show the feature |
| Hero illustration assembled from SVG circles and rectangles | Real photo, real UI, real artwork, or nothing |
| Sketchy SVG doodles, `feTurbulence` grain | Real illustration or none |
| `clip-path` blob faking a cut-out or torn edge | Real cut-out asset, or a plain crop |
| Decorative grid lines, stripes or dot fields as background | Plain surface. Grids only on a real canvas or map |
| Photo buried under a near-opaque wash | Let it show, or remove it |

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Hero | Large real product UI | Animated gradient field + logo marquee | Full-bleed looping video with film grain |
| Product | Real UI throughout (issue view, board, timeline, chat, code diff) with specific demo data | Small product fragments inside bento cards | Abstract geometric illustrations; real UI behind a "launch demo" link |
| People | Customer quotes with names | Real-world photography in case studies | Candid founder portraits beside quotes |
| Other | Technical "Fig." labels on value pillars | Data-visualization graphics in the stats band | One playful animation |
