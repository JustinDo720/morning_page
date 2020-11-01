<template>
  <h1>
    {{title}}
  </h1>
  <h4 v-for="(todo, key) in todo_list" :key="key">
    {{todo.todo_item}}
  </h4>
  <input placeholder="Add Item" v-model="todo" @keyup.enter="add_todo"> &nbsp;
  <button type="submit" @click="add_todo">Add to your To-Do List</button>
</template>
<script>

export default{
  name: 'todo',
  data(){
    return{
      title: 'To-Do-List',
      todo: '',
      todo_list: [],
      task_completed: false,
    }
  },
  methods:{
    add_todo: function(){
      // We are going to create an object and set some keys to values in which will be pushed to the list
      let todo_info = {}
      todo_info['todo_item'] = this.todo
      todo_info['completed'] = this.task_completed
      this.todo_list.push(todo_info)
      // Resets the input filed to become blank
      this.todo = ''
    }
  }
}
</script>
