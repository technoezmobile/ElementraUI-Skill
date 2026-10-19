# ElementraUI Skill — Release & Packaging Specification

**Target Archive:** `ElementraUI-Skill.zip`  
**Package Type:** Self-contained, portable AI coding skill repository  
**Licensing:** MIT License  

---

## 1. Release Manifest

The `ElementraUI-Skill.zip` archive contains all files required to understand, configure, install, test, and execute the skill across any compatible AI coding environment:

```
elementraui-skill/
├── .editorconfig
├── .gitignore
├── CHANGELOG.md
├── CONTRIBUTING.md
├── LICENSE
├── package.json
├── README.md
├── SECURITY.md
├── SKILL.md
├── adapters/
│   ├── antigravity/
│   ├── claude-code/
│   ├── cursor/
│   ├── windsurf/
│   └── generic/
├── docs/
│   ├── CONFIGURATION.md
│   ├── EXAMPLES.md
│   ├── INSTALLATION.md
│   ├── OVERVIEW.md
│   ├── RELEASE.md
│   ├── RESOURCE_TYPES.md
│   ├── SECURITY.md
│   ├── SUPPORTED_AGENTS.md
│   ├── TESTING.md
│   ├── TROUBLESHOOTING.md
│   └── USAGE.md
├── examples/
│   ├── handling-screenshots-honestly.md
│   ├── html-snapshot-adaptation.md
│   ├── missing-dependency-recovery.md
│   └── react-tailwind-integration.md
├── references/
│   ├── classification-guide.md
│   ├── resource-schema.json
│   └── workflow-cheat-sheet.md
└── scripts/
    ├── elementra-cli.js
    └── validate-skill.js
```

---

## 2. Independence from Website Archive

This package is **completely decoupled** from the ElementraUI website source code:
- Zero runtime dependencies on the website bundler or dev server.
- The `scripts/elementra-cli.js` discovery script runs standalone with native Node.js APIs.
- Operates autonomously with local catalogue files or remote endpoints.

---

## 3. Packaging Pre-Requisites

Before creating the final ZIP:
1. Run `node scripts/validate-skill.js` to ensure 100% assertions pass.
2. Confirm `node_modules/` and `.git/` are strictly absent.
3. Compress using standard ZIP compression into `release/ElementraUI-Skill.zip`.
