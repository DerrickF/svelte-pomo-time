<script>
  import dark from 'smelte/src/dark.js';
  import breakpoints from 'smelte/src/breakpoints.js';
  import { DeleteIcon } from 'svelte-feather-icons';
  import { Button, TextField, List, Checkbox, Snackbar, Card } from 'smelte';

  const darkMode = dark();
  const bp = breakpoints();
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
    { id: uid++, done: false, description: 'write some docs' },
    { id: uid++, done: false, description: 'start writing blog post' },
    { id: uid++, done: true, description: 'buy some milk' },
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

  <div class="w-1/2 mx-auto py-10">
    <TextField
      placeholder="what needs to be done?"
      on:keydown={(e) => e.key === 'Enter' && add(e.target)} />
  </div>
  <div class="flex flex-wrap">
    <div class="w-full md:w-1/2">
      <h2>todo</h2>
      {#each todos.filter((t) => !t.done) as todo (todo.id)}
        <div class="mb-10" in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <Card.Card class="p-10 dark:bg-primary-500 dark:text-black w-full">
            <Card.Title
              class="py-5"
              title="{todo.description}"
            />
            <div slot="actions">
              <div class="p-2 flex justify-between align-center">
                <Checkbox checked="{todo.done}" label="Done" on:change={() => mark(todo, true)} />
                <Button class="dark:bg-white dark:text-black" on:click={() => remove(todo)}>Remove</Button>
              </div>
            </div>
          </Card.Card>
        </div>
      {/each}
    </div>

    <div class="w-full md:w-1/2">
      <h2>done</h2>
      {#each todos.filter((t) => t.done) as todo (todo.id)}
        <div in:receive={{ key: todo.id }} out:send={{ key: todo.id }}>
          <Card.Card class="p-10 m-5 dark:bg-primary-500 dark:text-black">
            <Card.Title
              class="py-5"
              title="{todo.description}"
            />
            <div slot="actions" class="p-2">
              <div class="flex justify-between align-center">
                <Checkbox checked="{todo.done}" label="Done" on:change={() => mark(todo, false)} />
                  <Button class="dark:bg-white dark:text-black" on:click={() => remove(todo)}>Remove</Button>
              </div>
            </div>
          </Card.Card>
        </div>
      {/each}
    </div>
  </div>
</main>
