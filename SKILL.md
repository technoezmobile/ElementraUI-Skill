---
name: elementraui-skill
description: >-
  Discover, evaluate, inspect, and safely integrate UI components, themes, and templates from
  ElementraUI into React, Next.js, Vite, and web projects. Inspects project conventions before modifying
  code, truthfully classifies executable source versus screenshots and design references, verifies
  dependency compatibility, preserves existing architecture, and conducts real verification.
---

# ElementraUI AI Coding Skill

> **Discover. Preview. Build.**
> Official AI pair-programming skill for the [ElementraUI](https://github.com/elementraui/elementraui) component marketplace and design engineering platform.

The **ElementraUI Skill** equips AI coding agents (Antigravity, Claude Code, Cursor, Windsurf, and custom LLM agents) to intelligently discover, evaluate, adapt, and integrate UI components, design systems, and templates from the ElementraUI marketplace and resource library.

---

## Core Philosophy & Prime Directives

1. **Inspect Before Modifying:** Never blindly modify code or inject components into an unfamiliar repository. Always inspect `package.json`, framework, styling conventions, component directory structure, and existing design tokens first.
2. **Truthful Resource Classification:** Never claim or imply that a screenshot, design reference, or prompt is an executable interactive component. Clearly distinguish between:
   - **Executable React/TSX Component:** Real, runnable source code with declared dependencies.
   - **HTML/CSS/JS Snapshot:** Sandboxed DOM markup requiring adaptation into the target framework.
   - **Screenshot Reference:** Static visual capture intended as visual design reference only.
   - **AI Prompt Blueprint:** Structured instructions designed to scaffold a new component.
   - **Theme & Design Tokens:** CSS custom variables and color palette tokens.
   - **Template Starter:** Architectural multi-page scaffolding and wireframes.
3. **Architecture & Style Preservation:** Respect and match existing project conventions (Tailwind configuration, CSS modules, Radix primitives, icon sets, class naming patterns) rather than enforcing foreign architectures.
4. **Dependency Safety:** Check package compatibility before suggesting installations. Never invent package names or blindly install unverified external dependencies without user confirmation.
5. **Empirical Verification:** Never report that an integration "works" or that tests "passed" unless actually verified using the host project's build tools or browser checks.

---

## 1. Project Inspection Phase (Step 1)

Before recommending or integrating any component, run an initial inspection of the target workspace:

1. **Framework Identification:**
   - Detect React 18/19, Next.js (App Router vs Pages Router), Vite, Remix, Astro, or plain HTML.
   - Check `package.json` dependencies and `devDependencies`.
2. **Styling & Design System:**
   - Detect Tailwind CSS (v3 vs v4), Vanilla CSS, CSS Modules, Styled Components, or Tailwind plugins.
   - Check `tailwind.config.js` or `@tailwindcss/vite` imports in CSS entry points.
   - Detect UI primitives: `radix-ui`, `shadcn/ui` (`components.json`), `lucide-react`, `framer-motion`, `three`.
3. **Directory Layout:**
   - Locate component directory: `src/components/`, `components/ui/`, `app/components/`.
   - Locate utility helpers: `lib/utils.ts` (`cn` helper using `clsx` + `tailwind-merge`).
   - Locate path aliases: `@/*`, `~/*` in `tsconfig.json` or `vite.config.ts`.

---

## 2. Resource Discovery Strategy (Step 2)

ElementraUI supports flexible, configurable discovery modes depending on your environment:

### Mode A: Local Workspace Discovery (Verified Local Store)
If the project or local workspace includes an ElementraUI catalogue export (`src/data/fullCatalogue.json` or `public/data/awesome-catalogue.json`):
```bash
# Query catalogue using the bundled lightweight query CLI:
node scripts/elementra-cli.js search "button" --source core
node scripts/elementra-cli.js inspect "shimmer-light-button"
```

### Mode B: Configured Endpoint / Public Web Discovery
If an ElementraUI local server or public deployment is running (configurable via `ELEMENTRAUI_URL`):
- Read the local `/data/fullCatalogue.json` or query the designated endpoint.
- If no endpoint is configured or available online, **do not invent an API URL**. Explain the constraint and request that the user provide the component name, source snippet, or local catalogue path.

---

## 3. Resource Evaluation & Classification (Step 3)

Examine the candidate resource and classify it strictly according to the following taxonomy:

| Resource Classification | Indicators | Handling Rule |
| :--- | :--- | :--- |
| **Executable React/TSX** | Contains `.tsx`/`.jsx` source code, explicit exports, and declared imports. | Directly compatible for adaptation and integration into modern React/Next.js projects. |
| **HTML Snapshot** | Contains static `rendered.html` markup and inline CSS. | Transcribe semantic DOM into React JSX, mapping CSS classes to the target project's Tailwind setup. |
| **Screenshot Reference** | Contains image asset (`screenshot.png`) without executable code. | **Do not attempt to run.** Analyze visual composition and offer to build an equivalent component from scratch using standard primitives. |
| **AI Prompt Blueprint** | Contains structured prompt markdown (`prompt.md`). | Use the prompt instructions as a specification to generate clean, idiomatic code adhering to the target project's conventions. |
| **Theme / Design Tokens** | Contains CSS variable definitions (`--primary`, `--background`). | Merge CSS variables into the project's global stylesheet or Tailwind theme configuration. |
| **Template Starter** | Multi-file page scaffolding or wireframe. | Scaffold requested pages or layout shells without overwriting existing root files. |

---

## 4. Integration & Adaptation Workflow (Step 4)

Follow this 7-step sequence when integrating a component:

### Step 4.1: Propose Plan & Check Dependencies
- Explain what component will be added and where (`src/components/ui/<component-name>.tsx`).
- Identify required external dependencies (e.g. `lucide-react`, `framer-motion`, `clsx`, `tailwind-merge`).
- If dependencies are missing from `package.json`, prompt the user or run standard installation:
  ```bash
  npm install framer-motion clsx tailwind-merge
  ```

### Step 4.2: Ensure Prerequisite Utilities
- Verify the existence of the standard `cn(...)` utility helper. If missing, create `src/lib/utils.ts`:
  ```typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";

  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  ```

### Step 4.3: Write Component Code
- Place the component into the project's standard component folder.
- Maintain documentation integrity and preserve all licensing and author attribution headers.
- Implement responsive layout rules and accessible keyboard/focus semantics.
- For Next.js App Router projects, prepend `"use client"` if the component uses hooks (`useState`, `useEffect`) or browser events.

### Step 4.4: Integrate with Consumer Views
- Connect the newly created component to the target screen or parent page requested by the user.
- Provide clean, functional mock props or data contracts if the parent view requires them.

---

## 5. Verification Phase (Step 5)

Never declare an integration complete without verifying it against real build tools:

1. **Type Checking:** Run the project's type checker:
   ```bash
   npx tsc --noEmit
   # or
   npm run build
   ```
2. **Build Test:** Confirm the bundler (Vite, Next.js, Webpack) transforms all imported assets cleanly without syntax or module resolution errors.
3. **Browser Check (Where Available):**
   - If browser tools (Playwright, Puppeteer) are configured, verify that the component mounts with non-zero dimensions and without console errors.
4. **Transparent Reporting:** Report:
   - Exact files created or modified.
   - Dependencies added or verified.
   - Tests and builds executed.
   - Any items that could not be verified in the current environment.

---

## 6. Safety & Untrusted Code Boundaries

- **Untrusted Remote Code:** Treat third-party component snippets as untrusted. Audit code for dangerous patterns (`dangerouslySetInnerHTML`, unexpected `eval()`, network telemetry calls) before saving.
- **No Overwrite Without Confirmation:** Never replace existing business logic or custom components unless the user explicitly requested a redesign.
- **Never Fake Test Results:** If a test command is unavailable or fails, report the exact status and provide the manual command for the user to execute.
