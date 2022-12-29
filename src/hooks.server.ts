import type { HandleFetch } from '@sveltejs/kit';

export const handleFetch = (async ({ request, fetch }) => {
	if (request.url.startsWith('https://api.guides.com/')) {
		// clone the original request, but change the URL
		request = new Request(
			request.url.replace('https://api.guides.com/', 'http://localhost:9999/'),
			request
		);
	}

	return fetch(request);
}) satisfies HandleFetch;
