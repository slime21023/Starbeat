# Tech Stack

## Runtime & Build

- Runtime: Bun
- Build: Vite 7
- Framework: SvelteKit with Svelte 5
- Adapter: `@sveltejs/adapter-static` (static site generation)

## Key Libraries

- mdsvex: Markdown preprocessing with Svelte component support
- Shiki: Syntax highlighting (github-dark theme)
- Fuse.js: Fuzzy search for documentation
- js-yaml: YAML parsing for site configuration

## TypeScript

Strict mode enabled with bundler module resolution. Extends SvelteKit's generated tsconfig.

## Common Commands

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview

# Type checking
bun run check

# Type checking (watch mode)
bun run check:watch
```

## Output

Static files build to `build/` directory with `404.html` fallback for SPA routing.
