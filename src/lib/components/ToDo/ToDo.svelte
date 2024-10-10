<script lang="ts">
	import { toDo, type ToDoType } from '$lib/stores/tasks.js';

	let task: string = '';

	let activeTaskTab = 'completed';

	function handleSubmit(): void {
		if (task != '') {
			toDo.add({
				id: Math.floor(Math.random() * 1000) + 1,
				name: task,
				isCompleted: false,
				isDeleted: false
			});

			task = '';
		}
	}

	function handleComplete(task: ToDoType) {
		toDo.completeTask(task);
	}

	function handleDelete(task: ToDoType) {
		toDo.deleteTask(task);
	}
</script>

<div class="flex justify-center mt-5">
	<div class="mr-10 border border-red-700 p-2">
		<h1 class="text-center font-bold">TO DO</h1>

		<input class="border border-blue-800 p-2" bind:value={task} />
		<button class="border border-blue-800 p-2" on:click={handleSubmit}>ADD</button>
		<div>
			{#each $toDo as task}
				{#if task.isDeleted == false && task.isCompleted == false}
					<div class="flex gap-4 m-3 justify-between">
						<div>{task.name}</div>
						<div>
							<button class="border border-green-900" on:click={() => handleDelete(task)}
								>Delete</button
							>
							<button class="border border-red-900" on:click={() => handleComplete(task)}
								>Complete</button
							>
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>

	<div>
		<div class="border border-red-700 p-2">
			<button class="border border-pink-700 p-3" on:click={() => (activeTaskTab = 'completed')}
				>Completed tasks</button
			>
			<button class="border border-pink-700 p-3" on:click={() => (activeTaskTab = 'deleted')}
				>Deleted tasks</button
			>

			<div>
				{#each $toDo as task}
					{#if task.isCompleted == true && activeTaskTab == 'completed'}
						<div>{task.name}</div>
					{/if}

					{#if task.isDeleted == true && activeTaskTab == 'deleted'}
						<div>{task.name}</div>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
