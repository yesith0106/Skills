# Layout

Layout decides reading order: what's seen first, what follows, and how the eye moves. It also decides page structure: which sections exist and in what order.

## Floor (never break)

**L1. One grid.**
- 12 columns on desktop, 8 on tablet, 4 on mobile. Gutters 16–32px.
- Every element snaps to it, and section content shares the same left edge.

**L2. A content max width.**
- 1200–1360px for the main frame. 640–1024px for text-heavy pages.
- Full-bleed is reserved for backgrounds, imagery and loud moves.

**L3. Clear reading order.**
- In each section the eye lands on one focal point first (see `restraint.md`), then the heading, then the support.
- Check: blur the screenshot. The order should still be obvious.

**L4. Responsive by design, not by shrinking.**
- Check layouts at 1440px and 390px wide. On mobile, columns stack in reading order, media gets full width, and the CTA stays visible in the first screen.

**L5. Align optical edges.**
- Text, buttons and images line up on the same visual edge. When something has padding for its hit area (a ghost button, nav link or logo), offset it with a negative margin so its visible edge aligns.

## Defaults (break with a reason)

- **Hero:** left-aligned text with the visual beside it or below it. Centered heroes suit single-message, emotional or consumer pages.
- **Section headers:** split layout (title left, description right on a 2-column subgrid) or left-aligned. Avoid centering every section header.
- **Text widths:** cap blocks in characters (24ch, 32ch, 36ch, 42ch for marketing copy; 60–70ch for reading).
- **Landing page order:**
  1. Nav.
  2. Hero: headline, subhead, CTA, and the proof visual.
  3. Social proof strip (logos or a number).
  4. 3–4 value sections (each: claim → proof visual).
  5. Deeper proof (case studies, quotes, stats, changelog).
  6. Final CTA.
  7. Footer.
- **Feature sections:** text and visual side by side, with the visual larger (7/5 or 8/4 columns). Alternating sides is fine but optional.
- **Bento grids:** only when each tile shows real product or data. Never as a grid of icons and text.
- **Final CTA:** the one fully centered section, with extra space around it.

## Range

| Choice | Feels |
|---|---|
| Strict grid, left-aligned, split section headers | Precise, editorial, engineered |
| Visible grid lines and hairline section dividers | Engineered, trustworthy, "infrastructure" |
| Centered hero over video or photography | Emotional, consumer, premium |
| Asymmetric layouts with big margins | Editorial, luxury |
| Overlapping or rotated elements, broken grid | Playful, bold |
| One section per audience (enterprise, startups, developers…) | Broad platform |
| One story top to bottom | Focused product |

## Hero types (pick by proof)

| Type | Use when | Structure |
|---|---|---|
| **Product-led** | The product UI is the proof | Headline and subhead, then a large product screenshot below or beside it |
| **Statement-led** | The message is the proof (brand, manifesto) | A huge headline and little else |
| **People-led** | Trust and human warmth | Headline over video or photography of real people |
| **Data-led** | Scale is the proof | Headline plus one live metric or a signature graphic |
| **Action-led** | Signup is easy and fast | Headline plus an inline form (email + button) in the hero |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Everything centered | Left-align by default. Center only the hero (if people-led or statement-led) and the final CTA |
| 3-column grid of icon + title + text, repeated | Replace with claim + real proof visual |
| Hero with an abstract blob or 3D illustration | Show the product, people or data (see `imagery.md`) |
| Sections that all share one layout | Vary layout by content: split, full-bleed media, stats band, quote |
| Container widths that differ per section | One max width and one outer padding |
| Hero-metric template: big number, small label, row of stats | Only when scale is the proof; one number, with its source |
| Section numbers (01 / 02 / 03) beside headings | Remove unless the order is real information |
| Split hero with a badge row, or centered headline over a card row, by default | Pick the hero type by proof and commit |
| One hero column runs far below the fold, the other floats | Balance or cap the columns |
| A modal for a simple task | Inline, a page, or a drawer |

## In app UI and dashboards

- The full shell, page anatomy and parts are in `dashboards.md`.
- Fixed sidebar (about 256px, collapsing to a 48px icon rail) or top nav. Content area max width only for reading pages, never for tables.
- Page header: title, short description, primary action on the right.
- Prioritize scanning: the most important metric top-left, actions top-right, and tables full width.
- Standard controls the visitor already knows: tabs, selects, tables with sortable headers, navigation that reads as navigation. The style lends type, palette, density and one signature touch; it never replaces the controls with a costume (a terminal prompt, an instrument panel, ledger paper).
- Design every state: empty, loading, error, long content, many rows.

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Max width | 1344px + 10–46px fluid padding; 1024px text pages | 1264px | Very wide (up to 1952px grid) |
| Grid | 12 / 8 / 4, 32px gutters | 12 / 8 / 4, 16px gutters | 12 (16 on large screens), 16–32px gutters |
| Hero | Left-aligned, product-led | Left-aligned, data-led, height min(68svh, 826px) | Centered, people-led over video, inline email signup |
| Section headers | 2-column split on a subgrid | Left-aligned | Mixed |
| Structure | One story | One section per audience segment | One story with color-themed sections |
| Signature | Final CTA is the only centered section | Visible vertical grid lines and dashed hairlines | Section color themes change mood down the page |
