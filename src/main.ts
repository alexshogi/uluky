import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { PiniaLogger } from 'pinia-logger';
import VueTheMask from 'vue-the-mask';

export const logs: Array<object> = [];

class CustomLogger {
  static log(a:never, b:never, c:object) {
    logs.push(c);
  }

  static group() {}

  static groupCollapsed() {}

  static groupEnd() {}
}

const pinia = createPinia();
const logger = CustomLogger;

pinia.use(PiniaLogger({
  logger: logger
}));

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(VueTheMask);

app.mount('#app');
