<script lang="ts">
	import InputField from '$lib/components/shared/InputField.svelte';
	import type { ActionData } from './$types.js';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types.js';

	export let data: PageData; // The data returned from the universal load function
	export let form: ActionData;

	// state
	let dataState = '';
	let creating = false;

	// enhance
	const submitCreatePost: SubmitFunction = ({
		formElement,
		formData,
		action,
		cancel,
		submitter
	}) => {
		console.log(formElement);
		console.log(formData);

		creating = true;

		return async ({ result, update }) => {
			console.log(result.type);

			if (result.type === 'success') {
				creating = false;
				dataState = 'success';
				await update();
			}

			if (result.type === 'failure') {
				creating = false;
				dataState = 'failure';
				await update();
			}
		};
	};
</script>

<div>
	<!-- POST -->
	<div class="flex justify-center">
		<form method="POST" action="?/createPost" use:enhance={submitCreatePost}>
			<InputField label="title" name="title" />
			<InputField label="body" name="body" type="textarea" />

			<button>Submit</button>
		</form>
	</div>

	<div class="flex justify-center">
		<!-- from server if there are not enhancements 👇 -->
		<!-- {#if form?.success}
			<p class="error">SUCCESSS</p>
		{/if}

		{#if form?.error}
			<p class="error">{form.error}</p>
		{/if} -->

		<!-- from state 👇 -->
		{#if creating}
			<p>CREATING...📝</p>
		{/if}

		{#if dataState == 'success'}
			<p>SUCCESSS FROM STATE</p>
		{/if}

		{#if dataState == 'failure'}
			<p>FAILURE FROM STATE</p>
		{/if}
	</div>

	<!-- GET -->
	<div>
		<div class="flex justify-center mt-5">GET ALL POSTS (5 only)</div>

		<div class="flex justify-center mt-5 flex-col items-center">
			<!-- After completely loading the page then display data -->
			{#each data.posts as post}
				<div class="p-2 border border-red-950 m-5">
					<div>{post.title}</div>
					<div>{post.body}</div>
					<button class="p-2 border border-purple-700">EDIT</button>
					<button class="p-2 border border-purple-700">DELETE</button>
				</div>
			{/each}
		</div>
	</div>
</div>
