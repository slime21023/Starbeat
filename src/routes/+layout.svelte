<script lang="ts">
	import "../app.css";
	import Header from "$lib/components/Header.svelte";
	import Sidebar from "$lib/components/Sidebar.svelte";
	import favicon from "$lib/assets/favicon.svg";

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Starbeat Docs</title>
</svelte:head>

<div class="app-shell grid grid-rows-[60px_1fr] h-screen isolate">
	<div class="app-header col-span-full sticky top-0 z-10">
		<Header />
	</div>

	<div
		class="app-sidebar hidden md:block sticky top-[60px] h-[calc(100vh-60px)] border-r border-gray-200 dark:border-gray-800"
	>
		<Sidebar docs={data.docs} />
	</div>

	<main class="app-main p-8 max-w-[900px] w-full mx-auto overflow-y-auto">
		{@render children()}
	</main>
</div>

<style>
	:global(body) {
		font-family: "Inter", system-ui, sans-serif;
		margin: 0;
		background-color: white;
		color: #111827;
	}
	:global(html.dark body) {
		background-color: #0f172a;
		color: #f8fafc;
	}
</style>
