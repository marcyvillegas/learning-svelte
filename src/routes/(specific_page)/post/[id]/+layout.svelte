<script lang="ts">
	import '../../../../app.css';
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center gap-3 mt-5">
	<div>SPECIFIC POST ID: {$page.params.id}</div>
	<slot />
</div>
