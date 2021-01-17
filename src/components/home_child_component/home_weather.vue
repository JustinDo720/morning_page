<template :key='city_from_fb'>
  <div id='weather_app'>
    <div id='display_info'>
      <h3>
        {{ location_name }}
      </h3>
      <h4>
        {{ temp }}
      </h4>
      <h5>
        {{ description }}
      </h5>
    </div>
    <div id='modal_controller'>
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
    </div>
  </div>

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
      default_city: 'London',
      isSignedIn: this.signedIn,
      city: '',
      activateModal: true,
      city_from_fb: null, // we will use this to determine if the user will post or update their city name
      info : {
        API_key: process.env.VUE_APP_OWM_API_KEY,
        city_name: "London"
      }, // By default, the city name will be London unless the user is signed in so lets check for that
      temp_controller: null // We are going to use this to emit an event for our home page to catch

    };
  },
  methods:{
    // We have to make this an async task because we want to update info based on our GET request
     async initalizeSetup(){
      // Reset the input field
      this.city = ''

      if (firebaseApp.auth().currentUser){
        let auth_user = firebaseApp.auth().currentUser.uid
        let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather.json`
        await axios.get(user_fb).then(obj => {
            if(obj.data === null ){
              // If the obj.data is null then this is a first time user which will require a post request
              this.city_from_fb = {'city_name': '', 'city_id': null}
            }else{
              // If the city exist then we want to update it instead of posting another one a cloud our database
              for(let fb_id in obj.data){
                this.city_from_fb = {'city_name':obj.data[fb_id].city, 'city_id': fb_id}
              }
            }
          })
        // If we have a GET request from the user then the default city will not take place
        if (this.city_from_fb){
          // By setting info's city name we could change the api request
          this.info.city_name = this.city_from_fb['city_name']
          }
        }

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.info.city_name}&appid=${this.info.API_key}`;
      // axios.get(url).then(obj => {
      //   this.location_name = obj.data.name;
      //   this.description = obj.data.weather[0].main;
      //   let f_temp = Math.round((obj.data.main.temp - 273.15) * 1.8 + 32);
      //   if(f_temp > 80){
      //     this.temp_controller = 'hot'
      //   }else if(f_temp < 40){
      //     this.temp_controller = 'cold'
      //   }else{
      //     this.temp_controller = 'warm'
      //   }
      //   // We emit our event called temp given the temp_controller value for the home page to use for dynamic css bg
      //   this.$emit('temp', this.temp_controller)
      //   this.temp = `${f_temp}°F`;
      //
      // });
    },
    async enterCity() {
      let auth_user = firebaseApp.auth().currentUser.uid
      let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather.json`
      // If this var was updated by our GET request then we will put instead of post so we could keep only ONE city key
      if(this.city_from_fb['city_name'] === ''){
        await axios.post(user_fb, {'city': this.city}).then(obj => {console.log('I posted')})
      }else{
        let user_fb = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/weather/${this.city_from_fb['city_id']}.json`
        await axios.put(user_fb, {'city': this.city}).then(obj => {
            console.log('I Updated')
            this.city_from_fb['city_name'] = obj.data.city
            // As soon as the user enters we have an instant change
            this.info['city_name'] = this.city_from_fb['city_name']
            console.log(this.info)
        })
      }
      this.edit_weather = false
      document.body.style.overflow = ''
      console.log('Ready')
      this.initalizeSetup()
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
