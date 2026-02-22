import { getPostsFiltered } from '$lib/blog';

const DEFAULT_LIMIT = 10;

export async function load({ url }) {
	const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
	const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') ?? String(DEFAULT_LIMIT), 10) || DEFAULT_LIMIT));
	const q = url.searchParams.get('q') ?? '';
	const { posts, total } = await getPostsFiltered({ q, page, limit });
	return { posts, total, limit, page, q };
}
