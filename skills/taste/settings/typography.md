# Typography

Type carries most of the quality. The biggest difference between pro and amateur type is that **line height, letter-spacing and weight all change with size**. They are never one value applied everywhere.

Benchmarks: **Precise** = dark product tool, **Scale** = light infrastructure platform, **Warm** = premium consumer finance. See `benchmarks/`.

## Floor (never break)

**T1. Line height tightens as size grows.**
| Size | Line height |
|---|---|
| 10–14px (labels, captions) | 1.4–1.5 |
| 15–18px (body) | 1.35–1.6 (long reading text 1.5–1.6) |
| 20–28px (small headings) | 1.15–1.33 |
| 32–39px | 1.1–1.2 |
| 40px and up (display) | 1.0–1.1 |
- Check: text ≥ 40px with line height > 1.2 fails. Body text with line height < 1.3 fails.
- Why: large text with body leading leaves visible gaps between lines and falls apart. Small text with tight leading is hard to read.

**T2. Letter-spacing changes with size.**
- Text fonts (Inter, system UI, most Google sans) at 32px and up: −0.02 to −0.03em. At 20–31px: about −0.01em.
- Display cuts (fonts designed for large sizes) can stay at 0.
- Body: 0 to −0.011em.
- Uppercase labels and small caps: +0.04 to +0.1em, always.
- Never tighter than −0.04em. Past that, letters lose their shapes.
- Check: text ≥ 32px set in a text font with letter-spacing ≥ 0 fails. Uppercase text with letter-spacing ≤ 0 fails. Tracking below −0.04em fails.
- Why: text fonts are spaced for small sizes. Enlarged, the gaps look loose and amateur.

**T3. A type scale, not a collection.**
- At most 10–12 distinct font sizes on a page (benchmarks: Precise 9 heading sizes plus 5 small ones, Scale about 9, Warm about 12 including fluid display sizes).
- Check: more than 12 distinct sizes fails.

**T3b. Steps you can see.**
- Each heading level is at least 1.25× the next one down, and the biggest heading at least 2× the body. Sizes that are too close read as one level.
- Display text tops out around 96px (6rem), except on expressive pages (`expressive.md`: 8–12vw statements, up to 20–30vw for one word). A long, full-sentence headline gets a smaller size than a 2–4 word one.

**T4. At most 3–4 weights.**
- Check: more than 4 distinct weights fails.

**T5. Readable line length.**
- Body paragraphs: 45–75 characters per line (about 30–40em max width).
- Hero subheads: 40–60 characters.
- Headlines: 16–36 characters per line.
- Check: paragraphs wider than about 80 characters per line fail.

**T6. Headings wrap well.**
- `text-wrap: balance` on headings and `text-wrap: pretty` on paragraphs, so no single word sits alone on the last line.

**T7. Minimum sizes.**
- Body at least 15px on desktop and 16px on mobile inputs (stops iOS zooming in on focus).
- Nothing under 11px except legal text.

**T8. Numbers.**
- Stats, prices, tables and counters use tabular figures: `font-variant-numeric: tabular-nums`.
- Pick fonts that support it: check the font's OpenType features (`tnum`) before committing. Most Google Fonts list them on the font page.

## Defaults (break with a reason)

- **Body:** 15–18px, line height 1.5–1.6 for paragraphs. Use 1.35–1.45 only for short marketing lines in a font with a large x-height. Weight 400 (300–360 for a light, airy feel).
- **Headings:** weight 400–600. The biggest display text is **lighter or equal** to smaller headings, never heavier (Precise: hero 510, section titles 590).
- **Hero headline (desktop):** 48–72px. Mobile: 32–40px. Use `clamp()` for fluid sizing, e.g. `clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)`.
- **Section headline:** 40–56px.
- **Sizes above 32px:** step by about 8px (32, 40, 48, 56, 64, 72). Below 32px, use 12, 13, 14, 15/16, 17/18, 20, 24, 28.
- **Hierarchy at the same size:** use about 120 weight units of difference (heading 480 vs subheading 360), or color (primary vs secondary text).
- **Families:** one sans for everything, optionally with one accent family (a serif for editorial moments or a mono for code and data). Never more than 2 families plus a mono.
- **Choosing the display face on a pitch page:** avoid the reflex fonts in `ai-tells.md` unless you can name a reason no other face meets. Pick it like an object from the subject's world, then check it has the weights, `tnum` and language support you need. On tool and reading pages, a workhorse sans or the system stack is fine.
- **Variable fonts:** in-between weights (e.g. 510, 590) look more refined than 500/600.
- **Two-tone headline:** headline in primary text color, follow-on clause in secondary gray, inside one heading.

## Range (options and the feeling each creates)

| Choice | Feels |
|---|---|
| Neo-grotesque (Inter-class), tight tracking, 15px body | Precise, technical |
| Grotesque at light weight (300) for headings and body | Airy, serious, premium |
| Humanist sans with slightly loose small text | Warm, friendly |
| Serif display plus quiet sans | Editorial, premium, trustworthy |
| Heavy (700–900) display at huge sizes, tight leading | Bold, loud, confident |
| Rounded or quirky display face | Playful |
| Mono for code, data and measurements | Engineering, developer audience. Mono as decoration on non-technical content is a costume |
| Condensed sans in uppercase | Energetic, sporty, urgent |

Breaking the "light display" default is right for bold and loud styles. Write down the reason.

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Inter or system font at default letter-spacing on 48px+ headings | Tighten to −0.022em |
| Line height 1.5 on everything | Follow the T1 table |
| `font-bold` (700) on every heading | 500–600 for headings; lighter for the largest display |
| Gradient-filled headline text | Solid color. Use the loud-move budget elsewhere |
| Huge centered headline + centered gray paragraph + two buttons, on every section | Left-align most sections; give each section a reason for its layout |
| Paragraphs running the full container width | Cap the width with `max-width: 60ch` |
| Uppercase eyebrow above section headings | Delete it. Put any real information in the heading |
| Italic serif display hero (Fraunces, Playfair, Instrument Serif…) | Roman, or a non-serif display face, unless the brief is editorial |
| Reflex display faces (Space Grotesk, Inter, Geist, DM Sans…) on a pitch page | A face chosen for this subject (`ai-tells.md`) |
| Tiny tracked mono labels everywhere | Mono only where there is code or data |
| Long sentence headline at 80px+ | Shorten it, or set it smaller |
| Random sizes (13, 15, 17, 19, 22, 30, 36, 44…) | One scale, from the values file |
| Sentence fragments in Title Case | Sentence case for headings and buttons |

## In app UI and dashboards

- Body 13–14px, line height 1.4–1.5. Labels 12px. Card and header titles 16px; page title 16–24px; stat values 24–30px. Rarely anything above 32px.
- Form inputs at 16px on phones (smaller makes iOS zoom), 14px from tablet up.
- Tabular figures in all tables and metrics.
- Secondary information through color (secondary or tertiary gray), not smaller sizes.

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Family | Tuned Inter-class sans (alternate glyphs on, optical sizing); serif and mono accents | Light grotesque only; mono for code | Custom humanist sans with a display cut; serif for editorial; mono for numbers |
| Weights | 400 / 510 / 590 / 680 | 300 / 400 / 500 | 360 / 480 (plus 300–530 occasionally) |
| Body | 15px / 1.6 / −0.011em | 16px / 1.4 / 0, weight 300 | 16px / 1.35, weight 360 |
| Heading sizes | 17, 20, 24, 32, 40, 48, 56, 64, 72 | 18, 22, 26, 32, 48, 56 | 18, 21, 24, 28, 32, 36, 42, 48, 55; fluid display 63–96 |
| Hero H1 | 64px / 1.0 / 510 / −0.022em | 34–44px fluid / 1.15 / 300 | 32–73px fluid / 1.1 / 480 |
| Large tracking | −0.022em from 32px | −0.025em at 56px | 0 (display cut) |
| Small tracking | −0.01 to −0.015em | 0 | +0.02 to +0.03em |
| Signature | Hero lighter than section titles | Two-tone hero headline | Same-size heading/subheading split by weight only |
