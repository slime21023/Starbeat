---
title: Getting Started
order: 1
group: Guide
---

Welcome to your documentation site!

## Quick Start

1. Edit `src/meta.yaml` to configure your site
2. Add markdown files to `src/docs/`
3. Run `bun run dev` to preview

## Adding Pages

Create a new `.md` file in `src/docs/`:

```markdown
---
title: My Page
order: 2
group: Guide
---

Your content here...
```

The page will automatically appear in the sidebar.

## Building for Production

```bash
bun run build
```

Static files will be output to the `build/` directory.

## Deploying to GitHub Pages

1. Set the `base` path in `src/meta.yaml`:

```yaml
base: /your-repo-name
```

2. Build and deploy to GitHub Pages.
