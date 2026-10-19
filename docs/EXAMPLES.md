# ElementraUI Skill — Practical Interaction Examples

This document demonstrates realistic prompt interactions and workflows between users and agents equipped with the ElementraUI Skill.

---

## Example 1: Integrating an Executable Component (Shimmer Button)

**User Prompt:**
> "Find an interactive action button with a continuous light shimmer on ElementraUI and add it to our landing page hero."

**Agent Response:**
1. **Inspecting Workspace:** Detected Vite + React 19 + Tailwind CSS v4 in `src/`. Found `src/components/` and `src/lib/utils.ts`.
2. **Querying Catalogue:** Found `shimmer-light-button`.
   - *Classification:* `executable-react` (has verified source code).
   - *Dependencies:* `framer-motion`, `clsx`, `tailwind-merge`.
3. **Checking Dependencies:** `clsx` and `tailwind-merge` are installed; `framer-motion` is missing.
4. **Action:** Prompts user to install `framer-motion`:
   ```bash
   npm install framer-motion
   ```
5. **Writing Component:** Creates `src/components/ui/ShimmerButton.tsx`.
6. **Integrating View:** Adds `<ShimmerButton onClick={handleGetStarted}>Get Started Now</ShimmerButton>` to `src/pages/Hero.tsx`.
7. **Verifying:** Runs `npm run build`. Build completes cleanly in 3.4s with 0 errors.

---

## Example 2: Adapting an HTML Snapshot into a React Project

**User Prompt:**
> "I like the animated collection cards in ElementraUI. Can we bring that into our dashboard?"

**Agent Response:**
1. **Inspection & Classification:** Found `awesome-0xurvish-animated-collection-default`.
   - *Classification:* `html-snapshot` (pre-rendered DOM snapshot).
   - *Honesty Check:* Clearly informs the user: *"Note: This resource is provided as an HTML DOM snapshot. I will transcribe the HTML and inline CSS into a type-safe React component matching our project's Tailwind styling."*
2. **Action:** Transcribes markup into `src/components/ui/AnimatedCollectionCard.tsx`, replacing hardcoded styles with Tailwind classes.
3. **Verification:** Validates JSX syntax and runs `npx tsc --noEmit`.

---

## Example 3: Handling a Screenshot Reference Honestly

**User Prompt:**
> "Add the reveal text effect from ElementraUI."

**Agent Response:**
1. **Inspection & Classification:** Located `awesome-isaiahbjork-reveal-text-default`.
   - *Classification:* `screenshot-reference`.
   - *Honesty Check:* *"This component in the catalogue is currently marked as a Screenshot Reference; it does not contain local executable source code. Instead of copying an unusable stub, I can build this effect from scratch using Tailwind CSS `clip-path` and transition animations. Would you like me to construct that?"*
2. **Action:** Constructs clean, native code from scratch upon user confirmation.
