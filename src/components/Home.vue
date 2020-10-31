<template>
  <div id="app-container" class="grid-container">
    <div id="app-quote">
      <h1>
        {{ r1l_title }}
      </h1>
    </div>
    <div id="app-todo">
      <h1>
        {{ r1m_title }}
      </h1>
    </div>
    <div id="app-news">
      <h1>
        {{ r1r_title }}
      </h1>
    </div>
    <div class="quote">
      <h4>
        “You have a viable business only if your product is either better or cheaper than the alternatives.
        If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
      </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6>
    </div>
    <div class="todo">
      <h4>
        “You have a viable business only if your product is either better or cheaper than the alternatives.
        If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
      </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6><h4>
      “You have a viable business only if your product is either better or cheaper than the alternatives.
      If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
    </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6><h4>
      “You have a viable business only if your product is either better or cheaper than the alternatives.
      If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
    </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6><h4>
      “You have a viable business only if your product is either better or cheaper than the alternatives.
      If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
    </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6><h4>
      “You have a viable business only if your product is either better or cheaper than the alternatives.
      If it’s not one or the other, you might make some money at first, but it’s not a sustainable business."
    </h4>
      <br>
      <h6>
        -"Jim Koch, founder of Boston Beer Co."
      </h6>
    </div>
    <div class="news">

    </div>
    <div class="weather">
      <h1>
        {{ r2l_title }}
      </h1>

    </div>
  </div>
</template>

<script>

export default{
  name: 'home_page',
  data(){
    return{
      r1l_title: 'Quote of the Day', //* row 1 left title
      r1m_title: 'To-Do List', //* row 1 middle title
      r1r_title: 'News', //* row 1 right title
      r2l_title: 'Weather', //* row 2 left title

    }
  }
}
</script>

<style scoped>
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

.todo{
  grid-column-start: 2;
  grid-row-start: 2;
  grid-row-end: 5;
}

</style>