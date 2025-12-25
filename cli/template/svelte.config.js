import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

// Load base path from meta.yaml only in production
let basePath = '';
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	try {
		const metaContent = readFileSync('src/meta.yaml', 'utf-8');
		const meta = yaml.load(metaContent);
		basePath = meta?.base || '';
	} catch (e) {
		basePath = '';
	}
}

const highlighter = await createHighlighter({
	themes: ['github-dark'],
	langs: ['javascript', 'typescript', 'css', 'html', 'svelte', 'bash', 'json', 'yaml', 'markdown']
});

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md', '.svx'],
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(
				highlighter.codeToHtml(code, { 
					lang, 
					theme: 'github-dark' 
				})
			);
			return `{@html \`${html}\`}`;
		}
	}
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],

	extensions: ['.svelte', '.md', '.svx'],

	kit: {
		adapter: adapter({
			fallback: '404.html'
		}),
		paths: {
			base: basePath,
			relative: false
		}
	}
};

export default config;
