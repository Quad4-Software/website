<script lang="ts">
	interface Props {
		class?: string;
		children?: import('svelte').Snippet;
	}

	let { class: className = '', children }: Props = $props();
</script>

<div class="max-w-[1100px] mx-auto px-4 sm:px-5 {className}">
	{#if children}
		{@render children()}
	{/if}
</div>
