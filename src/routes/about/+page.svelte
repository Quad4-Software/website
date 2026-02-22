<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';
</script>

<svelte:head>
	<title>About | Quad4</title>
	<meta name="description" content={$tStore('about.metaDescription')} />
</svelte:head>

<Container>
	<Breadcrumbs items={[{ label: $tStore('nav.home'), href: '/' }, { label: $tStore('nav.about') }]} />
	<header class="py-20">
		<h1 class="text-3xl font-extrabold tracking-tight">{$tStore('about.title')}</h1>
	</header>

	<div class="max-w-3xl text-gray-600 dark:text-gray-400 space-y-4">
		<p>{$tStore('about.lead')}</p>
		<p>{$tStore('about.skills')}</p>
		<p>{$tStore('about.structure')}</p>
	</div>
</Container>
