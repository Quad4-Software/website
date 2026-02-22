<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Rss } from 'lucide-svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{$tStore('blog.title')} | Quad4</title>
	<meta name="description" content={$tStore('blog.metaDescription')} />
	<link rel="alternate" type="application/rss+xml" title="Quad4 Blog RSS" href="/blog/rss.xml" />
</svelte:head>

<Container class="pt-6 sm:pt-8">
	<Breadcrumbs
		items={[{ label: $tStore('nav.home'), href: '/' }, { label: $tStore('nav.blog') }]}
	/>
	<header class="pt-0 pb-6 flex flex-wrap items-start justify-between gap-4">
		<div>
			<h1 class="text-3xl font-extrabold tracking-tight">{$tStore('blog.title')}</h1>
			<p class="mt-2 text-gray-600 dark:text-gray-400">{$tStore('blog.intro')}</p>
		</div>
		<a
			href="/blog/rss.xml"
			class="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
			aria-label="RSS feed"
		>
			<Rss class="w-5 h-5" />
			<span>RSS</span>
		</a>
	</header>

	{#if data.posts.length === 0}
		<div
			class="rounded-lg border border-gray-200 dark:border-gray-700/80 border-dashed p-12 text-center"
			role="status"
			aria-label="No posts"
		>
			<p class="text-lg font-medium text-gray-700 dark:text-gray-300">{$tStore('blog.empty')}</p>
			<p class="mt-2 text-gray-500 dark:text-gray-400">{$tStore('blog.emptyDescription')}</p>
		</div>
	{:else}
		<ul class="space-y-6">
			{#each data.posts as post}
				<li>
					<a
						href="/blog/{post.slug}"
						class="block p-4 rounded-lg border border-gray-200 dark:border-gray-700/80 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
					>
						<h2 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{post.title}</h2>
						{#if post.date}
							<time
								datetime={post.date}
								class="text-sm text-gray-500 dark:text-gray-400"
							>
								{new Date(post.date).toLocaleDateString()}
							</time>
						{/if}
						{#if post.description}
							<p class="mt-2 text-gray-600 dark:text-gray-400">{post.description}</p>
						{/if}
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</Container>
