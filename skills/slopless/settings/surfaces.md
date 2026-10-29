# Surfaces

Surfaces are corners, borders, shadows and fills: how cards, buttons, inputs and panels look. They set the physical character of the page, from crisp and engineered to soft and friendly.

## Floor (never break)

**R1. One corner character, one scale.**
- Use a radius scale (2, 4, 6, 8, 12, 16, 24, 32, full) and pick each element's radius by its size: small elements get small radii, large containers get larger ones.
- One character per page: crisp (2–6px), soft (8–16px) or round (pills and 16px+).
- Check: more than 6 distinct radii fails.

**R2. Nested corners.**
- Inner radius = outer radius − padding between them. A 16px card with 8px padding holds 8px-radius children. Never put equal radii inside each other.

**R3. Depth from tone first.**
- Separate surfaces with background steps and hairline borders before reaching for shadows.
- When shadows are used, they have 2+ layers (a large soft one plus a small tight one), low opacity, and are tinted toward the background hue.
- Check: one single-layer pure black shadow with blur over 20px is an AI tell, not a floor fail. Flag it.

**R4. Component sizes come in sets.**
- Controls have 3–4 heights (e.g. 24 / 32 / 40 / 48px). Text size, padding, icon size and radius change together with height.
- Touch targets at least 44px on mobile.

**R5. Visible focus states.**
- Every interactive element gets a focus ring: 2px in the accent color with a 2px offset, or an equivalent.

## Defaults (break with a reason)

- **Buttons:** primary is a solid accent with white text and weight 480–510, never bold. Secondary is a ghost or subtle fill. One primary per view.
- **Button sizes:** 32px (small), 40px (default), 44–48px (hero CTA). Text 13–16px, horizontal padding 12–20px.
- **Cards:** 1px border in the border color, background one step off the page, no shadow at rest. Hover can lift slightly (shadow or border brighten).
- **Inputs:** 40–44px tall, 1px border, radius equal to the buttons'.
- **Sticky header:** transparent at the top. After scrolling, `backdrop-filter: blur(12–20px)` on a semi-opaque background plus a hairline border.
- **Underlines:** 1–1.5px thick, offset 2–3px below the text, in a muted color, brightening on hover.

## Range

| Choice | Feels |
|---|---|
| 4–6px cards and buttons, fine borders, soft tinted shadows | Engineered, trustworthy |
| Pills for buttons and nav, 12–16px cards, no shadows | Modern, friendly, calm |
| 0px corners, thick borders, hard offset shadows | Bold, brutalist. Only as a chosen style; as a default it's the "brutalist costume" AI look |
| 24px+ corners, chunky shapes, colored offset shadows | Playful |
| Frosted translucent surfaces (blur + tint) | Premium, layered. Use sparingly |
| Edge highlight (hairline that catches light on one edge) | High craft, dark UIs |

## Craft details

- **Physical button edge:** faint inner top highlight (`inset 0 1px 0 rgb(255 255 255 / .08)`), a 1px dark ring and a soft drop shadow. It reads as pressable.
- **Realistic stacked shadow:** 4–5 thin layers of growing blur and offset at very low opacity, instead of one big blur.
- **Browser details:** theme `::selection`, `caret-color`, `accent-color` and `scrollbar-color` from the palette. Models skip these; they are the cheapest sign of a built page.
- **Hairline dividers:** 1px at low contrast (8–12% on dark, #e5edf5-like on light), never #ccc.

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| `rounded-2xl shadow-xl` on every card | Border + tone step, no shadow at rest |
| Different radius on every component | Pick a character and a scale (R1) |
| Glassmorphism cards everywhere | One frosted surface at most (usually the header) |
| `shadow-lg` in pure black | Multi-layer, tinted, low opacity |
| Bold button text | 480–510 weight |
| Equal radius on nested elements | Inner = outer − padding |
| Gradient borders and glows on cards | Remove, or use as the single loud move |
| Colored `border-left` stripe (>1px) on cards, callouts or alerts | Remove. Tint, icon or heading instead |
| Hairline border plus a wide soft shadow on every card | One or the other |
| Hard offset shadow (`4px 4px 0`) without a brutalist style | Soft blurred shadow, or none |
| Cards inside cards | Flatten: one surface, spacing and dividers inside |
| Rounded icon tile above every card heading | Icon inline with the heading, or none |
| Cards flush against the edge of a horizontal scroller | Same inset on both sides |

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Radius scale | 4 / 6 / 8 / 12 / 16 / 24 / 32 | 2 / 4 / 6 / 16 / 32 | 4 / 6 / 8 / 12 / 16 / 24 / 32 / 40 |
| Buttons | Pills; heights 24 / 32 / 40 / 44 | 4px corners | Pills; small 24px |
| Cards | 8–16px | 6px | 12px+ |
| Depth | Lightness steps; physical button edge; 5-layer stack shadow | Two-layer tinted shadows: `0 27px 40px -27px rgba(50,50,93,.25), 0 16px 32px -16px rgba(0,0,0,.1)` | Almost no shadows; tone and frosted surfaces |
| Header | Transparent → 20px blur + 8% white hairline on scroll | — | Frosted |
