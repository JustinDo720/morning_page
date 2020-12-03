<template>
  <h1>
    {{location_name}}
  </h1>
  <h2>
    {{temp}}
  </h2>
  <h3>
    {{description}}
  </h3>
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
    axios.get(url).then(obj=>{
      console.log(obj.data)
      this.location_name = obj.data.name
      this.description = obj.data.weather[0].main
      let f_temp = ((obj.data.main.temp - 273.15)*1.8) + 32
      this.temp = `${Math.round(f_temp)}°F`
      console.log(this.temp)
    })
  }
}
</script>