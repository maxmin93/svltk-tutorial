import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const tweets = await fetch('/lesson02/home').then((r) => r.json());
	return {
		tweets: tweets
	};
}) satisfies PageLoad;
