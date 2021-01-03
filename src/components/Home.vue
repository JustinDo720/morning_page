<template>
  <div id="app-container" class="grid-container">
    <div class="quote-of-day card">
      <div class='card-content'>
        <span class='card-title'>
            {{ r1l_title }}
        </span>
        <p>
          Done
        </p>
        <!--<home_quote_of_day></home_quote_of_day>-->
      </div>
    </div>

    <div class="todo card">
      <div class='card-content'>
        <span class='card-title'>
          {{r1m_title}}
        </span>
        <home_todo></home_todo>
      </div>
    </div>

    <div class="news card">
      <div class='card-content'>
        <span class='card-title'>
          {{ r1r_title }}
        </span>
        <p>
          Done
        </p>
        <!--<home_news></home_news>-->
      </div>
    </div>

    <div class="weather card">
      <div class='card-content'>
        <span class='card-title'>
          {{ r2l_title }}
        </span>
        <p>
          Done
        </p>
        <!--<home_weather></home_weather> -->
      </div>
    </div>

  </div>
</template>

<script>

import home_todo from '@/components/home_child_component/home_todo'
// import home_news from "@/components/home_child_component/home_news";
// import home_quote_of_day from "@/components/home_child_component/home_quote_of_day";
// import home_weather from "@/components/home_child_component/home_weather";


export default{
  name: 'home_page',
  components: {
    home_todo,
    //home_quote_of_day,
    //home_news,
    //home_weather,
  },
  data(){
    return{
      r1l_title: 'Quote of the Day', //* row 1 left title
      r1m_title: 'To-Do List', //* row 1 middle title
      r1r_title: 'News', //* row 1 right title
      r2l_title: 'Weather', //* row 2 left title
      todo: []
    }
  }
}
</script>

<style scoped>
/* Grid Container */
.grid-container{
  display:grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  grid-auto-rows: minmax(100px,auto);
  align-items: start;
  margin: 10px;
  margin-left: 5px;
}
.grid-container > div{
  background: cadetblue;
  text-align:center;
  overflow:hidden;
}
.grid-container > div:nth-child(odd){ /* > means for every div tag and here :nth-child just alternates */
  background: cornflowerblue;
  text-align:center
}

/* To-Do List */
.todo{
  grid-column-start: 2;
  grid-row-start: 1;
  grid-row-end: 5;
}

/* Weather */

.weather{
  align-items: start;
  grid-column-start: 1;
  grid-row-start: 2;
  grid-row-end: 3;
}

/* News */

.news{
  grid-column-start:3;
  grid-row-start: 1;
  grid-row-end: 5;
}


/* Quote of the Day */
.quote-of-day{
  grid-column-start: 1;
  grid-row-start: 1;
  grid-row-end: 1;
}
</style>