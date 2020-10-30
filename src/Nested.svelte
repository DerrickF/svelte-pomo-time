<script>
    let count = 1500000; // 25 mins
    let task = '';

    function start() {

        window.document.title = count.toString();
        let interval = setInterval(() => {
            if(count > 0) {
                count = count - 1;
                window.document.title = count.toString();
            } else {
                clearInterval(interval);
                window.alert('AAALLLL DONE')
            }
        }, 1000);
    }
</script>

<h1>You Have {count}</h1>
<h2>What are you going to work on ?</h2>
<input bind:value={task}>

<p>Start working on: {task}</p>

<button on:click="{start}">START</button>
