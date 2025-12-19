import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
// import { createHighlighter } from 'shiki';

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	// highlight: {
	// 	highlighter: async (code, lang = 'text') => {
	// 		const highlighter = await createHighlighter({
	// 			themes: ['github-dark', 'github-light'],
	// 			langs: ['javascript', 'typescript', 'css', 'html', 'svelte', 'bash', 'json']
	// 		});
	// 		const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'github-dark' }));
	// 		return `{@html \`${html}\`}`;
	// 	}
	// }
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			fallback: '404.html' // spa mode fallback or just for static
		}),
		paths: {
            relative: false
        }
	}
};

export default config;
