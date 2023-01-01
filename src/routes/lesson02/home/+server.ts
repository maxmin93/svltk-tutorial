import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import prisma from '$lib/prisma';
import { timePosted } from '$lib/utils/date';

export const GET = (async ({ url }) => {
	// get the tweets and the user data (Prisma 😍)
	const data = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	// get the liked tweets
	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	// we just want an array of the ids
	const likedTweets = Object.keys(liked).map((key) => liked[+key].tweetId);

	const tweets = data.map((tweet) => {
		return {
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: tweet.user.avatar,
			handle: tweet.user.handle,
			name: tweet.user.name,
			liked: likedTweets.includes(tweet.id)
		};
	});

	if (!tweets) {
		throw error(404, 'Tweets not found');
	}

	return json(tweets);
}) satisfies RequestHandler;
