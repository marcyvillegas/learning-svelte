<script>
	import { navigating } from '$app/stores';
	export let data; // The data returned from the universal load function
</script>

<div class="flex justify-center items-center flex-col">
	<!-- Loading state on navigation? -->
	{#if $navigating}
		<div>Loading...</div>
	{:else}
		<!-- After completely loading the page then display data? -->
		{#each data.pictures as picture}
			<img src={picture.url} alt={picture.title} width="100px" />
		{/each}
	{/if}
</div>
