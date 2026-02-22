<script lang="ts">
	import { page } from '$app/stores';
	import { tStore } from '$lib/i18n';
	import { Menu, X } from 'lucide-svelte';
	import Container from './Container.svelte';
	import ThemeToggle from './ThemeToggle.svelte';

	const path = $derived($page.url.pathname);
	let mobileOpen = $state(false);

	function isActive(href: string): boolean {
		if (href === '/') return path === '/';
		return path.startsWith(href);
	}

	const linkClass = (href: string) =>
		`text-sm font-medium transition-colors block py-2 ${
			(href === '/' ? path === '/' : path.startsWith(href))
				? 'text-gray-900 dark:text-gray-100'
				: 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
		}`;
</script>

<nav
	class="sticky top-0 z-50 bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/60 transition-colors"
>
	<Container>
		<div class="flex justify-between items-center h-16">
			<a href="/" class="text-xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">Quad4</a>

			<div class="hidden md:flex items-center gap-6">
				<div class="flex gap-6">
					<a href="/" class={linkClass('/')}>{$tStore('nav.home')}</a>
					<a href="/contact" class={linkClass('/contact')}>{$tStore('nav.contact')}</a>
					<a
						href="https://git.quad4.io"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block py-2"
					>
						{$tStore('nav.git')}
					</a>
				</div>
				<ThemeToggle />
			</div>

			<div class="flex md:hidden items-center gap-2">
				<ThemeToggle />
				<button
					type="button"
					class="p-2 rounded-lg border border-gray-200 dark:border-gray-700/80 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
					aria-expanded={mobileOpen}
					aria-label="Toggle menu"
					onclick={() => (mobileOpen = !mobileOpen)}
				>
					{#if mobileOpen}
						<X class="w-5 h-5" />
					{:else}
						<Menu class="w-5 h-5" />
					{/if}
				</button>
			</div>
		</div>

		{#if mobileOpen}
			<div
				class="md:hidden py-4 border-t border-gray-200/80 dark:border-gray-800/60 bg-gray-50/50 dark:bg-white/[0.02]"
				role="dialog"
				aria-label="Mobile menu"
			>
				<div class="flex flex-col gap-1">
					<a href="/" class={linkClass('/')} onclick={() => (mobileOpen = false)}>{$tStore('nav.home')}</a>
					<a href="/contact" class={linkClass('/contact')} onclick={() => (mobileOpen = false)}
						>{$tStore('nav.contact')}</a
					>
					<a
						href="https://git.quad4.io"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 block py-2"
						onclick={() => (mobileOpen = false)}
					>
						{$tStore('nav.git')}
					</a>
				</div>
			</div>
		{/if}
	</Container>
</nav>
