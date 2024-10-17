<script lang="ts">
	import InputField from '$lib/components/shared/InputField.svelte';
	import type { ActionData } from './$types.js';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';

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
	<div class="flex justify-center">
		<div></div>
	</div>
</div>
