import { get } from 'svelte/store';
import { writable, derived } from 'svelte/store';
import { translate as translateFn, type Locale } from './translate';

export type { Locale } from './translate';
export { translate } from './translate';

export const locale = writable<Locale>('en');

export const tStore = derived(locale, (loc) => (key: string) => translateFn(loc, key));

export function t(key: string): string {
	return translateFn(get(locale), key);
}

export function setLocale(l: Locale) {
	locale.set(l);
}

export function getLocale(): Locale {
	return get(locale);
}

export function getI18n() {
	return {
		get locale() {
			return get(locale);
		},
		t,
		setLocale
	};
}
