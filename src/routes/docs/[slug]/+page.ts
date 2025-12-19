import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	try {
        // We import using absolute path from root or alias if configured, 
        // but dynamic imports with variables only work with relative paths (sometimes) or specific patterns.
        // However, import.meta.glob is better for this.
        // Let's us import.meta.glob to find the specific file.
        
        const modules = import.meta.glob('/src/docs/*.md');
        
        // Find the matching file path ending with the slug
        // This handles potential differences in absolute vs relative path keys
        let match: string | undefined;
        for (const [path, resolver] of Object.entries(modules)) {
            if (path.endsWith(`/${params.slug}.md`)) {
                match = path;
                break;
            }
        }
        
        if (match) {
             const post = await modules[match]() as { default: any, metadata: any };
             return {
                 component: post.default,
                 metadata: post.metadata ?? {}
             };
        } else {
             console.error(`Doc not found for slug: ${params.slug}. Available paths:`, Object.keys(modules));
             throw error(404, `Doc not found: ${params.slug}`);
        }
	} catch (e) {
        if (e && typeof e === 'object' && 'status' in e) {
            throw e;
        }
        console.error(e);
		throw error(404, `Could not load ${params.slug}`);
	}
};
