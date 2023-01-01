import type { PageServerLoad } from './$types';
import { getTweet } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const data = await getTweet(params.tweetUrl);
	if (!data) {
		throw error(404, `Tweet[${params.tweetUrl}] not found`);
	}

	return {
		tweet: data
	};
}) satisfies PageServerLoad;
