<script>
  import { DeleteIcon } from 'svelte-feather-icons';
  import Button from 'smelte/src/components/Button';
  import List from 'smelte/src/components/List';
  import TextField from 'smelte/src/components/TextField';
  import dark from 'smelte/src/dark.js';
  import Checkbox from 'smelte/src/components/Checkbox';

  const darkMode = dark();
  let text;
  let uid = 1;

  let tasks = [
    {
      id: uid++,
      text: 'Task 1',
      done: false,
    },
    {
      id: uid++,
      text: 'Task 2',
      done: true,
    },
    {
      id: uid++,
      text: 'Task 3',
      done: false,
    },
  ];

  function addTask() {
    if (text.length > 3) {
      const newTask = {
        text: text,
        id: uid++,
      };
      tasks = [...tasks, newTask];
      text = '';
    }
  }

  function removeTask(task) {
    let index = tasks.indexOf(task);
    let newTasks = [...tasks];
    newTasks.splice(index, 1);
    tasks = newTasks;
  }
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 200px;
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

<main>
  <Button bind:value={$darkMode}>Toggle dark mode</Button>
  <h1>Task List</h1>
  <TextField
    outlined="true"
    bind:value={text}
    style="max-width: 65%"
    on:keydown={(e) => e.key === 'Enter' && addTask()} />
  <Button on:click={addTask}>Add</Button>

  <div style="margin-top: 40px">
    <h3>TODO:</h3>
    <List items={tasks}>
      <li slot="item" let:item>
        <Checkbox value={item.done} />
        {item.text}
        <Button
          on:click={() => removeTask(item)}
          style="margin: 10px"
          color="primary"
          small="true"
          flat="true">
          <DeleteIcon size="24" />
        </Button>
      </li>
    </List>
    <h3>DONE:</h3>
  </div>
</main>
