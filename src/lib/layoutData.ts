import { en } from '$lib/i18n/messages/en';

export function getLayoutData(
	origin: string,
	publicOrigin?: string
): { baseOrigin: string; jsonLd: string } {
	const baseOrigin = publicOrigin ?? origin;
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
}
