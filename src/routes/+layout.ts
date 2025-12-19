import { listDocs } from '$lib/utils/docs';
import type { LayoutLoad } from './$types';

export const prerender = true;

export const load: LayoutLoad = async () => {
	const docs = await listDocs();
	return {
		docs
	};
};
