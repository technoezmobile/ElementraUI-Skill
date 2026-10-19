# ElementraUI Skill — Testing & Validation Guide

This document explains how to validate the integrity, scripts, metadata, and packaging of the **ElementraUI Skill**.

---

## 1. Running the Automated Validator

The skill includes a dedicated validation script in `scripts/validate-skill.js` to ensure that all required files, documentation specifications, YAML frontmatter, and scripts are present and valid:

```bash
# Run validation via npm script
npm test

# Or run directly via Node.js
node scripts/validate-skill.js
```

---

## 2. What the Validator Asserts

1. **Required Root Files:** Checks presence of `SKILL.md`, `README.md`, `LICENSE`, `CHANGELOG.md`, `CONTRIBUTING.md`, `SECURITY.md`, `package.json`, `.gitignore`, `.editorconfig`.
2. **YAML Frontmatter Integrity:** Verifies `SKILL.md` opens with `---` frontmatter fences and includes `name: elementraui-skill` and an informative `description`.
3. **Documentation Completeness:** Confirms all 11 technical documents in `docs/` exist.
4. **Adapter Completeness:** Checks that all 5 platform adapters (`antigravity`, `claude-code`, `cursor`, `windsurf`, `generic`) exist.
5. **Implementation Examples:** Checks presence of all 4 walkthrough guides in `examples/`.
6. **Technical References:** Checks presence of `resource-schema.json`, `classification-guide.md`, and `workflow-cheat-sheet.md`.
7. **CLI Script Syntax:** Compiles `scripts/elementra-cli.js` via `node --check` to verify zero JavaScript syntax errors.
8. **Packaging Cleanliness:** Confirms that `node_modules` and `.git` directories are absent from the skill repository root.

---

## 3. Testing CLI Queries Manually

Test discovery and classification across multiple resource categories:

```bash
# 1. Search for buttons
node scripts/elementra-cli.js search "button"

# 2. Inspect a 3D WebGL component
node scripts/elementra-cli.js inspect "floating-sphere-3d"

# 3. Classify a prompt
node scripts/elementra-cli.js classify "prompt-saas-pricing-matrix"

# 4. List categories in JSON format
node scripts/elementra-cli.js list-categories --json
```
