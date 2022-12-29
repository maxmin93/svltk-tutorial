import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import prisma from '$lib/prisma';
import { timePosted } from '$lib/utils/date';

export const GET = (async ({ url }) => {
	// get the tweets and the user data (Prisma 😍)
	const data = await prisma.tweet.findMany({
		orderBy: { posted: 'desc' }
	});

	const tweets = data.map((tweet) => {
		return {
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: 'avatar',
			handle: 'handle',
			name: 'name',
			liked: tweet.id % 2 === 0
		};
	});

	if (!tweets) {
		throw error(404, 'Tweets not found');
	}

	return json(tweets);
}) satisfies RequestHandler;
