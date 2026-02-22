<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { initTheme } from '$lib/theme';
	import { tStore } from '$lib/i18n';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onMount(() => {
		initTheme();
	});
</script>

<svelte:head>
	<link rel="icon" href="/logo.png" />
</svelte:head>

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
