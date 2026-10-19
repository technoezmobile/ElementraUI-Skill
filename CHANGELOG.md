# ElementraUI Skill — Changelog

All notable changes to **ElementraUI Skill** are documented in this file.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-10-19

### Initial Release
- **Portable Core Skill:** Created `SKILL.md` specifying the 5-step UI integration lifecycle:
  1. Project inspection (`package.json`, framework, styling, path aliases).
  2. Truthful resource discovery (local catalogue, offline index, or configured endpoint).
  3. Strict taxonomy classification (executable React vs. HTML snapshot vs. screenshot vs. prompt).
  4. Non-destructive integration with dependency verification.
  5. Empirical build & type-check verification.
- **Discovery CLI Tool:** Implemented `scripts/elementra-cli.js` with zero external dependencies supporting `search`, `inspect`, `classify`, and `list-categories`.
- **Integrity Validation Suite:** Added `scripts/validate-skill.js` to automatically verify files, YAML frontmatter, documentation completeness, and script syntax.
- **Multi-Agent Adapters:** Built integration templates for:
  - Google Antigravity (`adapters/antigravity/`)
  - Claude Code (`adapters/claude-code/`)
  - Cursor (`adapters/cursor/`)
  - Windsurf (`adapters/windsurf/`)
  - Generic LLM agents (`adapters/generic/`)
- **11-Part Documentation Suite:** Authored detailed technical guides in `docs/` covering overview, installation, usage, supported agents, workflows, resource classification, configuration, troubleshooting, examples, testing, and release.
- **Real-World Examples & References:** Added actionable implementation walkthroughs in `examples/` and machine-readable schema contracts in `references/`.
