import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/router.js';

const appController = createApp(App)
  appController.use(router)
  appController.mount("#app");
