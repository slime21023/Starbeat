---
title: Configuration
order: 10
group: Advanced
---

Starbeat is highly configurable. You can customize the look and feel, as well as the behavior of the site.

## Frontmatter Options

| Option | Description | Default |
|--------|-------------|---------|
| `title` | Page title in sidebar | filename |
| `order` | Sort order (lower = first) | 999 |
| `group` | Group name for sidebar | none |

## Example

```yaml
---
title: My Page
order: 5
group: Tutorials
---
```

### Grouping Logic

- Groups are sorted by the minimum `order` value of their docs
- Docs within a group are sorted by their `order` value
- Docs without a `group` appear at the end
