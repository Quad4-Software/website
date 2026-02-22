<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Card from '$lib/components/Card.svelte';
</script>

<svelte:head>
	<title>Contact | Quad4</title>
	<meta name="description" content={$tStore('contact.metaDescription')} />
</svelte:head>

<Container>
	<header class="py-20">
		<h1 class="text-3xl font-extrabold tracking-tight">{$tStore('contact.title')}</h1>
	</header>

	<div class="max-w-[560px] mx-auto my-14">
		<Card>
			<h2 class="text-lg font-bold mb-6">{$tStore('contact.directMethods')}</h2>
			<div class="mt-6">
				<h3 class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
					{$tStore('contact.email')}
				</h3>
				<a
					href="mailto:team@quad4.io"
					class="block bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 text-gray-800 dark:text-gray-200 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
				>
					{$tStore('contact.emailAddress')}
				</a>
			</div>
			<div class="mt-6">
				<h3 class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
					{$tStore('contact.lxmf')}
				</h3>
				<div
					class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 font-mono text-blue-600 dark:text-blue-400 text-sm break-all"
				>
					{$tStore('contact.address')}
				</div>
			</div>
		</Card>
	</div>
</Container>
