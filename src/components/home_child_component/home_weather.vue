<template :key='city_from_fb'>
  <h3>
    {{ location_name }}
  </h3>
  <h4>
    {{ temp }}
  </h4>
  <h5>
    {{ description }}
  </h5>
  <h3 v-if='city_from_fb'>
    {{ city_from_fb['city_name'] }}
  </h3>

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
      default_city: 'London',
      isSignedIn: this.signedIn,
      activateModal: true,
      city_from_fb: null // we will use this to determine if the user will post or update their city name
    };
  },
  methods:{
    initalizeSetup(preferred_city = null){
      console.log(preferred_city)
      // Reset the input field
      this.city = ''
      // By default, the city name will be London unless the user is signed in so lets check for that
      const info = {
        API_key: process.env.VUE_APP_OWM_API_KEY,
        city_name: "London"
      }

      if (firebaseApp.auth().currentUser){
        info['city_name'] = this.city_from_fb
        let auth_user = firebaseApp.auth().currentUser.uid
        let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather.json`
        axios.get(user_fb).then(obj => {
          if(obj.data === null ){
            // If the obj.data is null then this is a first time user which will require a post request
            this.city_from_fb = {'city_name': '', 'city_id': null}
          }else{
            // If the city exist then we want to update it instead of posting another one a cloud our database
            for(let fb_id in obj.data){
              this.city_from_fb = {'city_name':obj.data[fb_id].city, 'city_id': fb_id}
            }
          }
          console.log(this.city_from_fb['city_name'], this.city_from_fb['city_id'])
        })
      }
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${info.city_name}&appid=${info.API_key}`;
      axios.get(url).then(obj => {
        console.log(obj.data);
        this.location_name = obj.data.name;
        this.description = obj.data.weather[0].main;
        let f_temp = (obj.data.main.temp - 273.15) * 1.8 + 32;
        this.temp = `${Math.round(f_temp)}°F`;
        console.log(this.temp);
      });
    },
    enterCity() {
      let auth_user = firebaseApp.auth().currentUser.uid
      console.log(auth_user)
      let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather.json`
      // If this var was updated by our GET request then we will put instead of post so we could keep only ONE city key
      if(this.city_from_fb['city_name'] === ''){
        axios.post(user_fb, {'city': this.city}).then(obj => {console.log('I posted')})
      }else{
        let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather/${this.city_from_fb['city_id']}.json`
        console.log(user_fb)
        axios.put(user_fb, {'city': this.city}).then(obj => {
          console.log('I Updated')
          this.city_from_fb['city_name'] = obj.data.city
          console.log(this.city_from_fb)
        })
      }

      this.initalizeSetup(this.city_from_fb)
      this.edit_weather = false
      document.body.style.overflow = ''
    },
    redirectLogin: function(){
      this.$router.push('/login')
    }
  },
  created() {
      this.initalizeSetup();
  }
};
</script>
