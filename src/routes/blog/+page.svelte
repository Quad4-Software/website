<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
	import { Rss, Search } from 'lucide-svelte';

	let { data } = $props();

	const limit = $derived(data.limit ?? 10);
	const totalPages = $derived(Math.max(1, Math.ceil(data.total / limit)));
	const currentPage = $derived(Math.min(data.page, totalPages));

	function pageUrl(page: number): string {
		const p = new URLSearchParams();
		if (data.q) p.set('q', data.q);
		p.set('page', String(page));
		return `/blog?${p.toString()}`;
	}
	function searchUrl(): string {
		return '/blog';
	}
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

	<form
		method="GET"
		action={searchUrl()}
		class="mb-6"
		role="search"
		aria-label={$tStore('blog.searchLabel')}
	>
		<div class="relative">
			<Search
				class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
				aria-hidden="true"
			/>
			<input
				type="search"
				name="q"
				value={data.q}
				placeholder={$tStore('blog.searchPlaceholder')}
				class="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700/80 bg-white dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 focus:border-transparent"
				aria-label={$tStore('blog.searchLabel')}
			/>
			<button
				type="submit"
				class="sr-only"
			>
				{$tStore('blog.searchLabel')}
			</button>
		</div>
	</form>

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

		{#if totalPages > 1}
			<nav
				class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700/80 flex flex-wrap items-center justify-between gap-4"
				aria-label="Pagination"
			>
				<p class="text-sm text-gray-500 dark:text-gray-400">
					{$tStore('blog.pageOf').replace('{page}', String(currentPage)).replace('{total}', String(totalPages))}
				</p>
				<div class="flex gap-2">
					{#if currentPage > 1}
						<a
							href={pageUrl(currentPage - 1)}
							class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
						>
							{$tStore('blog.prev')}
						</a>
					{/if}
					{#if currentPage < totalPages}
						<a
							href={pageUrl(currentPage + 1)}
							class="inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
						>
							{$tStore('blog.next')}
						</a>
					{/if}
				</div>
			</nav>
		{/if}
	{/if}
</Container>
