import type { Actions } from './$types.js';

// LOAD
export const load = async ({ fetch }) => {
	// Fetch data from a public API, accessible by both the server and client
	const response = await fetch('https://jsonplaceholder.typicode.com/posts');
	const posts = await response.json();

	console.info('REFETCHED');

	// Return the fetched data
	return {
		posts: posts.slice(0, 3)
	};
};

// ACTION
export const actions = {
	/**
	 *  Default action 👇
	 *  */
	// default: async (event) => {
	// 	// TODO log the user in
	// },

	// POST
	createPost: async ({ request }) => {
		const data = await request.formData();

		const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
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

		console.log('response: ', response.status);

		/**
		 *
		 * Retuns these 👇 if there is no enhancement in the client side
		 */
		// if (response.status != 201) {
		// 	return fail(400, {
		// 		error: 'ERROR'
		// 	});
		// }
		// return {
		// 	success: true
		// };

		// GET
		// getPosts: async () => {

		// }

		// Delete post

		// Edit post
	}
} satisfies Actions;
