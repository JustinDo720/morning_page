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
        :class="{
          task_done: task.completed,
          task_neutral: task.neutral,
          task_removed: task.removed
        }"
        :key="todo_id"
      >
        <div>
          <ul>
            <li>
              <h4>
                {{ task.todo_item }}
                <button
                  class="deleted"
                  @click.prevent="deleteTodo(todo_id)"
                >
                  &cross;
                </button>
              </h4>
              <span>
                {{ task.task_date }}
              </span>
            </li>
          </ul>
        </div>

        <div v-if='number_of_todo > 3'>
          Hello
        </div>
      </div>
    </div>
    <div class="todo-list enter-todo">
      <h6 id="enter-todo-title">Add a To-Do item to your list!</h6>
      <input
        class="todo_input"
        placeholder="Add an item to your list"
        v-model="todo"
        @keyup.enter.prevent="add_todo"
      /><br/>
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
      number_of_todo: 0,
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
    async add_todo() {
      let firebase_db_url = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo.json`;
      console.log(firebase_db_url);
      console.log(this.auth_user);
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
        await axios.post(firebase_db_url, todo_info).then(obj => {
          // Next try to work with this method
          console.log("Success", obj.data.name);
          this.todo = "";
          // We are going to add this to the list for our program to render if the item was posted
          todo_info['todo_id'] = obj.data.name
          this.todo_list.unshift(todo_info)
          console.log(this.todo_list, todo_info)
          this.number_of_todo += 1
          console.log(this.number_of_todo)
        });
      }
    },
    deleteTodo: function(task_id) {
      let task_at_hand = this.todo_list[task_id];
      console.log(task_at_hand)
      // At this point the user just wants to remove the task
      // The idea behind this is that we use mode to see which array we need to edit
      const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo/${task_at_hand.todo_id}.json`;
      this.todo_list.splice(task_id, 1);
      console.log('I should be right here')
      axios.delete(USER_FIREBASE_URL);
      this.number_of_todo -= 1
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
}
.display-todo > div {
  border: 1px solid black;
}
.enter-todo {
  grid-column-start: 2;
  grid-row-start: 1;
  margin: 0 auto;
  border: 1px solid black;
  height: 120px;
  width: 500px;
  max-height: 120px;
  text-align: center;
  padding: 10px;
}

/* Individual items */
.display-todo-empty {
  text-align: center;
  margin: 5px 20px;
  padding: 40px;
  background: whitesmoke;
  border: 1px solid black;
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
