<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
	import { initTheme } from '$lib/theme';
	import { tStore } from '$lib/i18n';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	const canonical = $derived($page.url.origin + $page.url.pathname);
	const jsonLd = $derived(
		JSON.stringify({
			'@context': 'https://schema.org',
			'@graph': [
				{
					'@type': 'Organization',
					name: 'Quad4',
					url: $page.url.origin
				},
				{
					'@type': 'WebSite',
					name: 'Quad4',
					url: $page.url.origin,
					description: $tStore('home.metaDescription')
				}
			]
		})
	);

	onMount(() => {
		initTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo.png" />
	<link rel="canonical" href={canonical} />
	<script type="application/ld+json">{jsonLd}</script>
</svelte:head>

{#if $navigating}
	<div
		class="fixed top-0 left-0 right-0 z-[100] h-0.5 bg-gray-400 dark:bg-gray-500 animate-pulse"
		role="progressbar"
		aria-label="Loading"
	></div>
{/if}

<div class="min-h-screen flex flex-col">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<div class="sr-only">
		<p>{$tStore('company.summary')}</p>
		<p>{$tStore('company.targetCustomers')}</p>
		<p>{$tStore('company.contactEmail')}</p>
	</div>
</div>
