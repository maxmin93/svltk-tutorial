import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import prisma from '$lib/prisma';
import { timePosted } from '$lib/utils/date';

export const GET = (async ({ url }) => {
	const profile = await prisma.user.findFirst({
		where: { name: params.user }
	});

	const tweets = await prisma.tweet.findMany({
		where: { user: { id: 1 } },
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	const likedTweets = Object.keys(liked).map((key) => liked[key].tweetId);

	if (!profile || !tweets || tweets.length === 0) {
		return { status: 404 };
	}

	const userTweets = tweets.map((tweet) => {
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

	return {
		status: 200,
		body: { profile, tweets: userTweets }
	};
}) satisfies RequestHandler;
