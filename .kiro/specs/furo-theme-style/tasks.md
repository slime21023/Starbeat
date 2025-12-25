# Implementation Plan: Furo Theme Style

## Overview

This implementation plan transforms the existing Starbeat Docs styling to match Furo's clean, minimal documentation theme. The work is organized into incremental tasks that build upon each other, starting with the CSS variable foundation and progressing through component styling.

## Tasks

- [x] 1. Implement CSS Variable Foundation
  - [x] 1.1 Update app.css with Furo-inspired color variables for light mode
    - Define `--color-background`, `--color-background-secondary`, `--color-foreground`, `--color-foreground-muted`, `--color-foreground-subtle`
    - Define `--color-brand-primary`, `--color-brand-hover`
    - Define `--color-border`, `--color-border-muted`
    - Define `--color-code-background`, `--color-code-block-background`
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7_
  - [x] 1.2 Add dark mode color overrides using prefers-color-scheme media query
    - Override all color variables with dark mode values
    - _Requirements: 1.6, 1.8_
  - [x] 1.3 Define typography variables and base styles
    - Define `--font-family-base` with system font stack
    - Define `--font-family-mono` with monospace font stack
    - Set base body styles using variables
    - _Requirements: 2.1, 2.2, 2.4_

- [x] 2. Implement Typography System
  - [x] 2.1 Style heading elements (h1-h4) with Furo-inspired sizes and weights
    - h1: 2.25rem, weight 700, line-height 1.2
    - h2: 1.75rem, weight 600, line-height 1.3, bottom border
    - h3: 1.375rem, weight 600, line-height 1.4
    - h4: 1.125rem, weight 600, line-height 1.4
    - _Requirements: 2.3, 2.5, 5.3_
  - [x] 2.2 Style code elements (inline code and code blocks)
    - Inline code: subtle background, monospace font, slight padding
    - Code blocks: dark background, padding, border-radius
    - _Requirements: 2.6, 5.4, 5.5_
  - [x] 2.3 Style content elements (paragraphs, links, lists, blockquotes)
    - Paragraphs: appropriate margin-bottom
    - Links: brand color, underline on hover
    - Lists: proper indentation and spacing
    - Blockquotes: left border accent, muted text
    - _Requirements: 5.6, 5.7, 5.8_

- [x] 3. Checkpoint - Verify base styles
  - Ensure `bun run dev` works without errors
  - Verify light and dark mode colors apply correctly
  - Ask the user if questions arise

- [x] 4. Update Header Component
  - [x] 4.1 Restyle Header.svelte with Furo-inspired design
    - Clean background with transparency/blur effect
    - Subtle bottom border
    - Sticky positioning at top
    - _Requirements: 4.1, 4.4, 4.5_
  - [x] 4.2 Style header navigation links
    - Appropriate text colors using CSS variables
    - Hover transitions with color change
    - _Requirements: 4.6, 7.1_

- [x] 5. Update Sidebar Component
  - [x] 5.1 Restyle Sidebar.svelte with Furo-inspired design
    - Secondary background color
    - Subtle border separator
    - Consistent width (280px)
    - _Requirements: 3.1, 3.5, 3.6_
  - [x] 5.2 Style sidebar navigation links
    - Appropriate padding and spacing
    - Hover state with subtle background change
    - Active state with accent color and background highlight
    - _Requirements: 3.2, 3.3, 3.4, 7.2_

- [x] 6. Update Layout and Content Area
  - [x] 6.1 Update +layout.svelte with Furo-inspired layout styles
    - Content area max-width (800-900px)
    - Centered content with adequate padding
    - _Requirements: 5.1, 5.2_
  - [x] 6.2 Add responsive styles for mobile viewports
    - Hide sidebar below 768px
    - Expand content to full width on mobile
    - _Requirements: 6.1, 6.2_

- [x] 7. Implement Interactive States
  - [x] 7.1 Add consistent transition timing to all interactive elements
    - Use ~200ms transition duration
    - Apply to links, buttons, navigation items
    - _Requirements: 7.3_
  - [x] 7.2 Add focus states for keyboard accessibility
    - Visible focus outline or ring
    - Apply to all interactive elements
    - _Requirements: 7.4_

- [x] 8. Final Checkpoint - Complete verification
  - Run `bun run build` to verify production build
  - Run `bun run check` for type checking
  - Test light mode appearance
  - Test dark mode appearance (toggle system preference)
  - Test mobile responsive behavior
  - Ask the user if questions arise

## Notes

- All styling uses CSS custom properties for easy customization
- UnoCSS utility classes are used where appropriate alongside custom CSS
- Dark mode is automatic based on system preference (no manual toggle implemented)
- Focus on minimal, clean design following Furo's principles
