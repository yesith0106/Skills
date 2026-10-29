# Coherence

All 8 settings must tell the same story. A design fails coherence when its settings contradict each other: tight technical type with bubbly corners and bouncy motion reads as confused, not creative.

## Method

1. **Pick 3 feeling words** that follow from the story in `fit.md`, e.g. "calm, exact, quiet", "warm, human, premium" or "loud, cheeky, fast".
   - Make them specific. "Modern, clean, professional" describes every site and decides nothing.
2. **Translate each word into settings** using the table below. Where words pull in different directions, the first word wins.
3. **Set all 8 settings** in order, using the setting files. Start from each file's Defaults and move within its Range.
4. **Run the clash check** at the bottom of this file.
5. **Write the coherence line** in the decisions file: one sentence explaining how the settings agree, e.g. "Light type, blue-tinted neutrals, crisp 6px corners and slow, smooth motion all say *serious but approachable*."

## Feeling → settings

| Feeling | Layout | Spacing | Typography | Motion | Color | Surfaces | Imagery | Copy |
|---|---|---|---|---|---|---|---|---|
| **Exact / technical** | Strict grid, left-aligned | Tight inside components (4–8px), large between sections | Neo-grotesque or mono accents; small body (15px); tight tracking | Fast (0.1–0.2s), ease-out, no bounce | Mostly neutral, one accent | Small radii or pills, hairline borders, little shadow | Real UI, diagrams | Terse, declarative |
| **Calm / quiet** | Few elements per screen | Generous everywhere | Light weights (300–400), moderate sizes | Slow and soft (0.3–0.6s) | Low saturation, near-neutral | Soft, flat, tonal | Few, large, simple | Short and plain |
| **Warm / human** | Centered or asymmetric moments | Generous | Humanist sans or serif accents, slightly loose small text | Soft ease-in-out, gentle reveals | Warm or tinted off-whites, earthy accents | Rounder (12px+), pills, few shadows | People, candid photos, texture | Personal, second person |
| **Serious / trustworthy** | Ordered grid, visible structure | Even and measured | Restrained sans, light-to-regular weights, tabular numbers | Smooth, unhurried (0.3s+) | Navy or deep ink, cool tinted grays | Crisp (4–6px), fine borders, soft tinted shadows | Data, logos, real-world photos | Metric-led, precise |
| **Bold / loud** | Big type blocks, full-bleed sections | Larger contrasts between gaps | Heavy weights allowed (700–900), very large display sizes, tight leading | Snappy, confident | High contrast, 1–2 saturated colors | Either very sharp (0px) or very round; hard shadows possible | Big, cropped, graphic | Short, punchy, opinionated |
| **Playful** | Looser, overlapping, rotated elements | Bouncy rhythm | Rounded or quirky display type, generous size | Springy curves, overshoot allowed | Bright, several hues | Round, chunky, offset shadows | Illustration, characters, stickers | Casual, jokes allowed |
| **Premium / editorial** | Asymmetric, big margins | Very generous | Serif display plus quiet sans, big size contrast | Slow, minimal | Restrained, off-white or near-black, rare accent | Minimal radius, no shadows | Large photography, the work itself | Few words, confident |
| **Energetic / fast** | Dense, dynamic | Tight | Condensed or heavy sans, italics allowed | Quick, layered | Saturated, high contrast | Sharp, angled | Motion, video | Active verbs, urgent |

**Watch the rows that sit next to AI looks.** *Warm / human* and *Premium / editorial* drift into cream plus serif; *Exact / technical* drifts into dark plus neon or mono everything; *Bold / loud* drifts into the brutalist costume. Use the row for direction, then run the category test in `ai-tells.md` and pull the specifics from the subject's own world (its materials, objects, places and print traditions), not from the row's most obvious reading.

## Clash check

Read the planned values for each pair. Any "yes" means changing one side to match the feeling words.

| Clash | Example |
|---|---|
| Precise type with bubbly surfaces | −0.02em tracked neo-grotesque with 24px radius cards and bounce easing |
| Calm palette with frantic motion | Muted neutrals with parallax, auto-carousels and 3 animated elements per screen |
| Luxury type with discount layout | Serif display with crowded cards, badges and 5 CTAs |
| Technical audience with vague imagery | A dev tool with abstract 3D blobs instead of its UI |
| Warm copy with cold color | "Hey friend!" copy on a pure gray-on-white palette |
| Two radius characters | 4px buttons next to 24px cards next to pills, with no rule for which is which |
| Two type voices | A playful rounded display face with a strict mono UI everywhere else |
| Motion speed mismatch | 0.1s hovers next to 1s section reveals with different curves |
| Costume type | Mono or "terminal" styling on a page that has no code or data in it |
| Loud everything | Gradient hero + bright illustrations + colored section backgrounds + animated counters (see `restraint.md`) |

## Benchmarks as coherence examples

Each benchmark file ends with **How the settings agree**. Read one when you need to see a complete, coherent style worked out in exact values. Borrow the method, never the look.
