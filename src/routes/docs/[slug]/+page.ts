import { error } from '@sveltejs/kit';
import { loadDocBySlug } from '$lib/utils/docs';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const doc = await loadDocBySlug(params.slug);

	if (!doc) {
		throw error(404, `Doc not found: ${params.slug}`);
	}

	return {
		component: doc.component,
		metadata: doc.metadata
	};
};
