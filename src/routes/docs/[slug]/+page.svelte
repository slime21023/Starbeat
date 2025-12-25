<script lang="ts">
    let { data } = $props();
    let Content = $derived(data.component);
</script>

<div class="doc-content">
    {#if data.metadata.title}
        <h1>{data.metadata.title}</h1>
    {/if}
    {#if Content}
        <Content />
    {:else}
        <p>No content found.</p>
    {/if}
</div>

<style>
    .doc-content {
        max-width: var(--content-max-width);
        margin-left: auto;
        margin-right: auto;
    }
</style>
