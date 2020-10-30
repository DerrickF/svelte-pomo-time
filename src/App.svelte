<script>

	import { DeleteIcon } from 'svelte-feather-icons';
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";

	let tasks = ['Get Stuff Done', 'Number 2'];
	let task;

	function addTask() {
		if (task.length > 3) {
			tasks = [...tasks, task];
			task = '';
		}
	}

	function removeTask(index) {
		let newTasks = [...tasks];
		newTasks.splice(index, 1);
		tasks = newTasks;
	}
</script>

<main>
	<h1>Task List</h1>
	<p>
		Add a task
	</p>
	<TextField outlined="true" bind:value="{task}" style="width: 25%"/>
	<Button on:click="{addTask}">Add</Button>

	<ul>
		{#each tasks as task, index}
		<li on:click="{() => removeTask(index)}">
			<span style="display: flex; justify-content: center; align-item: center">
				{task}
				<Button style="margin: 10px" color="primary" small="true" flat="true">
					<DeleteIcon size="24"/>
				</Button>
			</span>
		</li>
		{/each}
		
	</ul>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>