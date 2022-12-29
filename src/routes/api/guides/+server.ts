import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { GuidesRepo } from '$lib/api/guides';

const repo = new GuidesRepo();

export const GET = (async ({ url }) => {
	const id = url.searchParams.get('id') || undefined;
	if (id === undefined) {
		const guides = await repo.getAll();
		console.log('[GET] guides ALL =', guides);
		return json(guides);
	}

	const guide = await repo.getById(id);
	if (guide === undefined) {
		throw error(404, 'Guide not found');
	}

	console.log('[GET] guide One =', id, guide);
	return json(guide);
}) satisfies RequestHandler;

export const POST = (async ({ request }) => {
	const { a, b } = await request.json();
	return json(a + b);
}) satisfies RequestHandler;
