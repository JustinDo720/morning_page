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
      title: 'Home Weather',
      temp: '',
      location_name: '',
      description: '',
    }
  },
  created(){
    const info = {
      API_key : process.env.VUE_APP_OWM_API_KEY,
      city_name : 'London'
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${info.city_name}&appid=${info.API_key}`
    console.log(url)
    axios.get(url).then(obj=>{
      console.log(obj.data)
    })
  }
}
</script>