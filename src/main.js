import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'YATT (Yet Another Tomato Timer)',
  },
});

export default app;
