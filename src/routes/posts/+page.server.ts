import type { Actions } from './$types.js';

export const actions = {
	/**
	 *  Default action 👇
	 *  */
	// default: async (event) => {
	// 	// TODO log the user in
	// },

	// Create post
	createPost: async ({ request }) => {
		const data = await request.formData();

		fetch('https://jsonplaceholder.typicode.com/posts', {
			method: 'POST',
			body: JSON.stringify({
				title: data.get('title'),
				body: data.get('body'),
				userId: 1
			}),
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});

		return { success: true };
	}

	// Delete post

	// Edit post
} satisfies Actions;
