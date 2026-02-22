import matter from 'gray-matter';
import { marked } from 'marked';
import hljs from 'highlight.js';

const postModules = import.meta.glob<string>('/src/lib/content/blog/**/*.md', {
	query: '?raw',
	import: 'default'
});

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

marked.use({
	renderer: {
		code(token: { text: string; lang?: string }) {
			const language = (token.lang || '').toLowerCase();
			const escaped =
				language && hljs.getLanguage(language)
					? hljs.highlight(token.text, { language }).value
					: escapeHtml(token.text);
			const langClass = language ? ` language-${language}` : '';
			return `<pre class="hljs"><code class="hljs${langClass}">${escaped}</code></pre>`;
		}
	}
});

export interface PostMeta {
	title: string;
	date: string;
	description: string;
	slug: string;
}

export interface Post extends PostMeta {
	html: string;
}

function slugFromPath(path: string): string {
	const match = path.match(/\/blog\/(.+)\.md$/);
	return match ? match[1] : path.replace(/\.md$/, '');
}

export async function getPosts(): Promise<PostMeta[]> {
	const entries = await Promise.all(
		Object.entries(postModules).map(async ([path, load]) => {
			const raw = await load();
			const { data } = matter(raw);
			return {
				slug: slugFromPath(path),
				title: data.title ?? 'Untitled',
				date: data.date ?? '',
				description: data.description ?? ''
			};
		})
	);
	return entries.sort((a, b) => (b.date < a.date ? -1 : 1));
}

export interface PostsPage {
	posts: PostMeta[];
	total: number;
}

export async function getPostsFiltered(opts: {
	q?: string;
	page?: number;
	limit?: number;
}): Promise<PostsPage> {
	const { q = '', page = 1, limit = 10 } = opts;
	const all = await getPosts();
	const norm = q.trim().toLowerCase();
	const filtered = norm
		? all.filter(
				(p) =>
					(p.title ?? '').toLowerCase().includes(norm) ||
					(p.description ?? '').toLowerCase().includes(norm)
			)
		: all;
	const total = filtered.length;
	const start = (page - 1) * limit;
	const posts = filtered.slice(start, start + limit);
	return { posts, total };
}

export async function getPost(slug: string): Promise<Post | null> {
	const normalized = slug.replace(/^\/+|\/+$/g, '');
	const pathKey = Object.keys(postModules).find(
		(p) => slugFromPath(p) === normalized
	);
	if (!pathKey) return null;
	const load = postModules[pathKey as keyof typeof postModules];
	const raw = await load();
	const { data, content } = matter(raw);
	const html = marked.parse(content, { async: false }) as string;
	return {
		slug: normalized,
		title: data.title ?? 'Untitled',
		date: data.date ?? '',
		description: data.description ?? '',
		html
	};
}

export function getPostSlugs(): Promise<string[]> {
	return Promise.resolve(
		Object.keys(postModules).map((p) => slugFromPath(p))
	);
}

export async function getPostRaw(slug: string): Promise<string | null> {
	const normalized = slug.replace(/^\/+|\/+$/g, '');
	const pathKey = Object.keys(postModules).find(
		(p) => slugFromPath(p) === normalized
	);
	if (!pathKey) return null;
	const load = postModules[pathKey as keyof typeof postModules];
	return load();
}
