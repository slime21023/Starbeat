---
title: Configuration
order: 3
group: Customization
---

Starbeat is configured through the `src/meta.yaml` file — no code changes required.

## Basic Configuration

Edit the `src/meta.yaml` file:

```yaml
# Site Configuration
title: My Documentation
description: Documentation for my project
logo: MyProject

# Links (optional)
github: https://github.com/your-repo
```

## Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `title` | Browser tab title | Starbeat Docs |
| `description` | SEO meta description | — |
| `logo` | Sidebar logo text | Starbeat |
| `github` | GitHub link (shown in sidebar footer) | — |

## Full Example

```yaml
# Site Configuration
# Edit this file to customize your documentation site

# Basic Info
title: Starbeat Docs
description: A minimalist documentation site generator built with Bun and Svelte
logo: Starbeat

# Links (optional)
github: https://github.com/example/starbeat

# SEO (optional)
# og_image: /og-image.png
# twitter_handle: "@starbeat"
```

## Applying Changes

After modifying `meta.yaml`, the development server will automatically reload. If changes don't take effect, restart the dev server:

```bash
bun run dev
```
