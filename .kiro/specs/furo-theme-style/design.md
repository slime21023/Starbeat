# Design Document: Furo Theme Style

## Overview

This design document outlines the implementation of a Furo-inspired theme for Starbeat Docs. The implementation leverages UnoCSS with CSS custom properties to create a maintainable, customizable theming system that supports both light and dark modes automatically.

The design follows Furo's core principles:
- Intentionally minimal - content is the focus
- Clean typography with excellent readability
- Subtle color palette that doesn't distract
- Smooth transitions for interactive elements

## Architecture

### Theming Approach

The theme system uses a CSS custom properties (CSS variables) architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    app.css                               │
│  ┌─────────────────────────────────────────────────┐    │
│  │  :root (Light Mode Variables)                    │    │
│  │  - Color palette                                 │    │
│  │  - Typography                                    │    │
│  │  - Spacing                                       │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  @media (prefers-color-scheme: dark)            │    │
│  │  - Dark mode color overrides                    │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────────┐
│              Component Styles                            │
│  - Header.svelte (uses CSS variables)                   │
│  - Sidebar.svelte (uses CSS variables)                  │
│  - Content styles (uses CSS variables)                  │
└─────────────────────────────────────────────────────────┘
```

### File Structure

```
src/
├── app.css              # Theme variables + global styles
├── lib/
│   └── components/
│       ├── Header.svelte    # Header with Furo styling
│       └── Sidebar.svelte   # Sidebar with Furo styling
└── routes/
    ├── +layout.svelte       # Layout shell
    └── +page.svelte         # Homepage
```

## Components and Interfaces

### CSS Variable Interface

All theme colors are exposed through CSS custom properties:

```css
/* Color Categories */
--color-background           /* Main content background */
--color-background-secondary /* Sidebar/secondary background */
--color-foreground           /* Primary text color */
--color-foreground-muted     /* Secondary/muted text */
--color-foreground-subtle    /* Tertiary/subtle text */
--color-brand-primary        /* Accent/link color */
--color-brand-hover          /* Accent hover state */
--color-border               /* Border/separator color */
--color-border-muted         /* Subtle borders */

/* Typography */
--font-family-base           /* Body text font stack */
--font-family-mono           /* Code font stack */

/* Spacing */
--sidebar-width              /* Sidebar width */
--header-height              /* Header height */
--content-max-width          /* Content max width */
```

### Component Props

**Header.svelte**
- No props required (uses global CSS variables)

**Sidebar.svelte**
```typescript
interface SidebarProps {
  docs: DocPost[];  // Array of documentation entries
}
```

## Data Models

### Color Palette - Light Mode

Based on Furo's design language:

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-background` | `#ffffff` | Main content background |
| `--color-background-secondary` | `#f8f9fb` | Sidebar background |
| `--color-foreground` | `#2d2d2d` | Primary text |
| `--color-foreground-muted` | `#646776` | Secondary text |
| `--color-foreground-subtle` | `#9ca0a5` | Tertiary text |
| `--color-brand-primary` | `#2962ff` | Links, accents |
| `--color-brand-hover` | `#0039cb` | Link hover |
| `--color-border` | `#e5e7eb` | Borders |
| `--color-border-muted` | `#f0f0f0` | Subtle borders |
| `--color-code-background` | `#f5f5f5` | Inline code bg |
| `--color-code-block-background` | `#1e1e1e` | Code block bg |

### Color Palette - Dark Mode

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-background` | `#131416` | Main content background |
| `--color-background-secondary` | `#1a1c1e` | Sidebar background |
| `--color-foreground` | `#ffffffd9` | Primary text (85% white) |
| `--color-foreground-muted` | `#ffffffb3` | Secondary text (70% white) |
| `--color-foreground-subtle` | `#ffffff80` | Tertiary text (50% white) |
| `--color-brand-primary` | `#82aaff` | Links, accents |
| `--color-brand-hover` | `#a8c7ff` | Link hover |
| `--color-border` | `#303336` | Borders |
| `--color-border-muted` | `#252729` | Subtle borders |
| `--color-code-background` | `#2d2d2d` | Inline code bg |
| `--color-code-block-background` | `#0d0d0d` | Code block bg |

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Body | `1rem` (16px) | 400 | 1.65 |
| h1 | `2.25rem` | 700 | 1.2 |
| h2 | `1.75rem` | 600 | 1.3 |
| h3 | `1.375rem` | 600 | 1.4 |
| h4 | `1.125rem` | 600 | 1.4 |
| Code | `0.875rem` | 400 | 1.5 |
| Small | `0.875rem` | 400 | 1.5 |



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Since this feature is primarily CSS/styling focused, the testable properties are limited to structural validation of the CSS output. Most acceptance criteria require visual inspection rather than automated testing.

### Property 1: CSS Variable Completeness

*For any* valid theme configuration, the CSS output SHALL contain all required color variables (background, foreground, brand, border categories) defined in the `:root` selector.

**Validates: Requirements 1.1**

### Property 2: Heading Size Hierarchy

*For any* set of heading styles (h1, h2, h3, h4), the font-size values SHALL maintain strict descending order: `font-size(h1) > font-size(h2) > font-size(h3) > font-size(h4)`.

**Validates: Requirements 2.3**

### Property 3: Sidebar Background Distinction

*For any* theme mode (light or dark), the sidebar background color (`--color-background-secondary`) SHALL differ from the main content background color (`--color-background`).

**Validates: Requirements 3.1**

### Property 4: Transition Timing Consistency

*For any* element with hover transitions, the transition duration SHALL be within the range of 150ms to 250ms (approximately 200ms).

**Validates: Requirements 7.3**

## Error Handling

This feature is CSS-focused and does not involve runtime error handling. However, the following considerations apply:

1. **CSS Variable Fallbacks**: All CSS variable usages should include fallback values for browsers that don't support CSS custom properties (though this is rare in modern browsers).

2. **Media Query Graceful Degradation**: If `prefers-color-scheme` is not supported, the light theme serves as the default.

3. **Font Loading**: System font stacks are used to ensure text is always readable even if custom fonts fail to load.

## Testing Strategy

### Unit Tests

Due to the CSS-focused nature of this feature, traditional unit tests are limited. However, we can validate:

1. **CSS Variable Presence**: Parse the compiled CSS and verify all expected variables are defined
2. **Color Value Validity**: Verify color values are valid CSS color formats
3. **Responsive Breakpoints**: Verify media queries exist for mobile breakpoints

### Property-Based Tests

Property-based testing is not well-suited for CSS styling features. The properties defined above are better validated through:

1. **CSS Linting**: Use stylelint to enforce CSS conventions
2. **Visual Regression Testing**: Use tools like Percy or Chromatic for visual comparison
3. **Manual Review**: Visual inspection of light/dark modes and responsive behavior

### Recommended Testing Approach

1. **Build Verification**: Ensure `bun run build` completes without errors
2. **Type Checking**: Ensure `bun run check` passes
3. **Visual Review**: Manual testing of:
   - Light mode appearance
   - Dark mode appearance (toggle system preference)
   - Mobile responsive behavior (resize browser)
   - Hover/focus states on interactive elements
4. **Cross-browser Testing**: Verify appearance in Chrome, Firefox, Safari
