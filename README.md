# ElementraUI AI Coding Skill

> **Discover. Preview. Build.**
> Official AI pair-programming skill for [ElementraUI](https://github.com/elementraui/elementraui).

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Skill: Portable](https://img.shields.io/badge/Skill-Portable_Core-emerald.svg)](SKILL.md)

**ElementraUI Skill** is a portable, open-source AI pair-programming skill that equips AI coding agents to discover, evaluate, adapt, and integrate UI components, design tokens, and templates from the **ElementraUI** ecosystem into existing web applications.

It operates with strict adherence to architectural hygiene: **inspecting repositories before modifying code**, **truthfully classifying resources (code vs. screenshot vs. prompt)**, **verifying dependencies**, and **validating integrations using real build tools**.

---

## Supported AI Coding Environments

| Platform / Agent | Status | Integration Mechanism | Documentation |
| :--- | :--- | :--- | :--- |
| **Google Antigravity (AGY)** | **VERIFIED** | Built-in Skill Directory (`.gemini/config/skills/` or workspace `skills/`) | [docs/INSTALLATION.md](docs/INSTALLATION.md#google-antigravity) |
| **Claude Code (Anthropic)** | **NOT VERIFIED** | Format-compatible Skill Directory (`~/.claude/skills/` or `.claude/skills/`) | [docs/INSTALLATION.md](docs/INSTALLATION.md#claude-code) |
| **Cursor** | **NOT VERIFIED** | Rule adapter file (`.cursorrules` or `.cursor/rules/elementraui.mdc`) | [docs/INSTALLATION.md](docs/INSTALLATION.md#cursor) |
| **Windsurf (Codeium)** | **NOT VERIFIED** | Workspace rules adapter (`.windsurfrules`) | [docs/INSTALLATION.md](docs/INSTALLATION.md#windsurf) |
| **Generic LLM / Custom Agent** | **NOT VERIFIED** | System prompt / instructions template (`adapters/generic/system-prompt.md`) | [docs/INSTALLATION.md](docs/INSTALLATION.md#generic-agent) |

> [!NOTE]
> **Verification Status Disclosure:** Only Google Antigravity has been empirically validated in this test cycle. Platform adapters and rule configurations are provided for Claude Code, Cursor, Windsurf, and Generic LLMs following their respective vendor specifications, but live end-to-end execution in those proprietary environments has **not been verified**.

---

## Key Capabilities

1. **Repository-First Inspection:** Analyzes framework (React 18/19, Next.js, Vite), styling system (Tailwind v3/v4, CSS Modules), existing design tokens, and path aliases before proposing modifications.
2. **Truthful Resource Classification:** Prevents hallucinated interactivity by explicitly distinguishing executable components, HTML snapshots, screenshot references, and AI prompts.
3. **Architecture Preservation:** Conforms to existing project conventions (class names, icon packages, utility functions) without forcing external patterns.
4. **Dependency Safety:** Verifies module compatibility, flags missing dependencies, and sets up prerequisite utilities (`cn()` via `clsx` and `tailwind-merge`).
5. **Zero-API Local Mode:** Functions 100% offline using bundled catalogue indices or local filesystem repositories without requiring cloud API keys.

---

## Quick Start: Using the CLI Inspector

The skill includes a lightweight, zero-dependency Node.js CLI to search and inspect ElementraUI resources from the terminal:

```bash
# Search components by keyword
node scripts/elementra-cli.js search "button" --limit 5

# Inspect a specific component's source, dependencies, and classification
node scripts/elementra-cli.js inspect "shimmer-light-button"

# Check classification of any resource ID
node scripts/elementra-cli.js classify "floating-sphere-3d"

# List available marketplace categories
node scripts/elementra-cli.js list-categories
```

---

## Repository Structure

```
elementraui-skill/
├── SKILL.md                 # Core portable skill specification with YAML frontmatter
├── README.md                # Skill overview, installation matrix, and quickstart
├── LICENSE                  # MIT License
├── CHANGELOG.md             # Semantic version history
├── CONTRIBUTING.md          # Developer contribution guide
├── SECURITY.md              # Security and untrusted code boundaries
├── package.json             # NPM metadata and validation scripts
├── adapters/                # Ready-to-use platform adapters (Antigravity, Claude, Cursor, Windsurf)
├── docs/                    # Complete 11-part documentation suite
├── examples/                # Step-by-step implementation and adaptation walkthroughs
├── references/              # Classification rules, schemas, and workflow cheat sheets
└── scripts/                 # CLI discovery helper and integrity validation suite
```

---

## Detailed Documentation Suite

- [docs/OVERVIEW.md](docs/OVERVIEW.md) — Architectural principles and core objectives.
- [docs/INSTALLATION.md](docs/INSTALLATION.md) — Step-by-step setup across all supported AI coding agents.
- [docs/USAGE.md](docs/USAGE.md) — Comprehensive guide to invoking and interacting with the skill.
- [docs/SUPPORTED_AGENTS.md](docs/SUPPORTED_AGENTS.md) — Full agent capability matrix and compatibility details.
- [docs/WORKFLOW.md](docs/WORKFLOW.md) — The 5-step integration lifecycle.
- [docs/RESOURCE_TYPES.md](docs/RESOURCE_TYPES.md) — Taxonomy and classification rules for all resource types.
- [docs/CONFIGURATION.md](docs/CONFIGURATION.md) — Environment variables, local catalogue paths, and endpoints.
- [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) — Diagnosing missing dependencies, syntax issues, and fallbacks.
- [docs/EXAMPLES.md](docs/EXAMPLES.md) — Complete prompt dialogs and integration scenarios.
- [docs/TESTING.md](docs/TESTING.md) — How to run the automated validation test suite.
- [docs/RELEASE.md](docs/RELEASE.md) — Packaging manifest and release verification.

---

## Validating the Skill

Run the automated integrity validator:
```bash
npm test
# or
node scripts/validate-skill.js
```

---

## License

MIT License. See [LICENSE](LICENSE) for full text.
