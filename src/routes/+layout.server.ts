import { env } from '$env/dynamic/private';
import type { LayoutServerLoad } from './$types';
import { getLayoutData } from '$lib/layoutData';

export const load: LayoutServerLoad = ({ url }) => {
	return getLayoutData(url.origin, env.PUBLIC_ORIGIN);
};
