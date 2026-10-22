# Skills

Open-source [agent skills](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) for Claude Code, Claude.ai, and any other agent that reads `SKILL.md` files.

A skill is a folder with a `SKILL.md` file: instructions the agent loads when a task needs them. Install one and the agent uses it on its own when it fits, or you can ask for it by name.

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

Issues and pull requests are welcome. To add a skill, create `skills/<skill-name>/SKILL.md` with `name` and `description` front matter, add it to the table above and to [`.claude-plugin/marketplace.json`](.claude-plugin/marketplace.json), and run `claude plugin validate .` before opening a PR.

## License

[MIT](LICENSE)
