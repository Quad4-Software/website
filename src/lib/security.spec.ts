import { describe, it, expect } from 'vitest';
import { getPost, getPostRaw } from './blog';
import { securityHeaders } from '../hooks.server';

describe('security', () => {
	describe('blog slug injection (XSS / path traversal)', () => {
		const maliciousSlugs = [
			'../../../etc/passwd',
			'..\\..\\..\\etc\\passwd',
			'<script>alert(1)</script>',
			'javascript:alert(1)',
			'"><img src=x onerror=alert(1)>',
			'${path}/../../secret',
			'hello-world/../../other',
			'%2e%2e%2f%2e%2e%2fetc%2fpasswd',
			'\0null',
			''
		];

		it.each(maliciousSlugs)('getPost("%s") returns null or safe slug', async (slug) => {
			const post = await getPost(slug);
			if (post !== null) {
				expect(post.slug).not.toContain('..');
				expect(post.slug).not.toContain('<');
				expect(post.slug).not.toContain('>');
				expect(post.html).not.toMatch(/<script\b/i);
			} else {
				expect(post).toBeNull();
			}
		});

		it.each(maliciousSlugs)('getPostRaw("%s") returns null', async (slug) => {
			const raw = await getPostRaw(slug);
			expect(raw).toBeNull();
		});
	});

	describe('blog DOS-style slug (no unbounded work)', () => {
		it('getPost with very long slug returns null quickly', async () => {
			const longSlug = 'a'.repeat(10000);
			const post = await getPost(longSlug);
			expect(post).toBeNull();
		});

		it('getPostRaw with very long slug returns null', async () => {
			const longSlug = 'x'.repeat(10000);
			const raw = await getPostRaw(longSlug);
			expect(raw).toBeNull();
		});
	});

	describe('security headers', () => {
		const requiredHeaders = [
			'Strict-Transport-Security',
			'X-Content-Type-Options',
			'X-Frame-Options',
			'X-XSS-Protection',
			'Content-Security-Policy',
			'Permissions-Policy'
		];

		it('all required security headers are defined', () => {
			const names = securityHeaders.map(([name]) => name);
			for (const required of requiredHeaders) {
				expect(names).toContain(required);
			}
		});

		it('CSP includes default-src self', () => {
			const csp = securityHeaders.find(([n]) => n === 'Content-Security-Policy')?.[1] ?? '';
			expect(csp).toContain("default-src 'self'");
		});

		it('X-Frame-Options is DENY', () => {
			const xfo = securityHeaders.find(([n]) => n === 'X-Frame-Options')?.[1] ?? '';
			expect(xfo).toBe('DENY');
		});
	});
});
