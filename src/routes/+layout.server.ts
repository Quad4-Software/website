import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ url }) => {
	const baseOrigin =
		typeof process !== 'undefined' && process.env?.PUBLIC_ORIGIN
			? process.env.PUBLIC_ORIGIN
			: url.origin;
	return { baseOrigin };
};
