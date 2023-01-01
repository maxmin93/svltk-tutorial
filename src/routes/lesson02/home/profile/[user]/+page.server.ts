import type { PageServerLoad } from './$types';
import { getUserProfile } from '$lib/server/db';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const data = await getUserProfile(params.user);
	if (!data) {
		throw error(404, `User[${params.user}] not found`);
	}

	return {
		profile: data.profile,
		tweets: data.tweets
	};
}) satisfies PageServerLoad;
