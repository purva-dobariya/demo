#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// This server intentionally exposes ONE file: careers-page.html, sitting
// next to this script. It has no access to (and never reads) anything else
// in the source project — that's the whole point of scoping it this way.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGE_PATH = path.join(__dirname, "careers-page.html");
const RESOURCE_URI = "careers-page://html";

function readPage() {
  return fs.readFileSync(PAGE_PATH, "utf8");
}

const server = new Server(
  { name: "ondc-careers-page", version: "1.0.0" },
  { capabilities: { resources: {}, tools: {} } }
);

server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: [
    {
      uri: RESOURCE_URI,
      name: "ONDC Careers Page (HTML)",
      description: "Full self-contained HTML source of the ONDC Careers page design.",
      mimeType: "text/html",
    },
  ],
}));

server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
  if (req.params.uri !== RESOURCE_URI) {
    throw new Error("Unknown resource: " + req.params.uri);
  }
  return { contents: [{ uri: RESOURCE_URI, mimeType: "text/html", text: readPage() }] };
});

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "get_careers_page",
      description:
        "Returns the full HTML source of the ONDC Careers page design (hero, benefits grid, hiring philosophy, join CTA). This is the ONLY thing this server can return.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name !== "get_careers_page") {
    throw new Error("Unknown tool: " + req.params.name);
  }
  return { content: [{ type: "text", text: readPage() }] };
});

const transport = new StdioServerTransport();
await server.connect(transport);
