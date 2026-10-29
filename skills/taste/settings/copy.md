# Copy

Copy is part of the design. Short, specific words make a layout breathe, while vague, padded words make any design feel generic.

## Floor (never break)

**W1. Headline: 3–10 words, one idea.**
- Say what it is or what changes for the visitor. No "Welcome to", and no "The future of X".

**W2. Subhead: 1–2 sentences, 12–25 words.**
- Explains the headline in concrete terms: who it's for and what it does.

**W3. Specific over vague.**
- Exact numbers ("40,000 teams", "99.999% uptime", "10 minutes"), not "thousands", "reliable" or "fast".
- Name real customers where allowed. Invented quotes or names are placeholders: mark them `data-placeholder` and flag them to the user.

**W4. Claims come with proof nearby.**
- "Fast" sits next to a changelog or benchmark. "Reliable" links to a status page. "Loved" sits next to a rating or quotes.

**W5. Buttons say what happens.**
- A verb plus an object: "Start building", "Open account", "Book a demo". Never "Submit", "Click here" or "Learn more" as the primary CTA.

**W6. Sentence case everywhere** (headings, buttons, nav), unless the brand uses something else.

**W7. No filler.**
- Cut "seamless", "cutting-edge", "revolutionize", "unlock", "empower", "leverage", "supercharge", "streamline", "elevate", "world-class", "enterprise-grade", "next-generation", "game-changing" and "in today's fast-paced world".

**W8. No invented claims.**
- Prices, customer names, benchmarks, uptime and capabilities come from the user. Demo data inside product UI may be invented but must look real; everything else invented is a `data-placeholder`.

## Defaults (break with a reason)

- **Section headline:** a claim (2–7 words) with a short supporting line.
- **Feature labels:** short and declarative ("Works offline", "Deploys in one click").
- **Eyebrows:** none. A small label above a heading is the most common AI tell (`ai-tells.md`). If it carries information, put that in the heading.
- **Punctuation:** em dashes rare. Commas, periods, colons and parentheses do most of the work.
- **Proof bar:** one line with a number plus logos ("Used by 12,000 teams at…"). Without logos, use numbers and a rating, plus one short quote.
- **Final CTA:** restate the main benefit in a few words plus a single button.
- **Microcopy:** answer the doubt next to the button ("No credit card required", "Takes 10 minutes").

## Range

| Voice | Example pattern | Feels |
|---|---|---|
| Terse, declarative | "Deploys in one click." | Precise, confident |
| Metric-led | "38% faster checkout for 1,200 brands" | Serious, proven |
| Reframing tension | "Payroll used to take a day. Now it takes a minute." | Warm, human, persuasive |
| Technical document | "Fig. 0.1 — Sync engine" | Engineering audience |
| Playful | Jokes, casual asides | Consumer, fun |
| Manifesto | Long, opinionated statements | Brand-led, editorial |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| "Unlock the power of X" / "Supercharge your workflow" | Say what it does, specifically |
| "Trusted by thousands" | Exact number, named customers |
| Three features named "Fast", "Secure", "Scalable" | Each feature as a specific claim with proof |
| Testimonials from "Sarah J., CEO" | Real names, roles, companies, ideally with a result |
| Every heading in Title Case | Sentence case |
| Emoji in headings | Remove |
| Long paragraphs under every heading | 1–2 sentences, or show it instead |
| Manufactured contrast in several sections: "Not a tool. A platform." / "No setup. Just results." | Once is voice; a pattern is a tell. Plain claims |
| Em dashes in every other sentence | Commas, periods, colons |
| "Security theater", "productivity theater" | Say what it does or doesn't do |
| Eyebrow label above every heading ("FEATURES", "HOW IT WORKS") | Delete. Let the heading speak |
| The same label repeated in every slot of a card | Say it once |

## Benchmarks

| | Precise | Scale | Warm |
|---|---|---|---|
| Headline | ~9 words, says exactly what it is | ~7 words, benefit-led | 3 words, a bold claim |
| Voice | Terse, technical-document labels | Metric-led, works for every audience size | Aspirational, second person, reframes tensions |
| Proof | Shipping log on the homepage; named customer quotes; team count | Live volume counter; uptime linked to a status page; exact stats; logo wall | Customer count with footnote; app-store rating; press; security facts in plain words |
| CTA | Start / talk to sales | Get started / contact sales | Inline email + open account; "launch demo" for skeptics |
