# ElementraUI Skill — Installation Guide

This guide provides step-by-step installation instructions across supported and compatible AI coding environments.

> **Verification Notice:** Only the Google Antigravity (AGY) environment has been empirically tested and verified in this release. Instructions and adapter files for other platforms (Claude Code, Cursor, Windsurf, etc.) are structured according to vendor documentation and formats, but remain unverified in live vendor environments.

---

## 1. Google Antigravity (AGY)

Antigravity auto-discovers skills from standard skill directories.

### Option A: Global Configuration (Available to all workspaces)
1. Copy or symlink the `elementraui-skill` directory into your personal Antigravity config:
   - **Windows:** `%USERPROFILE%\.gemini\config\skills\elementraui-skill`
   - **macOS / Linux:** `~/.gemini/config/skills/elementraui-skill`
2. Restart Antigravity or trigger skill reloading.

### Option B: Workspace-Specific Skill
1. Place the `elementraui-skill` directory inside your workspace root under `skills/elementraui-skill/`.
2. Antigravity will detect the `SKILL.md` frontmatter and activate the skill whenever you discuss UI components.

---

## 2. Claude Code (Anthropic)

Claude Code supports custom project or global skills formatted as markdown specifications.

### Option A: Global User Skill
1. Create the skill directory:
   ```bash
   mkdir -p ~/.claude/skills/elementraui
   ```
2. Copy `SKILL.md` and `scripts/` into `~/.claude/skills/elementraui/`:
   ```bash
   cp SKILL.md ~/.claude/skills/elementraui/SKILL.md
   cp -r scripts ~/.claude/skills/elementraui/scripts
   ```

### Option B: Project-Level Skill
Copy `adapters/claude-code/SKILL.md` into your project's `.claude/skills/elementraui.md`.

---

## 3. Cursor

Cursor uses `.cursorrules` or `.cursor/rules/*.mdc` for context-aware instructions.

1. In your project root, create `.cursor/rules/elementraui.mdc` (or append to `.cursorrules`).
2. Copy the contents of `adapters/cursor/elementraui.mdc`.
3. Cursor will apply the ElementraUI inspection and integration guidelines whenever you work on `.tsx`, `.jsx`, `.css`, or component files.

---

## 4. Windsurf (Codeium)

Windsurf reads workspace behavior instructions from `.windsurfrules`.

1. In your project root, create or edit `.windsurfrules`.
2. Append the contents of `adapters/windsurf/.windsurfrules`.
3. The Cascade agent will adhere to the ElementraUI workflow when implementing UI tasks.

---

## 5. Generic LLM / Custom MCP Agent

For custom LangChain, AutoGen, LlamaIndex, or agentic frameworks:
1. Ingest `SKILL.md` as part of your agent's system prompt instructions.
2. Provide the agent with bash/tool access to run `node scripts/elementra-cli.js <command>`.
