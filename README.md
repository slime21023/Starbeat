# Starbeat Docs

A minimalist documentation site generator built with **Bun** + **Svelte 5**.

## Features

- ⚡ **Blazing Fast** — Powered by Bun and Svelte 5
- 📝 **Markdown First** — mdsvex with Svelte component support
- 🎨 **Clean Design** — Furo-inspired theme with dark/light mode
- 💅 **Syntax Highlighting** — Built-in Shiki code highlighting
- 📂 **File-based Routing** — Drop a `.md` file, get a page
- 🔍 **Fuzzy Search** — Quick document search with Fuse.js

## Quick Start

### Install dependencies

```bash
bun install
```

### Start development server

```bash
bun run dev
```

### Build for production

```bash
bun run build
```

Static files will be output to the `build/` directory.

### Preview production build

```bash
bun run preview
```

### Type checking

```bash
bun run check
```

## Writing Documentation

### Add a new page

Create a Markdown file in `src/docs/`, for example `hello.md`:

```markdown
---
title: Hello World
order: 1
group: Guide
---

# Hello World

This is a test page.
```

The page will be accessible at `/docs/hello` and automatically appear in the sidebar.

### Frontmatter options

| Option | Description | Required |
|--------|-------------|----------|
| `title` | Page title in sidebar | Yes |
| `order` | Sort order (lower = first) | No |
| `group` | Category grouping | No |

### Sorting behavior

- Documents are sorted by `order` value (ascending)
- Groups are sorted by the minimum `order` of their documents
- Documents without `order` appear at the end

### Supported Markdown features

- Headings (`#`, `##`, `###`, `####`)
- Code blocks with syntax highlighting
- Inline code
- Lists (ordered and unordered)
- Tables
- Blockquotes
- Links
- Bold and italic text

## Site Configuration

Edit `src/meta.yaml` to customize your site:

```yaml
# Site Configuration
title: My Documentation
description: Documentation for my project
logo: MyProject

# Links (optional)
github: https://github.com/your-repo
```

### Configuration options

| Option | Description | Default |
|--------|-------------|---------|
| `title` | Browser tab title | Starbeat Docs |
| `description` | SEO meta description | — |
| `logo` | Sidebar logo text | Starbeat |
| `github` | GitHub link in sidebar footer | — |

## Theming

### Theme toggle

Click the sun/moon icon in the sidebar header to switch between light and dark mode. Default is dark mode.

### Customizing colors

Edit CSS variables in `src/app.css`:

```css
:root {
  --color-background: #131416;
  --color-brand-primary: #82aaff;
  /* ... */
}

:root[data-theme="light"] {
  --color-background: #ffffff;
  --color-brand-primary: #2962ff;
  /* ... */
}
```

### Adding syntax highlighting languages

Edit `svelte.config.js` to add more languages:

```javascript
const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: ['javascript', 'typescript', 'python', 'rust', /* add more */]
});
```

## Project Structure

```
src/
├── app.css          # Global styles and CSS variables
├── app.html         # HTML template
├── meta.yaml        # Site configuration
├── docs/            # Markdown documentation
│   └── *.md         # Doc pages (auto-routed to /docs/[slug])
├── lib/
│   ├── components/  # Svelte components
│   └── utils/       # Utility functions
└── routes/          # SvelteKit routes
```

## Tech Stack

- Runtime: [Bun](https://bun.sh/)
- Framework: [SvelteKit](https://kit.svelte.dev/) (Svelte 5)
- Markdown: [mdsvex](https://mdsvex.pngwn.io/)
- Syntax Highlighting: [Shiki](https://shiki.style/)
- Search: [Fuse.js](https://www.fusejs.io/)

## License

MIT
