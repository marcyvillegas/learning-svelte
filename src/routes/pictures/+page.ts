export const load = async ({ fetch }) => {
	// Fetch data from a public API, accessible by both the server and client
	const response = await fetch('https://jsonplaceholder.typicode.com/photos');
	const pictures = await response.json();
	console.log(pictures);

	// Return the fetched data
	return {
		pictures
	};
};
