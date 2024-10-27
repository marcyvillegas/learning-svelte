<script lang="ts">
	import InputField from '$lib/components/shared/InputField.svelte';
	// import type { ActionData } from './$types.js';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types.js';

	export let data: PageData; // The data returned from the universal load function
	// export let form: ActionData; 👈 only use when you are not using enhance and wants to return the result directly from +page.server.ts

	enum Status {
		SUCCESSS = 'success',
		FAILED = 'failure',
		INITIAL = ''
	}

	// states
	let dataState: Status = Status.INITIAL;
	let creating: boolean = false;
	let showEditModal: boolean = false;
	let showDeleteModal: boolean = false;
	let selectedPost: {
		title: string;
		body: string;
	} = {
		title: '',
		body: ''
	};
	let editing: boolean = false;
	let editingStatus: Status = Status.INITIAL;

	// enhancements
	const submitCreatePost: SubmitFunction = ({
		formElement,
		formData,
		action,
		cancel,
		submitter
	}) => {
		dataState = Status.INITIAL;
		creating = true;

		return async ({ result, update }) => {
			console.info('Result type: ', result.type);

			if (result.type === 'success') {
				creating = false;
				dataState = Status.SUCCESSS;
				await update(); // 👈 still works even though this is not present
			}

			if (result.type === 'failure' || result.type === 'error') {
				creating = false;
				dataState = Status.FAILED;
				await update();
			}
		};
	};

	const submitEditPost: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		editingStatus = Status.INITIAL;
		editing = true;

		return async ({ result, update }) => {
			console.info('Result type: ', result.type);

			if (result.type === 'success') {
				editing = false;
				editingStatus = Status.SUCCESSS;
			}

			if (result.type === 'failure' || result.type === 'error') {
				editing = false;
				editingStatus = Status.FAILED;
				// await update(); 👈 if this is present it will remove value on input field
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
					<button
						class="p-2 border border-purple-700"
						on:click={() => {
							showEditModal = true;
							selectedPost = post;
						}}>EDIT</button
					>
					<button
						class="p-2 border border-purple-700"
						on:click={() => {
							showDeleteModal = true;
							selectedPost = post;
						}}>DELETE</button
					>
				</div>
			{/each}

			{#if showEditModal || showDeleteModal}
				<!-- Edit / Delete modal -->
				<div id="myModal" class="modal">
					<!-- Modal content -->
					<div class="modal-content">
						<button
							class="close"
							on:click={() => {
								showEditModal = false;
								showDeleteModal = false;
								selectedPost = {
									title: '',
									body: ''
								};
							}}>&times;</button
						>

						<p class="font-bold text-2xl">
							{#if showEditModal}
								EDIT
							{:else}
								DELETE
							{/if}
						</p>

						<!-- Edit form here -->
						{#if showEditModal}
							<div class="flex justify-center gap-4">
								<!-- Monitoring component here -->
								<div>
									<div>MONITORING IF EDIT IS SUCCESSSFUL:</div>

									{#if editing}
										<p>EDITING...📝</p>
									{/if}

									{#if editingStatus == Status.SUCCESSS}
										<p>EDITED</p>
									{/if}

									{#if editingStatus == Status.FAILED}
										<p>FAILED TO EDIT</p>
									{/if}
								</div>

								<!-- Form here -->
								<form
									class="flex flex-col items-center"
									method="POST"
									action="?/editPost"
									use:enhance={submitEditPost}
								>
									<InputField label="title" name="title" value={selectedPost.title} />
									<InputField label="body" name="body" value={selectedPost.body} type="textarea" />

									<button class="mt-2 p-2 border border-purple-700">update</button>
								</form>
							</div>
						{/if}

						<!-- Delete confirmation form here -->
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	/* The Modal (background) */
	.modal {
		position: fixed; /* Stay in place */
		z-index: 1; /* Sit on top */
		left: 0;
		top: 0;
		width: 100%; /* Full width */
		height: 100%; /* Full height */
		overflow: auto; /* Enable scroll if needed */
		background-color: rgb(0, 0, 0); /* Fallback color */
		background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
	}

	/* Modal Content/Box */
	.modal-content {
		background-color: #fefefe;
		margin: 15% auto; /* 15% from the top and centered */
		padding: 20px;
		border: 1px solid #888;
		width: 80%; /* Could be more or less, depending on screen size */
	}

	/* The Close Button */
	.close {
		color: #aaa;
		float: right;
		font-size: 28px;
		font-weight: bold;
	}

	.close:hover,
	.close:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
</style>
