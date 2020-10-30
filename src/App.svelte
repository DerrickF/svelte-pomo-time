<script>
import Nested from "./Nested.svelte";

	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>The creator and his proponents encourage a low-tech approach, using a mechanical timer, paper, and pencil.</p>
	<p>The physical act of winding the timer confirms the user's determination to start the task;
		ticking externalises desire to complete the task; ringing announces a break.
	</p>
	<p>
		Flow and focus become associated with these physical stimuli
	</p>
	<Nested></Nested>
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