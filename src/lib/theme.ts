import { writable } from 'svelte/store';

export type Theme = 'dark' | 'light';

const STORAGE_KEY = 'theme';

function getSystemPreference(): Theme {
	if (typeof window === 'undefined') return 'dark';
	return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function getStored(): Theme | null {
	if (typeof window === 'undefined') return null;
	const v = localStorage.getItem(STORAGE_KEY);
	return v === 'dark' || v === 'light' ? v : null;
}

function getInitialTheme(): Theme {
	return getStored() ?? getSystemPreference();
}

function applyTheme(t: Theme) {
	if (typeof document !== 'undefined') {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(t);
		localStorage.setItem(STORAGE_KEY, t);
	}
}

export const themeStore = writable<Theme>('dark');

export function initTheme() {
	if (typeof window === 'undefined') return;
	const initial = getInitialTheme();
	themeStore.set(initial);
	applyTheme(initial);
	themeStore.subscribe(applyTheme);
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
		if (getStored() === null) {
			themeStore.set(e.matches ? 'dark' : 'light');
		}
	});
}

export function toggleTheme() {
	themeStore.update((current) => (current === 'dark' ? 'light' : 'dark'));
}
