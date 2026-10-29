# Color

Great palettes are **mostly neutral, slightly tinted, with one accent used sparingly**. Hierarchy comes from steps of brightness, not from many hues.

## Floor (never break)

**C1. No pure black or pure white text.**
- Light theme: darkest text around #0f1115–#272735, tinted toward the brand hue (navy, ink, warm brown).
- Dark theme: backgrounds #08090a–#121212 and text around #f2f3f5–#f7f8f8.
- Check: text color #000 fails. #fff body text on a dark background fails (white button labels on a colored fill are fine).

**C2. Neutrals are tinted.**
- Grays take a little of the brand hue (saturation 5–15%). Blue-tinted grays read trustworthy, warm grays read human, and pure grays read flat.

**C3. 3–4 text levels, and no more.**
- Primary (headings, body), secondary (supporting text), tertiary (meta, captions), and an optional quaternary (disabled, faint labels).
- Check: more than 6 distinct text colors fails.

**C4. Contrast.**
- Body text at least 4.5:1 against its background. Large text (24px+) at least 3:1.
- Tertiary text is still at least 4.5:1 if it carries meaning.
- Check: body text under 4.5:1 fails.

**C5. One accent.**
- One brand accent for primary CTAs, links, focus rings and selected states.
- Other saturated colors only for status (success, warning, error) or for categories that really exist in the content.
- Check: more than 3 saturated hues used outside status colors fails.

**C6. A palette, not a collection.**
- Every color comes from the values file. Near-duplicates (#333 and #343434) are merged.

**C7. Text on colored surfaces is tinted, not gray.**
- On a colored fill, secondary text is a lighter or darker step of that hue, or near-white. Gray text on color looks washed out.

## Defaults (break with a reason)

- **Light or dark:** decide from the use scene, never from the category. Write one sentence (who uses it, where, under what light) and let it force the answer. "Dev tools are dark" is a habit, not a reason.
- **Light backgrounds:** off-white (#fbfcfd, #f8fafd, #f6f9fc, or a slightly warm #faf9f7; a clearly cream or beige ground is an AI tell, see `ai-tells.md`), with a secondary surface 2–3% darker.
- **Dark surfaces:** step up about 5–7 RGB points per level: #08090a → #0f1011 → #141516 → #191a1b. Elevation shows as slightly lighter, not as shadow.
- **Borders:** light theme, a pale tinted gray (#e5edf5) or a tinted gray at 15–25% opacity. Dark theme, white at 8% / 12% / 15% opacity, so borders work on any surface.
- **Accent hover:** about 15–20% darker on light backgrounds. On dark backgrounds, `filter: brightness(1.15)`.
- **Secondary text as a design tool:** large statements can be set in secondary gray, so they're big but quiet.
- **Signature gradient:** only as a loud move, used in one place.

## Range

| Choice | Feels |
|---|---|
| Near-black UI, cool grays, one indigo/violet accent | Precise, technical, premium |
| White/off-white, navy text, blue-tinted grays | Trustworthy, serious, financial |
| Off-white, violet-ink text, soft periwinkle accent, muted earthy secondaries | Calm, warm, premium |
| Warm off-white, brown-black text, terracotta or olive accent | Human, crafted, natural. Closest row to the "cream and serif" AI look: only with a reason from the subject's real materials |
| High-contrast black/white plus one loud saturated color | Bold, editorial, fashion |
| Several bright hues on light backgrounds | Playful, consumer, kids |
| Section color themes (each section its own muted tint) | Editorial storytelling. Use as a loud move |

Choosing an accent: pick the hue from the brand, then set saturation and lightness so white text on it passes 4.5:1. Purple and indigo are now very common on SaaS sites, and cyan or lime on near-black is the default "dev tool" look, so pick them only if they're the brand.

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Purple-to-blue gradient everywhere | One solid accent. A gradient only as the single loud move |
| `#000` text on `#fff` | Tinted ink on an off-white |
| `text-gray-500` / `text-gray-400` everywhere, too light | Define 3–4 text levels and check contrast |
| A different pastel tile behind every icon | Single-color icons on the normal surface |
| Dark mode made by inverting: pure black, pure white text, gray borders | Stepped dark surfaces, off-white text, translucent white borders |
| Neon glows and colored shadows | Remove, or use only as the loud move |
| Radial "spotlight" gradient behind the hero | Solid or subtly stepped ground |
| Cream or beige ground chosen as the safe "tasteful" option | Ground from the use scene and the subject's materials |
| Cyan, lime or violet on near-black for anything technical | A palette from the brand and the subject |
| Gray secondary text on a colored section | Tint it from the section's hue (C7) |
| Dark mode because it's a dev tool | Decide from the use scene |

## Benchmarks

| | Precise (dark) | Scale (light) | Warm (light) |
|---|---|---|---|
| Background | #08090a → #0f1011 → #141516 → #191a1b | #ffffff, #f8fafd, #f6f9fc | #fbfcfd, #f4f5f9 |
| Text levels | #f7f8f8 / #d0d6e0 / #8a8f98 / #62666d | #061b31 / #50617a / #64748d / #7d8ba4 | #1e1e2a / #272735 / #535461 |
| Tint | Cool | Navy-blue | Blue-violet ink |
| Borders | White 8 / 12 / 15% | #e5edf5 | Tinted gray ~22% opacity |
| Accent | One indigo, used sparingly | One saturated indigo + a signature 3-color gradient (loud move only) | One soft periwinkle; muted themed secondaries |
| Hover | brightness(1.15) | ~20% darker | ~20% darker, pressed ~35% darker |
