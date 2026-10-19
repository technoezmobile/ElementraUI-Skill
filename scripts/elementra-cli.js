#!/usr/bin/env node

/**
 * ElementraUI Skill — Discovery & Resource Inspector CLI
 *
 * Lightweight, zero-external-dependency Node.js CLI for searching,
 * classifying, and inspecting ElementraUI resources from local catalogues,
 * custom exports, or the bundled sample catalogue.
 *
 * NOTE: Online web API discovery is not implemented in this release.
 * ElementraUI Skill operates strictly in local offline mode.
 *
 * Usage:
 *   node scripts/elementra-cli.js search "button" [--source core|awesome|all] [--limit 10] [--json]
 *   node scripts/elementra-cli.js inspect <resource-id> [--json]
 *   node scripts/elementra-cli.js classify <resource-id> [--json]
 *   node scripts/elementra-cli.js list-categories [--json]
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rawArgs = process.argv.slice(2);
const optionsWithValues = new Set(["--source", "--category", "--limit", "--catalogue"]);

const positionalArgs = [];
const parsedOptions = {};

for (let i = 0; i < rawArgs.length; i++) {
  const arg = rawArgs[i];
  if (optionsWithValues.has(arg)) {
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith("--")) {
      parsedOptions[arg] = rawArgs[i + 1];
      i++;
    }
  } else if (arg.startsWith("--") || arg.startsWith("-")) {
    parsedOptions[arg] = true;
  } else {
    positionalArgs.push(arg);
  }
}

const command = positionalArgs[0];
const subArg = positionalArgs[1];

function printHelp() {
  console.log(`
ElementraUI Skill — Resource Discovery CLI

Commands:
  search <query>            Search resources by keyword across titles, descriptions, and tags
  inspect <resource-id>     Inspect full metadata, source code, and dependencies of a resource
  classify <resource-id>    Check truthful classification (executable vs screenshot vs blueprint)
  list-categories           List available component categories
  
Options:
  --source <core|awesome|all>  Filter by source repository (default: all)
  --category <name>            Filter by specific category
  --limit <number>             Max items to return (default: 10)
  --catalogue <path>           Custom path to catalogue JSON file
  --json                       Output machine-readable JSON
  --help, -h                   Show this help message

Discovery Modes:
  1. Explicit: Pass --catalogue <path> or set ELEMENTRAUI_CATALOGUE_PATH
  2. Auto-Detect: Searches current directory for src/data/fullCatalogue.json
  3. Default Sample: Uses bundled data/sample-catalogue.json (25 representative items)

Online Discovery:
  Notice: Online API discovery is currently NOT implemented.
  This CLI operates strictly offline against local JSON catalogue exports.
`);
}

if (!command || ["--help", "-h", "help"].includes(command) || parsedOptions["--help"] || parsedOptions["-h"]) {
  printHelp();
  process.exit(0);
}

function getOption(flag, defaultValue) {
  return parsedOptions[flag] !== undefined ? parsedOptions[flag] : defaultValue;
}

const isJson = Boolean(parsedOptions["--json"]);
const customCataloguePath = getOption("--catalogue", null);

// 1. Resolve and Load Catalogue
function resolveAndLoadCatalogue() {
  let resolvedPath = null;
  let isSample = false;

  // Priority 1: User explicitly provided --catalogue <path>
  if (customCataloguePath) {
    const absPath = path.resolve(process.cwd(), customCataloguePath);
    if (!fs.existsSync(absPath)) {
      const errMsg = `Specified catalogue file not found: ${customCataloguePath}`;
      if (isJson) {
        console.log(JSON.stringify({ error: errMsg }, null, 2));
      } else {
        console.error(`Error: ${errMsg}`);
      }
      process.exit(1);
    }
    resolvedPath = absPath;
    isSample = false;
  }
  // Priority 2: ELEMENTRAUI_CATALOGUE_PATH environment variable
  else if (process.env.ELEMENTRAUI_CATALOGUE_PATH) {
    const absPath = path.resolve(process.cwd(), process.env.ELEMENTRAUI_CATALOGUE_PATH);
    if (!fs.existsSync(absPath)) {
      const errMsg = `Environment variable ELEMENTRAUI_CATALOGUE_PATH points to non-existent file: ${process.env.ELEMENTRAUI_CATALOGUE_PATH}`;
      if (isJson) {
        console.log(JSON.stringify({ error: errMsg }, null, 2));
      } else {
        console.error(`Error: ${errMsg}`);
      }
      process.exit(1);
    }
    resolvedPath = absPath;
    isSample = false;
  }
  // Priority 3: Local workspace auto-detection (in current directory)
  else {
    const candidatePaths = [
      path.resolve(process.cwd(), "src/data/fullCatalogue.json"),
      path.resolve(process.cwd(), "public/data/awesome-catalogue.json")
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        resolvedPath = p;
        isSample = false;
        break;
      }
    }

    // Priority 4: Bundled sample catalogue in skill package
    if (!resolvedPath) {
      const samplePath = path.resolve(__dirname, "../data/sample-catalogue.json");
      if (fs.existsSync(samplePath)) {
        resolvedPath = samplePath;
        isSample = true;
      }
    }
  }

  if (!resolvedPath) {
    const errMsg = "No ElementraUI catalogue found on disk. Specify --catalogue <path> or set ELEMENTRAUI_CATALOGUE_PATH.";
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  // Parse Catalogue JSON
  let rawData = "";
  try {
    rawData = fs.readFileSync(resolvedPath, "utf8");
  } catch (err) {
    const errMsg = `Failed to read catalogue file: ${err.message}`;
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  let catalogue = [];
  try {
    catalogue = JSON.parse(rawData);
    if (!Array.isArray(catalogue)) {
      throw new Error("Catalogue JSON root must be an array of resources");
    }
  } catch (err) {
    const errMsg = `Failed to parse catalogue JSON at ${resolvedPath}: ${err.message}`;
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  return { catalogue, resolvedPath, isSample };
}

const { catalogue, resolvedPath, isSample } = resolveAndLoadCatalogue();

// Output sample mode notice in human-readable mode
if (isSample && !isJson) {
  console.log(`[NOTICE] Operating in Sample Mode using bundled sample catalogue (${catalogue.length} items).`);
  console.log(`         For the complete 6,750+ marketplace catalogue, specify --catalogue <path> or set ELEMENTRAUI_CATALOGUE_PATH.\n`);
}

// Helper: Truthfully Classify Resource
function classifyItem(item) {
  if (item.componentCode && item.componentCode.trim().length > 0) {
    return {
      classification: "executable-react",
      executable: true,
      hasCode: true,
      description: "Executable React/TSX component with runnable source code"
    };
  }
  if (item.awesomeData?.hasHtml || item.previewType === "iframe") {
    return {
      classification: "html-snapshot",
      executable: false,
      hasCode: false,
      description: "Static HTML/CSS snapshot requiring adaptation into target framework"
    };
  }
  if (
    item.previewStatus === "screenshot-only" ||
    item.previewType === "screenshot" ||
    (!item.componentCode && item.awesomeData?.screenshotUrl && !item.awesomeData?.hasHtml)
  ) {
    return {
      classification: "screenshot-reference",
      executable: false,
      hasCode: false,
      description: "Static screenshot reference only; no executable source code"
    };
  }
  if (item.itemType === "prompt" || item.promptData) {
    return {
      classification: "prompt-blueprint",
      executable: false,
      hasCode: false,
      description: "AI prompt blueprint; instructions to scaffold a new component"
    };
  }
  if (item.itemType === "theme") {
    return {
      classification: "theme-tokens",
      executable: false,
      hasCode: false,
      description: "Design system CSS custom variable tokens"
    };
  }
  if (item.itemType === "template") {
    return {
      classification: "template-starter",
      executable: false,
      hasCode: false,
      description: "Multi-page website starter specification"
    };
  }
  return {
    classification: "registry-spec",
    executable: false,
    hasCode: false,
    description: "Component specification blueprint with CLI install command"
  };
}

// COMMAND: search
if (command === "search") {
  const query = subArg ? subArg.toLowerCase() : "";
  const sourceFilter = getOption("--source", "all").toLowerCase();
  const categoryFilter = getOption("--category", null);
  const limit = parseInt(getOption("--limit", "10"), 10);

  let results = catalogue.filter((item) => {
    // Source filter
    if (sourceFilter === "core" && item.sourceRepo === "awesome-components") return false;
    if (sourceFilter === "awesome" && item.sourceRepo !== "awesome-components") return false;

    // Category filter
    if (categoryFilter && item.category?.toLowerCase() !== categoryFilter.toLowerCase()) return false;

    if (!query) return true;

    const nameMatch = item.name?.toLowerCase().includes(query);
    const descMatch = item.description?.toLowerCase().includes(query);
    const tagMatch = item.tags?.some((t) => t.toLowerCase().includes(query));
    return nameMatch || descMatch || tagMatch;
  });

  results = results.slice(0, limit);

  if (isJson) {
    const formatted = results.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.category,
      sourceRepo: item.sourceRepo || "elementraui",
      classification: classifyItem(item),
      dependencies: item.dependencies || []
    }));
    console.log(JSON.stringify(formatted, null, 2));
  } else {
    console.log(`Found ${results.length} matching resources in catalogue:\n`);
    for (const r of results) {
      const cls = classifyItem(r);
      const mark = cls.executable ? "[CODE]" : cls.classification === "html-snapshot" ? "[HTML]" : "[REF]";
      console.log(`  ${mark} ${r.name} (id: ${r.id})`);
      console.log(`     Category: ${r.category} | Classification: ${cls.classification}`);
      console.log(`     Details:  ${cls.description}`);
      console.log(`     Deps:     ${(r.dependencies || []).join(", ") || "none"}\n`);
    }
  }
  process.exit(0);
}

// COMMAND: inspect
if (command === "inspect") {
  const id = subArg;
  if (!id) {
    const errMsg = "Please provide a resource ID to inspect. Example: inspect shimmer-light-button";
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  const found = catalogue.find((x) => x.id === id || x.slug === id);
  if (!found) {
    const errMsg = `Resource "${id}" not found in catalogue.`;
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  const cls = classifyItem(found);

  if (isJson) {
    console.log(JSON.stringify({ ...found, classificationDetails: cls }, null, 2));
  } else {
    console.log("\n=================================================================");
    console.log(`   ELEMENTRAUI RESOURCE INSPECTION: ${found.name}`);
    console.log("=================================================================\n");
    console.log(`  ID:             ${found.id}`);
    console.log(`  Category:       ${found.category}`);
    console.log(`  Classification: ${cls.classification.toUpperCase()} (${cls.description})`);
    console.log(`  Has Code:       ${cls.hasCode ? "YES" : "NO"}`);
    console.log(`  Author:         ${found.author?.name || "Unknown"} (${found.author?.url || "N/A"})`);
    console.log(`  License:        ${found.license || "MIT"}`);
    console.log(`  Dependencies:   ${(found.dependencies || []).join(", ") || "None declared"}`);
    console.log(`  Description:    ${found.description}`);
    if (found.installCommand) {
      console.log(`  CLI Command:    ${found.installCommand}`);
    }
    if (found.componentCode) {
      console.log("\n--- Executable Source Preview (first 10 lines) ---");
      const lines = found.componentCode.split("\n").slice(0, 10).join("\n");
      console.log(lines);
      console.log("...\n");
    }
    console.log("=================================================================\n");
  }
  process.exit(0);
}

// COMMAND: classify
if (command === "classify") {
  const id = subArg;
  if (!id) {
    const errMsg = "Please provide a resource ID to classify. Example: classify shimmer-light-button";
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }

  const found = catalogue.find((x) => x.id === id || x.slug === id);
  if (!found) {
    const errMsg = `Resource "${id}" not found.`;
    if (isJson) {
      console.log(JSON.stringify({ error: errMsg }, null, 2));
    } else {
      console.error(`Error: ${errMsg}`);
    }
    process.exit(1);
  }
  const cls = classifyItem(found);
  if (isJson) {
    console.log(JSON.stringify(cls, null, 2));
  } else {
    console.log(`${found.id}: ${cls.classification} (executable: ${cls.executable})`);
  }
  process.exit(0);
}

// COMMAND: list-categories
if (command === "list-categories") {
  const categories = [...new Set(catalogue.map((x) => x.category).filter(Boolean))].sort();
  if (isJson) {
    console.log(JSON.stringify(categories, null, 2));
  } else {
    console.log("Available ElementraUI Categories:\n");
    for (const c of categories) {
      console.log(`  • ${c}`);
    }
    console.log(`\nTotal: ${categories.length} categories\n`);
  }
  process.exit(0);
}

console.error(`Unknown command: "${command}". Run with --help for usage.`);
process.exit(1);
