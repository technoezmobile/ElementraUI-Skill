# ElementraUI Skill — Usage Guide

This guide explains how to interact with an AI coding agent equipped with the **ElementraUI Skill**.

---

## 1. Natural Language Trigger Phrases

Once the skill is active, you can invoke it naturally during conversation:

- *"Find a high-quality action button with motion effects on ElementraUI."*
- *"Integrate the Shimmer Light Button into our settings page."*
- *"What themes or design token presets are available in ElementraUI?"*
- *"Adapt this animated hero section from ElementraUI into our Next.js App Router project."*
- *"Search for interactive 3D WebGL components for our landing page."*

---

## 2. What the Agent Will Do

When prompted with a UI task, the agent will follow this sequence:

1. **Acknowledge and Inspect:**  
   The agent inspects your repository (`package.json`, Tailwind config, component paths). It will determine whether your project uses React 19, Next.js, Vite, Tailwind v3 or v4.
2. **Search and Classify:**  
   The agent queries the ElementraUI index and tells you the honest nature of the resource:
   - *"I found `shimmer-light-button`. It is an executable React component with Framer Motion."*
   - *"I found `reveal-text`. Note that this is currently an HTML/CSS snapshot, so I will convert its markup into clean React JSX matching our Tailwind styles."*
3. **Plan and Confirm Dependencies:**  
   The agent checks whether required packages (`framer-motion`, `clsx`, `tailwind-merge`) are already installed. If not, it suggests installing them.
4. **Write Code Cleanly:**  
   It generates the component file (e.g. `src/components/ui/shimmer-button.tsx`) and connects it to your target view.
5. **Verify:**  
   It runs `npx tsc --noEmit` or `npm run build` to guarantee there are no compilation errors.

---

## 3. Direct CLI Invocations

You (or the agent) can also use the helper CLI directly from the terminal:

```bash
# Search for card components
node scripts/elementra-cli.js search "card" --limit 5

# Check full details of a specific component
node scripts/elementra-cli.js inspect "magicui-magic-card"

# Get machine-readable JSON output
node scripts/elementra-cli.js search "navbar" --json
```
