# Design System Builder

An agent skill that helps anyone build a consistent, standard design system, no design-system expertise needed.

Give your agent some inspiration (screenshots, URLs, brand guidelines) and it turns it into a complete system built on atomic design: design tokens, components, a `DESIGN.md` source of truth, and a visual HTML reference. Every new screen it builds after that follows the same system, so your UI stays consistent as it grows.

It also steers clear of the generic look of AI-generated UI: no purple gradients, gradient text, glowing edges, eyebrow labels or icon-tile card grids unless your inspiration asks for them. Type, spacing, color contrast and motion are held to a craft floor, and each design system gets its own list of patterns to avoid.

Works with Claude Code, Claude.ai, Cursor, Codex, and any other agent that reads `SKILL.md` files.

## Skills

| Skill | What it does |
|---|---|
| [design-system-builder](skills/design-system-builder/SKILL.md) | Turns inspiration (images, screenshots, URLs, brand docs) into a full design system based on atomic design: tokens, components, a `DESIGN.md` source of truth, and a visual HTML reference. It also builds new UI that follows an existing `DESIGN.md`, and updates the system as it grows. |

## Install

### Claude Code (recommended)

Run this inside Claude Code:

```
/plugin install design-system-builder --marketplace yesith0106/Skills
```

On older versions of Claude Code, add the marketplace first, then install:

```
/plugin marketplace add yesith0106/Skills
/plugin install design-system-builder@yesith-skills
```

To get updates later, run `/plugin marketplace update yesith-skills`.

### Any agent (skills CLI)

```bash
npx skills add yesith0106/Skills
```

This works with Claude Code, Cursor, Codex, and other agents that support skills.

### Manual

Copy the skill folder into your skills directory:

```bash
git clone https://github.com/yesith0106/Skills.git
cp -r Skills/skills/design-system-builder ~/.claude/skills/
```

Use `~/.claude/skills/` for all your projects, or `.claude/skills/` inside a single project.

### Claude.ai and the Claude app

1. Download the [`skills/design-system-builder`](skills/design-system-builder) folder and zip it.
2. Open **Settings → Capabilities → Skills** and upload the zip.

## Usage

Just describe what you want. For example:

- "Build a design system from these screenshots" (attach images or links)
- "Make a pricing page that follows our DESIGN.md"
- "Add this moodboard to the design system and update the colors"

## Contributing

Ideas and improvements that make the design system better are welcome, for example:

- Clearer rules for tokens, components, or accessibility
- Better handling of a type of inspiration (screenshots, brand guides, URLs)
- Fixes when the output is inconsistent or misses a standard practice

Open an issue to discuss an idea, or send a pull request with your changes to [`SKILL.md`](skills/design-system-builder/SKILL.md).

## License

[MIT](LICENSE)
