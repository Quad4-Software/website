import { error } from '@sveltejs/kit';
import { getPost } from '$lib/blog';

export async function load({ params }) {
	const post = await getPost(params.slug);
	if (!post) throw error(404, { message: 'Post not found' });
	return { post };
}
