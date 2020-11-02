<script>
  import dark from 'smelte/src/dark.js';
  import { DeleteIcon } from 'svelte-feather-icons';
  import {
    Button,
    TextField,
    List,
    Checkbox,
    Snackbar,
    notifier,
    Notifications,
  } from 'smelte';

  const darkMode = dark();

  function notify() {
    notifier.notify(message);
  }

  let showSnackbar = false;

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
      showSnackbar = true;
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
    max-width: 300px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
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

  <Button bind:value={$darkMode}>Toggle dark mode</Button>
  <h1>Task List</h1>
  <TextField
    outlined="true"
    bind:value={text}
    style="max-width: 65%"
    on:keydown={(e) => e.key === 'Enter' && addTask()} />
  <Button on:click={addTask} style="margin-bottom: 20px;">Add</Button>

  <div style="display: flex; margin-left: auto; margin-right: auto;">
    <div style="flex: 48%; border: 1px solid;">
      <h4>TODO:</h4>
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
    </div>
    <div style="flex: 2%" />
    <div style="flex: 48%; border: 1px solid;">
      <h4>DONE:</h4>
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
    </div>
  </div>
</main>
