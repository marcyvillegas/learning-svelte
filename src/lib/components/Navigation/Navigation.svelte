<script>
	import { goto } from '$app/navigation';

	/**
	 * @param {string} page
	 * @returns {void}
	 */
	function redirectPage(page) {
		goto(`/${page}`);
	}
</script>

<div class="p-3 flex flex-col justify-center">
	<p class="text-center mb-2">WELCOME to learning-svelte. You can go to any of these pages:</p>
	<div class="flex justify-center gap-3">
		<button class="border border-red-950 p-3" on:click={() => redirectPage('todos')}>To Do</button>
		<button class="border border-red-950 p-3" on:click={() => redirectPage('pictures')}
			>Pictures</button
		>
	</div>
</div>
