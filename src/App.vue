<template>
  <div id="app">
    <!-- With :key='$route.fullPath' we will see any change which will trigger a reload-->
    <navigation :key="$route.fullPath"></navigation>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
//* Imports go here
import navigation from "@/nav.vue";

require("dotenv").config({ path: ".env" });
export default {
  components: {
    navigation
  },
  created() {
    let date_info = new Date();
    let curr_hr = date_info.getHours();
    if (curr_hr < 12) {
      document.body.style.backgroundColor = "#e0f7fa";
    } else if (curr_hr <= 18 && curr_hr >= 12) {
      document.body.style.backgroundColor = "#fff3e0";
    } else {
      document.body.style.backgroundColor = "#fafafa";
    }
  }
};
</script>
