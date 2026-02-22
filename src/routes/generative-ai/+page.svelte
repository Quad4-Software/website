<script lang="ts">
	import { en } from '$lib/i18n/messages/en';
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import Breadcrumbs from '$lib/components/Breadcrumbs.svelte';

	const rules = en.generativeAi.rules;
</script>

<svelte:head>
	<title>{$tStore('generativeAi.title')} | Quad4</title>
	<meta name="description" content={$tStore('generativeAi.metaDescription')} />
</svelte:head>

<Container>
	<Breadcrumbs items={[{ label: $tStore('nav.home'), href: '/' }, { label: $tStore('generativeAi.title') }]} />
	<header class="py-20">
		<h1 class="text-3xl font-extrabold tracking-tight">{$tStore('generativeAi.title')}</h1>
	</header>

	<div class="max-w-3xl text-gray-600 dark:text-gray-400 space-y-4">
		<p>
			{$tStore('generativeAi.intro')}
			<a
				href={$tStore('generativeAi.stylometryLink')}
				target="_blank"
				rel="noopener noreferrer"
				class="text-blue-600 dark:text-blue-400 hover:underline"
			>
				{$tStore('generativeAi.stylometryLinkText')}
			</a>.
		</p>
		<p>{$tStore('generativeAi.hosting')}</p>
		<p class="font-semibold text-gray-700 dark:text-gray-300">{$tStore('generativeAi.rulesTitle')}</p>
		<ul class="list-disc list-inside space-y-2 pl-2">
			{#each rules as rule}
				<li>{rule}</li>
			{/each}
		</ul>
	</div>
</Container>
