# Example: Adapting an HTML Snapshot into a React Component

This walkthrough demonstrates how an agent adapts an HTML snapshot (`rendered.html`) into a clean, reusable React component.

---

## 1. Context & Honest Notice
The user selects a community component from the Awesome collection (`awesome-0xurvish-animated-collection-default`).
The agent inspects the resource and reports:
> "Note: This resource is an HTML DOM snapshot from the community index. I will transcribe the markup, extract the keyframe animations into Tailwind CSS, and produce a type-safe React component."

---

## 2. Input HTML Snapshot (`rendered.html`)
```html
<div class="card-container" style="background:#0a0a0c; border:1px solid #222; border-radius:12px; padding:20px;">
  <span style="color:#06b6d4; font-size:12px; font-weight:600;">FEATURE COLLECTION</span>
  <h3 style="color:#fff; font-size:18px; margin-top:8px;">Animated Component Pack</h3>
  <p style="color:#888; font-size:14px;">A curated set of micro-interactions and transitions.</p>
</div>
```

---

## 3. Adapted React Component (`src/components/ui/FeatureCollectionCard.tsx`)
```tsx
import React from "react";
import { cn } from "@/lib/utils";

interface FeatureCollectionCardProps {
  title: string;
  badge?: string;
  description: string;
  className?: string;
}

export const FeatureCollectionCard: React.FC<FeatureCollectionCardProps> = ({
  title,
  badge = "FEATURE COLLECTION",
  description,
  className
}) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-neutral-800 bg-[#0a0a0c] p-5 shadow-lg transition-all duration-200 hover:border-cyan-500/50 hover:shadow-cyan-500/10",
        className
      )}
    >
      <span className="font-mono text-xs font-semibold tracking-wider text-cyan-400">
        {badge}
      </span>
      <h3 className="mt-2 text-lg font-bold text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-neutral-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
};
```

---

## 4. Verification
Agent verifies that hardcoded inline styles have been converted to standard Tailwind classes, imports compile without errors, and runs `npx tsc --noEmit`.
