# Example: Integrating an Executable React Component

This walkthrough demonstrates integrating an executable component (`shimmer-light-button`) into a React + Tailwind application.

---

## 1. User Request
> "Add an animated action button with a shimmering reflection to our pricing page CTA."

## 2. Agent Inspection
1. Checks `package.json`: Project is React 19 + Vite + Tailwind CSS v4.
2. Checks dependencies: Missing `framer-motion`.
3. Checks utilities: `src/lib/utils.ts` exists and exports `cn(...)`.

## 3. Dependency Installation
Agent installs the missing dependency:
```bash
npm install framer-motion
```

## 4. Component Creation (`src/components/ui/ShimmerButton.tsx`)
```tsx
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  children: React.ReactNode;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  shimmerColor = "rgba(255, 255, 255, 0.2)",
  children,
  className,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "relative overflow-hidden rounded-xl bg-neutral-900 px-6 py-3 font-medium text-white shadow-lg transition-colors hover:bg-neutral-800",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div
        className="absolute inset-0 z-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{ translateX: ["100%", "-100%"] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
        style={{ background: `linear-gradient(90deg, transparent, ${shimmerColor}, transparent)` }}
      />
    </motion.button>
  );
};
```

## 5. Mounting in View (`src/pages/Pricing.tsx`)
```tsx
import { ShimmerButton } from "@/components/ui/ShimmerButton";

export function PricingCta() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4">Ready to upgrade?</h2>
      <ShimmerButton onClick={() => console.log("Upgraded")}>
        Get Started Today
      </ShimmerButton>
    </div>
  );
}
```

## 6. Verification
Agent runs `npm run build` and reports exit code 0 with clean chunk emissions.
