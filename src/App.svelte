<script>
  import dark from 'smelte/src/dark.js';
  import { Button, TextField, Checkbox, Snackbar, Card } from 'smelte';

  const darkMode = dark();
  let showSnackbar = false;

  import { quintOut } from 'svelte/easing';
  import { crossfade } from 'svelte/transition';

 
  const [send, receive] = crossfade({
    duration: (d) => Math.sqrt(d * 200),

    fallback(node, params) {
      const style = getComputedStyle(node);
      const transform = style.transform === 'none' ? '' : style.transform;

      return {
        duration: 600,
        easing: quintOut,
        css: (t) => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`,
      };
    },
  });

  let uid = 1;

  let todos = [
    { id: uid++, done: true, description: 'buy some milk' },
    { id: uid++, done: false, description: 'write some docs' },
    { id: uid++, done: false, description: 'start writing really reallyreally really really really really really long blog post blog post' },
    { id: uid++, done: false, description: 'mow the lawn' },
    { id: uid++, done: false, description: 'feed the turtle' },
    { id: uid++, done: false, description: 'fix some bugs' },
  ];

  function add(input) {
    const todo = {
      id: uid++,
      done: false,
      description: input.value,
    };

    todos = [todo, ...todos];
    input.value = '';
  }

  function remove(todo) {
    todos = todos.filter((t) => t !== todo);
  }

  function mark(todo, done) {
    todo.done = done;
    remove(todo);
    todos = todos.concat(todo);
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  @media (min-width: 600px) {
    main {
      max-width: none;
    }
  }

</style>

<main>
  <Snackbar bind:value={showSnackbar} noAction color="success" timeout={2000}>
    <div>Task Added</div>
  </Snackbar>

  <h1>Svelte Pomo</h1>
  
  <Button bind:value={$darkMode}>Toggle dark mode</Button>

  <div class="w-full md:w-1/2 mx-auto py-10">
    <TextField
      placeholder="what needs to be done?"
      on:keydown={(e) => e.key === 'Enter' && add(e.target)} />
  </div>

  <div class="flex flex-wrap mx-2 overflow-hidden">
    <div class="my-2 px-2 w-full md:w-1/2">
      <h2>TODO</h2>
      {#each todos.filter((t) => !t.done) as todo (todo.id)}
        <div in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <Card.Card class="flex p-3 w-full my-2 dark:bg-gray">
            <div class="flex w-full justify-end">
              <div class="py-2">
                <Button small="true" color="alert" icon="close" on:click={() => remove(todo)}/>
              </div>
            </div>
            <div class="flex">
              <Checkbox checked="{todo.done}" label="{todo.description}" on:change={() => mark(todo, true)} />
            </div>
          </Card.Card>
        </div>
      {/each}
      {#if todos.filter((t) => !t.done).length <= 0}
        <img style="display: inline" src="https://media.giphy.com/media/8JW82ndaYfmNoYAekM/giphy.gif" alt="done"/>
      {/if }
    </div>
    <div class="my-2 px-2 w-full md:w-1/2">
      <h2>DONE</h2>
      {#each todos.filter((t) => t.done) as todo (todo.id)}
        <div in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <Card.Card class="flex p-3 w-full my-2 ">
            <div class="flex w-full justify-end">
              <div class="py-2">
                <Button small="true" color="alert" icon="close" on:click={() => remove(todo)}/>
              </div>
            </div>
            <div class="flex">
              <Checkbox checked="{todo.done}" label="{todo.description}" on:change={() => mark(todo, false)} />
            </div>
          </Card.Card>
        </div>
      {/each}
    </div>
  </div>
</main>
