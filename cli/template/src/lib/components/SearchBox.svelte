<script lang="ts">
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';
	import Fuse from 'fuse.js';
	import type { DocPost } from '$lib/utils/docs';

	let { docs = [] }: { docs: DocPost[] } = $props();

	let query = $state('');
	let isOpen = $state(false);
	let selectedIndex = $state(0);

	// Create Fuse instance for fuzzy search
	const fuse = $derived(new Fuse(docs, {
		keys: [
			{ name: 'metadata.title', weight: 2 },
			{ name: 'metadata.group', weight: 1 },
			{ name: 'slug', weight: 0.5 }
		],
		threshold: 0.4,
		includeScore: true
	}));

	let results = $derived(
		query.trim() 
			? fuse.search(query).slice(0, 8).map(r => r.item)
			: []
	);

	function handleKeydown(e: KeyboardEvent) {
		if (!isOpen || results.length === 0) return;

		switch (e.key) {
			case 'ArrowDown':
				e.preventDefault();
				selectedIndex = (selectedIndex + 1) % results.length;
				break;
			case 'ArrowUp':
				e.preventDefault();
				selectedIndex = (selectedIndex - 1 + results.length) % results.length;
				break;
			case 'Enter':
				e.preventDefault();
				if (results[selectedIndex]) {
					navigateTo(results[selectedIndex]);
				}
				break;
			case 'Escape':
				closeSearch();
				break;
		}
	}

	function navigateTo(doc: DocPost) {
		goto(`${base}/docs/${doc.slug}`);
		closeSearch();
	}

	function closeSearch() {
		query = '';
		isOpen = false;
		selectedIndex = 0;
	}

	function handleFocus() {
		isOpen = true;
	}

	function handleBlur() {
		// Delay to allow click on results
		setTimeout(() => {
			isOpen = false;
		}, 150);
	}
</script>

<div class="search-container">
	<div class="search-input-wrapper">
		<span class="search-icon">⌕</span>
		<input
			type="text"
			class="search-input"
			placeholder="Search"
			bind:value={query}
			onfocus={handleFocus}
			onblur={handleBlur}
			onkeydown={handleKeydown}
		/>
		{#if query}
			<button class="clear-btn" onclick={closeSearch}>✕</button>
		{/if}
	</div>

	{#if isOpen && results.length > 0}
		<ul class="search-results">
			{#each results as doc, i}
				<li class="search-result" class:selected={i === selectedIndex}>
					<button onclick={() => navigateTo(doc)}>
						<span class="result-title">{doc.metadata.title || doc.slug}</span>
						{#if doc.metadata.group}
							<span class="result-group">{doc.metadata.group}</span>
						{/if}
					</button>
				</li>
			{/each}
		</ul>
	{:else if isOpen && query.trim() && results.length === 0}
		<div class="no-results">No results found</div>
	{/if}
</div>

<style>
	.search-container {
		position: relative;
		padding: 0 0.5rem;
		margin-bottom: 1.25rem;
	}

	.search-input-wrapper {
		display: flex;
		align-items: center;
		background: transparent;
		border-top: 1px solid var(--color-border);
		border-bottom: 1px solid var(--color-border);
		padding: 0.75rem 0.25rem;
		gap: 0.75rem;
	}

	.search-icon {
		font-size: 1rem;
		color: var(--color-foreground-subtle);
	}

	.search-input {
		flex: 1;
		border: none;
		background: transparent;
		color: var(--color-foreground);
		font-size: 0.9375rem;
		outline: none;
	}

	.search-input::placeholder {
		color: var(--color-foreground-subtle);
	}

	.clear-btn {
		background: none;
		border: none;
		color: var(--color-foreground-subtle);
		cursor: pointer;
		padding: 0;
		font-size: 0.75rem;
	}

	.clear-btn:hover {
		color: var(--color-foreground);
	}

	.search-results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		list-style: none;
		padding: 0.25rem;
		z-index: 100;
		max-height: 300px;
		overflow-y: auto;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
	}

	.search-result button {
		display: flex;
		flex-direction: column;
		width: 100%;
		padding: 0.5rem 0.75rem;
		border: none;
		background: transparent;
		text-align: left;
		cursor: pointer;
		border-radius: 0.25rem;
	}

	.search-result.selected button,
	.search-result button:hover {
		background-color: var(--color-border-muted);
	}

	.result-title {
		font-size: 0.875rem;
		color: var(--color-foreground);
	}

	.result-group {
		font-size: 0.75rem;
		color: var(--color-foreground-subtle);
		margin-top: 0.125rem;
	}

	.no-results {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: 0.25rem;
		padding: 0.75rem;
		background-color: var(--color-background);
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		font-size: 0.875rem;
		color: var(--color-foreground-subtle);
		text-align: center;
	}
</style>
