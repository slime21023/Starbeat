import type { DocPost, DocGroup, MarkdownModule } from '$lib/types';

// Re-export types for convenience
export type { DocPost, DocGroup, MarkdownModule };

/**
 * List all documentation posts from src/docs/
 */
export const listDocs = async (): Promise<DocPost[]> => {
	const modules = import.meta.glob<MarkdownModule>('/src/docs/*.md');

	const docs = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const module = await resolver();

			return {
				slug,
				metadata: module.metadata ?? {},
				component: module.default
			};
		})
	);

	return sortDocs(docs);
};

/**
 * Load a single doc by slug
 */
export const loadDocBySlug = async (slug: string): Promise<DocPost | null> => {
	const modules = import.meta.glob<MarkdownModule>('/src/docs/*.md');

	for (const [path, resolver] of Object.entries(modules)) {
		if (path.endsWith(`/${slug}.md`)) {
			const module = await resolver();
			return {
				slug,
				metadata: module.metadata ?? {},
				component: module.default
			};
		}
	}

	return null;
};

/**
 * Sort docs by order, then by title
 */
const sortDocs = (docs: DocPost[]): DocPost[] => {
	return docs.sort((a, b) => {
		const orderA = a.metadata.order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.metadata.order ?? Number.MAX_SAFE_INTEGER;

		if (orderA !== orderB) {
			return orderA - orderB;
		}

		const titleA = a.metadata.title || a.slug;
		const titleB = b.metadata.title || b.slug;

		return titleA.localeCompare(titleB);
	});
};

/**
 * Group docs by their `group` frontmatter field.
 * Groups are ordered by the minimum `order` value of their docs.
 * Docs without a group are placed in an unnamed group at the end.
 */
export const groupDocs = (docs: DocPost[]): DocGroup[] => {
	const groupMap = new Map<string, DocPost[]>();
	const ungrouped: DocPost[] = [];

	for (const doc of docs) {
		const groupName = doc.metadata.group;
		if (groupName) {
			if (!groupMap.has(groupName)) {
				groupMap.set(groupName, []);
			}
			groupMap.get(groupName)!.push(doc);
		} else {
			ungrouped.push(doc);
		}
	}

	const groups: DocGroup[] = Array.from(groupMap.entries()).map(([name, groupDocs]) => ({
		name,
		docs: groupDocs
	}));

	// Sort groups by the minimum order of their docs
	groups.sort((a, b) => {
		const minOrderA = Math.min(...a.docs.map(d => d.metadata.order ?? Number.MAX_SAFE_INTEGER));
		const minOrderB = Math.min(...b.docs.map(d => d.metadata.order ?? Number.MAX_SAFE_INTEGER));
		return minOrderA - minOrderB;
	});

	if (ungrouped.length > 0) {
		groups.push({ name: '', docs: ungrouped });
	}

	return groups;
};
