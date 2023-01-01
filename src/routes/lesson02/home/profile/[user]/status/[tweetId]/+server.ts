import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import prisma from '$lib/prisma';
import { timePosted } from '$lib/utils/date';

export const GET = (async ({ params }) => {
	const tweet = await prisma.tweet.findFirst({
		where: { url: params.tweetId },
		include: { user: true }
	});

	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	const likedTweets = Object.keys(liked).map((key) => liked[key].tweetId);

	const userTweet = {
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

	return {
		status: 200,
		body: { tweet: userTweet }
	};
}) satisfies RequestHandler;
