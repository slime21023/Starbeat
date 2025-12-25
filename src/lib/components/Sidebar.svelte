<script lang="ts">
	import { page } from "$app/state";
	import { groupDocs, type DocPost } from "$lib/utils/docs";
	import type { SiteConfig } from "$lib/utils/config";
	import ThemeToggle from "./ThemeToggle.svelte";
	import SearchBox from "./SearchBox.svelte";

	let { docs = [], config }: { docs: DocPost[]; config: SiteConfig } = $props();

	let groups = $derived(groupDocs(docs));
</script>

<div class="sidebar">
	<div class="sidebar-header">
		<a href="/" class="logo">
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
							<li class="nav-item">
								<a
									href="/docs/{doc.slug}"
									class="nav-link"
									class:active={page.url.pathname === `/docs/${doc.slug}`}
								>
									{doc.metadata.title || doc.slug}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{:else}
				<ul class="nav-list">
					{#each group.docs as doc}
						<li class="nav-item">
							<a
								href="/docs/{doc.slug}"
								class="nav-link"
								class:active={page.url.pathname === `/docs/${doc.slug}`}
							>
								{doc.metadata.title || doc.slug}
							</a>
						</li>
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
