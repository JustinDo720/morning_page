<template>
  <h1>
    {{ quote_of_day }}
  </h1>
  <h4>
    -- {{ quote_author }}
  </h4>
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
      headers: {
        'x-rapidapi-key': process.env.VUE_APP_API_KEY,
        'x-rapidapi-host': process.env.VUE_APP_QUOTE_API_HOST
      }
    }
    axios.request(options).then((obj) =>{
      console.log(obj.data.message, obj.data.author)
      this.quote_of_day = obj.data.message
      this.quote_author = obj.data.author.authorName
    })
  }
}
</script>