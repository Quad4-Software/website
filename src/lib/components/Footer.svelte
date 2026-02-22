<script lang="ts">
	import { tStore } from '$lib/i18n';
	import Container from './Container.svelte';
</script>

<footer class="border-t border-gray-200 dark:border-gray-800 pt-16 pb-10 mt-24">
	<Container>
		<div class="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12">
			<div>
				<h4 class="text-sm font-bold uppercase tracking-wide mb-6">{$tStore('footer.brand')}</h4>
				<p class="text-gray-500 dark:text-gray-400 max-w-md mb-5">{$tStore('footer.tagline')}</p>
			</div>
			<div>
				<h4 class="text-sm font-bold uppercase tracking-wide mb-6">{$tStore('footer.entity')}</h4>
				<ul class="list-none">
					<li class="mb-3">
						<a
							href="/contact"
							class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
						>
							{$tStore('nav.contact')}
						</a>
					</li>
				</ul>
			</div>
			<div>
				<h4 class="text-sm font-bold uppercase tracking-wide mb-6">{$tStore('footer.legal')}</h4>
				<ul class="list-none">
					<li class="mb-3">
						<a
							href="/legal/privacy"
							class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
						>
							{$tStore('footer.privacy')}
						</a>
					</li>
					<li class="mb-3">
						<a
							href="/legal/terms"
							class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
						>
							{$tStore('footer.terms')}
						</a>
					</li>
				</ul>
			</div>
		</div>
		<p class="text-center mt-16 text-xs text-gray-400 dark:text-gray-500 uppercase tracking-widest">
			{$tStore('footer.copyright')}
		</p>
	</Container>
</footer>
