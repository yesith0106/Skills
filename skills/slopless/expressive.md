# Expressive pages

For portfolios, studios, agencies, creative campaigns, launches meant to be talked about, and any brief that says "go all out". On these pages **the site itself is the work sample**. A visitor judges the maker by how the page looks and moves before reading a word.

This kind turns the volume up. Restraint, motion and type defaults flip:

| Setting | Other kinds | Expressive |
|---|---|---|
| Loud moves | 1–2 per page | One concept, expressed loudly everywhere |
| Display type | Up to about 96px | 8–12vw statements; a single word or name can reach 20–30vw |
| Motion | Feedback plus one authored moment | A choreography: preloader, entrances, scroll-linked scenes, hover, cursor, page transitions |
| Layout | One grid, clear order | The grid can break: horizontal tracks, overlaps, full-height panels, edge-to-edge type |
| Color | Tinted neutrals, one accent | A stark base and one signal color used as an event |
| AI tells | Avoid | Some unlock inside a system (see "What unlocks") |

What doesn't flip: everything on the page still has to work. The floors below are where expressive sites usually fail.

Open this file in Create step 2 whenever the kind is **expressive** (`principles/fit.md`). It replaces `principles/restraint.md` for that page and overrides the motion and typography defaults where it says so.

## The concept comes first

Loud pages without an idea are just noise. Before choosing any effect, write one premise that generates the rest:
- "The portfolio is a magazine, volume 1": issue numbers, a contents index, folios, a back cover.
- "A film reel": a horizontal track, frame numbers, a countdown preloader, cuts as transitions.
- "A gallery opening": white walls, captions, one piece per room, slow pacing.
- "A workbench": pinned sheets, measurements, drawers that slide open.

Every loud move must trace back to the premise. A move you can't explain from the premise is decoration; cut it.

**The swap test.** Replace the name and the work with someone else's. Does the site still fit them just as well? If yes, it's a template, not a concept. Rework it until the premise and the person or product are tied together.

## Floor (never break)

**E1. The content survives the show.**
- All text is real text in the page, readable without JavaScript and with motion reduced.
- Every project, link and contact detail can be reached by keyboard, in a sensible order.

**E2. The first content shows fast.**
- A preloader is allowed only when the page has heavy media to load.
- Its counter tracks the real loading, not a timer.
- It finishes in 2.5s or less, shows once per session, and is skippable or simply short.
- Without heavy media, open straight onto the intro and animate it in.

**E3. Scroll stays the visitor's.**
- Smooth scrolling may ease the scroll position, but never block it, slow it to a crawl, or break the back button, anchor links, find-in-page or the scrollbar.
- A horizontal track must move with the normal vertical wheel and touch scroll.
- On phones, a horizontal track becomes vertical stacking.

**E4. Reduced motion gets the final states.** With `prefers-reduced-motion: reduce`:
- Turn off the preloader, smooth scroll, scroll-linked scenes, the custom cursor and marquees.
- Show every element in its finished position.
- Crossfades of 200ms or less are fine.

**E5. It runs smoothly.**
- Animate only `transform`, `opacity`, `clip-path` and `filter`.
- Hold 60fps on a mid-range laptop.
- Lazy-load media below the first screen, and size images for 2× screens.
- WebGL and video always have a static fallback image.

**E6. Reading text stays readable.**
- Body copy is at least 14px, in sentence case, and meets the contrast floor (`settings/color.md`).
- Dimmed list items at rest keep at least 3:1 contrast.
- Below 3:1 only for momentary hover states and decoration.
- Uppercase is for display lines and short labels, never paragraphs.

**E7. Mobile is designed, not shrunk.**
- Display type is re-set for 390px (no words broken mid-letter, no line wider than the screen).
- Hover reveals have a tap or always-visible version.
- Cursor effects are off on touch.
- Motion is shortened, not removed.

## Typography

**Scale tiers**
- Use three tiers and skip the middle:
  - **Giant:** 8–12vw for statements, the name, project titles. At 1440px wide, about 115–170px.
  - **Mid:** 40–80px for section statements.
  - **Small:** 14–16px for everything else.
- The jump from small to giant is 8–10×. Medium-sized headings in between flatten the page.
- One word or a short name can fill the full width (20–30vw), sized so it touches both margins.

**Setting the display type**
- Line height 0.85–1.0.
- Tracking −0.03 to −0.04em.
- Uppercase is common.

**Faces**
- One display face with character: a heavy grotesk, a condensed, a high-contrast serif, or a custom or variable face.
- The reflex fonts in `ai-tells.md` still need a reason. On a site meant to show taste, a well-known default face is a missed chance.
- Body in the same family at 500, or a quiet neutral sans.

**Weight contrast inside a line:** project numbers at 500, names at 700; one word italic or in a second face.

**Type devices that work**
- Inline symbols inside display lines (®, ✱, →, ↗, ©).
- Parenthetical words: "(Digital) designer".
- A headline split across columns with the image between.
- Numbers set huge as objects.

**Index labels:** small (14px) labels in parentheses or brackets that carry information.
- Examples: "(Services)", "(2025)", "(My philosophy)", "[04]".
- One style everywhere, placed top-left of the block they describe.
- Unlike AI eyebrows, they say something specific and form a system.

**Kinetic type**
- Lines rise from a mask, one at a time.
- Characters stagger in short names.
- A variable font's weight or width responds to scroll or the cursor.
- Text runs as a band (see Motion).

## Color

**A stark base and one signal color**
- Near-black (#0b0b0c–#111) with off-white, or paper white with ink.
- Secondary text is the base text color at 60%. Inactive items are at 25–40% (E6).

**The signal color is an event, not a theme.** A saturated red, orange, blue or acid tone appears in 3–5 planned places:
- The preloader ground.
- The contact panel.
- One detail inside the photography.
- The cursor or the selection color.
- Page-transition wipes.

**Photography graded to the palette**
- Black and white, or one consistent grade.
- Optionally the signal color left in one object.

**Full-color inversion for the finale:** the whole contact screen in the signal color with base-colored text.

**Alternatives:** a single saturated ground for the whole site with black type; two colors that swap per section; per-project colors taken from each project's own palette.

## Layout and structure

**Portfolio order**
1. **Preloader** (only if E2 allows): a counter 000→100, a stack of work images flicking past, a playful line ("Just a sec").
2. **Intro:** the name and role as giant type, location, an availability line ("● Available for work, from May"), the services as a short list.
3. **Selected work:** 3–6 projects as full-height panels or very large tiles. Each shows an index number, year, name and disciplines.
4. **Index:** all other work as a list with columns Name / Year / Services, with a hover image preview.
5. **About:** a statement in display type, a short philosophy, a portrait, a personal list (what they do outside work).
6. **Contact:** a giant call ("Let's talk"), the email as the main link, socials abbreviated (IG, LI, BE).
7. **Footer:** a personal sign-off line, local time or a credit.

**Persistent chrome:** a thin fixed header (24–48px tall), small text.
- Mark or logo left.
- A scroll progress readout ("(24%)") or the current section.
- The availability dot.
- At most 2–3 links (Work, Playground, Contact).
- For a full menu, use a full-screen overlay with giant links.

**Layout devices** (pick from the premise, not all at once)
- A horizontal track driven by vertical scroll.
- Full-height column panels that open on hover.
- Sticky stacking (each project card pins and the next slides over it).
- Asymmetric placement on a 4–6 column grid with deliberate empty columns.
- Overlapping type and image.
- Edge-to-edge type with 16–24px margins.
- A giant wordmark across the footer.

**Case study page**
1. A full-bleed hero image or video.
2. The giant title.
3. A meta row (Client, Year, Role, Services).
4. A short brief.
5. An image sequence alternating full-bleed and two-up.
6. Captions in the index-label style.
7. A giant "Next project" link that previews the next hero.

## Motion

Motion is the main material, so it gets a system: a small set of moves reused with one set of curves and durations.

**Curves**
- Expressive ease-out `cubic-bezier(.16, 1, .3, 1)` for entrances.
- `cubic-bezier(.76, 0, .24, 1)` for wipes and page transitions.
- Linear only for marquees and scrubbed scroll.

| Move | Values |
|---|---|
| **Line reveal** | Each line rises from a mask, `translateY(100%)` → 0, 0.8–1.2s, 60–100ms between lines (20–30ms per character for short words). Each element runs it once |
| **Image reveal** | `clip-path` inset or a curtain from one edge, with the image settling from `scale(1.1–1.2)` to 1, 1.2–1.6s |
| **Preloader** | A counter tied to real loading. Images flick past every 80–150ms. It exits with a wipe or slide of 0.6–0.9s that hands over to the intro reveal |
| **Smooth scroll** | Light easing, about 1.0–1.2s to settle (a lerp of 0.08–0.12). Off under reduced motion and on touch |
| **Scroll-linked scenes** | A horizontal track, parallax of 5–15% on images (never on text), the hero image scaling or unmasking, a progress counter. Scrubbed (tied to position), not triggered |
| **Hover: project** | The panel fills with its hero image at 50–70% brightness. The title stays on top. 0.4–0.6s in, 0.3s out |
| **Hover: list** | Sibling rows fade to 25–40%. A preview image follows the cursor with easing (lerp 0.1–0.15), rotating slightly with speed |
| **Cursor** | A small dot (8–12px) that grows into a labeled circle (64–96px: "View", "Play", "Drag") over interactive work. Blend mode `difference` or `exclusion` so it reads on any ground. Fine pointers only. The system cursor stays on text fields |
| **Magnetic** | Buttons and icons drift 20–35% of the distance toward the cursor within about 80px, and spring back |
| **Link underline** | Draws in from the left in 0.3–0.4s and exits to the right |
| **Running band** | A marquee only when type is the material (a name, a manifesto): 40–80px/s, pauses on hover, one per page |
| **Page transition** | A wipe in the signal color (0.6–0.8s), or the clicked image expanding into the case study hero |

- **Vary the entrances by what enters:** lines rise, images unmask, numbers count, lists stagger. The same fade-up on every block is still a tell, even here.
- Animate a thing once. Elements that re-animate every time they scroll back into view get tiring by the second pass.

## Imagery

- **The work is the hero:** full-bleed, edge to edge, large enough to see the craft. Mockups only if they add context. Never shrink the work into a device frame for no reason.
- **One grade across the site:** all black and white, all warm, or each project in its own palette. Mixed grades look like a template filled with stock images.
- **The portrait:** real, graded to the palette, usually black and white.
- **WebGL, 3D and shaders** only when they are the premise or the work: image distortion on hover, a liquid transition, a 3D object the visitor can turn. Each has a static fallback (E5).
- **Grain or noise** at 3–6% opacity, static or slow, only when the premise is analog (film, print).

## Copy

- First person, short and specific, with wit: "Heading this way →", "Just a sec", "Thanks for stopping by". Personality is part of the proof.
- Project names in capitals as titles. Disciplines as plain tags: "Website design, Art direction".
- The CTA is the email itself or one line: "Shoot me an email →". No contact form for a personal portfolio unless asked.
- Say what you do in one line near the top, so the giant type doesn't hide the offer.

## What unlocks

These tells from `ai-tells.md` are allowed on expressive pages, under a condition:

| Tell | Allowed when |
|---|---|
| Small labels near headings | They are index labels: one bracketed style, carrying real information (year, category, count) |
| Section numbers (01 / 02) | They index work or chapters, and are set big enough to be a type element |
| Marquee | Type is the material, one per page, it pauses on hover and stops under reduced motion |
| Oversized long headline | A statement section, re-set for mobile (E7) |
| Monospace labels | Part of the premise (technical, archival, film) |
| Custom cursor | Labeled, fine pointers only, never hiding where to click |
| Grain, grid lines | The premise is analog or a blueprint |
| Display weight 700+ | Always fine here |
| A full saturated section | The planned signal-color event |

**Still banned here** (they are slop at any volume):
- Gradient text.
- Neon glows and halos.
- Purple gradients.
- Emoji icons.
- Abstract 3D blobs.
- A fake typing cursor.
- Parallax on text.
- Preloaders over 2.5s.
- Scroll that breaks the browser (E3).
- Sound that plays without asking.

## AI tells on expressive pages

The creative-portfolio template is itself a look models reach for. Landing in it without a premise fails the swap test.

| AI default | Fix |
|---|---|
| The kit: giant name, "(Digital) designer", 01/02/03 project list, "Let's work together" marquee, cursor dot, preloader counter, grain, all at once with no premise | Choose the premise, then keep only the moves it explains |
| Every effect at once: WebGL, cursor, magnetic buttons, marquee, parallax and grain | Three or four moves done perfectly beat ten done roughly |
| Elements flying in from random directions | One motion system: same curves, directions from the layout |
| Re-animating on every scroll pass | Animate once |
| A preloader in front of a page with five images | Open on the intro and animate it in |
| Giant type that overflows on mobile, or breaks words mid-letter | Re-set display sizes for 390px |
| Uppercase or 20%-opacity paragraphs | Sentence case body at full contrast |
| Hover-only project info | Visible on touch, or always visible small |
| Stock-looking grades mixed across projects | One grade |
| The offer buried under the show | One plain line saying what you do, near the top |

## Reviewing an expressive page

On top of `review.md`:
- **Record the motion.** Screenshots can't judge choreography. Capture frames or a short video of:
  - Load.
  - The first scroll.
  - A hover on a project.
  - The page transition.

  Check that each move lands, that nothing jitters, and that timings are consistent.
- **Reduced motion.** Re-run with reduced motion and screenshot: everything visible in its final state, no preloader.
- **Timing.** The audit's **Expressive** section reports how long until the first content shows. It should be 2.5s or less.
- **Mobile.** At 390px: the display type fits, horizontal tracks stack, hover content is reachable.
- **Swap test and premise.** Name the premise, and say for each loud move how it follows from it.
- **Keyboard.** Tab from top to bottom: every project and the email are reachable, and focus is visible over every ground.
