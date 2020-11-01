<template>
  <div id="todo-container">
    <div id="todo-title">
      <h1>
        {{title}}
      </h1>
    </div>
    <div class="todo-list display-todo">
      <h2 id="display-todo-title">Your Objectives</h2>
      <h4 v-for="(todo, todo_id) in todo_list" :key="todo_id">
        {{todo.todo_item}}
        <button @click="updateStatus(todo_id,'completed')">&checkmark;</button>&nbsp;
        <button @click="updateStatus(todo_id,'deleted')">&cross;</button>
      </h4>
    </div>
    <div class="todo-list enter-todo">
      <h2 id="enter-todo-title">Add a To-Do item to your list!</h2>
      <input placeholder="Add Item" v-model="todo" @keyup.enter="add_todo"> &nbsp;
      <button type="submit" @click="add_todo">Add to your To-Do List</button>

      <h1 v-for="(todo,key) in todo_completed" :key="key">
        {{todo.todo_item}}
      </h1>
    </div>
  </div>
</template>
<script>

export default{
  name: 'todo',
  data(){
    return{
      title: 'To-Do-List',
      todo: '',
      todo_list: [],
      todo_completed: [],
      task_completed: false,
    }
  },
  methods:{
    add_todo: function(){
      // We are going to create an object and set some keys to values in which will be pushed to the list
      //* Consider using unshift (from the youtube video)
      let todo_info = {}
      //* Makes sure that the user input wasn't on accident
      if(this.todo !== ''){
        todo_info['todo_item'] = this.todo
        todo_info['completed'] = this.task_completed
        this.todo_list.push(todo_info)
      }
      // Resets the input filed to become blank
      this.todo = ''
    },
    updateStatus: function(task_id, task_status){
      if(task_status === 'completed'){
        //* So the idea is that we set the status to true then push this item to the completed task array
        this.todo_list[task_id].completed = true
        this.todo_completed.push(this.todo_list[task_id])
        // Splice is used to delete some things in an array using the index,amount as parameter
        this.todo_list.splice(task_id,1)
      }else{
        this.todo_list[task_id].completed = false
        this.todo_list.splice(task_id,1)
      }
    }
  },
}
</script>
<style scoped>
/* Griding system*/
#todo-container{
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  margin: 10px;
}
#todo-container > div{
  background: cornflowerblue;
}
#todo-container > div:nth-child(odd){
  background: gold;
}
#todo-title{
  text-align:center;
  grid-column: 1/span2; /* In the middle of col 1 and 2*/
  margin: 15px auto;
}
.display-todo{
  grid-column-start: 1;
  grid-row-start: 2;

}
.enter-todo{
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 0 auto;
  border: 1px solid black;
  height: 100px;
  width: 500px;
  max-height: 100px;
  text-align:center
}

/* Individual items */
#display-todo-title{
  text-align:center;
  text-decoration: underline
}
#enter-todo-title{
  text-align:center;
  text-decoration: underline
}


</style>