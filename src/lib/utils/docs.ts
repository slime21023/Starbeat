export interface DocPost {
	slug: string;
	metadata: {
		title?: string;
		order?: number;
		group?: string;
        [key: string]: any;
	};
	component: any; // Result of import
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

	return docs.sort((a, b) => {
		const orderA = a.metadata.order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.metadata.order ?? Number.MAX_SAFE_INTEGER;

		if (orderA !== orderB) {
			return orderA - orderB;
		}
        
        // Secondary sort by title or fallback to slug/filename
        const titleA = a.metadata.title || a.slug;
        const titleB = b.metadata.title || b.slug;
        
		return titleA.localeCompare(titleB);
	});
};
