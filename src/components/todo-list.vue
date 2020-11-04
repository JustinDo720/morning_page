<template>
  <div id="todo-container">
    <div id="todo-title">
      <h1>
        {{title}}
      </h1>
    </div>
    <div class="todo-list display-todo">
      <h2 id="display-todo-empty" v-if="todo_list.length === 0">
        You Currently do not have any tasks
      </h2>
      <!-- Setting task_done and using the var right on v-for actually works -->
      <div id="individual-task"
           v-for="(todo, todo_id) in todo_list"
           class="task_done"
           :key="todo_id">
        <div>
          <ul>
            <li>
              <h2>
                {{ todo.todo_item }}
                <button class='deleted' @click="updateStatus(todo_id,'deleted')">&cross;</button>
                <button class='completed' @click="updateStatus(todo_id,'completed')">&checkmark;</button>&nbsp;
                <!--
                <button class='deleted' @click="updateStatus(todo_id,'deleted')">&cross;</button>
                <button class='completed' @click="updateStatus(todo_id,'completed')">&checkmark;</button>&nbsp;
                -->
              </h2>
              <span>
                {{todo.task_date}}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="todo-list enter-todo">
      <h2 id="enter-todo-title">Add a To-Do item to your list!</h2>
      <input class='todo_input' placeholder="Add an item to your list" v-model="todo" @keyup.enter="add_todo">
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
      months : [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ],
      days_of_the_week : ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
    }
  },
  methods:{
    add_todo: function(){
      //* Makes sure that the user input wasn't on accident
      if(this.todo !== ''){
        let task_date = new Date()
        let show_date = `
        ${this.days_of_the_week[task_date.getDay()]},
        ${task_date.getDate()}
        ${this.months[task_date.getMonth()]}
        ${task_date.getFullYear()}.
        ` // e.g Monday, 2 November 2020
        let show_time =`${task_date.getHours()}:${task_date.getMinutes()}`

        let todo_info = {
          'todo_item':this.todo,
          'completed': this.task_completed,
          'task_date': `${show_date} ${show_time}`,

        }
        this.todo_list.unshift(todo_info) // Unshift basically pushes the obj in front instead of behind
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
        console.log(this.todo_list[task_id].completed)
        //this.todo_list.splice(task_id,1)
      }else{
        this.todo_list[task_id].completed = false
        //this.todo_list.splice(task_id,1)
        console.log(this.todo_list[task_id].completed)
      }
    }
  },
  computed:{
  }
}
</script>
<style scoped>
/* Griding system*/
#todo-container{
  display:grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  margin: 10px;
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
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1em;
}
.display-todo > div{
  background: whitesmoke;
  border: 1px solid black;
}
.enter-todo{
  grid-column-start: 2;
  grid-row-start: 2;
  margin: 0 auto;
  border: 1px solid black;
  height: 120px;
  width: 500px;
  max-height: 120px;
  text-align:center
}

/* Individual items */
#display-todo-empty{
  text-align:center;
  margin: 40px 0;
}
#enter-todo-title{
  text-align:center;
  text-decoration: underline
}
.todo_input:focus{
  box-shadow: 0 1px 5px 0, rgba(0,0,0,0.15);
  transform: translateY(-3px);
}
.todo_input{
  width: 400px;
  border: 1px solid;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 20px;
  line-height: 30px;
  -moz-transition: all 0.4s ease; /* Transition for Mozilla! */
  -webkit-transition: all 0.4s ease; /* For other browsers */
}

.completed{
  background: transparent;
  color: green;
  float: right;
}

.deleted{
  background: transparent;
  color: red;
  float: right;
}

.task_done div{
  background: green;
  /* MAKE SURE TO INCLUDE THE PADDING because it covers the WHOLE entire box */
  padding: 1px;
}

/* Html Elements */
li{
  list-style: circle;
}
input{
  outline: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
}
button{
  background: transparent;
  border: none
}
</style>