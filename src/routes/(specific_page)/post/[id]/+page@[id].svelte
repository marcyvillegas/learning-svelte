<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types.js';
	export let data: PageData; // The data returned from the universal load function

	function redirectPage(): void {
		goto('/posts');
	}

	console.log(data);
</script>

<div class="flex flex-col items-center">
	<button on:click={redirectPage} class="border border-red-950 p-3">Back</button>

	<div class="mt-5">{data.post.title}</div>
	<div>{data.post.body}</div>
</div>
