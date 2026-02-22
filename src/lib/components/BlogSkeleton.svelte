<script lang="ts">
	import Container from './Container.svelte';
</script>

<Container class="pt-6 sm:pt-8">
	<div class="animate-pulse space-y-6">
		<div class="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
		<div class="space-y-2">
			<div class="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
			<div class="h-4 w-full max-w-md rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
		</div>
		<div class="h-10 w-32 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
		<ul class="space-y-6">
			{#each [1, 2, 3] as _}
				<li class="rounded-lg border border-gray-200 dark:border-gray-700/80 p-4 space-y-2">
					<div class="h-6 w-2/3 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
					<div class="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
					<div class="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
					<div class="h-4 w-4/5 rounded bg-gray-200 dark:bg-gray-700" aria-hidden="true"></div>
				</li>
			{/each}
		</ul>
	</div>
</Container>
