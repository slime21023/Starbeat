---
title: Writing Content
order: 2
group: Guide
---

Starbeat uses Markdown for documentation content. Simply create `.md` files in the `src/docs/` directory.

## Creating a New Page

1. Create a new `.md` file in `src/docs/`

```bash
touch src/docs/my-page.md
```

2. Add frontmatter at the top of the file

```yaml
---
title: My Page Title
order: 1
group: My Category
---
```

3. Write your content using standard Markdown syntax

The page will automatically appear in the sidebar navigation and be accessible at `/docs/my-page`.

## Frontmatter Options

| Option | Description | Required |
|--------|-------------|----------|
| `title` | Page title displayed in sidebar | Yes |
| `order` | Sort order (lower numbers first) | No |
| `group` | Category group name | No |

### Sorting Logic

- Documents are sorted by `order` value in ascending order
- Groups are sorted by the minimum `order` value of their documents
- Documents without `order` are placed at the end

## Supported Markdown Syntax

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
```

### Code Blocks

Wrap code with triple backticks and specify the language for syntax highlighting:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```

Supported languages include: `javascript`, `typescript`, `css`, `html`, `svelte`, `bash`, `json`, `yaml`, `markdown`, and more.

### Inline Code

Use single backticks: `const x = 1`

### Lists

Unordered list:

- Item one
- Item two
  - Sub-item

Ordered list:

1. First step
2. Second step
3. Third step

### Links

```markdown
[Link text](https://example.com)
```

### Tables

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data A   | Data B   | Data C   |
```

### Blockquotes

```markdown
> This is a quoted text
```

> This is a quoted text

### Bold & Italic

```markdown
**Bold text**
*Italic text*
```
