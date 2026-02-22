import type { RequestHandler } from './$types';
import { getPostRaw } from '$lib/blog';

export const GET: RequestHandler = async ({ params }) => {
	const raw = await getPostRaw(params.slug);
	if (!raw) {
		return new Response(null, { status: 404 });
	}
	const filename = `${params.slug}.md`;
	return new Response(raw, {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8',
			'Content-Disposition': `attachment; filename="${filename}"`
		}
	});
};
