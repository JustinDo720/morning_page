<template>
  <p class='flow-text green-text accent-3'>
    {{ quote_of_day }}
  </p>
  <p class='flow-text green-text accent-3'>
    - {{ quote_author }}
  </p>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      // We are going to grab the data for this in our created life hook
      quote_of_day: '',
      quote_author: '',

    }
  },
  created() {
    const options = {
      method: 'GET',
      url: process.env.VUE_APP_QUOTE_API_URL,
      params:{token: process.env.VUE_APP_QUOTE_TOKEN},
      headers: {
        'x-rapidapi-key': process.env.VUE_APP_API_KEY,
        'x-rapidapi-host': process.env.VUE_APP_QUOTE_API_HOST
      }
    }
    axios.request(options).then((obj) =>{
      this.quote_of_day = obj.data.text
      this.quote_author = obj.data.author
    })
  }
}
</script>