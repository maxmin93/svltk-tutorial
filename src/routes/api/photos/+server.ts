import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

export const GET = (async (url) => {
	const response = await fetch('https://jsonplaceholder.typicode.com/photos');
	const photos = await response.json();

	return json(photos.slice(0, 100));
}) satisfies RequestHandler;
