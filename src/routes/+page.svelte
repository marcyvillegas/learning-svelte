<script lang="ts">
	import { toDo } from '$lib/stores/tasks.js';
</script>

<div class="flex justify-center gap-3">
	{#if $toDo.length == 0}
		<div class="border border-red-700 p-2">No tasks</div>
	{/if}

	{#each $toDo as task}
		<div class="border border-red-700 p-2">
			<div>{task.id}</div>
			<div>{task.name}</div>
			<div>Completed: {task.isCompleted}</div>
			<div>Deleted: {task.isDeleted}</div>
		</div>
	{/each}
</div>
