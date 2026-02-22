import type { LayoutServerLoad } from './$types';
import { en } from '$lib/i18n/messages/en';

export const load: LayoutServerLoad = ({ url }) => {
	const baseOrigin =
		typeof process !== 'undefined' && process.env?.PUBLIC_ORIGIN
			? process.env.PUBLIC_ORIGIN
			: url.origin;
	const jsonLd = JSON.stringify({
		'@context': 'https://schema.org',
		'@graph': [
			{ '@type': 'Organization', name: 'Quad4', url: baseOrigin },
			{
				'@type': 'WebSite',
				name: 'Quad4',
				url: baseOrigin,
				description: en.home.metaDescription
			}
		]
	});
	return { baseOrigin, jsonLd };
};
