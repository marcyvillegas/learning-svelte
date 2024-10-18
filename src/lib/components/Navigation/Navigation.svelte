<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	$: activePage = $page.url.pathname;

	function redirectPage(page: string): void {
		goto(`/${page}`);
	}
</script>

<div class="p-3 flex flex-col justify-center">
	<!-- {@debug activePage} -->
	<p class="text-center mb-2">WELCOME to learning-svelte. You can go to any of these pages:</p>
	<div class="flex justify-center gap-3">
		<button
			class={`border border-red-950 p-3 ${activePage == '/' ? 'bg-orange-200' : ''}`}
			on:click={() => redirectPage('')}>Home</button
		>
		<button
			class={`border border-red-950 p-3 ${activePage == '/todos' ? 'bg-orange-200' : ''}`}
			on:click={() => redirectPage('todos')}>To Do (using stores)</button
		>
		<button
			class={`border border-red-950 p-3 ${activePage == '/pictures' ? 'bg-orange-200' : ''}`}
			on:click={() => redirectPage('pictures')}>Pictures (using Universal Load Function)</button
		>
		<button
			class={`border border-red-950 p-3 ${activePage == '/posts' ? 'bg-orange-200' : ''}`}
			on:click={() => redirectPage('posts')}
			>Posts (GET and POST using actions and enhancement)</button
		>
	</div>
</div>
