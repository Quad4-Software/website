import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { themeStore, initTheme, toggleTheme } from './theme';

const fakeStorage: Record<string, string> = {};
const storage = {
	getItem: (k: string) => fakeStorage[k] ?? null,
	setItem: (k: string, v: string) => {
		fakeStorage[k] = v;
	},
	removeItem: (k: string) => {
		delete fakeStorage[k];
	},
	clear: () => {
		for (const k of Object.keys(fakeStorage)) delete fakeStorage[k];
	}
};

describe('theme', () => {
	beforeEach(() => {
		themeStore.set('dark');
		fakeStorage.theme = undefined as unknown as string;
		delete fakeStorage.theme;
		vi.stubGlobal('localStorage', storage);
		(globalThis as unknown as { localStorage: typeof storage }).localStorage = storage;
		vi.stubGlobal(
			'matchMedia',
			vi.fn((query: string) => ({
				matches: query === '(prefers-color-scheme: light)',
				addEventListener: vi.fn()
			}))
		);
	});

	it('toggleTheme flips dark to light', () => {
		themeStore.set('dark');
		toggleTheme();
		expect(get(themeStore)).toBe('light');
	});

	it('toggleTheme flips light to dark', () => {
		themeStore.set('light');
		toggleTheme();
		expect(get(themeStore)).toBe('dark');
	});

	it('initTheme sets store and applies class from localStorage', () => {
		storage.setItem('theme', 'light');
		initTheme();
		expect(get(themeStore)).toBe('light');
		expect(document.documentElement.classList.contains('light')).toBe(true);
		expect(document.documentElement.classList.contains('dark')).toBe(false);
	});

	it('initTheme uses system preference when localStorage is empty', () => {
		initTheme();
		expect(get(themeStore)).toBe('light');
	});

	it('initTheme subscribes store to applyTheme', () => {
		storage.setItem('theme', 'dark');
		initTheme();
		themeStore.set('light');
		expect(document.documentElement.classList.contains('light')).toBe(true);
		expect(storage.getItem('theme')).toBe('light');
	});
});
