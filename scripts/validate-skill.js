#!/usr/bin/env node

/**
 * ElementraUI Skill — Integrity & Structure Validator
 *
 * Verifies that the skill package meets all documentation, metadata,
 * directory structure, adapter, and script execution requirements.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

console.log("=================================================================");
console.log("   ELEMENTRAUI SKILL: INTEGRITY & VALIDATION SUITE               ");
console.log("=================================================================\n");

const SKILL_ROOT = path.resolve(import.meta.dirname, "..");
let passCount = 0;
let failCount = 0;

function assertCheck(name, condition, details) {
  if (condition) {
    console.log(`  ✓ [PASS] ${name}${details ? ` (${details})` : ""}`);
    passCount++;
  } else {
    console.error(`  ✗ [FAIL] ${name}${details ? ` (${details})` : ""}`);
    failCount++;
  }
}

// 1. Verify Core Files
console.log("--- 1. Required Root Files ---");
const REQUIRED_ROOT_FILES = [
  "SKILL.md",
  "README.md",
  "LICENSE",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
  "SECURITY.md",
  "package.json",
  ".gitignore",
  ".editorconfig"
];

for (const file of REQUIRED_ROOT_FILES) {
  const p = path.join(SKILL_ROOT, file);
  assertCheck(`Root file: ${file}`, fs.existsSync(p));
}

// 2. Verify SKILL.md Frontmatter
console.log("\n--- 2. SKILL.md Metadata & Frontmatter ---");
const skillPath = path.join(SKILL_ROOT, "SKILL.md");
let skillContent = "";
if (fs.existsSync(skillPath)) {
  skillContent = fs.readFileSync(skillPath, "utf8");
}

const hasFrontmatter = skillContent.startsWith("---") && skillContent.indexOf("---", 3) !== -1;
assertCheck("SKILL.md has YAML frontmatter fences", hasFrontmatter);

const hasName = /name:\s*elementraui-skill/.test(skillContent);
assertCheck("SKILL.md frontmatter specifies name 'elementraui-skill'", hasName);

const hasDescription = /description:\s*>?-?/.test(skillContent);
assertCheck("SKILL.md frontmatter includes detailed description", hasDescription);

// 3. Verify Documentation Suite
console.log("\n--- 3. Required Documentation Suite (docs/) ---");
const REQUIRED_DOCS = [
  "OVERVIEW.md",
  "INSTALLATION.md",
  "USAGE.md",
  "SUPPORTED_AGENTS.md",
  "WORKFLOW.md",
  "RESOURCE_TYPES.md",
  "CONFIGURATION.md",
  "TROUBLESHOOTING.md",
  "EXAMPLES.md",
  "TESTING.md",
  "RELEASE.md"
];

for (const doc of REQUIRED_DOCS) {
  const p = path.join(SKILL_ROOT, "docs", doc);
  assertCheck(`Documentation: docs/${doc}`, fs.existsSync(p));
}

// 4. Verify Platform Adapters
console.log("\n--- 4. Platform Adapters (adapters/) ---");
const REQUIRED_ADAPTERS = [
  "antigravity",
  "claude-code",
  "cursor",
  "windsurf",
  "generic"
];

for (const adapter of REQUIRED_ADAPTERS) {
  const p = path.join(SKILL_ROOT, "adapters", adapter);
  assertCheck(`Adapter directory: adapters/${adapter}`, fs.existsSync(p));
}

// 5. Verify Implementation Examples
console.log("\n--- 5. Implementation Examples (examples/) ---");
const REQUIRED_EXAMPLES = [
  "react-tailwind-integration.md",
  "html-snapshot-adaptation.md",
  "handling-screenshots-honestly.md",
  "missing-dependency-recovery.md"
];

for (const eg of REQUIRED_EXAMPLES) {
  const p = path.join(SKILL_ROOT, "examples", eg);
  assertCheck(`Example guide: examples/${eg}`, fs.existsSync(p));
}

// 6. Verify References
console.log("\n--- 6. Technical References (references/) ---");
const REQUIRED_REFERENCES = [
  "resource-schema.json",
  "classification-guide.md",
  "workflow-cheat-sheet.md"
];

for (const ref of REQUIRED_REFERENCES) {
  const p = path.join(SKILL_ROOT, "references", ref);
  assertCheck(`Reference file: references/${ref}`, fs.existsSync(p));
}

// 7. Verify Scripts
console.log("\n--- 7. Executable Scripts (scripts/) ---");
const cliScriptPath = path.join(SKILL_ROOT, "scripts/elementra-cli.js");
assertCheck("Discovery CLI script exists", fs.existsSync(cliScriptPath));

let scriptSyntaxValid = false;
try {
  execSync(`node --check "${cliScriptPath}"`, { stdio: "pipe" });
  scriptSyntaxValid = true;
} catch (e) {
  scriptSyntaxValid = false;
}
assertCheck("Discovery CLI script syntax is valid", scriptSyntaxValid);

// 8. Verify No Secrets or Node Modules
console.log("\n--- 8. Clean Packaging Hygiene ---");
const hasNodeModules = fs.existsSync(path.join(SKILL_ROOT, "node_modules"));
assertCheck("No node_modules directory in skill root", !hasNodeModules);

// The validator must work both in a Git checkout and in an extracted source archive.
// Do not require or reject .git here; archive hygiene is checked by the release process.

// 9. Behavioral CLI Tests
console.log("\n--- 9. Executable CLI Behavioral Test Suite ---");

function runCli(cmdArgs, options = {}) {
  const cliPath = path.join(SKILL_ROOT, "scripts/elementra-cli.js");
  const commandLine = `node "${cliPath}" ${cmdArgs}`;
  try {
    const stdout = execSync(commandLine, {
      cwd: options.cwd || SKILL_ROOT,
      env: { ...process.env, ...(options.env || {}) },
      stdio: "pipe",
      encoding: "utf8"
    });
    return { status: 0, stdout, stderr: "" };
  } catch (err) {
    return {
      status: err.status ?? 1,
      stdout: err.stdout?.toString("utf8") || "",
      stderr: err.stderr?.toString("utf8") || ""
    };
  }
}

// 9.1 Missing catalogue handling
const missingCatRes = runCli("--catalogue ./does-not-exist-xyz123.json list-categories");
assertCheck(
  "Missing catalogue exits with non-zero status code",
  missingCatRes.status !== 0,
  `status: ${missingCatRes.status}`
);
assertCheck(
  "Missing catalogue outputs clear error message",
  missingCatRes.stderr.includes("not found") || missingCatRes.stdout.includes("not found") || missingCatRes.stderr.includes("Error"),
  "error message verified"
);

// 9.2 Valid catalogue loading via --catalogue flag
const validCatRes = runCli("--catalogue data/sample-catalogue.json list-categories --json");
let validCatJson = null;
try {
  validCatJson = JSON.parse(validCatRes.stdout);
} catch (e) {
  validCatJson = null;
}
assertCheck(
  "Valid catalogue loads successfully via --catalogue flag",
  validCatRes.status === 0 && Array.isArray(validCatJson) && validCatJson.length > 0,
  `${validCatJson?.length || 0} categories loaded`
);

// 9.3 Category listing (plain text and json)
const listCatText = runCli("list-categories");
assertCheck(
  "list-categories runs in text mode without error",
  listCatText.status === 0 && (listCatText.stdout.includes("Available ElementraUI Categories") || listCatText.stdout.includes("Categories"))
);

const listCatJson = runCli("list-categories --json");
let parsedCategories = null;
try {
  parsedCategories = JSON.parse(listCatJson.stdout);
} catch (e) {
  parsedCategories = null;
}
assertCheck(
  "list-categories --json returns valid JSON array",
  listCatJson.status === 0 && Array.isArray(parsedCategories) && parsedCategories.length > 0,
  `${parsedCategories?.length} categories`
);

// 9.4 Keyword search
const searchRes = runCli('search "button" --json');
let searchItems = [];
try {
  searchItems = JSON.parse(searchRes.stdout);
} catch (e) {
  searchItems = [];
}
assertCheck(
  "search 'button' finds relevant items",
  searchRes.status === 0 && searchItems.length > 0,
  `${searchItems.length} items found`
);

const searchLimitRes = runCli('search "button" --limit 2 --json');
let searchLimitItems = [];
try {
  searchLimitItems = JSON.parse(searchLimitRes.stdout);
} catch (e) {
  searchLimitItems = [];
}
assertCheck(
  "search respects --limit argument",
  searchLimitRes.status === 0 && searchLimitItems.length <= 2,
  `limit 2 returned ${searchLimitItems.length} items`
);

const searchEmptyRes = runCli('search "xyzNonExistentQuery99999" --json');
let searchEmptyItems = null;
try {
  searchEmptyItems = JSON.parse(searchEmptyRes.stdout);
} catch (e) {
  searchEmptyItems = null;
}
assertCheck(
  "search with non-matching query returns empty array gracefully",
  searchEmptyRes.status === 0 && Array.isArray(searchEmptyItems) && searchEmptyItems.length === 0,
  "empty array returned"
);

// 9.5 Resource inspection
const inspectValid = runCli("inspect shimmer-light-button --json");
let inspectData = null;
try {
  inspectData = JSON.parse(inspectValid.stdout);
} catch (e) {
  inspectData = null;
}
assertCheck(
  "inspect returns full metadata for valid resource ID",
  inspectValid.status === 0 && inspectData?.id === "shimmer-light-button" && !!inspectData?.componentCode,
  `id: ${inspectData?.id}, category: ${inspectData?.category}`
);

const inspectInvalid = runCli("inspect non-existent-resource-id-12345 --json");
assertCheck(
  "inspect with non-existent ID exits with error",
  inspectInvalid.status !== 0,
  `status: ${inspectInvalid.status}`
);

const inspectNoArg = runCli("inspect");
assertCheck(
  "inspect without resource ID exits with error",
  inspectNoArg.status !== 0,
  `status: ${inspectNoArg.status}`
);

// 9.6 Resource classification
const classifyExec = runCli("classify shimmer-light-button --json");
let classifyExecData = null;
try {
  classifyExecData = JSON.parse(classifyExec.stdout);
} catch (e) {
  classifyExecData = null;
}
assertCheck(
  "classify identifies executable component honestly",
  classifyExec.status === 0 && classifyExecData?.classification === "executable-react" && classifyExecData?.executable === true,
  `classification: ${classifyExecData?.classification}`
);

const classifySnapshot = runCli("classify animated-collection --json");
let classifySnapshotData = null;
try {
  classifySnapshotData = JSON.parse(classifySnapshot.stdout);
} catch (e) {
  classifySnapshotData = null;
}
assertCheck(
  "classify identifies html-snapshot honestly (executable: false)",
  classifySnapshot.status === 0 && classifySnapshotData?.classification === "html-snapshot" && classifySnapshotData?.executable === false,
  `classification: ${classifySnapshotData?.classification}`
);

const classifyPrompt = runCli("classify prompt-animated-accordion --json");
let classifyPromptData = null;
try {
  classifyPromptData = JSON.parse(classifyPrompt.stdout);
} catch (e) {
  classifyPromptData = null;
}
assertCheck(
  "classify identifies prompt blueprint honestly (executable: false)",
  classifyPrompt.status === 0 && classifyPromptData?.classification === "prompt-blueprint" && classifyPromptData?.executable === false,
  `classification: ${classifyPromptData?.classification}`
);

// 9.7 Invalid JSON handling
const tempInvalidJsonPath = path.join(SKILL_ROOT, "temp-invalid-catalog.json");
try {
  fs.writeFileSync(tempInvalidJsonPath, "{\n  \"malformed\": [true, \n", "utf8");
  const invalidJsonRes = runCli(`--catalogue "${tempInvalidJsonPath}" list-categories`);
  assertCheck(
    "Malformed catalogue JSON exits with non-zero error",
    invalidJsonRes.status !== 0,
    `status: ${invalidJsonRes.status}`
  );
  assertCheck(
    "Malformed catalogue JSON outputs parse error message",
    invalidJsonRes.stderr.includes("Failed to parse catalogue JSON") || invalidJsonRes.stdout.includes("Failed to parse catalogue JSON"),
    "parse error reported"
  );
} finally {
  if (fs.existsSync(tempInvalidJsonPath)) {
    fs.unlinkSync(tempInvalidJsonPath);
  }
}

// 9.8 Documented CLI Examples
console.log("\n--- 10. Documented CLI Examples Verification ---");
const exampleCommands = [
  'search "modal" --limit 5',
  "inspect shimmer-light-button",
  "classify prompt-animated-accordion",
  "list-categories"
];

for (const egCmd of exampleCommands) {
  const egRes = runCli(egCmd);
  assertCheck(
    `Documented example: elementra-cli.js ${egCmd}`,
    egRes.status === 0 && egRes.stdout.length > 0,
    `exit 0, ${egRes.stdout.length} bytes output`
  );
}

// Print Summary
console.log("\n=================================================================");
console.log(`   VALIDATION SUMMARY: ${passCount} PASSED, ${failCount} FAILED`);
console.log("=================================================================\n");

if (failCount > 0) {
  process.exit(1);
} else {
  process.exit(0);
}

