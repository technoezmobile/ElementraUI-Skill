# ElementraUI Skill — Resource Classification Taxonomy

To prevent hallucinated functionality or misleading claims, ElementraUI categorizes every marketplace resource into one of seven strict types:

---

## 1. Executable React Component (`executable-react`)
- **Definition:** The resource contains genuine, complete React 18/19 or TypeScript JSX source code (`componentCode`).
- **Capabilities:** Can be rendered live in sandboxed runners, compiled in browser, and copied directly into projects.
- **Example:** `shimmer-light-button`, `floating-sphere-3d`, `magicui-lens`.

---

## 2. HTML Snapshot (`html-snapshot`)
- **Definition:** The resource provides pre-rendered DOM markup (`rendered.html`) and associated stylesheet or canvas scripts.
- **Capabilities:** Renders in a sandboxed iframe. Requires transcription by the coding agent to convert HTML syntax into React JSX components.
- **Example:** `awesome-0xurvish-animated-collection-default`.

---

## 3. Screenshot Reference (`screenshot-reference`)
- **Definition:** The resource contains only a visual raster capture (`screenshot.png`) without executable code.
- **Capabilities:** Used strictly for visual inspiration. The coding agent must never claim this is interactive, and must offer to construct an equivalent component from scratch.
- **Example:** `awesome-isaiahbjork-reveal-text-default` (fallback state).

---

## 4. AI Prompt Blueprint (`prompt-blueprint`)
- **Definition:** A structured prompt specification (`prompt.md`) detailing layout, animations, framework constraints, and styling tokens.
- **Capabilities:** Designed to feed into AI generation tools or pair programmers to scaffold a novel component.
- **Example:** `prompt-saas-pricing-matrix`.

---

## 5. Theme & Design Tokens (`theme-tokens`)
- **Definition:** A structured dictionary of CSS custom variables (light and dark modes) defining semantic design tokens (`--background`, `--primary`, `--border`).
- **Capabilities:** Injected into `index.css` or Tailwind theme extensions.
- **Example:** `theme-zinc-modernist`, `theme-cyber-neon-contrast`.

---

## 6. Template Application Starter (`template-starter`)
- **Definition:** Multi-page architectural specification including directory trees, routing models, and wireframes.
- **Capabilities:** Scaffolds full layouts (dashboards, marketing pages) into empty or designated folders.
- **Example:** `template-saas-platform-starter`.

---

## 7. CLI Registry Blueprint (`registry-spec`)
- **Definition:** Ingested component records providing CLI scaffolding commands (`npx elementra add <slug>`).
- **Capabilities:** Direct scaffolding via CLI without manual source copying.
- **Example:** `shadcn-accordion`.
