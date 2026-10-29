# AI tells

Patterns that mark a page as generated. Each one is fine on its own somewhere. The problem is that models reach for them when nobody decided, so a visitor who has seen a hundred AI sites recognizes them in a second and stops trusting the page.

Open this file when choosing the style (Create step 2), when diagnosing (Improve step 4), and in every review.

## How to use it

- **The brief wins.** If the user or brand asks for a look on this list (a cream editorial site, a neo-brutalist store), build it properly. These lists bind the choices nobody made, not the ones somebody did.
- **Expressive pages unlock some tells.** `expressive.md` lists which ones (index labels, section numbers, a marquee, giant headlines…), under what condition, and which stay banned at any volume.
- **Everything else needs a reason.** Using a tell is treated like breaking a default: write one line in the decisions file saying why this page needs it. "It looks nice" is not a reason. If you can't write the line, rewrite the element. Don't soften it: a gradient headline made subtler is still a gradient headline.
- **Rows marked ⛔ have no reason that earns them.** Remove them.
- `scripts/audit.mjs` finds most of these automatically, in its **AI tells** section.

## The category test

Before building, and again on the screenshots, ask:

1. **Could someone guess this look from the category alone?** "Dev tool, so near-black with a neon accent." "Bookshop, so cream paper and a serif." "Fintech, so navy and a purple gradient." If yes, the style came from habit, not from the story.
2. **Could they guess it from the category plus "avoid the obvious"?** The predictable opposite is also a rut. "Not dark, so cream editorial" is still a default.

If either answer is yes, go back to the feeling words and the proof (`principles/fit.md`, `principles/coherence.md`) and find what is specific to this product: its real material, its audience's world, the thing only it can show.

## The five looks AI lands on

When the style is left open, generated pages fall into one of these. All are legitimate when the brief asks for them. Landing in one by default fails the category test.

| Look | Signs |
|---|---|
| **Cream and serif** | Warm cream or beige ground, high-contrast serif display (often italic), terracotta, rust or signal-red accent, "lamplight" warmth |
| **Dark and neon** | Near-black ground, one neon accent (cyan, lime, violet), glowing edges and halos, a radial spotlight behind the hero |
| **Broadsheet** | Hairline rules everywhere, italic display serif, tiny tracked mono labels, numbered sections (01 / 02 / 03), "Fig." captions |
| **Brutalist costume** | Flat saturated fills, black outlined boxes, hard offset shadows (`4px 4px 0`), heavy condensed display type |
| **Default SaaS** | Purple-to-blue gradient, centered hero with a pill badge above the headline, three icon cards, `rounded-2xl shadow-xl`, glass panels |

**Your own first instinct counts as spent.** Warm, bookish, family and child-facing subjects pull models straight to cream plus serif. Technical subjects pull to dark plus neon or mono. Treat that first palette as already used and look in the subject's real materials instead: a book subject also has cloth bindings, jacket colors, endpapers and thread, not only cream paper.

## Reflex fonts

These faces are everywhere in generated work. As the **display voice** of a marketing page they signal "nobody chose this":

Inter (as display), Roboto, Geist, Fraunces, Playfair Display, Cormorant, Lora, Crimson, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans, Instrument Serif.

- Using one needs a reason no other face could meet. A subject association is not that reason: books wanting a serif and tech wanting a mono are exactly the habits this list breaks.
- For app UI, dashboards and docs, a well-tuned workhorse sans (including Inter) or the system stack is fine. There, type should be invisible and reliable.
- Never use a system face (Arial Black, Impact, the platform sans) as the display voice of a marketing page.

## Page structure

| Tell | Fix |
|---|---|
| ⛔ Eyebrow or kicker: a tiny uppercase tracked label (or pill chip) sitting directly above a heading | Delete it. The heading carries its own weight. If the information matters (a category, a date), put it in the heading or as a breadcrumb |
| Section numbers (01 / 02 / 03) beside headings | Remove, unless the order is information the reader needs (steps in a process) |
| Same-size cards of icon + heading + text as the page structure | Claim + real proof visual (`settings/layout.md`). Cards are the lazy container |
| ⛔ Cards inside cards | Flatten. Use spacing, type and dividers inside one surface |
| Small rounded-square icon tile above every card heading | Icon inline beside the heading, or no icon. Show the feature instead |
| The hero-metric template: big number, small label, row of supporting stats, accent color | Only if scale is the proof. Then one number, with its source |
| Split hero (copy left, product right, badge row under it) or centered headline over a row of cards, as a default | Pick the hero by proof (`settings/layout.md` hero types) and commit to it |
| A long, full-sentence headline set at display size so it fills the first screen | Shorter headline, or set long headlines a step smaller |
| A modal for a task that needs neither interruption nor protected focus | Inline, a page, or a drawer |
| One column of the hero running far below the fold while the other floats in empty space | Balance the columns or cap the tall one |

## Surfaces and color

| Tell | Fix |
|---|---|
| ⛔ Gradient text | Solid color. Emphasis from size or weight |
| ⛔ Colored `border-left` / `border-right` thicker than 1px on cards, list items, callouts or alerts | Remove it. Use a tint, an icon, or the heading |
| Glow: a zero-offset colored shadow or halo, or any colored blurred shadow on a dark page | Neutral elevation shadow, or tone steps |
| Radial gradient "spotlight" or halo behind the hero | Solid or subtly stepped ground |
| Hairline border plus a wide soft shadow on every card ("ghost card") | Pick one: a border or a shadow |
| Hard offset shadow (`4px 4px 0`) outside a deliberately brutalist style | Soft, offset, blurred shadow, or none |
| Glass and blur as decoration | At most one frosted surface (usually the sticky header) |
| Purple or violet gradients, cyan on dark | A palette from the brand and the subject, not the category |
| Cream or beige page background picked as "tasteful" | Choose the ground from the use scene and the palette, not as a safe warm default |
| Gray text on a colored background | Tint the secondary text from the background hue, or use near-white |
| Light or dark mode picked by category ("dev tools are dark") | Write one sentence of physical scene (who, where, what light) and let it decide |
| Decorative grid lines, stripes (`repeating-linear-gradient`) or dot fields as background texture | Plain surface. Grids only where there is a real canvas, map or blueprint |

## Imagery and icons

| Tell | Fix |
|---|---|
| ⛔ Emoji or Unicode glyphs (✓ ★ ⚡ 🚀) standing in for an icon system | One real icon set, one stroke width |
| A hero-sized SVG scene assembled from circles and rectangles | A real photo, real product UI, real artwork, or nothing |
| Sketch-style SVG doodles, `feTurbulence` grain, hand-drawn-look filters | Real illustration or none. Crisp diagrams are fine |
| A `clip-path` polygon or blob faking a torn edge or a cut-out of a photo | A real cut-out image, or a plain crop |
| A photo or texture buried under a near-opaque wash, so it never shows | Let the image show, or remove it |
| Sparklines, progress rings and rounded rectangles standing in for content | Real data, real UI, or remove |
| Monospace as a costume for "technical" | Mono only for code, data and measurements |
| Fake browser chrome or terminal windows around things that aren't apps | Show the thing directly |

## Motion

| Tell | Fix |
|---|---|
| The same fade-up on every section as you scroll | Content visible at rest. Spend motion on one authored moment (`settings/motion.md`) |
| Pulsing "live" dots on data that isn't live | Static indicator with a clear label |
| ⛔ A blinking cursor in a hero where nobody can type | Remove |
| Auto-scrolling marquees of logos or quotes | A static row. A marquee only as the page's one loud move |
| Bounce or elastic easing outside a playful style | Smooth ease-out |
| Content stuck at `opacity: 0` until a script runs | Visible by default, enhanced by script |

## Copy

| Tell | Fix |
|---|---|
| Buzzwords: seamless, unlock, empower, supercharge, streamline, elevate, world-class, enterprise-grade, next-generation, cutting-edge | Say what it literally does, with a specific verb and noun |
| Manufactured contrast: "Not a tool. A platform." / "No setup. Just results." / "X. No Y." landing in three or more sections | Once is voice. A pattern is a tell. Rewrite the rest as plain claims |
| Calling something "theater" ("security theater", "productivity theater") | Say plainly what it does or doesn't do |
| Em dashes everywhere (roughly one per 500 characters of body copy) | Use commas, periods, colons and parentheses. Keep em dashes rare |
| The same status or label repeated in every slot of a card | Say it once, where it matters |
| Invented numbers, customers, prices or benchmarks | Real claims only. Demo data inside product UI is fine; mark stand-ins with `data-placeholder` |

## Details models skip

A page looks built rather than assembled when the parts nobody draws are themed too. Check these on every build:

- **Text selection** (`::selection`) in the palette.
- **Caret and form accents** (`caret-color`, `accent-color`) set to the accent.
- **Scrollbars** (`scrollbar-color`) tinted on custom scroll areas and dark pages.
- **Focus rings** designed, not the browser default (`settings/surfaces.md` R5).
- **Link underlines** with a set thickness and offset.
- **Numbers** in tables, prices and stats in tabular figures.

## Author the content, don't substitute chrome

Great pages run on carefully made content: names, entries, data, screenshots, copy. When content is missing, the usual AI move is to fill the gap with decoration: a gradient, a glass panel, an icon tile, a blob. Write the content instead, at full fidelity, and mark stand-ins as placeholders. Decoration is not a substitute for something to look at.
