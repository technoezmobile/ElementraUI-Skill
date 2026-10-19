# ElementraUI Skill — Troubleshooting & Diagnostics

This guide addresses common issues encountered when integrating UI components and using the ElementraUI Skill.

---

## 1. Missing `cn(...)` Class Merger Utility

**Symptom:**
```
Cannot find module '@/lib/utils' or its corresponding type declarations.
```
**Resolution:**
ElementraUI components use the industry-standard `cn(...)` utility helper. If missing in the host project, create `src/lib/utils.ts`:
```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```
Install the prerequisite packages:
```bash
npm install clsx tailwind-merge
```

---

## 2. Next.js `"use client"` Hook Errors

**Symptom:**
```
Error: useState can only be used in Client Components. Add "use client" directive at the top of the file.
```
**Resolution:**
In Next.js App Router projects (`app/` directory), components using React hooks (`useState`, `useEffect`, `useRef`) or event listeners must declare the client boundary. Prepend `"use client";` to the top of the component file:
```typescript
"use client";

import React, { useState } from "react";
// ...
```

---

## 3. Missing Animation Packages (`framer-motion`)

**Symptom:**
```
Cannot find module 'framer-motion'
```
**Resolution:**
Certain interactive components (e.g. `shimmer-light-button`, `magicui-magic-card`) utilize Framer Motion. Install it:
```bash
npm install framer-motion
```
If you prefer a zero-dependency alternative, ask the agent:
*"Convert this Framer Motion animation into pure Tailwind CSS keyframe animations."*

---

## 4. Catalogue Not Found Error in CLI

**Symptom:**
```
Error: No ElementraUI catalogue found on disk.
```
**Resolution:**
Provide the explicit path using `--catalogue`:
```bash
node scripts/elementra-cli.js search "button" --catalogue /path/to/fullCatalogue.json
```
Or set the environment variable:
```bash
export ELEMENTRAUI_CATALOGUE_PATH="/path/to/fullCatalogue.json"
```
