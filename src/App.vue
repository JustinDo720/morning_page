<template>
  <div id="app">
    <!-- With :key='$route.fullPath' we will see any change which will trigger a reload-->
    <navigation :key='$route.fullPath'></navigation>
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