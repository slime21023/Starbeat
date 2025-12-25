<script lang="ts">
	import { page } from '$app/state';
	import type { DocPost } from '$lib/types';

	let { doc }: { doc: DocPost } = $props();

	let isActive = $derived(page.url.pathname === `/docs/${doc.slug}`);
</script>

<li class="nav-item">
	<a href="/docs/{doc.slug}" class="nav-link" class:active={isActive}>
		{doc.metadata.title || doc.slug}
	</a>
</li>

<style>
	.nav-item {
		margin-bottom: 0.125rem;
	}

	.nav-link {
		display: block;
		padding: 0.5rem 0.75rem;
		border-radius: 0.25rem;
		font-size: 0.875rem;
		color: var(--color-foreground-muted);
		text-decoration: none;
		transition: color 0.15s, background-color 0.15s;
	}

	.nav-link:hover {
		color: var(--color-foreground);
		background-color: var(--color-border-muted);
	}

	.nav-link.active {
		color: var(--color-brand-primary);
		font-weight: 500;
	}
</style>
