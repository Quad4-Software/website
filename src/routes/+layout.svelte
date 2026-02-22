<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
	import { initTheme } from '$lib/theme';
	import { tStore } from '$lib/i18n';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children, data } = $props();

	const baseOrigin = $derived(data?.baseOrigin ?? $page.url.origin);
	const canonical = $derived(String(baseOrigin) + $page.url.pathname);
	const jsonLd = $derived(data?.jsonLd ?? '{}');

	onMount(() => {
		initTheme();
		registerServiceWorker();
		injectJsonLd(jsonLd);
	});

	function injectJsonLd(content: string) {
		if (typeof document === 'undefined' || !content || content === '{}') return;
		const script = document.createElement('script');
		script.type = 'application/ld+json';
		script.textContent = content;
		document.head.appendChild(script);
	}

	async function registerServiceWorker() {
		if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
			try {
				await navigator.serviceWorker.register('/sw.js', { scope: '/' });
			} catch {
				// ignore
			}
		}
	}
</script>

<svelte:head>
	<link rel="icon" href="/logo.png" />
	<link rel="canonical" href={canonical} />
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
	<main id="main" class="flex-1">
		{@render children()}
	</main>
	<Footer />
	<div class="sr-only">
		<p>{$tStore('company.summary')}</p>
		<p>{$tStore('company.targetCustomers')}</p>
		<p>{$tStore('company.contactEmail')}</p>
	</div>
</div>
