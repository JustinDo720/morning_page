import { createApp } from "vue";
import App from "./App.vue";
import router from '@/router/router.js';
import firebaseApp from "@/components/db";

let appController;
firebaseApp.auth().onAuthStateChanged(user=>{
  if(user){
    if(!appController){
      appController = createApp(App)
      appController.use(router)
      appController.mount("#app");
    }
  }
      })