# Design Skills

Agent skills for design work: one builds a design system, the other designs and reviews pages so they don't look AI-made.

They work with Claude Code, Claude.ai, Cursor, Codex, and any other agent that reads `SKILL.md` files.

## Skills

| Skill | What it does |
|---|---|
| [design-system-builder](skills/design-system-builder/SKILL.md) | Turns inspiration (images, screenshots, URLs, brand docs) into a full design system based on atomic design: tokens, components, a `DESIGN.md` source of truth, and a visual HTML reference. It also builds new UI that follows an existing `DESIGN.md`, and updates the system as it grows. |
| [taste](skills/taste/SKILL.md) | Designs or redesigns websites and app UI with a designer's judgment. It works out who the page is for and invents a style that fits, then builds from exact values for layout, spacing, type, motion, color, surfaces, imagery and copy. Then it screenshots and audits the result and fixes it. It covers landing pages, dashboards and expressive portfolios, and flags the patterns that make pages look AI-generated. |

**Using both:** the design system builder sets up the system, and taste designs and reviews the pages built on it.

## Install

### Claude Code (recommended)

Run this inside Claude Code, choosing the skills you want:

```
/plugin install design-system-builder --marketplace yesith0106/Skills
/plugin install taste --marketplace yesith0106/Skills
```

On older versions of Claude Code, add the marketplace first, then install:

```
/plugin marketplace add yesith0106/Skills
/plugin install design-system-builder@yesith-skills
/plugin install taste@yesith-skills
```

To get updates later, run `/plugin marketplace update yesith-skills`.

### Any agent (skills CLI)

```bash
npx skills add yesith0106/Skills
```

This works with Claude Code, Cursor, Codex, and other agents that support skills.

### Manual

Copy the skill folders into your skills directory:

```bash
git clone https://github.com/yesith0106/Skills.git
cp -r Skills/skills/design-system-builder ~/.claude/skills/
cp -r Skills/skills/taste ~/.claude/skills/
```

Use `~/.claude/skills/` for all your projects, or `.claude/skills/` inside a single project.

### Claude.ai and the Claude app

1. Download a skill folder ([`design-system-builder`](skills/design-system-builder) or [`taste`](skills/taste)) and zip it.
2. Open **Settings → Capabilities → Skills** and upload the zip.

### Taste's screenshot and audit tools (optional)

Taste uses Playwright to screenshot and measure pages. Install it once inside the skill folder:

```bash
cd ~/.claude/skills/taste/scripts && npm install && npx playwright install chromium
```

Without it, taste still works and reviews the code by reading it instead.

## Usage

Just describe what you want. For example:

- "Build a design system from these screenshots" (attach images or links)
- "Make a pricing page that follows our DESIGN.md"
- "Build a landing page for my app"
- "This dashboard looks off, make it better"
- "Design my portfolio, go all out with motion and big type"

## Contributing

Ideas and improvements are welcome, for example:

- Clearer rules for tokens, components or accessibility
- New AI tells, with a fix for each
- Better handling of a type of inspiration or a kind of page
- Fixes when the output is inconsistent or misses a standard practice

Open an issue to discuss an idea, or send a pull request with your changes to the skill's files in [`skills/`](skills).

## License

[MIT](LICENSE)
