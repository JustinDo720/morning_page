<template>
  <h1>
    {{ title }}
  </h1>
</template>
<script>
import axios from 'axios'

export default{
  data(){
    return{
      title: 'Home Weather'
    }
  },
  created(){
    // Our params are dummy data we could patch it up later
    const options = {
      method: 'GET',
      url: process.env.VUE_APP_WEATHER_URL,
      params: {
        q: 'London,uk',
        lat: '0',
        lon: '0',
        callback: 'test',
        id: '2172797',
        lang: 'null',
        units: '"metric" or "imperial"',
        mode: 'xml, html'
      },
      headers: {
        'x-rapidapi-key': process.env.VUE_APP_API_KEY,
        'x-rapidapi-host': process.env.VUE_APP_WEATHER_HOST
      }
    }

    axios.request(options).then((res) =>{
      console.log(res.data)
    })
  }
}
</script>