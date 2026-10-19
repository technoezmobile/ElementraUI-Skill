# ElementraUI Skill — Supported Agents & Compatibility Matrix

This document provides a realistic assessment of supported, tested, and unverified AI coding environments.

---

## 1. Compatibility Matrix

| AI Environment / Agent | Verified In This Environment? | Integration Format | Tooling Support | Notes |
| :--- | :---: | :--- | :--- | :--- |
| **Google Antigravity (AGY)** | **VERIFIED** | `SKILL.md` with YAML frontmatter | Full terminal, subagents, browser tools | Native platform for this skill. Discovered automatically in skill directories and verified in live runtime. |
| **Claude Code (Anthropic)** | **NOT VERIFIED** | Markdown skill specification | Bash tool execution | Untested in live runtime. Adapter provided in `adapters/claude-code/` based on documented specs. |
| **Cursor IDE** | **NOT VERIFIED** | `.cursor/rules/*.mdc` or `.cursorrules` | Terminal / Composer agent | Untested in live runtime. Portable rules adapter provided in `adapters/cursor/`. |
| **Windsurf (Codeium)** | **NOT VERIFIED** | `.windsurfrules` | Cascade agent tools | Untested in live runtime. Portable rules adapter provided in `adapters/windsurf/`. |
| **GitHub Copilot Workspace** | **NOT VERIFIED** | `.github/copilot-instructions.md` | Limited CLI execution | Untested in live runtime. Adapter template provided based on documented instructions format. |
| **Aider** | **NOT VERIFIED** | `.aider.conf.yml` / system prompt | Git terminal commands | Untested in live runtime. Untested theoretical workflow. |
| **Devin / Cognition** | **NOT VERIFIED** | Custom playbook / prompt | Full sandbox execution | Untested in live runtime. Compatible with standard CLI scripts in theory. |

---

## 2. Standards & Separation of Concerns

- **Empirically Verified:** Only Google Antigravity has been verified through live automated testing and runtime execution in this codebase environment.
- **Unverified Adapters:** Configurations in `adapters/` for other agents (Claude Code, Cursor, Windsurf) are based on published vendor specifications but have NOT undergone live runtime testing.
- **Portable Core:** `SKILL.md` contains zero platform-proprietary APIs. It uses universal markdown, standard prompt instructions, and shell-executable Node.js utilities.
- **Adapters Directory:** Platform-specific configuration files reside in `adapters/` to maintain clean separation.

