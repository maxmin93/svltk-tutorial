import type { Actions } from './$types';
import { createTweet, removeTweet, likeTweet } from '$lib/server/db';
import { fail } from '@sveltejs/kit';
/*
import type { PageServerLoad } from './$types';
import { getTweets } from '$lib/server/db';

export const load = (async ({ params }) => {
	const tweets = await getTweets();
	return {
		tweets: tweets
	};
}) satisfies PageServerLoad;
*/

// for form action in compose.svelte
export const actions = {
	create: async (event) => {
		const form = await event.request.formData();
		const tweet = String(form.get('tweet'));
		console.log('create:', tweet);

		if (tweet.length > 140) {
			return fail(400, { errorMsg: 'Maximum Tweet length exceeded.' });
		}

		// the user id is hardcoded but you can get it from a session
		const result = await createTweet(tweet);
		console.log('create Tweet:', result);
		return {
			success: Object.hasOwn(result, 'id')
		};
	},

	delete: async (event) => {
		const form = await event.request.formData();
		if (!form.get('id')) {
			return fail(400, { errorMsg: 'No tweetId provided' });
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const tweetId = +form.get('id')!; // + converts to number
		console.log(`delete: id=${tweetId}`);

		const result = await removeTweet(tweetId);
		console.log('delete Tweet:', result);
		return {
			success: tweetId
		};
		// invalidate 는 client side 에서만 동작한다.
		// return invalidate(get(rootPath) + '/home'); // refresh the page
		// return {
		// 	status: 303,
		// 	headers: { location: get(rootPath) + '/home' }
		// };
	},

	like: async (event) => {
		const form = await event.request.formData();
		if (!form.get('id')) {
			return fail(400, { errorMsg: 'No tweetId provided' });
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const twId = +form.get('id')!;
		const result = await likeTweet(twId);
		console.log('like Tweet:', result);
		return {
			success: Object.hasOwn(result, 'likes')
		};
	}
} satisfies Actions;
