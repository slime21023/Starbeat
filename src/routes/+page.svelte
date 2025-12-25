<script lang="ts">
	let { data } = $props();
</script>

<div class="hero">
	<h1>{data.config.logo}</h1>
	<p class="subtitle">{data.config.description}</p>

	<div class="actions">
		<a href="/docs/getting-started" class="button primary">Get Started →</a>
		{#if data.config.github}
			<a href={data.config.github} class="button secondary">View on GitHub</a>
		{/if}
	</div>
</div>

<div class="features">
	<div class="feature-card">
		<h3>🚀 Blazing Fast</h3>
		<p>Built on Bun and Svelte 5 for incredible performance.</p>
	</div>
	<div class="feature-card">
		<h3>📝 Markdown First</h3>
		<p>Write your content in Markdown with Svelte component support.</p>
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
		background: linear-gradient(to right, var(--color-foreground), var(--color-brand-primary));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	@supports not (-webkit-text-fill-color: transparent) {
		h1 {
			background: none;
			color: var(--color-foreground);
		}
	}

	.subtitle {
		font-size: 1.25rem;
		color: var(--color-foreground-muted);
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
		background-color: var(--color-brand-primary);
		color: white;
	}

	.button.primary:hover {
		background-color: var(--color-brand-hover);
	}

	.button.secondary {
		background-color: transparent;
		box-shadow: inset 0 0 0 2px var(--color-border);
		color: var(--color-foreground);
	}

	.button.secondary:hover {
		background-color: var(--color-background-secondary);
	}

	.features {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
		margin-top: 4rem;
	}

	.feature-card {
		padding: 1.5rem;
		border: 1px solid var(--color-border);
		border-radius: 0.5rem;
	}

	.feature-card h3 {
		margin-top: 0;
		font-size: 1.2rem;
	}

	.feature-card p {
		margin-bottom: 0;
		color: var(--color-foreground-muted);
	}
</style>
