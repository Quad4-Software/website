<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from '$lib/components/Container.svelte';
	import { ArrowLeft } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="py-12 sm:py-16">
	<Container class="max-w-3xl">
		<a
			href="/"
			class="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-10"
		>
			<ArrowLeft class="w-4 h-4" />
			{$tStore('legal.backToHome')}
		</a>
		<div class="legal-doc">
			{@render children()}
		</div>
	</Container>
</div>

<style>
	.legal-doc :global(h1) {
		font-size: 1.875rem;
		line-height: 2.25rem;
		font-weight: 700;
		letter-spacing: -0.025em;
		margin-bottom: 0.5rem;
	}
	:global(.dark) .legal-doc :global(h1) {
		color: #fff;
	}
	:global(.light) .legal-doc :global(h1),
	.legal-doc :global(h1) {
		color: #111827;
	}
	.legal-doc :global(.doc-meta) {
		font-size: 0.875rem;
		line-height: 1.25rem;
		margin-bottom: 2.5rem;
	}
	:global(.dark) .legal-doc :global(.doc-meta) {
		color: #9ca3af;
	}
	:global(.light) .legal-doc :global(.doc-meta),
	.legal-doc :global(.doc-meta) {
		color: #6b7280;
	}
	.legal-doc :global(h2) {
		font-size: 1.125rem;
		line-height: 1.75rem;
		font-weight: 600;
		margin-top: 2.5rem;
		margin-bottom: 0.75rem;
	}
	.legal-doc :global(h2:first-child) {
		margin-top: 2rem;
	}
	:global(.dark) .legal-doc :global(h2) {
		color: #fff;
	}
	:global(.light) .legal-doc :global(h2),
	.legal-doc :global(h2) {
		color: #111827;
	}
	.legal-doc :global(p) {
		line-height: 1.625;
		margin-bottom: 1rem;
	}
	:global(.dark) .legal-doc :global(p) {
		color: #d1d5db;
	}
	:global(.light) .legal-doc :global(p),
	.legal-doc :global(p) {
		color: #4b5563;
	}
</style>
