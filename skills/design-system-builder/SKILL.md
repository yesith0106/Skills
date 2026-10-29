---
name: "design-system-builder"
description: "Build, use or update a design system shaped by attached inspiration (images, URLs, brand docs); outputs DESIGN.md plus linked HTML, and builds new UI that follows an existing DESIGN.md, avoiding the generic look of AI-generated UI."
---

# Design System Builder

A workflow for building design systems, inspired by and built on top of Brad Frost's atomic design. It borrows atomic design's hierarchy (**atoms, molecules, organisms, templates, pages**) and adds its own layers around it: inspiration intake, design tokens, a DESIGN.md source of truth, a generated visual reference, and rules for using and growing the system. Inspiration the user attaches (images, screenshots, moodboards, URLs, PDFs, brand guidelines) is analyzed into a "visual DNA" that drives everything.

## Pick the mode first

| Situation | Mode |
|---|---|
| No DESIGN.md exists, user wants a design system | **Build** (Part A) |
| A DESIGN.md exists (attached, in the workspace, a connected folder, or earlier in the chat) and the user wants a screen, page, component, prototype or code | **Use** (Part B) |
| A DESIGN.md exists and the user adds inspiration or asks to change the system | **Update** (Part C) |

If a DESIGN.md might exist but you can't see it, ask for it before building anything. Never silently invent a second system.

## Core principles (all modes)

From atomic design:
- **Not a linear process.** The levels are a mental model for seeing parts and whole at once; loop between them.
- **Atoms**: smallest functional units (label, input, button, icon, heading, image).
- **Molecules**: simple groups of atoms with a single responsibility (search form = label + input + button).
- **Organisms**: distinct sections made of molecules, atoms and/or organisms (header, product grid).
- **Templates**: layouts showing **content structure** (ratios, character limits, slots), not final content.
- **Pages**: templates filled with real representative content, plus **variations** that stress the system. When a page breaks, fix it at the lowest level that causes it.
- Naming is flexible (use the team's labels if they have them), and the method applies to any UI, not only the web.

Added by this builder:
- **Tokens sit beneath atoms** and are the only source of visual values.
- **DESIGN.md is the single source of truth**; everything visual is generated from it.
- **Inspiration informs qualities, never identity**: no real brand's logo, wordmark, mascot or signature design.
- **No generic AI output.** The system and everything built from it must look chosen for this product, not like the default look of AI-generated UI. Follow the anti-slop rules below in every mode.

## Anti-slop rules (all modes)

**The inspiration and brief win.** Everything in this section is a default for choices the user left open. If the inspiration or brand clearly asks for something listed here (a cream ground, an italic serif, a hard offset shadow), honor it and record why under Visual DNA. Reaching for one of these patterns when nobody asked for it means no decision was made; rewrite the element, don't just soften it.

**The calibration test.** AI-generated interfaces cluster around a few looks whatever the subject: warm cream ground with a high-contrast serif and a terracotta accent; near-black with one neon accent and glowing edges; purple-to-blue gradients; editorial hairlines with italic display serif and small tracked mono labels; flat saturated color with black boxes and hard offset shadows. If someone could guess the system's look from the product category alone, it isn't derived from the inspiration yet. Rework it until they couldn't.

**Decisions to make deliberately, never by default**
- **Light or dark:** write one sentence about who uses the product, where, and under what light, and let that pick the default theme.
- **Color strategy:** name it before picking colors: restrained (tinted neutrals plus one accent; usual for apps, dashboards and docs), committed (one saturated color owns 30–60% of the surface), full palette (3–4 named roles), or drenched (the surface is the color). Every color gets a role (surface, text, action, focus, selection, border, status, data); no bag of swatches. On marketing surfaces, let color own whole regions instead of scattering small accents over a neutral ground.
- **Fonts:** pick faces that fit the product's world, using the fewest families that each have a distinct role. Apps and docs are well served by a good workhorse UI face or a system stack. For expressive or marketing surfaces, these faces are the training-data defaults and need a reason no other face could meet: Inter (as display), Roboto, Geist, Fraunces, Playfair Display, Cormorant, Lora, Newsreader, Syne, Space Grotesk, Space Mono, IBM Plex, DM Sans, DM Serif, Outfit, Plus Jakarta Sans, Instrument Sans. "Books want a serif" or "tech wants a mono" is not a reason.

**Never, unless the inspiration asks for it**
- Gradient text; purple/violet gradients; cyan or neon on dark; colored glow shadows; radial "spotlight" glows behind a hero; decorative grid-line or stripe backgrounds; glass and blur as decoration.
- A colored `border-left`/`border-right` over 1px on cards, list items, callouts or alerts; a thick accent border on a rounded card.
- Rows of same-size cards (icon tile + heading + text) as the page structure; a small rounded icon tile stacked above a heading; cards nested in cards; every card in a row wearing both a hairline border and a wide soft shadow (pick one).
- A tiny uppercase eyebrow, kicker or pill chip above a heading; tiny section numbers (01 / 02 / 03) unless the sequence matters to the reader; a long full-sentence headline at display size.
- The hero-metric template (big number, small label, supporting stats); sparklines, progress rings or placeholder rectangles standing in for content.
- Hard offset shadows (`4px 4px 0`) outside a genuinely neobrutalist system. Shadows otherwise have an offset and a soft blur.
- Monospace as a costume for "technical"; mono is for code, data and measurements.
- Emoji or unicode glyphs as icons; mixed icon sets. Use one library at one stroke weight.
- Bounce or elastic easing; auto-scrolling marquees; pulsing dots or blinking cursors that aren't tied to live data or a real input; the same entrance animation on every section; content hidden until a script reveals it.
- Big illustrations built from primitive SVG shapes, or wavy `clip-path` blobs. Use real imagery, an authored asset, or nothing.
- Modals for tasks that need neither interruption nor protected focus.

**Craft floor (checked on every rendered result)**
- **Type:** adjacent roles differ by at least 1.25× in size, or clearly in weight. Body text 16px or larger on the web (1rem); functional text (labels, buttons, table cells, nav) never under 11px, and adding a smaller step to the scale doesn't make it legible. Body line height 1.4–1.7; body measure 45–75 characters (`max-width: 65ch`); `text-wrap: balance` on headings and `pretty` on body. Letter spacing no tighter than -0.04em on display type and no wider than 0.05em on body text; all caps only for short labels. On dark surfaces, give light text a little more line height, tracking and weight.
- **Spacing:** a 4-based scale with real rhythm: tight inside groups, generous between them, more space above a heading than below it. One value repeated everywhere is not a rhythm. Group with proximity before adding containers. Text never touches a container edge (at least 12–16px inside colored or bordered boxes) or the viewport edge (at least 16px).
- **Color:** contrast checked with code: body text 4.5:1, large text, icons, controls and focus rings 3:1, in both themes and every state. On colored surfaces, tint secondary text from that hue or the foreground, never plain gray. Build ramps in OKLCH and reduce chroma near white and black. Design the dark theme on its own; don't just invert the light one. Color is never the only signal for status or data.
- **Motion:** 100–150ms for feedback, 150–300ms for state changes, 300–500ms for overlays and view changes; exits faster than entrances; ease-out such as `cubic-bezier(0.16, 1, 0.3, 1)`; animate transform and opacity rather than layout properties; a `prefers-reduced-motion` path that reduces movement but keeps state feedback. One deliberate motion moment per screen, not effects scattered everywhere.
- **Browser surfaces:** theme the parts nobody draws: text selection, caret, focus rings, scrollbars, link underline offset, and tabular numerals in data. This is the cheapest sign a UI was designed rather than assembled.
- **States:** every interactive component has default, hover, focus-visible, active, disabled, loading, error and (where relevant) empty and success states.

**Copy**
- Buttons name the action with a specific verb and object ("Export report", not "Submit" or "OK"). Destructive actions name what is lost; prefer undo to confirmation when undo is safe.
- Errors say what failed, why when known, and how to recover. Empty states say why it's empty and what to do next. Placeholders are examples, never labels.
- Say each idea once; if the heading explains the state, cut the intro sentence.
- No marketing buzzwords (streamline, empower, supercharge, seamless, world-class, next-generation, cutting-edge, enterprise-grade). Say what the product literally does.
- No AI cadence: repeated "X. No Y." / "Not a feature. A platform." lines, dismissing things as "theater", or heavy em-dash use.
- Realistic content everywhere, never lorem ipsum. Illustrative data can be invented, but never invented claims: prices, customers, metrics or capabilities the product doesn't have.

---

# Part A — Build

## Deliverables (always these two, linked to each other)
1. **`DESIGN.md`**: source of truth. Tokens in YAML front matter; everything else in Markdown, **including a usage guide** (section 1) so any human or agent can build with it.
2. **`design-system.html`**: visual companion **generated from DESIGN.md** by a build script, never hand-edited.

DESIGN.md links `./design-system.html` (and the artifact link once published); the HTML shows "Generated from DESIGN.md v{version}, {date}" and links back. Both carry the same semver `version`.

## Workflow (track as a task list)

### 1. Scope (only what's unclear, max 3 questions)
Product and platform; whether an existing brand is fixed; which 2–3 key screens the pages should prove out; the tech stack it will be built in (plain HTML/CSS, React, Vue, SwiftUI, Figma…), since the usage guide's code examples follow it. If the user is away, choose defaults and record them under Assumptions.

### 2. Inspiration intake → visual DNA
- **Images**: view each with Read, then measure colors with code:

```python
# pip install pillow scikit-learn --break-system-packages (if missing)
from PIL import Image
from sklearn.cluster import KMeans
import numpy as np, sys
img = Image.open(sys.argv[1]).convert('RGB'); img.thumbnail((300,300))
px = np.array(img).reshape(-1,3)
km = KMeans(n_clusters=8, n_init=4, random_state=0).fit(px)
counts = np.bincount(km.labels_)
for i in np.argsort(-counts):
    r,g,b = km.cluster_centers_[i].astype(int)
    print(f'#{r:02x}{g:02x}{b:02x}  {counts[i]/counts.sum():.1%}')
```

- **URLs**: WebFetch; note type, density, color and component patterns.
- **Brand docs**: stated rules override inferred values.

Synthesize: mood words, palette with roles, type character and fonts (Google Fonts unless the brand specifies), shape language, density and base spacing unit, imagery/icon style, motion feel, voice and tone, and conflicts between sources with their resolution. Also record the three deliberate decisions from the anti-slop rules: the use-scene sentence that picks light or dark, the named color strategy, and why each font fits. Then run the calibration test: if the DNA lands on one of the generic AI looks and the inspiration didn't ask for it, go back to the sources and find what is specific to them. If the user is present, show it briefly before continuing.

### 3. Tokens → Atoms → Molecules → Organisms → Templates → Pages
- **Tokens**: primitive (color ramps 50–900 built in OKLCH, type scale on a ratio of at least 1.25, 4-based spacing, radii, elevation, borders, motion, breakpoints) and semantic (`color.text.primary`, `color.action.primary.bg`, `space.inset.md`). Components use semantic tokens only. Light and dark themes, each designed rather than inverted. Bake the craft floor into the tokens themselves (body size, line heights, measure, tracking, durations, easing, focus ring, selection color) so screens built from them pass by default. Check WCAG contrast with code (≥ 4.5:1 body, ≥ 3:1 large text, icons and UI boundaries).
- **Atoms**: type styles, icons (one open set), buttons in all states (default, hover, focus-visible, active, disabled, loading), inputs, checkbox, radio, toggle, select, label, badge, avatar, divider, link, spinner, media ratios.
- **Molecules**: form field, search form, button group, nav item, media object, stat, breadcrumb, pagination, toast, tooltip, tabs.
- **Organisms**: header, navigation (desktop + mobile), footer, hero, card grid/list, data table, form section, dialog, sidebar, empty state. Shape each one from the visual DNA, not the stock template: no icon-tile feature cards, eyebrow-over-headline heroes or hero-metric blocks unless the inspiration shows them.
- **Templates**: 2–4 layouts for the scoped screens on a defined grid, with content-structure placeholders.
- **Pages**: invented realistic content plus at least two stress variations each; record what broke and fix it at the right level.

Give **every component** a stable ID (`atom.button`, `molecule.search-form`, `organism.header`, `template.dashboard`) and a **reference implementation** snippet in the chosen stack. These IDs and snippets are what Use mode builds from.

### 4. Write DESIGN.md

```markdown
---
name: <System name>
version: 1.0.0
updated: <YYYY-MM-DD>
platform: <web | ios | android | ...>
stack: <html-css | react | vue | swiftui | ...>
tokens:
  color:
    primitive: { brand: { 50: "#...", ..., 900: "#..." }, neutral: {...}, accent: {...}, success: {...}, warning: {...}, danger: {...} }
    semantic:
      light: { text.primary: "{neutral.900}", surface.base: "{neutral.50}", action.primary.bg: "{brand.600}", ... }
      dark:  { ... }
  typography:
    families: { ui: "...", display: "...", mono: "..." }   # only families with a distinct role
    scale: { ratio: 1.25, base: 16 }
    styles: { display: {...}, h1: {...}, h2: {...}, body: {...}, label: {...}, caption: {...} }   # size, weight, lineHeight, tracking each
    measure: 65ch
  space: { base: 4, steps: { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64 } }
  radius: { sm: ..., md: ..., lg: ..., full: 9999 }
  elevation: { 1: "...", 2: "...", 3: "..." }
  motion: { duration: { fast: 120ms, base: 200ms, slow: 400ms }, easing: { out: "cubic-bezier(0.16, 1, 0.3, 1)", in: "..." }, reducedMotion: "..." }
  focus: { ring: "...", offset: 2px }
  selection: { bg: "...", text: "..." }
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280 }
  layout: { maxWidth: ..., columns: 12, gutter: "{space.6}" }
---

# <System name>
Visual reference: [design-system.html](./design-system.html) · <artifact link>

## 1. How to use this system
### Quick start
How to load the tokens in the stack (e.g. include `tokens.css` and set `data-theme`), and a 10-line example page assembled from existing components.
### Building a new screen (decision order)
1. Is there a **page** or **template** that already fits? Start from it.
2. Otherwise compose a new template from existing **organisms**.
3. Fill gaps with existing **molecules**, then **atoms**.
4. Still missing something? Follow "Adding to the system" below; no one-off components.
### Rules
- Use semantic tokens only; never raw hex, px or font names in components.
- Spacing comes only from the space scale; type only from named styles.
- One primary action per view; button hierarchy is primary → secondary → tertiary.
- Layout follows the grid and breakpoints in front matter.
### Avoid
This system's own list of patterns it must never produce: the anti-slop "never" list minus anything the inspiration deliberately chose, plus anything specific to this system (e.g. "no shadows on cards; elevation is reserved for overlays"). Write it as concrete rules a builder can check.
### Component index
| ID | Level | Use it for | Don't use it for | Composition |
### Content & voice
Tone, capitalization, button-label style, length limits, error and empty-state messaging, date/number formats.
### Accessibility
Contrast guarantees, focus styles, keyboard behavior, ARIA patterns per interactive component, target sizes, reduced-motion rule.
### Adding to the system
Check existing components first; decide the level (atom/molecule/organism/template); build it only from tokens and lower-level components; document it in the right section with ID, composition and snippet; add it to the HTML; bump the minor version and log it.
### Review checklist
The checks a finished screen must pass (see Part B step 5).

## 2. Visual DNA
Includes the use-scene sentence, the color strategy, why each font fits, and any anti-slop default the inspiration overrode, with the reason.
## 3. Inspiration sources
| # | Source | What was taken | Weight |
## 4. Foundations
Color roles and contrast table, type pairings, spacing rhythm, shape, elevation, motion, iconography, imagery.
## 5. Atoms
### atom.button
Purpose · Variants · States · Tokens · Do / Don't · A11y · Snippet
## 6. Molecules
### molecule.search-form
Composition: atom.label + atom.input + atom.button(primary) · Responsibility · Behavior · Tokens · A11y · Snippet
## 7. Organisms
## 8. Templates
Grid, regions, slots with content limits, which organisms fill each region, snippet skeleton.
## 9. Pages & variations
## 10. Assumptions & open questions
## Changelog
```

Keep prose tight: rules and rationale. Token references use dotted front-matter names.

### 5. Generate design-system.html (and tokens.css) from DESIGN.md
Write `build_design_html.py` that parses DESIGN.md and emits `design-system.html` and `tokens.css`, so regenerating is one command. Load `artifact-design` before writing the page. The page must:
- Define every token as CSS custom properties (dark theme under `[data-theme="dark"]` and `prefers-color-scheme`) and use only those variables in component CSS.
- Have sticky navigation matching DESIGN.md, starting with a **Usage** section: quick start, the decision order as a small flow diagram, and the component index as a searchable table.
- Render live components in all states, each labelled with its ID, composition and tokens used, with a **copy-snippet** button for its reference implementation.
- Show swatches with hex, token name and contrast ratio; a type specimen; spacing and radius scales.
- Render templates with labelled placeholders and pages with real content plus a variation toggle.
- Include light/dark and mobile/tablet/desktop toggles; be self-contained (inline CSS/JS, Google Fonts only) and work at phone width.
- Follow the system itself and the anti-slop rules. The reference page is the first proof that the system doesn't look generic.

### 6. Deliver
1. Run the build; screenshot the HTML at phone and desktop width and check it against the craft floor and the calibration test. Fix what one look shows before looking again, rather than screenshotting after every tweak.
2. Publish `design-system.html` as an artifact, add its link to DESIGN.md, rebuild.
3. Send `DESIGN.md`, `design-system.html` and `tokens.css` (and the build script if they'll maintain it).
4. Close with one sentence on the system's character and one next step, e.g. "ask me for any screen and I'll build it from this system."

---

# Part B — Use (building UI with an existing system)

1. **Load the system.** Read the whole DESIGN.md: front-matter tokens, section 1 (usage rules, component index, voice, accessibility), then the component sections you'll need. Treat it as binding. If its version or stack doesn't match the request, say so in one line.
2. **Plan by level.** Before writing code, list the screen as: template (existing or new) → organisms → molecules → atoms, by component ID. Follow the decision order in section 1: reuse a page/template, then organisms, then molecules, then atoms.
3. **Build from the reference snippets.** Start from each component's snippet and the generated `tokens.css` (regenerate it from DESIGN.md if missing). Only semantic tokens; no raw values. Follow the content & voice rules for every label, heading and message, and use realistic content.
4. **Gaps.** If something genuinely isn't covered, don't improvise a one-off. Decide its level, build it from existing tokens and components, and propose adding it to DESIGN.md (Update mode, minor version bump). If the user is present and the addition is significant, ask first; otherwise add it and say so.
5. **Review checklist** before delivering:
   - Every element maps to a component ID or a proposed addition.
   - No hard-coded colors, sizes, spacing or fonts.
   - Contrast, focus states, keyboard path and labels meet section 1's accessibility rules; check contrast with code.
   - Works across the system's breakpoints and in both themes.
   - Copy follows the voice rules; one primary action per view.
   - At least one stress variation tried (long text, empty state, error).
   - Nothing from the system's **Avoid** list or the anti-slop "never" list; copy has no buzzwords or AI cadence.
   - Craft floor holds on the rendered result: type hierarchy, measure, spacing rhythm (more space above headings than below), states, themed focus and selection.
   - Squint test: with the detail blurred, the primary element, the secondary element and the main groups still read in order.
   - Cover the product name: the screen should still look like this system, not a generic template.
6. **Deliver** in the form the user asked for (a page or prototype is published as an artifact; code in files), and list in one line which components were used and any proposed additions.

If the user asks how to use the system, answer from section 1 of their DESIGN.md rather than general advice.

---

# Part C — Update

1. Read the current DESIGN.md. Run intake on only the new sources and add rows to the sources table (with any weighting the user gives, e.g. "colors from image 2, type from the site").
2. Diff the new DNA against the current one and list the proposed changes ("radius 4 → 12px, accent teal → coral"). Run the calibration test on the result, and update the **Avoid** list if the change adds or removes a deliberate exception. Ask first if the change is large and the user is present.
3. Edit front-matter tokens first, then only the component sections needing structural change, then section 1 if rules, voice or the component index changed. Re-run the contrast check.
4. Bump the version (minor for additions, major for changes that alter the look or break usage), add a changelog entry, rebuild the HTML and tokens.css, republish to the **same artifact URL**, and send the files again.

## Quality checks (Build and Update)
- DESIGN.md, the HTML and tokens.css share the same version and the outputs were rebuilt from the current DESIGN.md.
- Section 1 is complete: quick start, decision order, rules, component index, voice, accessibility, contribution process, review checklist.
- Every component has an ID, composition, tokens used, and a snippet in the chosen stack.
- Components use semantic tokens only; all pairs pass contrast in both themes; every interactive atom has a visible focus state.
- Templates show structure; pages show real content and variations.
- Nothing reproduces a real brand's logo, mascot or signature design.
- The system passes the calibration test, section 1 has a concrete **Avoid** list, and every anti-slop default it breaks is a recorded choice from the inspiration.
- Tokens encode the craft floor: type ratio ≥ 1.25, body ≥ 16px, functional text ≥ 11px, measure, 4-based spacing, ease-out motion with a reduced-motion path, themed focus ring and selection.