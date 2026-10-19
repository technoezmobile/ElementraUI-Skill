# ElementraUI Skill Launch Guide

This guide covers the public launch of the portable ElementraUI AI coding skill. The component discovery platform remains a separate repository: [ElementraUI-Website](https://github.com/technoezmobile/ElementraUI-Website).

## Before Launch

- [ ] Run `npm test` from a clean checkout.
- [ ] Confirm `SKILL.md`, adapters, CLI scripts, examples, and documentation are present in the release candidate.
- [ ] Re-check the verification labels in the supported-agent matrix. Do not promote an adapter from “not verified” until it has been tested end to end.
- [ ] Confirm the MIT license and third-party attribution requirements are included in the packaged source.
- [ ] Test the documented installation path for each platform that is claimed as verified.
- [ ] If distributing a ZIP archive, follow [RELEASE.md](RELEASE.md) and verify the archive contents before publishing.

## GitHub About Settings

The repository metadata was not changed through this launch guide. Suggested values:

- **Description:** Portable AI coding skill for safely discovering, evaluating, and integrating ElementraUI resources.
- **Topics:** `ai-skill`, `agent-skill`, `ai-coding`, `claude-code`, `cursor`, `windsurf`, `react`, `tailwindcss`, `ui-components`, `developer-tools`
- **Website:** https://github.com/technoezmobile/ElementraUI-Website

## Launch Copy

### Short announcement

ElementraUI Skill is now available: an open-source, portable skill for AI coding agents that inspect a project before modifying it, classify UI resources honestly, and verify integrations with real project tooling. Install it from source and start with the platform guide: https://github.com/technoezmobile/ElementraUI-Skill

### Community post

We are releasing ElementraUI Skill, a portable AI coding skill for teams that want a safer, more deliberate workflow when integrating UI components and design resources.

The skill encourages repository-first inspection, truthful classification of code versus screenshots and prompts, dependency checks, architecture preservation, and real verification. It includes a small local CLI plus adapters and installation guidance for supported environments.

Only the platforms explicitly labelled verified in the repository should be presented as tested. The ElementraUI marketplace itself is maintained separately at https://github.com/technoezmobile/ElementraUI-Website

## Launch Day

- [ ] Publish the approved announcement from an official account.
- [ ] Add the suggested description and topics in GitHub's About panel.
- [ ] Pin the repository or feature it in the organization profile.
- [ ] Share the precise installation link: [docs/INSTALLATION.md](INSTALLATION.md).
- [ ] Invite bug reports for installation and adapter compatibility, especially for environments not yet marked verified.

## After Launch

- [ ] Record verified agent environments and versions in the documentation.
- [ ] Add release notes when adapters or compatibility claims change.
- [ ] Keep the website and skill repositories independently versioned and documented.
