# Project Structure

```
src/
├── app.css          # Global styles, CSS variables, typography
├── app.html         # HTML template
├── docs/            # Markdown documentation content
│   └── *.md         # Doc pages (auto-routed to /docs/[slug])
├── lib/
│   ├── assets/      # Static assets (favicon, images)
│   ├── components/  # Svelte components
│   │   ├── Header.svelte
│   │   └── Sidebar.svelte
│   ├── utils/
│   │   └── docs.ts  # Doc listing/sorting utilities
│   └── index.ts     # $lib exports
└── routes/
    ├── +layout.svelte   # App shell (header, sidebar, main)
    ├── +layout.ts       # Prerender config, loads doc list
    ├── +page.svelte     # Homepage
    └── docs/[slug]/     # Dynamic doc pages
        ├── +page.svelte
        └── +page.ts     # Loads markdown by slug
```

## Conventions

### Adding Documentation

1. Create `.md` file in `src/docs/`
2. Add frontmatter with `title` and optional `order` for sorting
3. Page auto-appears at `/docs/[filename]` and in sidebar

### Frontmatter Schema

```yaml
---
title: Page Title      # Display name (required for sidebar)
order: 1               # Sort order (lower = first)
group: Category        # Optional grouping
---
```

### Components

- Use `$props()` for component props (Svelte 5 runes)
- Use `$derived()` for reactive computations
- Import from `$lib/` alias for lib folder access
- Import from `$app/` for SvelteKit utilities

### Styling

- UnoCSS utility classes in templates
- CSS custom properties in `app.css` for theming
- Component-scoped `<style>` blocks for component-specific styles
- Dark mode via `prefers-color-scheme` media query
