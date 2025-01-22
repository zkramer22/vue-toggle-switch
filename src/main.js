import { createApp } from 'vue';
import App from './App.vue'; // Your test App

console.log('Mounting app...');

const app = createApp(App);
app.mount('#app');