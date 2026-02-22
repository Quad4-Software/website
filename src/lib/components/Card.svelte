<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div
	class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02] p-6 sm:p-8 shadow-sm dark:shadow-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5 {className}"
>
	{#if children}
		{@render children()}
	{/if}
</div>
