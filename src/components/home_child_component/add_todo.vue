<template>
  <div id="todo-container">
    <div class="todo-list display-todo">
      <h4 class="display-todo-empty" v-if="todo_list.length === 0">
        You have not added any Todo items yet.
      </h4>
      <!-- Setting task_done and using the var right on v-for actually works -->
      <div
        id="individual-task"
        v-for="(task, todo_id) in todo_list"
        class="{
         grey lighten-1
        }"
        :key="todo_id"
      >
        <div class='left' style='width:750px'>
          <ul>
            <li>
              <p class='flow-text' style='text-align:left'>
                {{ task.todo_item }}&nbsp;
              </p>
              <div>
                <p class='left' style='text-align: left;'>
                  {{ task.task_date }}
                </p>
                <button
                    class="deleted btn red white-text right "
                    @click.prevent="deleteTodo(todo_id)"
                    style='margin: 10px;'
                >
                  Delete
                </button>
              </div>

            </li>
          </ul>
        </div>
      </div>
    </div>
    <div :class="{'todo-list':true, 'enter-todo':true, 'grey lighten-4':true, 'large-todo':largeTodo}">

      <input
          id='todo-item'
          v-if='!largeTodo'
          class="black-text todo_input"
          v-model="todo"
          type='text'
          @keyup.enter.prevent="add_todo"
          style='margin:10px;'
          placeholder= 'Add your todo here'
      />

      <textarea
          class="materialize-textarea"
          v-else
          v-model='todo'
          @keyup.enter = 'add_todo'
          placeholder='Please type out your todo here.'
      >
      </textarea>


      <br/>
      <button
          class='btn waves-light waves-effect deep-purple lighten-3 white-text'
          @click.prevent='saveTodos'
          style='margin: 10px;'
      >
        Save All Todos
      </button>
      <div class="switch">
        <label>
          <span v-if='!largeTodo'>
            Smaller Todo
          </span>

          <input type="checkbox" @click='largeTodo = !largeTodo'>
          <span class="lever"></span>
          <span v-if='largeTodo'>
            Large Todo
          </span>

        </label>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import firebaseApp from "@/components/db";

export default {
  name: "todo",
  data() {
    return {
      title: "To-Do-List",
      auth_user: firebaseApp.auth().currentUser.uid,
      todo: "",
      todo_list: [],
      task_completed: false,
      task_removed: false,
      task_neutral: true,
      largeTodo: false,
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      days_of_the_week: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ]
    };
  },
  methods: {
    add_todo() {
      //* Makes sure that the user input wasn't on accident
      if (this.todo !== "") {
        let task_date = new Date();
        let show_date = `
          ${this.days_of_the_week[task_date.getDay()]},
          ${task_date.getDate()}
          ${this.months[task_date.getMonth()]}
          ${task_date.getFullYear()}.
          `; // e.g Monday, 2 November 2020
        let show_time = `${task_date.getHours()}:${task_date.getMinutes()}`;

        let todo_info = {
          todo_item: this.todo,
          completed: this.task_completed,
          removed: this.task_removed,
          neutral: this.task_neutral,
          task_date: `${show_date} ${show_time}`
        };

        // We need to await for the post before performing a get request to get the latest things
        this.todo_list.unshift(todo_info)
        console.log(this.todo_list, todo_info)
        this.number_of_todo += 1
        console.log(this.number_of_todo)
        this.todo = "";
      }
    },
    deleteTodo: function(task_id) {
      let task_at_hand = this.todo_list[task_id];
      console.log(task_at_hand)
      // At this point the user just wants to remove the task
      // The idea behind this is that we use mode to see which array we need to edit
      this.todo_list.splice(task_id, 1);
      console.log('I should be right here')
      this.number_of_todo -= 1
    },
    saveTodos: function(){ // Once the user presses the save button
      let firebase_url = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo.json`
      // We can't just do list.reverse() it's destructive so we use the spread orderator
      let ordered_todo = [...this.todo_list].reverse();
      for (let todo in ordered_todo){
        console.log(ordered_todo[todo])
        axios.post(firebase_url, ordered_todo[todo]).then(response => {
          console.log(response.data)
          // This means that the user wants to save changes so lets go ahead and emit an event for our parent
          this.$emit('finish', true) // this.$emit('event_name', value)
        })
      }
    }
  },
};
</script>
<style scoped>
/* Griding system*/
#todo-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  grid-auto-rows: minmax(100px, auto);
  margin: 10px;
}

.display-todo {
  grid-column-start: 1;
  grid-row-start: 1;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-gap: 1em;
  border: 1px solid black;
  max-height: 800px;
  overflow: scroll;
  overflow-x: hidden;
  max-width: 800px;
}

.enter-todo {
  grid-column-start: 2;
  grid-row-start: 1;
  margin: 0 auto;
  border: 1px solid black;
  height: 200px;
  width: 500px;
  max-height: 250px;
  text-align: center;
  padding: 10px;
}

/* Individual items */
.display-todo-empty {
  text-align: center;
  margin: 5px 20px;
  padding: 40px;
  height: 120px;
}
#enter-todo-title {
  text-align: center;
  text-decoration: underline;
}
.todo_input:focus {
  box-shadow: 0 1px 5px 0, rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
}
.todo_input {
  width: 400px;
  border: 1px solid;
  border-radius: 3px;
  font-size: 15px;
  padding: 0 20px;
  line-height: 30px;
  -moz-transition: all 0.4s ease; /* Transition for Mozilla! */
  -webkit-transition: all 0.4s ease; /* For other browsers */
}

.completed {
  background: transparent;
  color: green;
  float: right;
}

.deleted {
  background: transparent;
  color: darkred;
  float: right;
}

.neutral {
  background: transparent;
  color: orange;
  float: right;
}

.task_done div {
  background: lightgreen;
  /* MAKE SURE TO INCLUDE THE PADDING because it covers the WHOLE entire box */
  padding: 19px;
}
.task_removed div {
  background: lightcoral;
  /* MAKE SURE TO INCLUDE THE PADDING because it covers the WHOLE entire box */
  padding: 19px;
}
.task_neutral div {
  background: lightgray;
  padding: 19px;
}

.large-todo{
  width: 600px;
  max-height: 250px;
  height: 250px;
}

/* Html Elements */
li {
  list-style: circle;
}
input {
  outline: none;
  margin: 0;
  width: 100%;
  font-family: inherit;
}
button {
  background: transparent;
  border: none;
  font-size: 18px;
}
</style>
