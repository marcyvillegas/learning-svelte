<script lang="ts">
	import Status from '$lib/constants/status.js';

	export let deleting: boolean;
	export let deleteStatus: Status = Status.INITIAL;
</script>

<div class="mt-2">
	<div>MONITORING IF DELETE IS SUCCESSSFUL:</div>
	{#if deleting}
		<p>DELETING...</p>
	{/if}

	{#if deleteStatus == 'success'}
		<p>SUCCESSS FROM STATE</p>
	{/if}

	{#if deleteStatus == 'failure'}
		<p>FAILURE FROM STATE</p>
	{/if}
</div>
