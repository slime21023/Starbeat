# Project Structure

```
src/
├── app.css          # Global styles, CSS variables, typography
├── app.html         # HTML template
├── meta.yaml        # Site configuration (title, logo, github, etc.)
├── docs/            # Markdown documentation content
│   └── *.md         # Doc pages (auto-routed to /docs/[slug])
├── lib/
│   ├── assets/      # Static assets (favicon, images)
│   ├── components/  # Svelte components
│   │   ├── Sidebar.svelte
│   │   ├── SearchBox.svelte
│   │   ├── ThemeToggle.svelte
│   │   └── NavLink.svelte
│   ├── utils/
│   │   ├── docs.ts  # Doc listing/sorting utilities
│   │   └── config.ts # Site config loader
│   ├── types.ts     # Shared TypeScript types
│   └── index.ts     # $lib exports
└── routes/
    ├── +layout.svelte   # App shell (sidebar, main content)
    ├── +layout.ts       # Prerender config, loads docs & config
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

### Site Configuration

Edit `src/meta.yaml` to configure site metadata:

```yaml
title: My Documentation
description: Site description
logo: MyProject
github: https://github.com/your-repo
```

### Components

- Use `$props()` for component props (Svelte 5 runes)
- Use `$derived()` for reactive computations
- Import from `$lib` for shared modules
- Import from `$app/` for SvelteKit utilities

### Styling

- CSS custom properties in `app.css` for theming
- Component-scoped `<style>` blocks for component-specific styles
- Dark mode via `data-theme` attribute (toggle in sidebar)
