<script lang="ts">
	import { Sun, Moon } from 'lucide-svelte';
	import { themeStore, toggleTheme } from '$lib/theme';
	import { tStore } from '$lib/i18n';
</script>

<button
	type="button"
	class="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
	aria-label={$tStore('a11y.toggleTheme')}
	onclick={() => toggleTheme()}
>
	{#if $themeStore === 'dark'}
		<Sun class="w-[18px] h-[18px]" />
	{:else}
		<Moon class="w-[18px] h-[18px]" />
	{/if}
</button>
