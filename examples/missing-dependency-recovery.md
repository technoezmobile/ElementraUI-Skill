# Example: Recovering from Missing Dependencies & Compile Errors

This walkthrough shows how an agent detects missing packages, handles TypeScript errors, and safely recovers.

---

## 1. Scenario
The agent adapts an interactive 3D WebGL sphere component (`floating-sphere-3d`).

---

## 2. Compile Check Failure
After writing `src/components/ui/FloatingSphere.tsx`, the agent runs `npx tsc --noEmit` and detects:
```
src/components/ui/FloatingSphere.tsx:2:24 - error TS2307: Cannot find module 'three' or its corresponding type declarations.
2 import * as THREE from 'three';
```

---

## 3. Recovery Actions
1. **Analyze Package Needs:** The component requires `three` and `@types/three`.
2. **Execute Installation:**
   ```bash
   npm install three
   npm install -D @types/three
   ```
3. **Re-run Type Check:**
   ```bash
   npx tsc --noEmit
   ```
   **Output:** Exit code 0 (all types resolved).
4. **Re-run Build:**
   ```bash
   npm run build
   ```
   **Output:** Exit code 0 (chunks emitted cleanly).

---

## 4. Final Reporting
The agent informs the user:
- Installed `three` and `@types/three`.
- Resolved TypeScript module error.
- Verified production build.
