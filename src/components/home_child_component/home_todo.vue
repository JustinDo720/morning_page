<template>
  <div id="search_box">
    <input class='searchBox' placeholder="Search For Your Todos" v-model="searchTodo">
  </div>
  <div v-for="(todo,index) in filteredTodos" :key="index">
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
      searchTodo: '',
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
  },
  computed:{
    filteredTodos: function(){
      return this.fetched_todos.filter(todo=>{
        return todo.todo_item.match(this.searchTodo)
      })
    }
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
.searchBox{
  width: 600px;
  height: 40px;
  border: 1px solid;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 20px;
  line-height: 30px;
  -moz-transition: all 0.4s ease; /* Transition for Mozilla! */
  -webkit-transition: all 0.4s ease; /* For other browsers */
}
.searchBox:focus{
  box-shadow: 0 1px 5px 0, rgba(0,0,0,0.15);
  transform: translateY(-3px);
}
</style>