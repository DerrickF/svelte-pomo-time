<script>
  import { Card, Button, ProgressLinear } from 'smelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  

  let originalTime = 25;
  let elapsedTime = 0;
  let paused = false;
  let mode = "Focus";
  let timerRunning = false;

  let timer = tweened(originalTime, {
    duration: 400,
    easing: cubicOut
  });

  function startTimer() {
    timerRunning = true;
    timerInterval();
  }

  function timerInterval() {
    setInterval(() => {
        if ($timer > 0 && !paused) {
          $timer--;
          elapsedTime++;
        }
      }, 1000);
  }

  function togglePaused() {
    paused = !paused;
  }

  $: minutes = Math.floor($timer / 60);
  $: minname = minutes > 1 ? "mins" : "min";
  $: seconds = Math.floor($timer - minutes * 60);
  $: percentDone = Math.round((elapsedTime / originalTime) * 100);

  let tmp = 100

</script>

<style>
  .timer {
    font-family: 'Source Code Pro', monospace;
    color: darkred;
  }

</style>

<!-- (first 25 mins, then 5 min break) x 4 then long 30 min -->
<Card.Card class="p-5">
  <div slot="text">
    <h3>{mode} for<br/><span class="timer">{minutes}{minname}</span> and <span class="timer">{seconds}s</span><h3>
      <div>
        <ProgressLinear progress="{percentDone}" class="h-12"/>
      </div>
      <Button disabled="{timerRunning}" on:click={() => startTimer()} >Start</Button>
      {#if !paused}
        <div in:fade out:fade>
          <Button on:click={() => togglePaused()}>Pause</Button>
        </div>
      {:else}
      <div in:fade out:fade>
        <Button on:click={() => togglePaused()}>Resume</Button>
      </div>
      {/if}
  </div>
</Card.Card>

