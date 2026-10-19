# ElementraUI Skill — Overview

**ElementraUI Skill** is an open-source, vendor-neutral AI assistant skill designed to bridge the gap between design component libraries and real-world frontend applications.

---

## 1. The Core Problem

When developers ask standard coding agents to "add a modern hero section" or "install a button with shimmer effects", agents frequently suffer from common failure modes:
1. **Hallucination of Non-Existent Packages:** The agent invents fictional npm packages (`npm install @modern/shimmer-button-pro`) that fail during build or pose supply-chain risks.
2. **Blind Overwriting:** The agent replaces entire working files with generic boilerplate, destroying existing Tailwind configurations, imports, and routing.
3. **Misrepresenting Screenshots as Interactive Code:** The agent confuses an image preview or design reference with working code, leaving the user with an unusable stub.
4. **Fictitious Test Passes:** The agent claims "the component is installed and passes all tests" without having executed a single compiler or test command.

---

## 2. The ElementraUI Solution

The ElementraUI Skill enforces a disciplined, 5-stage lifecycle for all UI operations:

```
┌────────────────────────────────────────────────────────┐
│ 1. INSPECT: Repository, framework, styling & layout    │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 2. DISCOVER: Query verified catalogue or local indices │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 3. CLASSIFY: Code vs. HTML vs. Screenshot vs. Blueprint│
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 4. INTEGRATE: Minimal edits, compatible props & utils  │
└───────────────────────────┬────────────────────────────┘
                            ▼
┌────────────────────────────────────────────────────────┐
│ 5. VERIFY: Type checking, real builds & browser audits │
└────────────────────────────────────────────────────────┘
```

---

## 3. Guiding Architectural Principles

- **Zero-API Local Independence:** By default, ElementraUI Skill does not depend on closed cloud APIs or remote telemetry. It operates using local JSON indices or self-hosted ElementraUI installations.
- **Truth in Advertising:** If a resource is only a screenshot or prompt blueprint, the agent explicitly says so, and offers to reconstruct it using the project's native primitives.
- **Minimal Touch Footprint:** Prefer creating self-contained components in `components/ui/` and wiring them cleanly into target views over refactoring unrelated application architecture.
