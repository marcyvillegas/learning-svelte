<script lang="ts">
	import InputField from '$lib/components/shared/InputField.svelte';
	import type { ActionData } from './$types.js';

	export let form: ActionData;
</script>

<div>
	<div class="flex justify-center">
		<form method="POST" action="?/createPost">
			<InputField label="title" name="title" />
			<InputField label="body" name="body" type="textarea" />

			<button>Submit</button>
		</form>

		<div>
			{#if form?.success}
				<p>{form.success}!!!</p>
			{/if}
		</div>
	</div>

	<div class="flex justify-center">
		<div></div>
	</div>
</div>
