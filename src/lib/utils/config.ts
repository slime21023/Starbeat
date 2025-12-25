import yaml from 'js-yaml';

export interface SiteConfig {
	title: string;
	description: string;
	logo: string;
	github?: string;
	og_image?: string;
	twitter_handle?: string;
}

const defaultConfig: SiteConfig = {
	title: 'Documentation',
	description: 'Documentation site',
	logo: 'Docs'
};

export const loadConfig = async (): Promise<SiteConfig> => {
	try {
		const configFile = import.meta.glob('/src/meta.yaml', { query: '?raw', eager: true });
		const rawYaml = Object.values(configFile)[0] as { default: string };
		
		if (rawYaml?.default) {
			const parsed = yaml.load(rawYaml.default) as Partial<SiteConfig>;
			return { ...defaultConfig, ...parsed };
		}
	} catch (e) {
		console.warn('Failed to load meta.yaml, using defaults:', e);
	}
	
	return defaultConfig;
};
