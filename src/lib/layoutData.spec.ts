import { describe, it, expect } from 'vitest';
import { getLayoutData } from './layoutData';

describe('getLayoutData', () => {
	it('uses url.origin when PUBLIC_ORIGIN is not set', () => {
		const out = getLayoutData('https://example.com');
		expect(out.baseOrigin).toBe('https://example.com');
		expect(out.jsonLd).toContain('https://example.com');
		expect(JSON.parse(out.jsonLd)['@graph']).toHaveLength(2);
	});

	it('uses publicOrigin argument when provided', () => {
		const out = getLayoutData('https://example.com', 'https://canonical.example.com');
		expect(out.baseOrigin).toBe('https://canonical.example.com');
		expect(out.jsonLd).toContain('https://canonical.example.com');
	});

	it('includes Organization and WebSite in jsonLd', () => {
		const out = getLayoutData('https://site.com');
		const graph = JSON.parse(out.jsonLd)['@graph'];
		expect(graph[0]['@type']).toBe('Organization');
		expect(graph[0].name).toBe('Quad4');
		expect(graph[1]['@type']).toBe('WebSite');
		expect(graph[1].description).toBeDefined();
	});
});
