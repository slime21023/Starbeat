# Tech Stack

## Runtime & Build

- Runtime: Bun
- Build: Vite 7
- Framework: SvelteKit with Svelte 5
- Adapter: `@sveltejs/adapter-static` (static site generation)

## Key Libraries

- mdsvex: Markdown preprocessing with Svelte component support
- UnoCSS: Atomic CSS with `@unocss/svelte-scoped` integration
- Shiki: Syntax highlighting (configured but currently commented out)

## UnoCSS Presets

- `presetWind3`: Tailwind-compatible utilities
- `presetIcons`: Icon support
- `presetTypography`: Prose styling

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
