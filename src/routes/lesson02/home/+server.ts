import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { getTweets } from '$lib/server/db';

export const GET = (async ({ url }) => {
	try {
		const tweets = await getTweets();
		return json(tweets);
	} catch (err) {
		throw error(404, 'Tweets not found');
	}
}) satisfies RequestHandler;
