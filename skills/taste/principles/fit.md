# Fit

Every choice must suit the audience and what they must believe. Decide this before any visual choice. It decides the kind of proof, and the proof decides the visuals.

## The story: four answers

Write these down first, in plain words:

1. **Audience:** who arrives, what they already know, and what they're comparing you against.
2. **Belief:** the one thing the visitor must believe to act. Make it one sentence in the visitor's voice: "These people ship fast and care about craft."
3. **Proof:** what on the page makes that belief true (see the table below).
4. **Content:** what actually exists: product UI, numbers, customers, people, photos, writing. You can only prove with what exists.

Infer what you can from the brief, the codebase and any existing site. Ask the user only when the answer would change the design, and ask at most 2–3 questions. Good questions:
- "Who's the main audience: developers, business buyers or consumers?"
- "Do you have real product screenshots, customer logos or numbers we can use?"
- "Is there a brand (logo, colors, fonts) I must keep?"

## What kind of page

Name it from the page being built, not the product. A dev tool's landing page is a pitch; a fashion brand's help center is reading.

| Kind | The visitor… | Ambition shows as |
|---|---|---|
| **Pitch** (landing, marketing, pricing, campaign) | decides and acts | A clear point of view, a committed style, one memorable loud move |
| **Tool** (app UI, dashboard, editor, settings) | gets a task done | Precision, consistency and familiar controls. Brand lives in details: type, palette, density, one signature touch. Never let the style hide the task or the state |
| **Reading** (docs, articles, changelog, help) | understands something | A calm reading column with a real measure. The style owns the frame (header, nav, headings, code and tables), not the text |
| **Showcase** (quiet portfolio, gallery, case study) | looks at the work | The work leads from the first screen. The interface steps back |
| **Expressive** (creative portfolio, studio, agency, campaign, "go all out") | judges the maker by the site itself | The site is the work sample: a premise, giant type, a motion choreography, one signal color. See `expressive.md` |

For tool pages, `dashboards.md` holds the app system and the standard parts; the setting files also have short "In app UI" notes. Choose **showcase** when the work should speak and the site stay quiet; choose **expressive** when the site itself has to impress (the user asks for bold, creative, award-level or animated, or the audience hires on taste). The loud-move budget in `restraint.md` is for pitch and showcase pages; expressive pages replace it with `expressive.md`; tool and reading pages usually spend it on nothing, or on one signature detail.

## Belief → proof → visuals

| Visitor must believe | Strongest proof | What that means visually |
|---|---|---|
| "It's fast, precise, well made" | The real product, at its best | Product UI is the hero. Specific, believable demo content. A changelog or shipping cadence. |
| "It runs at scale and won't break" | Numbers, customers, uptime | Big tabular numbers, a logo wall, metrics in case studies, claims linked to evidence (e.g. a status page) |
| "It's safe and easy" | People, security, simple steps | Real customer faces, plain security facts, "3 steps / 10 minutes", a low-friction CTA |
| "They have taste and a point of view" | The work itself | Large work samples, editorial type, lots of space, few words |
| "It's fun / it's for me" | The product in use, personality | Bright color, characters or illustration, playful motion, casual copy |
| "It's worth the price" | Outcomes and comparisons | Before/after, ROI numbers, comparison tables, testimonials with results |
| "It's for experts like me" | Depth and specifics | Docs, code, technical labels, dense but ordered information |

Proof beats claims. "Over 40,000 teams" beats "trusted by thousands". A changelog beats "we ship fast". A linked status page beats "reliable".

## When proof is thin

New products often have no logos, case studies or press. Don't fake it. Use the strongest proof that does exist:
- **The product itself.** Show it doing its main job with specific data. This is usually the strongest proof anyway.
- **Early numbers.** Beta users, waitlist size, ratings, hours saved: "2,300 beta users, rated 4.8".
- **The founder's story** or the reason the product exists, in one or two sentences.
- **Risk reducers:** free trial, no card needed, cancel anytime, data export, security facts.

Testimonials without real names are placeholders. Write believable ones so the layout is right, mark them with `data-placeholder`, and list them as "needs real content" in the report.

## Audience → starting signals

These are tendencies, not rules. Let coherence decide the final values.

| Audience | Density | Tone | Typical proof |
|---|---|---|---|
| Developers, technical teams | Higher; smaller body (15px) | Terse, exact | Product UI, code, changelog |
| Business buyers, enterprise | Medium | Confident, metric-led | Logos, numbers, case studies |
| Founders, small businesses | Medium–low | Warm, direct | People, ease, security |
| Consumers | Low; large type, big imagery | Friendly, simple | The product in use, ratings |
| Creative and luxury | Very low; lots of space | Few words, editorial | The work, the craft |

## Structure follows audience breadth

- **One audience:** tell one story, top to bottom.
- **Several audiences** (e.g. startups, enterprise, platforms): give each its own section, entry point or page.

## In improve mode

Answer the four questions for the existing site, then ask: **does the current look serve that belief?**
- If it does, keep the direction and fix the execution (values, craft).
- If it doesn't (e.g. a playful look for a security product), say so and propose a new direction. Don't impose it without agreement.

## Output

Put the story block at the top of the decisions file:
```
Kind:     pitch | tool | reading | showcase | expressive
Audience: ...
Belief:   "..."
Proof:    ...
Content:  ...
```
