<template>
  <div id="app">
  </div>
</template>

<script>
//* Imports go here
import axios from 'axios'

export default{
  created(){
    axios.get('https://jsonplaceholder.typicode.com/comments').then(obj=>{
      console.log(obj.data)
    })
  }

}
</script>