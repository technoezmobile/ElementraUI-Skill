# Example: Handling Screenshots & Design References Honestly

This walkthrough demonstrates how an agent refuses to fabricate interactivity for non-executable resources and instead provides honest, productive alternatives.

---

## 1. User Request
> "Install the Linear Dark SaaS theme from ElementraUI into our dashboard."

---

## 2. Agent Resource Classification
Agent queries the catalogue:
```bash
node scripts/elementra-cli.js inspect "ref-linear-dark-saas"
```
**Output:**
```
Classification: DESIGN-REFERENCE (Design observation & reference only)
Has Code: NO
```

---

## 3. Honest Agent Explanation to User
> "I found **Linear App Dark Aesthetic** (`ref-linear-dark-saas`).  
> **Important Distinction:** This resource is a **Design Reference**, not an installable React package or executable source code. It contains design observations (1px border contrasts, deep obsidian slate backgrounds `#08090C`, and monochromatic gradients).
>
> Rather than leaving you with an empty file, I can implement a complete design token preset in your `tailwind.config.js` and global stylesheet inspired by this Linear aesthetic. Would you like me to proceed with that?"

---

## 4. User Approves & Agent Implements Tokens
Upon user confirmation, the agent merges the obsidian color tokens into `src/index.css`:
```css
@theme {
  --color-obsidian-950: #08090c;
  --color-obsidian-900: #121316;
  --color-obsidian-border: #1e2025;
}
```

---

## 5. Verification & Summary
The agent reports:
- Created design tokens in `src/index.css`.
- Clarified that no fictional npm package was installed.
- Ran `npm run build` to confirm CSS builds cleanly.
