---
title: Theming
order: 4
group: Customization
---

Starbeat uses CSS custom properties for theming, making it easy to customize colors and typography.

## Theme Toggle

The sidebar includes a light/dark mode toggle. The default theme is dark mode, and your preference is saved in localStorage.

## Customizing Colors

Edit the CSS variables in `src/app.css` to customize the color palette:

```css
/* Dark mode colors (default) */
:root {
  --color-background: #131416;
  --color-background-secondary: #1a1c1e;
  --color-foreground: rgba(255, 255, 255, 0.85);
  --color-foreground-muted: rgba(255, 255, 255, 0.7);
  --color-brand-primary: #82aaff;
  --color-border: #303336;
}

/* Light mode colors */
:root[data-theme="light"] {
  --color-background: #ffffff;
  --color-background-secondary: #f8f9fb;
  --color-foreground: #2d2d2d;
  --color-foreground-muted: #646776;
  --color-brand-primary: #2962ff;
  --color-border: #e5e7eb;
}
```

## Available CSS Variables

### Colors

| Variable | Description |
|----------|-------------|
| `--color-background` | Main content background |
| `--color-background-secondary` | Sidebar background |
| `--color-foreground` | Primary text color |
| `--color-foreground-muted` | Secondary text color |
| `--color-foreground-subtle` | Tertiary text color |
| `--color-brand-primary` | Accent/link color |
| `--color-brand-hover` | Accent hover state |
| `--color-border` | Border color |
| `--color-border-muted` | Subtle border color |
| `--color-code-background` | Inline code background |
| `--color-code-block-background` | Code block background |

### Typography

| Variable | Description |
|----------|-------------|
| `--font-family-base` | Body text font stack |
| `--font-family-mono` | Code font stack |

### Layout

| Variable | Description |
|----------|-------------|
| `--sidebar-width` | Sidebar width (default: 280px) |
| `--content-max-width` | Content max width (default: 900px) |

## Code Syntax Highlighting

Starbeat uses Shiki for syntax highlighting with the `github-dark` theme. The highlighting is configured in `svelte.config.js`.

To add support for additional languages, edit the `langs` array:

```javascript
const highlighter = await createHighlighter({
  themes: ['github-dark'],
  langs: ['javascript', 'typescript', 'python', 'rust', /* add more */]
});
```
