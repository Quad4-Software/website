<script lang="ts">
	import { ExternalLink, Globe } from 'lucide-svelte';

	interface Props {
		title: string;
		description: string;
		imageSrc?: string;
		imageAlt?: string;
		placeholder?: boolean;
		gitHref?: string;
		siteHref?: string;
		linkGitLabel?: string;
		linkWebsiteLabel?: string;
	}

	let {
		title,
		description,
		imageSrc,
		imageAlt = title,
		placeholder = false,
		gitHref,
		siteHref,
		linkGitLabel = 'Git',
		linkWebsiteLabel = 'Website'
	}: Props = $props();
</script>

<article
	class="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/[0.02] overflow-hidden shadow-sm dark:shadow-none transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md hover:-translate-y-0.5"
>
	<div class="h-44 bg-gray-900 dark:bg-black relative overflow-hidden">
		{#if placeholder}
			<div
				class="w-full h-full flex flex-col items-center justify-center text-white font-extrabold bg-gradient-to-br from-blue-900 to-blue-500"
			>
				<span class="text-2xl">{title}</span>
				<span class="text-xs uppercase opacity-70 mt-1">Coming Soon</span>
			</div>
		{:else if imageSrc}
			<img
				src={imageSrc}
				alt={imageAlt}
				width="400"
				height="176"
				loading="lazy"
				class="w-full h-full object-cover opacity-70 hover:opacity-90 transition duration-300"
			/>
		{:else}
			<div class="w-full h-full flex items-center justify-center p-5">
				<img
					src="/images/reticulum.webp"
					alt=""
					width="200"
					height="88"
					loading="lazy"
					class="max-w-full max-h-full object-contain opacity-80"
				/>
			</div>
		{/if}
	</div>
	<div class="p-5">
		<h3 class="text-lg font-bold mb-2">{title}</h3>
		<p class="text-sm text-gray-500 dark:text-gray-400">{description}</p>
		<div class="flex gap-4 mt-4">
			{#if gitHref}
				<a
					href={gitHref}
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
					title={linkGitLabel}
				>
					<ExternalLink class="w-5 h-5" />
				</a>
			{/if}
			{#if siteHref}
				<a
					href={siteHref}
					target="_blank"
					rel="noopener noreferrer"
					class="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
					title={linkWebsiteLabel}
				>
					<Globe class="w-5 h-5" />
				</a>
			{/if}
		</div>
	</div>
</article>
