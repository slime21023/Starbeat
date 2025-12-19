<script>
    import { base } from "$app/paths";
</script>

<div class="hero">
    <h1>Starbeat Docs</h1>
    <p class="subtitle">
        A minimalist documentation site generator built with Bun and Svelte.
    </p>

    <div class="actions">
        <a href="/docs/getting-started" class="button primary">Get Started →</a>
        <a href="https://github.com" class="button secondary">View on GitHub</a>
    </div>
</div>

<div class="features">
    <div class="feature-card">
        <h3>🚀 Blazing Fast</h3>
        <p>Built on Bun and Svelte 5 for incredible performance.</p>
    </div>
    <div class="feature-card">
        <h3>📝 Markdown First</h3>
        <p>Write your content in Markdown (MDX support via mdsvex).</p>
    </div>
    <div class="feature-card">
        <h3>🎨 Zero Config Styling</h3>
        <p>Minimalist, beautiful defaults that just work.</p>
    </div>
</div>

<style>
    .hero {
        text-align: center;
        padding: 4rem 0;
    }

    h1 {
        font-size: 3.5rem;
        margin-bottom: 1rem;
        background: linear-gradient(to right, var(--text-main), var(--accent));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    /* Fallback for text-fill-color if not supported */
    @supports not (-webkit-text-fill-color: transparent) {
        h1 {
            background: none;
            color: var(--text-main);
        }
    }

    .subtitle {
        font-size: 1.25rem;
        color: var(--text-muted);
        max-width: 600px;
        margin: 0 auto 2rem;
    }

    .actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
    }

    .button {
        display: inline-flex;
        align-items: center;
        padding: 0.75rem 1.5rem;
        border-radius: 9999px;
        font-weight: 600;
        text-decoration: none;
        transition: transform 0.1s;
    }

    .button:active {
        transform: scale(0.98);
    }

    .button.primary {
        background-color: var(--accent);
        color: white;
    }

    .button.primary:hover {
        background-color: var(--accent-hover);
    }

    .button.secondary {
        background-color: transparent;
        box-shadow: inset 0 0 0 2px var(--border-color);
        color: var(--text-main);
    }

    .button.secondary:hover {
        background-color: var(--bg-sidebar);
        border-color: var(--text-muted);
    }

    .features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 4rem;
    }

    .feature-card {
        padding: 1.5rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
    }

    .feature-card h3 {
        margin-top: 0;
        font-size: 1.2rem;
    }

    .feature-card p {
        margin-bottom: 0;
        color: var(--text-muted);
    }
</style>
