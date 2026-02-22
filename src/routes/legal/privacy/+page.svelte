<script lang="ts">
	import { en } from '$lib/i18n/messages/en';
	import { tStore } from '$lib/i18n';

	const doc = en.legal.privacy;
</script>

<svelte:head>
	<title>{doc.title} | Quad4</title>
	<meta name="description" content={$tStore('legal.metaDescription')} />
</svelte:head>

<h1>{doc.title}</h1>
<p class="doc-meta">{$tStore('legal.privacy.lastUpdated')} {doc.lastUpdatedDate}</p>

{#each doc.sections as section}
	<h2>{section.heading}</h2>
	<p>{section.body}</p>
{/each}
