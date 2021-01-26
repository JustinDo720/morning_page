<template>
  <div id="app-container" class="grid-container">
    <navigation :key="$route.fullPath"></navigation>
    <router-view :key="$route.fullPath"></router-view>
    <div class="quote-of-day card grey darken-3 gold-border">
      <div class="card-content">
        <h4>
          {{ r1l_title }}
        </h4>
        <p class="flow-text green-text accent-3">
          Difficulties increase the nearer we get to the goal.
        </p>
        <div class="flow-text green-text accent-3">
          <p>
            - Johann Wolfgang von Goethe
          </p>
        </div>
        <!--<home_quote_of_day></home_quote_of_day> -->
      </div>
    </div>

    <div class="todo card grey lighten-3">
      <div class="card-content">
        <h4>
          {{ r1m_title }}
        </h4>
        <home_todo></home_todo>
      </div>
    </div>

    <div class="news card light-blue lighten-2">
      <div class="card-content">
        <h4>
          {{ r1r_title }}
        </h4>
        <home_news></home_news>
      </div>
    </div>

    <div class="weather card " :class="temp_controller">
      <div class="card-content">
        <home_weather
          :signedIn="signedIn"
          @temp="changeTempBG($event)"
        ></home_weather>
      </div>
    </div>
  </div>
</template>

<script>
import home_todo from "@/components/home_child_component/home_todo";
import home_news from "@/components/home_child_component/home_news";
//import home_quote_of_day from "@/components/home_child_component/home_quote_of_day";
import home_weather from "@/components/home_child_component/home_weather";
//import Modal from '@/components/utilities/Modal.vue';
import firebaseApp from "@/components/db";
import axios from "axios";

export default {
  name: "home_page",
  components: {
    home_todo,
    //modal_test: Modal,
    //home_quote_of_day,
    home_news,
    home_weather
  },
  data() {
    return {
      r1l_title: "Quote of the Day", //* row 1 left title
      r1m_title: "To-Do List", //* row 1 middle title
      r1r_title: "News", //* row 1 right title
      r2l_title: "Weather", //* row 2 left title
      todo: [],
      edit_weather: false,
      city: "",
      signedIn: false,
      temp_controller: null // We are going to use this for dynamic css
    };
  },
  methods: {
    changeTempBG: function(background_temp) {
      this.temp_controller = background_temp;
      console.log(this.temp_controller, background_temp);
    }
  },
  created() {
    try {
      let auth_user = firebaseApp.auth().currentUser.uid;
      // If auth_user is not null then the user is signed in.
      this.signedIn = true;
    } catch (err) {
      // If auth_user does not exist then the user is not signed in
      this.signedIn = false;
    }
  }
};
</script>

<style scoped>
/* Grid Container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  align-items: start;
  margin: 10px;
  margin-left: 5px;
}
.grid-container > div {
  text-align: center;
  overflow: hidden;
}
.grid-container > div:nth-child(odd) {
  /* > means for every div tag and here :nth-child just alternates */
  text-align: center;
}

/* To-Do List */
.todo {
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 5;
}


/* Weather */

.weather {
  align-items: start;
  grid-column-start: 1;
  grid-row-start: 2;
  grid-row-end: 3;
  height: 400px;
}
.hot {
  background-image: url("../assets/hot_day.jpg");
}
.warm {
  background-image: url("../assets/warm_day.jpg");
}
.cold {
  background-image: url("../assets/cold_night.jpg");
}

/* News */

.news {
  grid-column-start: 3;
  grid-row-start: 1;
  grid-row-end: 5;
}

/* Quote of the Day */
.quote-of-day {
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}

.gold-border {
  border: 10px solid gold;
}
</style>
