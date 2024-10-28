// LOAD
export const load = async ({ fetch, params }) => {
	// Fetch data from a public API, accessible by both the server and client
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);
	const post = await response.json();

	console.info('SPECIFIC POST IS FETCHED');
	console.info(post.title);
	console.info(params.id);

	// Return the fetched data
	return {
		post
	};
};
