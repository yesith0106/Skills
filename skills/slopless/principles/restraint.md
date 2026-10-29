# Restraint

One or two loud moves per page. Everything else is quiet so that the loud moves land.

**Expressive pages** (`expressive.md`) work differently: one premise, expressed loudly everywhere. There, this file's budget is replaced by the premise and the swap test, but its squint test still applies to each screen.

Most AI-made pages fail here. Every section gets a gradient, an icon set, a badge and an animation, so nothing stands out and the page feels cheap.

## What counts as loud

Anything that pulls the eye before the content does:
- Display type 56px and up, or any very heavy weight (700+).
- Saturated color covering a large area: colored section backgrounds, gradients, big fills.
- Motion that runs without user input: auto-play video, marquees, counters, looping animations, parallax.
- Large imagery: hero photos, full-bleed video, 3D, big illustrations.
- Strong effects: glows, heavy shadows, glassmorphism, noise or grain, oversized blur.
- Unusual layout: overlapping or rotated elements, broken grid.

## The budget

- **1–2 loud moves per page.** Name them in the decisions file.
- **The hero headline doesn't use up the budget** unless it is the loud move (a statement-led hero with huge type). Every other display-size element does.
- **At most 1 loud thing per screen.** On any screenful (about 900px tall on desktop), there's one clear focal point.
- **One accent color**, used only for primary CTAs, links, focus states and the loud move.
- **One display size per screen.** Section titles are a step below the hero.

## Choosing the loud move

Spend the budget on the proof (from `fit.md`):

| Proof | Loud move options |
|---|---|
| Product | The real product UI, large, right under the hero headline; an interactive demo |
| Scale and numbers | One live or animated metric; a large stats band; a signature graphic (gradient, map, data visualization) |
| People and safety | Full-bleed video or photography of real customers; an oversized, confident statement |
| Taste and work | Huge work samples; an expressive serif headline; one unusual layout move |
| Fun | A character or illustration system; bright color blocks; playful motion on one element |

Good loud moves serve the proof directly. A loud move that's only decoration (a random 3D shape, a gradient blob) wastes the budget.

## Keeping the rest quiet

- **Section headings:** big but calm. Use moderate weight (400–600). Large statements can be set in a secondary gray so they're big but quiet.
- **Section backgrounds:** all the same, or stepping only slightly (2–4% lightness). At most one section in a contrasting color, and only if it's a loud move.
- **Icons:** small (16–20px), single color, line style. No colorful icon tiles in every card.
- **Cards:** same surface treatment everywhere. No per-card colors unless the colors encode real categories.
- **Motion:** hover feedback plus, at most, one authored moment. Content is visible at rest; no fade-up on every section.
- **Badges, pills, eyebrows:** no eyebrow labels above headings (`ai-tells.md`). Badges only for real status ("New", "Beta"), at most one per screen.
- **CTAs:** one primary style. A secondary CTA is a ghost or text button. At most 2 CTAs per screen.

## Counting (used in review)

On each screenshot, count the elements that pull the eye before reading starts:
- **First screen:** the headline and CTA plus 1 loud element is the target. 3 or more competing loud elements fails.
- **Any later screen:** 1 focal point. If two things fight, make one of them quieter.
- **Squint test:** blur your eyes (or look at the screenshot zoomed out to 25%). The loud move and the main headline should be the only things that survive.
