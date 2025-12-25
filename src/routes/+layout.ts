import { listDocs } from '$lib/utils/docs';
import { loadConfig } from '$lib/utils/config';
import type { LayoutLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load: LayoutLoad = async () => {
	const [docs, config] = await Promise.all([
		listDocs(),
		loadConfig()
	]);
	
	return {
		docs,
		config
	};
};
