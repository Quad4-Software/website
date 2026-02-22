<script lang="ts">
	import { page } from '$app/stores';
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';

	const is404 = $derived($page.status === 404);
</script>

<svelte:head>
	<title>
		{is404 ? $tStore('error.notFound') : $tStore('error.serverError')} | Quad4
	</title>
</svelte:head>

<Container>
	<div class="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
		<p class="text-6xl font-extrabold text-gray-200 dark:text-gray-700">{$page.status}</p>
		<h1 class="mt-4 text-2xl font-bold text-gray-900 dark:text-gray-100">
			{is404 ? $tStore('error.notFound') : $tStore('error.serverError')}
		</h1>
		<p class="mt-2 text-gray-600 dark:text-gray-400">
			{is404 ? $tStore('error.notFoundMessage') : $tStore('error.serverErrorMessage')}
		</p>
		<a
			href="/"
			class="mt-8 inline-block rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 px-6 py-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
		>
			{$tStore('error.backHome')}
		</a>
	</div>
</Container>
