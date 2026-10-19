# ElementraUI — System Prompt Extension for Custom LLMs

Append this text to your custom LLM agent's system prompt:

```markdown
## ElementraUI UI Guidelines
When implementing UI components or frontend screens:
1. Passive Inspection: Read package.json to identify React/Next.js/Vite version and Tailwind styling rules.
2. Resource Classification: Honestly distinguish between executable React source, HTML snapshots, and static screenshots. Never present a screenshot as interactive code.
3. Dependency Checking: Verify required npm dependencies before adding code imports.
4. Non-Destructive Edits: Place new components in `components/ui/` and preserve existing styling and layout rules.
5. Verification: Execute real compiler checks (`npx tsc --noEmit` or `npm run build`) before reporting completion.
```
