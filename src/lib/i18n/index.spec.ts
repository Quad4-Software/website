import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { translate } from './translate';
import { locale, tStore, t, setLocale, getLocale, getI18n } from './index';

describe('translate', () => {
	it('returns translation for known key', () => {
		expect(translate('en', 'nav.home')).toBe('Home');
		expect(translate('en', 'footer.brand')).toBe('Quad4');
	});

	it('returns key for unknown key', () => {
		expect(translate('en', 'unknown.key')).toBe('unknown.key');
	});
});

describe('i18n index', () => {
	beforeEach(() => {
		locale.set('en');
	});

	it('t() returns translation for current locale', () => {
		expect(t('nav.home')).toBe('Home');
		setLocale('en');
		expect(t('footer.brand')).toBe('Quad4');
	});

	it('setLocale and getLocale round-trip', () => {
		expect(getLocale()).toBe('en');
		setLocale('en');
		expect(getLocale()).toBe('en');
	});

	it('tStore returns a function that translates', () => {
		const translateKey = get(tStore);
		expect(translateKey('nav.home')).toBe('Home');
		expect(translateKey('breadcrumbs.legal')).toBe('Legal');
	});

	it('getI18n returns locale, t, setLocale', () => {
		const i18n = getI18n();
		expect(i18n.locale).toBe('en');
		expect(i18n.t('nav.contact')).toBe('Contact');
		i18n.setLocale('en');
		expect(i18n.locale).toBe('en');
	});
});
