import { describe, it, expect } from 'vitest';
import { getPosts, getPost, getPostSlugs } from './blog';

describe('blog', () => {
	describe('getPosts', () => {
		it('returns posts sorted by date descending', async () => {
			const posts = await getPosts();
			expect(Array.isArray(posts)).toBe(true);
			for (const p of posts) {
				expect(p).toHaveProperty('slug');
				expect(p).toHaveProperty('title');
				expect(p).toHaveProperty('date');
				expect(p).toHaveProperty('description');
			}
			for (let i = 1; i < posts.length; i++) {
				expect(posts[i].date <= posts[i - 1].date).toBe(true);
			}
		});
	});

	describe('getPost', () => {
		it('returns post when slug exists', async () => {
			const slugs = await getPostSlugs();
			if (slugs.length === 0) return;
			const post = await getPost(slugs[0]);
			expect(post).not.toBeNull();
			if (post) {
				expect(post.slug).toBe(slugs[0]);
				expect(post.title).toBeDefined();
				expect(post.html).toBeDefined();
				expect(post.html.length).toBeGreaterThan(0);
			}
		});

		it('returns null for unknown slug', async () => {
			const post = await getPost('no-such-post-xyz');
			expect(post).toBeNull();
		});
	});

	describe('getPostSlugs', () => {
		it('returns all slugs', async () => {
			const slugs = await getPostSlugs();
			expect(Array.isArray(slugs)).toBe(true);
		});
	});
});

describe('blog list route load', () => {
	it('returns posts and total', async () => {
		const { load } = await import('../routes/blog/+page.server');
		const result = await load({ url: new URL('http://localhost/blog'), params: {}, route: { id: null } } as never);
		expect(result).toHaveProperty('posts');
		expect(result).toHaveProperty('total');
		expect(Array.isArray(result.posts)).toBe(true);
		expect(typeof result.total).toBe('number');
	});
});

describe('blog post route load', () => {
	it('returns post for valid slug when posts exist', async () => {
		const slugs = await getPostSlugs();
		if (slugs.length === 0) return;
		const { load } = await import('../routes/blog/[slug]/+page.server');
		const result = await load({
			params: { slug: slugs[0] },
			route: { id: null }
		} as never);
		expect(result).toHaveProperty('post');
		expect(result.post.slug).toBe(slugs[0]);
		expect(result.post.html).toBeDefined();
	});

	it('throws 404 for invalid slug', async () => {
		const { load } = await import('../routes/blog/[slug]/+page.server');
		await expect(
			load({
				params: { slug: 'nonexistent-post-xyz' },
				route: { id: null }
			} as never)
		).rejects.toThrow();
	});
});
