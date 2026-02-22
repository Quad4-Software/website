import { getPosts } from '$lib/blog';

export async function load() {
	const posts = await getPosts();
	return { posts };
}
