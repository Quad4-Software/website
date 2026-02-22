import type { RequestHandler } from './$types';
import { getPosts, getPost } from '$lib/blog';

function escapeXml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export const GET: RequestHandler = async ({ url }) => {
	const origin = url.origin;
	const base = `${origin}/blog`;
	const posts = await getPosts();

	const items = await Promise.all(
		posts.map(async (meta) => {
			const post = await getPost(meta.slug);
			const postHtml = post?.html ?? '';
			const fullContent = postHtml
				? `<![CDATA[${postHtml.replace(/\]\]>/g, ']]]]><![CDATA[>')}]]>`
				: escapeXml(meta.description);
			const link = `${base}/${meta.slug}`;
			const pubDate = meta.date
				? new Date(meta.date).toUTCString()
				: new Date().toUTCString();
			return `  <item>
    <title>${escapeXml(meta.title)}</title>
    <link>${escapeXml(link)}</link>
    <guid isPermaLink="true">${escapeXml(link)}</guid>
    <pubDate>${pubDate}</pubDate>
    <description>${fullContent}</description>
  </item>`;
		})
	);

	const imageUrl = `${origin}/logo.png`;
	const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <channel>
    <title>Quad4 Blog</title>
    <link>${escapeXml(base)}</link>
    <description>Updates, how-tos, and notes from the Quad4 collective.</description>
    <image>
      <url>${escapeXml(imageUrl)}</url>
      <title>Quad4</title>
      <link>${escapeXml(base)}</link>
    </image>
    <itunes:image href="${escapeXml(imageUrl)}" />
    <atom:link href="${escapeXml(origin)}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
