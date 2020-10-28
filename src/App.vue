<template>
  <div id="app">
    <home_page></home_page>
  </div>
</template>

<script>
//* Imports go here
import axios from 'axios'
import home_page from '@/components/Home'

export default{
  components:{
    home_page
  },
  created(){
    axios.get('https://jsonplaceholder.typicode.com/comments').then(obj=>{
      console.log(obj.data)
    })
  }

}
</script>