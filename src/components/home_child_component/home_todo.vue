<template>
  <form>
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
    </div>
    <div v-else>
      <button @click="redirect_to_login" class="btn waves-effect waves-light">
        Login
      </button>
    </div>
  </form>

  <div v-for="(todo, index) in filteredTodos" :key="index">
    <p id="todo_item" class="flow-text">
      {{ todo.todo_item }}
      <button class="deleted" @click="updateStatus(index, 'deleted')">
        &cross;
      </button>
      <button class="completed" @click="updateStatus(index, 'completed')">
        &checkmark;</button
      >&nbsp;
    </p>

    <p id="task_date">
      {{ todo.task_date }}
    </p>
  </div>
</template>
<script>
import axios from "axios";
import firebaseApp from "@/components/db";

export default {
  name: "home_todo",
  data() {
    return {
      title: "Home Todo",
      searchTodo: "",
      fetched_todos: [], // In progress todos or the ones that are neutral
      signedIn: false // We are going to use this to show the user's items or show the login button
    };
  },
  created() {
    try {
      let auth_user = firebaseApp.auth().currentUser.uid;
      // If auth_user is not null then the user is signed in.
      this.signedIn = true;
      let firebase_db_url = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/users/${auth_user}/todo.json`;
      axios.get(firebase_db_url).then(obj => {
        let firebase_todos = [];
        for (let firebase_id in obj.data) {
          obj.data[firebase_id].todo_id = firebase_id;
          if (obj.data[firebase_id].neutral) {
            firebase_todos.unshift(obj.data[firebase_id]);
          }
        }
        this.fetched_todos = firebase_todos;
      });
    } catch (err) {
      // If auth_user does not exist then the user is not signed in
      this.signedIn = false;
    }
  },
  computed: {
    filteredTodos: function() {
      return this.fetched_todos.filter(todo => {
        return todo.todo_item
          .toLowerCase()
          .match(this.searchTodo.toLowerCase());
      });
    }
  },
  methods: {
    updateStatus(todo_id, mode) {
      let task_at_hand = this.fetched_todos[todo_id];
      if (mode === "completed") {
        const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/post/${task_at_hand.todo_id}.json`;
        task_at_hand.completed = true;
        task_at_hand.neutral = false;
        task_at_hand.removed = false;
        // Updates the completed, neutral, removed values in the modified todo item
        axios.put(USER_FIREBASE_URL, task_at_hand);
        this.fetched_todos.splice(todo_id, 1);
      } else {
        const USER_FIREBASE_URL = `https://testing-todo-7bc25-default-rtdb.firebaseio.com/post/${task_at_hand.todo_id}.json`;
        task_at_hand.completed = false;
        task_at_hand.neutral = false;
        task_at_hand.removed = true;
        axios.delete(USER_FIREBASE_URL);
        this.fetched_todos.splice(todo_id, 1);
      }
    },
    redirect_to_login() {
      this.$router.push("/login");
    }
  }
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

button {
  background: transparent;
  border: none;
  font-size: 18px;
}
</style>
