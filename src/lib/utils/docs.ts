export interface DocPost {
	slug: string;
	metadata: {
		title?: string;
		order?: number;
		group?: string;
		[key: string]: any;
	};
	component: any;
}

export interface DocGroup {
	name: string;
	docs: DocPost[];
}

export const listDocs = async (): Promise<DocPost[]> => {
	const modules = import.meta.glob('/src/docs/*.md');

	const docs = await Promise.all(
		Object.entries(modules).map(async ([path, resolver]) => {
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			const resolution = (await resolver()) as any;

			return {
				slug,
				metadata: resolution.metadata ?? {},
				component: resolution.default
			};
		})
	);

	// Sort by order, then by title
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

	// Separate docs into groups
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

	// Convert to array and sort groups by their minimum order
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

	// Add ungrouped docs at the end (if any)
	if (ungrouped.length > 0) {
		groups.push({ name: '', docs: ungrouped });
	}

	return groups;
};
