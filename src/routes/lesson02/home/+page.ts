import type { PageLoad } from './$types';
import type { TweetType } from '$lib/types/lesson02';

export const load = (async ({ fetch, params }) => {
	const tweets = await fetch('/api/tweets').then((res) => res.json());
	return {
		tweets: tweets
	};
}) satisfies PageLoad;
