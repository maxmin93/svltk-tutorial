import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const photos = await fetch('/api/photos').then((res) => res.json());
	return {
		photos: photos
	};
}) satisfies PageLoad;
