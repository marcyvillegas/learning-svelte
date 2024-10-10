<script lang="ts">
	export let data; // The data returned from the universal load function
</script>

<div class="flex justify-center items-center flex-col">
	<!-- After completely loading the page then display data? -->
	{#each data.pictures as picture}
		<img src={picture.url} alt={picture.title} width="100px" />
	{/each}
</div>
