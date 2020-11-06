<template>
  <div id="app-container" class="grid-container">
    <div id="app-quote">
      <h1>
        {{ r1l_title }}
      </h1>
      <hr>
      <home_quote_of_day></home_quote_of_day>
    </div>
    <div class="todo">
      <div id="app-todo">
        <h1>
          {{r1m_title}}
        </h1>
      </div>
      <hr>
      <home_todo></home_todo>
    </div>
    <div id="app-news">
      <h1>
        {{ r1r_title }}
      </h1>
      <hr>
      <div class="news-1">
        <home_news></home_news>
      </div>
    </div>

    <div class="weather">
      <h1>
        {{ r2l_title }}
      </h1>
      <hr>
      <div class="weather-sub">
        <home_weather></home_weather>
      </div>
    </div>

  </div>
</template>

<script>
import home_todo from '@/components/home_child_component/home_todo'
import home_news from "@/components/home_child_component/home_news";
import home_quote_of_day from "@/components/home_child_component/home_quote_of_day";
import home_weather from "@/components/home_child_component/home_weather";


export default{
  name: 'home_page',
  components: {
    home_todo,
    home_quote_of_day,
    home_news,
    home_weather,
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
}
.grid-container > div{
  background: deepskyblue;
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
}

/* News */
/* Quote of the Day */
</style>