<script lang="ts">
	import "../app.css";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>{data.config.title}</title>
	<meta name="description" content={data.config.description} />
	
	<!-- Open Graph -->
	<meta property="og:title" content={data.config.title} />
	<meta property="og:description" content={data.config.description} />
	{#if data.config.og_image}
		<meta property="og:image" content={data.config.og_image} />
	{/if}
	
	<!-- Twitter -->
	{#if data.config.twitter_handle}
		<meta name="twitter:card" content="summary_large_image" />
		<meta name="twitter:site" content={data.config.twitter_handle} />
	{/if}
</svelte:head>

<div class="layout">
	<aside class="sidebar-container">
		<Sidebar docs={data.docs} config={data.config} />
	</aside>

	<main class="main-container">
		<article class="content">
			{@render children()}
		</article>
	</main>
</div>

<style>
	.layout {
		display: flex;
		min-height: 100vh;
	}

	.sidebar-container {
		position: fixed;
		top: 0;
		left: 0;
		width: var(--sidebar-width);
		height: 100vh;
		background-color: var(--color-background-secondary);
		border-right: 1px solid var(--color-border);
		overflow-y: auto;
		z-index: 10;
	}

	.main-container {
		flex: 1;
		margin-left: var(--sidebar-width);
		min-height: 100vh;
		background-color: var(--color-background);
	}

	.content {
		max-width: var(--content-max-width);
		margin: 0 auto;
		padding: 3rem 4rem;
	}

	/* Mobile layout */
	@media (max-width: 768px) {
		.sidebar-container {
			display: none;
		}

		.main-container {
			margin-left: 0;
		}

		.content {
			padding: 1.5rem 1rem;
		}
	}
</style>
