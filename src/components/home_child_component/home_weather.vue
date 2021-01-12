<template>
  <h3>
    {{ location_name }}
  </h3>
  <h4>
    {{ temp }}
  </h4>
  <h5>
    {{ description }}
  </h5>
  <button class='red btn-floating' @click='edit_weather = !edit_weather' v-if='isSignedIn'>
    <i class='material-icons'>
      edit
    </i>
  </button>
  <modal_test v-if='edit_weather' :active-modal=activateModal comp-name='weather'>
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
  <button class='btn-small waves-effect green white-text' v-if='!isSignedIn' @click='redirectLogin'>
    Change Your City
  </button>
</template>
<script>
import axios from "axios";
import Modal from '@/components/utilities/Modal'
import firebaseApp from '@/components/db'

export default {
  components:{
    modal_test: Modal
  },
  props:{
    signedIn:{
      type: Boolean
    }
  },
  data() {
    return {
      title: "Home Weather",
      temp: "",
      location_name: "",
      description: "",
      edit_weather: false,
      city: '',
      isSignedIn: this.signedIn,
      activateModal: true,
    };
  },
  methods:{
    async enterCity() {
      let auth_user = firebaseApp.auth().currentUser.uid
      console.log(auth_user)
      let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather.json`
      await axios.post(user_fb, {'city': this.city}).then(obj => {console.log(obj.data)})
      this.edit_weather = false
      document.body.style.overflow = ''
    },
    redirectLogin: function(){
      this.$router.push('/login')
    }
  },
  created() {
    // const info = {
    //   API_key: process.env.VUE_APP_OWM_API_KEY,
    //   city_name: "London"
    // };
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${info.city_name}&appid=${info.API_key}`;
    // axios.get(url).then(obj => {
    //   console.log(obj.data);
    //   this.location_name = obj.data.name;
    //   this.description = obj.data.weather[0].main;
    //   let f_temp = (obj.data.main.temp - 273.15) * 1.8 + 32;
    //   this.temp = `${Math.round(f_temp)}°F`;
    //   console.log(this.temp);
    // });
  }
};
</script>
