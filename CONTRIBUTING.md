# Contributing to ElementraUI Skill

Thank you for contributing to the **ElementraUI AI Coding Skill**!

We welcome contributions to expand platform adapters, enhance discovery algorithms, add integration examples, improve documentation, and optimize agent decision trees.

---

## Code of Conduct

All contributors agree to abide by the [Code of Conduct](https://github.com/elementraui/elementraui-skill/blob/main/CODE_OF_CONDUCT.md). Please foster an inclusive and welcoming environment.

---

## Development & Contribution Guidelines

### 1. Structure Preservation
- Keep `SKILL.md` portable and vendor-neutral. Platform-specific setup belongs in `adapters/` or `docs/INSTALLATION.md`.
- Keep `scripts/elementra-cli.js` free of runtime dependencies to ensure it runs out-of-the-box in any Node.js environment.

### 2. Running Local Validation
Before submitting changes, run the validator to ensure all required files, documentation links, and syntax pass:
```bash
npm test
# or
node scripts/validate-skill.js
```

### 3. Adding New Platform Adapters
When adding support for a new AI coding tool:
1. Create a subfolder in `adapters/<platform-name>/`.
2. Include the exact configuration or prompt file expected by that platform.
3. Update `docs/SUPPORTED_AGENTS.md` and `docs/INSTALLATION.md` with tested installation instructions.
4. If testing could not be completed on actual hardware or software, clearly label the status as **NOT VERIFIED**.

### 4. Submitting a Pull Request
1. Fork the repository and create a descriptive branch: `feature/add-neovim-avante-adapter`.
2. Commit with conventional commit messages: `feat(adapters): add Avante.nvim adapter`.
3. Open a Pull Request on GitHub describing your changes and verification steps.
