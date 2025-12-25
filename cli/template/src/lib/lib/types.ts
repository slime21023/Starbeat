/**
 * Shared type definitions for the documentation system
 */

import type { Component } from 'svelte';

/**
 * Metadata extracted from markdown frontmatter
 */
export interface DocMetadata {
	title?: string;
	order?: number;
	group?: string;
	[key: string]: unknown;
}

/**
 * A documentation post with its metadata and component
 */
export interface DocPost {
	slug: string;
	metadata: DocMetadata;
	component: Component;
}

/**
 * A group of documentation posts
 */
export interface DocGroup {
	name: string;
	docs: DocPost[];
}

/**
 * Resolved markdown module from import.meta.glob
 */
export interface MarkdownModule {
	default: Component;
	metadata?: DocMetadata;
}
