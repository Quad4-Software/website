<script lang="ts">
	interface Item {
		label: string;
		href?: string;
	}

	let { items }: { items: Item[] } = $props();
</script>

<nav aria-label="Breadcrumb" class="mb-3">
	<ol class="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
		{#each items as item, i}
			<li class="flex items-center gap-1.5">
				{#if i > 0}
					<span aria-hidden="true">/</span>
				{/if}
				{#if item.href}
					<a
						href={item.href}
						class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
					>
						{item.label}
					</a>
				{:else}
					<span class="text-gray-900 dark:text-gray-100">{item.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
