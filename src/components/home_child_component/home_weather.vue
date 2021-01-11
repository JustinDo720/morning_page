<template>
  <h3>
    {{ location_name }} <a><i class="material-icons">edit</i></a>
  </h3>
  <h4>
    {{ temp }}
  </h4>
  <h5>
    {{ description }}
  </h5>
  <button class='red btn-floating' @click='edit_weather = !edit_weather'>
    <i class='material-icons'>
      edit
    </i>
  </button>
  <modal_test v-if='edit_weather' :active-modal=true comp-name='weather'>
    <template v-slot:weather>
      <!-- Body -->
      <div class='input-field'>
        <input
            id='location'
            type='text'
            class='validate black-text'
            v-model='city'
            style='width: 300px;'
            placeholder='Enter your city here'
            @keyup.enter='enterCity'>
      </div>
      <!-- Footer -->
      <div >
        <button class='btn-small green white-text' style='margin-bottom: 10px;' @click='enterCity'>
          Enter
        </button>
      </div>
    </template>
  </modal_test>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      title: "Home Weather",
      temp: "",
      location_name: "",
      description: "",
      edit_weather: false,
      city: ''
    };
  },
  methods:{
    enterCity: function(){
      console.log(this.city)
    }
  },
  created() {
    const info = {
      API_key: process.env.VUE_APP_OWM_API_KEY,
      city_name: "London"
    };
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${info.city_name}&appid=${info.API_key}`;
    axios.get(url).then(obj => {
      console.log(obj.data);
      this.location_name = obj.data.name;
      this.description = obj.data.weather[0].main;
      let f_temp = (obj.data.main.temp - 273.15) * 1.8 + 32;
      this.temp = `${Math.round(f_temp)}°F`;
      console.log(this.temp);
    });
  }
};
</script>
