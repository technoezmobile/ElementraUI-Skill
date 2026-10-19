# ElementraUI Workflow Cheat Sheet

Quick 5-step checklist for coding agents:

1. **[ ] Inspect Project:**
   - Detect React 18/19, Next.js, or Vite.
   - Detect Tailwind v3 or v4.
   - Verify `src/lib/utils.ts` has `cn(...)`.
2. **[ ] Discover Resource:**
   - Run `node scripts/elementra-cli.js search "<term>"`.
   - Run `node scripts/elementra-cli.js inspect "<id>"`.
3. **[ ] Check Classification:**
   - Never call a screenshot an interactive component.
   - Verify dependencies (`framer-motion`, `three`, `lucide-react`).
4. **[ ] Implement Cleanly:**
   - Place in `components/ui/<Name>.tsx`.
   - Add `"use client"` if needed for Next.js App Router.
   - Wire into consumer view with sample props.
5. **[ ] Verify:**
   - Run `npx tsc --noEmit` or `npm run build`.
   - Confirm exit code 0.
   - Report exact files and tests.
