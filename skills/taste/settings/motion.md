# Motion

Motion should make the interface feel responsive and guide attention. It shouldn't perform. Fast feedback, smooth curves, and one reveal style at most.

## Floor (never break)

**M1. Durations by job.**
| Job | Duration |
|---|---|
| Hover, press, toggle (feedback) | 0.1–0.2s (up to 0.3s on calm styles) |
| Dropdowns, accordions, tabs, small panels | 0.2–0.36s |
| Modals, drawers, page-level reveals | 0.3–0.6s |
| Large decorative reveals, counters | 0.6–1.2s |
- Check: transitions on buttons and links longer than 0.4s fail.

**M2. Curves are ease-out or ease-in-out, never linear.**
- Linear is only for continuous loops (grain, marquees, spinners).
- Good curves:
  - Ease-out: `cubic-bezier(.25, 1, .5, 1)` (strong) and `cubic-bezier(.2, .8, .2, 1)`.
  - Ease-in-out: `cubic-bezier(.4, 0, .2, 1)`.
  - Soft reveal: `cubic-bezier(.16, 0, .13, 1)`.
- Check: `linear` on a non-looping transition fails. The browser's default `ease` is an AI tell, not a fail.

**M3. Name the properties.**
- Transition specific properties (`color, background-color, opacity, transform`), never `all`.
- Animate only `transform` and `opacity` for movement.
- Check: `transition: all` fails.

**M4. Respect reduced motion.**
- `@media (prefers-reduced-motion: reduce)` sets durations to about 0 and removes movement, keeping fades at most.

**M5. Content is visible at rest.**
- The page reads fully without JavaScript and without scrolling: no content stuck at `opacity: 0` waiting for a script.
- No fade-up on every section. The same entrance repeated down the page is the most common AI motion tell. Spend motion on one authored moment that belongs to this product (the product UI assembling, a number landing, the headline) and leave the rest still.
- If a few elements do reveal, they share one movement, distance and curve.
- **Expressive pages** (`expressive.md`) use a full choreography instead of one moment, but M1–M4 and "visible without JavaScript and with motion reduced" still hold.

## Defaults (break with a reason)

- **Hover:** appears instantly (0–0.05s) and fades out over 0.15s. This feels faster than a symmetric fade.
- **Button hover:** a color step, or `filter: brightness(1.1–1.15)` on dark. **Press:** `transform: scale(.97)` for 0.1s.
- **The one moment:** choose it from the proof, not from habit. Reach past fade-and-rise when the idea needs it: clip-path or mask reveals, blur-to-sharp, a shared-element transition.
- **Reveal (when used):** from `opacity: 0; transform: translateY(12–20px)` (optionally `filter: blur(6–10px)`) to rest, over 0.5–0.7s with an ease-out curve. Headline lines reveal one at a time, 60–100ms apart.
- **Exits are faster than entrances** (about 2/3 of the duration).
- **Stagger:** 40–80ms between items, at most 4–6 items.
- **Counters and number tickers:** 1–1.2s ease-in-out, with tabular figures.

## Range

| Choice | Feels |
|---|---|
| 0.1–0.18s, ease-out, instant hover-in | Fast, precise, tool-like |
| 0.3–0.8s, smooth strong ease-out | Calm, dependable, premium |
| 0.15s default + soft 0.5s reveals | Gentle, warm |
| Springy curves with overshoot (`cubic-bezier(.34, 1.56, .64, 1)`) | Playful |
| No motion at all except feedback | Editorial, brutalist, serious |
| Continuous ambient motion (gradient drift, grain, video) | Loud move. Budget it |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| `transition: all 0.3s ease` everywhere | Named properties, faster feedback, a real curve |
| Fade-up on every element with long staggers | One reveal style, on section entry only, short stagger |
| Hover scale 1.05 on every card | Border or shadow change; a lift of at most 2–4px |
| Bouncy springs in a serious product | Ease-out with no overshoot |
| Scroll-jacking, parallax on everything | Remove. Use at most one scroll-linked effect, as the loud move |
| No reduced-motion handling | Add M4 |
| Pulsing "live" dot on data that isn't live | Static dot with a label |
| Blinking cursor in a hero nobody can type in | Remove |
| Auto-scrolling logo or quote marquee | Static row; a marquee only as the loud move |

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Feedback | 0.1–0.18s, ease-out-quad/cubic | 0.3s on button colors | 0.15s `cubic-bezier(.4,0,.2,1)` |
| Panels | 0.25s | Accordion 0.36s | ~0.6s for widths and expansion |
| Reveals | Hero lines: opacity 0 + blur 10px + 20% rise; CTA fade 0.5s after 0.1s delay | Cards 0.8s ease-out-quart; graphics 0.3s | 0.5s slide-up `cubic-bezier(.16,0,.13,1)` |
| Hover | On in 0s, off in 0.15s; brightness 115%; press scale .97 | Smooth color change | Fade with a 0.15s delay |
| Main curve | Ease-out | `cubic-bezier(.25,1,.5,1)` | `cubic-bezier(.4,0,.2,1)`, spring `(.2,1,.4,1)` |
| Ambient | None | Animated gradient field; live counter | Film-grain loop on hero video |
