import type { Actions } from './$types';
import prisma from '$lib/prisma';

import { rootPath } from '../const';
import { get } from 'svelte/store';
import { fail } from '@sveltejs/kit';

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
		await prisma.tweet.create({
			data: {
				posted: new Date(),
				url: Math.random().toString(16).slice(2),
				content: tweet,
				likes: 0,
				user: { connect: { id: 1 } }
			}
		});
		return {};
	},

	delete: async (event) => {
		const form = await event.request.formData();
		if (!form.has('id')) {
			return fail(400, { errorMsg: 'No tweetID provided' });
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const tweetId = +form.get('id')!; // + converts to number

		await prisma.tweet.delete({ where: { id: tweetId } });

		console.log(`delete: id=${tweetId}`);
		// invalidate 는 client side 에서만 동작한다.
		// return invalidate(get(rootPath) + '/home'); // refresh the page
		return {
			status: 303,
			headers: { location: get(rootPath) + '/home' }
		};
	},

	like: async (event) => {
		const form = await event.request.formData();
		if (!form.has('id')) {
			return fail(400, { errorMsg: 'No tweetID provided' });
		}
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const id = +form.get('id')!;

		const liked = await prisma.liked.count({
			where: { tweetId: id }
		});

		// already liked
		if (liked === 1) {
			await prisma.liked.delete({ where: { tweetId: id } });

			const count = await prisma.tweet.findUnique({
				where: { id },
				select: { likes: true }
			});

			await prisma.tweet.update({
				where: { id },
				data: { likes: (count.likes -= 1) }
			});

			return {
				status: 303,
				headers: { location: get(rootPath) + '/home' }
			};
		}

		// not liked yet
		await prisma.liked.create({
			data: {
				tweetId: id,
				user: { connect: { id: 1 } }
			}
		});

		const count = await prisma.tweet.findUnique({
			where: { id },
			select: { likes: true }
		});

		await prisma.tweet.update({
			where: { id },
			data: { likes: (count.likes += 1) }
		});

		return {
			status: 303,
			headers: { location: get(rootPath) + '/home' }
		};
	}
} satisfies Actions;
