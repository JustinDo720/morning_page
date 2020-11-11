<template>
  <div v-for="(todo,index) in fetched_todos" :key="index">
    <h1 id="todo_item">
      {{todo.todo_item}}
    </h1>
    <h4 id="task_date">
      {{todo.task_date}}
    </h4>
  </div>
</template>
<script>
import axios from 'axios'

export default{
  name:'home_todo',
  data(){
    return{
      title: 'Home Todo',
      fetched_todos: [], // In progress todos or the ones that are neutral
      firebase_db_url: 'https://morningpage-aa0e4.firebaseio.com/post.json'
    }
  },
  created(){
    axios.get(this.firebase_db_url).then(obj=>{
      let firebase_todos = []
      for(let firebase_id in obj.data){
        obj.data[firebase_id].todo_id = firebase_id
        console.log(obj.data[firebase_id])
        if(obj.data[firebase_id].neutral){
          firebase_todos.unshift(obj.data[firebase_id])
        }
      }
      this.fetched_todos = firebase_todos
    })
  }
}
</script>
<style scoped>
#todo_item{
  text-align: left;
}
#task_date{
  text-align: left;
}
</style>