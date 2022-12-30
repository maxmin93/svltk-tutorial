import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

type Note = {
	title: string;
	content?: string;
};

let notes: Note[] = [
	{
		title: 'Progressive Enhancement',
		content: 'use:enhance is cool 👍'
	}
];

export const load = (() => {
	return {
		notes
	};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request }) => {
		const note = Object.fromEntries(await request.formData()) as Note;

		console.log('data.title.length:', note.title.length);
		if (note.title.length < 2) {
			return fail(400, {
				note: note,
				errorMsg: '❌ Title must not be empty! (server)'
			});
		}

		notes.push(note);

		return {
			note: undefined,
			errorMsg: undefined
		};
	},

	delete: async ({ request }) => {
		const target = Object.fromEntries(await request.formData()) as Note;

		notes = notes.filter((note) => note.title !== target.title);

		return {
			note: undefined,
			errorMsg: undefined
		};
	}
} satisfies Actions;
