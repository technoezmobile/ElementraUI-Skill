# ElementraUI Skill — Component Integration Workflow

This document details the rigorous 5-stage lifecycle that coding agents follow when implementing UI resources using ElementraUI.

---

## Stage 1: Workspace & Architecture Inspection

Before editing any code, the agent performs a passive audit of the host repository:

1. **Check Manifest (`package.json`):**
   - React version (React 18 vs React 19).
   - Bundler (Next.js, Vite, Webpack, Remix, Astro).
   - Existing icon libraries (`lucide-react`, `@tabler/icons-react`, `heroicons`).
   - Animation engines (`framer-motion`, `gsap`, pure CSS).
   - 3D engines (`three`, `@react-three/fiber`).
2. **Check Styling System:**
   - Tailwind version (v3 with `tailwind.config.js` vs v4 with `@import "tailwindcss"`).
   - CSS variables or color token definitions.
3. **Check Utilities:**
   - Presence of `cn(...)` class merger (`clsx` + `tailwind-merge`) in `lib/utils.ts` or `src/utils.ts`.

---

## Stage 2: Resource Discovery

The agent identifies candidate components using the configured discovery mode:
- Queries local catalogues (`node scripts/elementra-cli.js search "<term>"`).
- Selects items matching the user's aesthetic and functional criteria.

---

## Stage 3: Resource Classification & Honesty Audit

The agent examines the component data model and applies the classification rules:
- **Executable React:** Code is copied, formatted, and adapted directly.
- **HTML Snapshot:** DOM elements and inline styles are converted into semantic JSX.
- **Screenshot Reference:** The agent explains that no runnable code exists and creates an implementation from scratch inspired by the visual screenshot.
- **AI Prompt:** The agent uses the prompt specification to generate custom code.

---

## Stage 4: Non-Destructive Code Integration

1. Create the component file in the target directory (e.g. `src/components/ui/<name>.tsx`).
2. Add `"use client"` directive if using Next.js App Router and client-side hooks.
3. Import dependencies safely.
4. Mount the component in the requested parent view.

---

## Stage 5: Verification & Reporting

1. **Typecheck:** Execute `npx tsc --noEmit` or the project's typecheck script.
2. **Build:** Run `npm run build` to verify bundler minification and module resolution.
3. **Report:** Provide the user with:
   - Created files.
   - Modified files.
   - Installed packages.
   - Build status.
