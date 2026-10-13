/* Build public/app.js for the homepage.
 *
 * index.html used to load React, ReactDOM and Babel Standalone (~3 MB) from
 * unpkg and compile the eight src/components/*.jsx files in the browser on every
 * visit. This does that compile once, here, and ships one minified file.
 *
 * The components are NOT modules: each attaches its functions to the shared
 * top-level scope and the next file uses them by name (README: "that order is
 * load-bearing"). So they are concatenated in that order and transformed as one
 * script, exactly the scope they had under Babel. React/ReactDOM 18.3.1 are
 * bundled in front of them and exposed as the same globals the code expects.
 *
 * Run after editing anything in src/components:   npm run build:home
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as esbuild from 'esbuild';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORDER = ['Primitives', 'Hero', 'Navbar', 'HeroCarousel', 'MetricsBar', 'DPISection', 'SocialProof', 'App'];

const vendor = await esbuild.build({
  stdin: {
    contents: `import React from 'react'; import ReactDOM from 'react-dom/client';
               window.React = React; window.ReactDOM = ReactDOM;`,
    resolveDir: ROOT,
  },
  bundle: true, minify: true, write: false, format: 'iife',
  define: { 'process.env.NODE_ENV': '"production"' },
});

const jsx = ORDER.map((n) => fs.readFileSync(path.join(ROOT, 'src/components', n + '.jsx'), 'utf8')).join('\n;\n');
const app = await esbuild.transform(jsx, { loader: 'jsx', jsx: 'transform', minify: true, target: 'es2018' });

const out = path.join(ROOT, 'public/app.js');
fs.writeFileSync(out, vendor.outputFiles[0].text + '\n' + app.code);
console.log(`public/app.js  ${(fs.statSync(out).size / 1024) | 0} KB`);
