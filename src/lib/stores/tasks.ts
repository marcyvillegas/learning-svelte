import { writable } from 'svelte/store';

export type ToDoType = {
	id: number;
	name: string;
	isCompleted: boolean;
	isDeleted: boolean;
};

function createToDo() {
	const { subscribe, set, update } = writable<ToDoType[] | []>([]);

	return {
		subscribe,
		// Add the task submitted
		add: (newTask: ToDoType) => update((oldTasks: ToDoType[]) => [...oldTasks, newTask]),

		// Clears all task
		clearAll: () => set([]),

		// Mark task as complete
		completeTask: (task: ToDoType) => {
			update((oldTasks: ToDoType[]) => {
				oldTasks.filter((item) => item != task);
				task.isCompleted = true;

				return oldTasks;
			});
		},
		// Mark task as deleted
		deleteTask: (task: ToDoType) => {
			update((oldTasks: ToDoType[]) => {
				oldTasks.filter((item) => item != task);
				task.isDeleted = true;

				return oldTasks;
			});
		}
	};
}

export const toDo = createToDo();
