<template>
  <div id="app">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script>
//* Imports go here
import navigation from '@/nav.vue'

require('dotenv').config({path: '.env'});
export default{
  components:{
    navigation
  },

}
</script>