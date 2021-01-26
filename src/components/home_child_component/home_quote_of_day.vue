<template>
  <div class="quoteBox grey darken-3 z-depth-4">
    <h4 class="teal-text text-accent-4">
      {{ quote_of_day }}
    </h4>
  </div>
  <p class="right flow-text teal-text text-accent-4" style="margin:10px">
    - {{ quote_author }}
  </p>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      // We are going to grab the data for this in our created life hook
      quote_of_day: "",
      quote_author: ""
    };
  },
  created() {
    const options = {
      method: "GET",
      url: process.env.VUE_APP_QUOTE_API_URL,
      params: { token: process.env.VUE_APP_QUOTE_TOKEN },
      headers: {
        "x-rapidapi-key": process.env.VUE_APP_API_KEY,
        "x-rapidapi-host": process.env.VUE_APP_QUOTE_API_HOST
      }
    };
    axios.request(options).then(obj => {
      this.quote_of_day = obj.data.text;
      this.quote_author = obj.data.author;
    });
  }
};
</script>
<style scoped>
.quoteBox {
  border-radius: 5%;
  padding: 8px;
}
</style>
