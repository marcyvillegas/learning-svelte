<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation/Navigation.svelte';
	import { navigating } from '$app/stores';
	import { writable } from 'svelte/store';

	const pendingStore = writable<boolean>(false);

	$: if ($navigating) pendingStore.set(true); // <- is navigating?
	$: if (!$navigating) pendingStore.set(false);
</script>

<div>
	<Navigation />

	<!-- Loading state on navigation for each pages -->
	{#if $pendingStore}
		<div class="text-center">Loading...</div>
	{:else}
		<slot />
	{/if}
</div>
