# Handoff: ONDC Careers Page — via MCP server

## Overview
A scoped MCP (Model Context Protocol) server that gives Claude Code, running in
your terminal/CLI, access to exactly one thing: the ONDC Careers page design.
It cannot read or fetch anything else from the source design project.

## About the design file
`mcp-server/careers-page.html` is a **design reference built in HTML** — a
self-contained prototype of the intended look and behavior, not production
code to copy verbatim. The task for Claude Code is to **recreate this design
in your codebase's existing environment** (React, Vue, Swift, etc.) using its
established components, design tokens, and patterns. If your codebase has no
established UI stack yet, pick the most suitable framework and implement it
there.

## Fidelity
**High-fidelity.** Colors are ONDC blue/white only, typography is Inter,
spacing and layout are final. Recreate it pixel-faithfully, adapted to your
component library.

## Screens
One screen: **Careers page** — sticky nav, hero, "Build What Matters",
"Who Builds ONDC" (trait checklist), "Benefits & Wellbeing" (icon grid with a
supporting illustration), "Our Hiring Philosophy", a blue "Join Us" CTA band,
and footer. Full markup, inline styles, colors, and copy are all in
`careers-page.html` — read that file for exact values.

## Why an MCP server instead of just handing you the file
You asked for the handoff scoped down to just this page, reachable from
Claude Code CLI without exposing the rest of the design project. This server
does exactly that: it has no filesystem access beyond its own folder, and
only ever serves `careers-page.html`.

## Setup

```bash
cd mcp-server
npm install
```

Register it with Claude Code (from anywhere):

```bash
claude mcp add ondc-careers-page -- node /absolute/path/to/mcp-server/server.js
```

Then in a Claude Code session:

```
Use the ondc-careers-page MCP server to fetch the careers page design and
recreate it in this codebase using our existing components and design system.
```

Claude Code will call the `get_careers_page` tool (or read the
`careers-page://html` resource) to pull the HTML — that's the only tool/resource
this server exposes.

## Files
- `mcp-server/server.js` — the MCP server (stdio transport, one resource, one tool)
- `mcp-server/package.json` — its one dependency, `@modelcontextprotocol/sdk`
- `mcp-server/careers-page.html` — the design, fully self-contained (styles, fonts, images inlined)
