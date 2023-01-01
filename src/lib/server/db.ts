import prisma from '$lib/prisma';
import { timePosted } from '$lib/utils/date';

export const getTweets = async () => {
	const tweets = await prisma.tweet.findMany({
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	const likedTweets = await getLikedTweets();

	return tweets.map((tweet) => {
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
};

export const getTweet = async (tweetUrl: string) => {
	const tweet = await prisma.tweet.findFirst({
		where: { url: tweetUrl },
		include: { user: true }
	});
	if (!tweet) return undefined;

	const likedTweets = await getLikedTweets();

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
};

export const getLikedTweets = async () => {
	// hard coded userId(1)
	const liked = await prisma.liked.findMany({
		where: { userId: 1 },
		select: { tweetId: true }
	});

	// 왜 이렇게 하는지 모르겠지만,
	// Object.keys(liked) 는 인덱스의 배열을 반환한다.
	// Object.keys(liked).map((key) => ...) 은 liked.map((val) => ...) 과 같다.
	const likedTweets = Object.keys(liked).map((key) => liked[+key].tweetId);
	return likedTweets;
};

export const createTweet = async (tweet: string) => {
	return await prisma.tweet.create({
		data: {
			posted: new Date(),
			url: Math.random().toString(16).slice(2),
			content: tweet,
			likes: 0,
			// you can get the user from the session
			user: { connect: { id: 1 } }
		}
	});
};

export const removeTweet = async (tweetId: number) => {
	return await prisma.tweet.delete({ where: { id: tweetId } });
};

export const likeTweet = async (tweetId: number) => {
	// verify if tweet is already liked
	const liked = await prisma.liked.count({
		where: { tweetId: tweetId }
	});

	// if tweet is already liked unlike it
	if (liked === 1) {
		await prisma.liked.delete({ where: { tweetId: tweetId } });

		// update the likes count
		const tweet = await prisma.tweet.findUnique({
			where: { id: tweetId },
			select: { likes: true }
		});
		await prisma.tweet.update({
			where: { id: tweetId },
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			data: { likes: (tweet!.likes -= 1) }
		});

		return {
			tweetId: tweetId,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			likes: tweet!.likes
		};
	}

	// add liked record
	await prisma.liked.create({
		data: {
			tweetId: tweetId,
			user: { connect: { id: 1 } }
		}
	});

	// get the current like count and update it
	const tweet = await prisma.tweet.findUnique({
		where: { id: tweetId },
		select: { likes: true }
	});

	await prisma.tweet.update({
		where: { id: tweetId },
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		data: { likes: (tweet!.likes += 1) }
	});

	return {
		tweetId: tweetId,
		likes: tweet!.likes
	};
};

export const getUserProfile = async (userName: string) => {
	const profile = await prisma.user.findFirst({
		where: { name: userName }
	});

	const tweets = await prisma.tweet.findMany({
		where: { user: { id: 1 } },
		include: { user: true },
		orderBy: { posted: 'desc' }
	});

	const likedTweets = await getLikedTweets();

	if (!profile || !tweets || tweets.length === 0) {
		return undefined;
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

	return { profile, tweets: userTweets };
};
