<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Download } from 'lucide-svelte';

	let { data } = $props();
	const post = $derived(data.post);
</script>

<svelte:head>
	<title>{post.title} | Quad4</title>
	<meta name="description" content={post.description || post.title} />
	<link rel="icon" href="/logo.png" />
</svelte:head>

<Container class="pt-6 sm:pt-8">
	<Breadcrumbs
		items={[
			{ label: $tStore('nav.home'), href: '/' },
			{ label: $tStore('nav.blog'), href: '/blog' },
			{ label: post.title }
		]}
	/>
	<article class="prose prose-gray dark:prose-invert max-w-none pt-0 pb-10">
		<header class="mb-8 flex flex-wrap items-start justify-between gap-4">
			<div>
				<h1 class="text-3xl font-extrabold tracking-tight">{post.title}</h1>
				{#if post.date}
					<time datetime={post.date} class="text-gray-500 dark:text-gray-400">
						{new Date(post.date).toLocaleDateString()}
					</time>
				{/if}
			</div>
			<a
				href="/blog/{post.slug}/markdown"
				download="{post.slug}.md"
				title="Download as Markdown"
				class="flex items-center justify-center w-9 h-9 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors shrink-0"
				aria-label="Download as Markdown"
			>
				<Download class="w-5 h-5" />
			</a>
		</header>
		{@html post.html}
	</article>
</Container>
