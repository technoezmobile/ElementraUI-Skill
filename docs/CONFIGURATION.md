# ElementraUI Skill — Configuration Guide

This guide describes how to configure discovery endpoints, local catalogue paths, and environment settings for the ElementraUI Skill.

---

## 1. Environment Variables

The skill respects the following environment variables (all optional):

| Environment Variable | Description | Default Value |
| :--- | :--- | :--- |
| `ELEMENTRAUI_CATALOGUE_PATH` | Explicit absolute or relative path to an ElementraUI catalogue JSON file. | Auto-discovered from `./src/data/fullCatalogue.json` or `public/data/awesome-catalogue.json` |
| `ELEMENTRAUI_URL` | Base URL of an active local or public ElementraUI instance. | `http://localhost:5173` |
| `ELEMENTRAUI_REGISTRY_URL` | Base URL path for fetching raw registry component specifications. | `/r` |

---

## 2. Setting Variables

### Linux / macOS:
```bash
export ELEMENTRAUI_CATALOGUE_PATH="/path/to/my/fullCatalogue.json"
```

### Windows (PowerShell):
```powershell
$env:ELEMENTRAUI_CATALOGUE_PATH = "C:\path\to\my\fullCatalogue.json"
```

### In a `.env` File:
```env
ELEMENTRAUI_CATALOGUE_PATH=./src/data/fullCatalogue.json
ELEMENTRAUI_URL=http://localhost:5173
```

---

## 3. Zero-Config Auto-Discovery

If no environment variables are set, the skill and its CLI helper automatically scan the current working directory and parent paths for:
1. `src/data/fullCatalogue.json`
2. `public/data/awesome-catalogue.json`
3. `../src/data/fullCatalogue.json`
4. `../public/data/awesome-catalogue.json`

If none are found, the CLI will cleanly exit with instructions on how to point it to a valid catalogue file.
