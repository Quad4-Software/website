import type { RequestHandler } from './$types';
import { getPostsFiltered } from '$lib/blog';

export const GET: RequestHandler = async ({ url }) => {
	const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10) || 1);
	const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get('limit') ?? '10', 10) || 10));
	const q = url.searchParams.get('q') ?? '';
	const { posts, total } = await getPostsFiltered({ q, page, limit });
	return Response.json({ posts, total });
};
