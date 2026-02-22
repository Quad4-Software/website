import { describe, it, expect } from 'vitest';
import { translate } from './translate';

describe('i18n', () => {
	it('returns translation for known key', () => {
		expect(translate('en', 'nav.home')).toBe('Home');
		expect(translate('en', 'footer.brand')).toBe('Quad4');
	});

	it('returns key for unknown key', () => {
		expect(translate('en', 'unknown.key')).toBe('unknown.key');
	});
});
