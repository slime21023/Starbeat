<script lang="ts">
    import { page } from "$app/state";

    let { docs = [] } = $props();

    const staticItems = [{ title: "Introduction", href: "/" }];

    let navItems = $derived([
        ...staticItems,
        ...docs.map((doc: any) => ({
            title: doc.metadata.title || doc.slug,
            href: `/docs/${doc.slug}`,
        })),
    ]);
</script>

<aside
    class="py-6 border-r border-gray-200 dark:border-gray-800 overflow-y-auto bg-gray-50 dark:bg-gray-900 sticky top-[60px] h-[calc(100vh-60px)] px-4 hidden md:block w-[280px]"
>
    <nav>
        <ul class="list-none m-0 p-0">
            {#each navItems as item}
                <li class="mb-1">
                    <a
                        href={item.href}
                        class="block px-4 py-2 rounded-md text-sm transition-all duration-200 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5 no-underline {page
                            .url.pathname === item.href
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-500/10 font-medium'
                            : ''}"
                    >
                        {item.title}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</aside>
