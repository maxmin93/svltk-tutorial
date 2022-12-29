import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const res = await fetch(`/api/guides?id=${params.id}`);
	if (!res.ok) {
		throw error(res.status, {
			message: 'Guide not found'
		});
	}

	const item = await res.json();
	return {
		guide: item
	};
}) satisfies PageLoad;
