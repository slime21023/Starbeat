<script lang="ts">
	import { browser } from '$app/environment';

	type Theme = 'light' | 'dark';

	let theme = $state<Theme>(getInitialTheme());

	function getInitialTheme(): Theme {
		if (browser) {
			const stored = localStorage.getItem('theme') as Theme | null;
			return stored || 'dark';
		}
		return 'dark';
	}

	// Apply theme on mount and when theme changes
	$effect(() => {
		if (browser) {
			document.documentElement.setAttribute('data-theme', theme);
			localStorage.setItem('theme', theme);
		}
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
	}

	const icons: Record<Theme, string> = {
		light: '☀️',
		dark: '🌙'
	};

	const labels: Record<Theme, string> = {
		light: 'Light',
		dark: 'Dark'
	};
</script>

<button class="theme-toggle" onclick={toggleTheme} title="Toggle theme: {labels[theme]}">
	<span class="icon">{icons[theme]}</span>
</button>

<style>
	.theme-toggle {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		padding: 0;
		border: none;
		border-radius: 0.25rem;
		background: transparent;
		color: var(--color-foreground-muted);
		cursor: pointer;
		transition: background-color 0.15s;
	}

	.theme-toggle:hover {
		background-color: var(--color-border-muted);
	}

	.icon {
		font-size: 1rem;
	}
</style>
