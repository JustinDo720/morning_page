<template>
  <div id="app">
    <router-link to="/">Home Page</router-link>&nbsp;
    <router-link to="/todo">Todo-Testing Page</router-link> &nbsp;
    <router-link to="/home_todo">Home Todo-Testing Page</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
//* Imports go here
require('dotenv').config({path: '.env'});
export default{
  components:{
  },

}
</script>