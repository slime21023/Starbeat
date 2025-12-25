---
title: Getting Started
order: 1
group: Guide
---

Starbeat is a minimalist documentation site generator built with Bun and Svelte 5.

## Installation

1. Clone the project to your local environment

```bash
git clone https://github.com/your-repo/starbeat.git
cd starbeat
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
bun run dev
```

4. Open your browser and visit `http://localhost:5173` — your documentation site is ready! 🎉

## Project Structure

```
src/
├── app.css          # Global styles and CSS variables
├── app.html         # HTML template
├── meta.yaml        # Site configuration
├── docs/            # Markdown documentation content
│   └── *.md         # Doc pages (auto-routed to /docs/[slug])
├── lib/
│   ├── components/  # Svelte components
│   └── utils/       # Utility functions
└── routes/          # SvelteKit routes
```

## Build & Deploy

Build the static site:

```bash
bun run build
```

Preview the build:

```bash
bun run preview
```

After building, static files are output to the `build/` directory and can be deployed to any static hosting service.
