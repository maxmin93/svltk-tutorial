import type { PageLoad } from './$types';
import { GuidesRepo } from '$lib/api/guides';

const repo = new GuidesRepo();

export const load = (async ({ params }) => {
	const guides = await repo.getAll();
	return {
		guides: guides
	};
}) satisfies PageLoad;
