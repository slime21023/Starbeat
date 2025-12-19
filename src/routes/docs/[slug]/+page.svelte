<script lang="ts">
    let { data } = $props();
    let Content = $derived(data.component);
</script>

<div class="prose dark:prose-invert max-w-4xl mx-auto p-4">
    <p class="text-xs text-gray-500">Debug: Doc Page Mounted</p>
    {#if data.metadata.title}
        <h1>{data.metadata.title}</h1>
    {/if}
    {#if Content}
        <Content />
    {:else}
        <p>No content found.</p>
    {/if}
</div>
