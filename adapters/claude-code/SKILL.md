---
name: elementraui
description: Discover, evaluate, and integrate UI components from ElementraUI into web applications.
---

# ElementraUI Claude Code Skill

When the user asks for UI components, design tokens, or frontend elements:
1. Inspect the repository's `package.json` to identify the framework (React, Next.js, Vite), styling system (Tailwind v3 vs v4), and component directory.
2. Query ElementraUI components using `node scripts/elementra-cli.js search "<term>"`.
3. Check the classification of the resource (`node scripts/elementra-cli.js classify "<id>"`).
4. Truthfully distinguish executable React code from HTML snapshots and screenshots.
5. Verify and install missing dependencies before modifying code.
6. Run `npm run build` or `npx tsc --noEmit` after integration to guarantee zero build errors.
