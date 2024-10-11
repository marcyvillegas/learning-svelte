<script lang="ts">
	import type { PageData } from './$types.js';
	export let data: PageData; // The data returned from the universal load function

	data.pictures = data.pictures.slice(0, 3)
</script>

<div class="flex justify-center items-center flex-col">
	<!-- After completely loading the page then display data? -->
	{#each data.pictures as picture}
		<img src={picture.url} alt={picture.title} width="100px" />
	{/each}
</div>
