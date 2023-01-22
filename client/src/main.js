// import { createApp } from 'vue';
// import App from './App.vue';
// import router from './router';

// createApp(App).use(router).mount('#app');

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import mitt from 'mitt';

const event = new mitt();
const app = createApp(App);
app.config.globalProperties.$event = event;
app.use(router).mount('#app');

