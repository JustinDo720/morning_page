<template>
  <div class="input-field" v-if="signedIn">
    <input
      id="search"
      type="text"
      class="validate black-text"
      v-model="searchTodo"
    />
    <label for="search" class="black-text">
      <i class="material-icons">
        search
      </i>
      Search For Your Todos
    </label>
    <!-- Normal View Buttons-->
    <button
    class='btn-small waves-effect waves-light green white-text'
    v-if='!viewCompleted'
    @click.prevent = 'changeView'
    >
      <i class='material-icons'>check_circle</i> View Completed
    </button>&nbsp;
    <button
      class="btn-small waves-effect waves-light blue white-text"
      v-if='!viewCompleted'
      @click="add_todo_mode = !add_todo_mode"
    >
      <i class="material-icons">add</i> Add Todo
    </button>
    <!-- Completed View Button -->
    <button
    v-if='viewCompleted'
    @click.prevent='viewCompleted = !viewCompleted'
    class='btn-small waves-effect waves-light grey white-text'
    >
      <i class='material-icons'>panorama_fish_eye</i> View Tasks In Progress
    </button>
    <modal_todo
      v-if="add_todo_mode"
      :active-modal="activateModal"
      comp-name="todo"
      @refresh-todo='initalizeSetup'
    >
      <template v-slot:todo>
      </template>
    </modal_todo>
  </div>
  <div v-else>
    <button @click="redirect_to_login" class="btn waves-effect waves-light">
      Login
    </button>
  </div>

  <!-- Normal Tasks the Neutral ones -->
  <div class='limTodo'>
    <div id='normal-tasks' v-if="!viewCompleted">
      <div
          v-for="(todo, index) in filteredTodos"
          :key="index"
          :class="{
          task_done: todo.completed,
          task_neutral: todo.neutral,
          task_removed: todo.removed,
          'grey lighten-3': true
        }"
      >
        <p id="todo_item" class="flow-text">
          {{ todo.todo_item }}
          <button class="deleted" @click="updateStatus(index, 'deleted', 'normal_mode')">
            &cross;
          </button>
          <button class="completed" @click="updateStatus(index, 'completed', 'normal_mode')">
            &checkmark;</button
          >&nbsp;
        </p>

        <p id="task_date">
          {{ todo.task_date }}
        </p>
      </div><br>
    </div>

    <!-- Completed Tasks -->
    <div class='grey lighten-3' id='completed-tasks' v-if='viewCompleted'>
      <div
          v-for="(todo, index) in filteredTodos"
          :key="index"
      >
        <p id="todo_item" class="flow-text">
          {{ todo.todo_item }}
          <button class="deleted" @click="updateStatus(index, 'deleted', 'completed_mode')">
            <i class='material-icons'>clear</i>
          </button>
          &nbsp;
          <button class="neutral" @click="updateStatus(index, 'undo', 'completed_mode')">
            <i class='material-icons'>undo</i>
          </button>
        </p>

        <p id="task_date">
          {{ todo.task_date }}
        </p>
      </div>
    </div>
  </div>

  </template>
<script>
import axios from "axios";
import firebaseApp from "@/components/db";
import Modal from "@/components/utilities/Modal";

export default {
  name: "home_todo",
  components: {
    modal_todo: Modal,
  },
  data() {
    return {
      title: "Home Todo",
      searchTodo: "",
      fetched_todos: [], // In progress todos or the ones that are neutral
      completed_fetched_todos: [],
      signedIn: false, // We are going to use this to show the user's items or show the login button
      add_todo_mode: false,
      activateModal: true,
      viewCompleted: false,
      auth_user: firebaseApp.auth().currentUser.uid
    };
  },
  computed: {
    filteredTodos: function() {
      if(!this.viewCompleted){
        console.log('I am in normal view')
        return this.fetched_todos.filter(todo => {
          return todo.todo_item
              .toLowerCase()
              .match(this.searchTodo.toLowerCase());
        });
      }else{
        console.log('I am in completed view')
        return this.completed_fetched_todos.filter(todo => {
          return todo.todo_item
              .toLowerCase()
              .match(this.searchTodo.toLowerCase());
        });
      }

    }
  },
  methods: {
    initalizeSetup(){
      try {
        let auth_user = firebaseApp.auth().currentUser.uid;
        // If auth_user is not null then the user is signed in.
        this.signedIn = true;
        let firebase_db_url = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/todo.json`;
        axios.get(firebase_db_url).then(obj => {
          let firebase_todos = [];
          let completed_firebase_todos = [];
          for (let firebase_id in obj.data) {
            obj.data[firebase_id].todo_id = firebase_id;
            if (obj.data[firebase_id].neutral) {
              firebase_todos.unshift(obj.data[firebase_id]);
            }else if(obj.data[firebase_id].completed){
              completed_firebase_todos.unshift(obj.data[firebase_id])
            }
          }
          this.fetched_todos = firebase_todos;
          this.completed_fetched_todos = completed_firebase_todos;
          console.log(`Neutral Todos: ${this.fetched_todos}, Completed Todos: ${this.completed_fetched_todos}`)
        });
      } catch (err) {
        // If auth_user does not exist then the user is not signed in
        this.signedIn = false;
      }
    }
    ,
    updateStatus: function(task_id, task_status, mode) {
      let task_at_hand = this.fetched_todos[task_id];
      let task_completed = this.completed_fetched_todos[task_id];

      if (task_status === "completed") {
        //* So the idea is that we set the status to true then push this item to the completed task array
        const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo/${task_at_hand.todo_id}.json`;
        task_at_hand.completed = true;
        task_at_hand.neutral = false;
        task_at_hand.removed = false;
        this.completed_fetched_todos.unshift(task_at_hand);
        // Updates the completed, neutral, removed values in the modified todo item
        axios.put(USER_FIREBASE_URL, task_at_hand);
        console.log(USER_FIREBASE_URL, "I should be in this loop rn");
        // Splice is used to delete some things in an array using the index,amount as parameter
        this.fetched_todos.splice(task_id, 1);
      } else if (task_status === "undo") {
        //* The undo button is only for the completed view so we use todo_completed list instead
        const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo/${task_completed.todo_id}.json`;
        task_completed.completed = false;
        task_completed.neutral = true; // resetting the status of the task
        task_completed.removed = false;
        //! Note: If you unshift something keep them unshift or else the index will be messed up
        this.fetched_todos.unshift(task_completed); // So if this is undo we are going to push back the item
        axios.put(USER_FIREBASE_URL, task_completed);
        this.completed_fetched_todos.splice(task_id, 1);
      } else {
        // At this point the user just wants to remove the task
        // The idea behind this is that we use mode to see which array we need to edit
        if (mode === "normal_mode") {
          const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo/${task_at_hand.todo_id}.json`;
          this.fetched_todos.splice(task_id, 1);
          axios.delete(USER_FIREBASE_URL);
        } else {
          // We are in completed_mode
          const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${this.auth_user}/todo/${task_completed.todo_id}.json`;
          console.log("I should be here rn");
          this.completed_fetched_todos.splice(task_id, 1);
          axios.delete(USER_FIREBASE_URL);
        }
      }
    },
    redirect_to_login() {
      this.$router.push("/login");
    },
    changeView: function(){
      this.viewCompleted = !this.viewCompleted
    },
  },
  created() {
    this.initalizeSetup();
  },
};
</script>
<style scoped>
#todo_item {
  text-align: left;
}
#task_date {
  text-align: left;
}
.searchBox {
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
.searchBox:focus {
  box-shadow: 0 1px 5px 0, rgba(0, 0, 0, 0.15);
  transform: translateY(-3px);
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

button {
  background: transparent;
  border: none;
  font-size: 18px;
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

.limTodo{
  overflow: scroll;
  overflow-x: hidden;
  max-height: 950px;
}

</style>
