<script lang="ts">
	import { base } from '$app/paths';
	import { groupDocs } from '$lib/utils/docs';
	import type { DocPost } from '$lib/types';
	import type { SiteConfig } from '$lib/utils/config';
	import ThemeToggle from './ThemeToggle.svelte';
	import SearchBox from './SearchBox.svelte';
	import NavLink from './NavLink.svelte';

	let { docs = [], config }: { docs: DocPost[]; config: SiteConfig } = $props();

	let groups = $derived(groupDocs(docs));
</script>

<div class="sidebar">
	<div class="sidebar-header">
		<a href="{base}/" class="logo">
			<span class="logo-text">{config.logo}</span>
		</a>
		<ThemeToggle />
	</div>

	<SearchBox {docs} />

	<nav class="sidebar-nav">
		{#each groups as group}
			{#if group.name}
				<div class="nav-group">
					<h3 class="group-title">{group.name}</h3>
					<ul class="nav-list">
						{#each group.docs as doc}
							<NavLink {doc} />
						{/each}
					</ul>
				</div>
			{:else}
				<ul class="nav-list">
					{#each group.docs as doc}
						<NavLink {doc} />
					{/each}
				</ul>
			{/if}
		{/each}
	</nav>

	<div class="sidebar-footer">
		{#if config.github}
			<a href={config.github} target="_blank" rel="noreferrer" class="external-link">
				GitHub
			</a>
		{/if}
	</div>
</div>

<style>
	.sidebar {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 0.5rem 0.5rem;
	}

	.sidebar-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0;
		padding: 1rem 0.75rem;
	}

	.logo {
		display: block;
		text-decoration: none;
	}

	.logo-text {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-foreground);
	}

	.logo:hover .logo-text {
		color: var(--color-brand-primary);
	}

	.sidebar-nav {
		flex: 1;
		overflow-y: auto;
	}

	.nav-group {
		margin-bottom: 1.5rem;
	}

	.group-title {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-foreground-subtle);
		margin: 0 0 0.5rem 0.75rem;
	}

	.nav-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.sidebar-footer {
		margin-top: auto;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border);
	}

	.external-link {
		display: block;
		padding: 0.5rem 0.75rem;
		font-size: 0.875rem;
		color: var(--color-foreground-muted);
		text-decoration: none;
	}

	.external-link:hover {
		color: var(--color-foreground);
	}
</style>
