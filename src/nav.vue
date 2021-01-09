<template>
  <nav>
    <div class="nav-wrapper blue">
      <div class="container">
        <router-link to="/" class="brand-logo left">Home Page</router-link>
        <ul class="right">
          <span v-if="currentUser" class="email black-text left">
            Welcome, {{ currentUser }}
          </span>
          <li>
            <router-link to="/todo">Todo-Testing Page</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn">
            <router-link to="/register">Register</router-link>
          </li>
          <li v-if="isLoggedIn">
            <button @click="logout" class="btn black">Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebaseApp from "./components/db.js";

export default {
  name: "navigation",
  data() {
    return {
      isLoggedIn: false, // Default value
      currentUser: false
    };
  },
  methods: {
    logout: function() {
      firebaseApp
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");

          this.isLoggedIn = false;
          this.currentUser = false;
        });
    }
  },
  created() {
    if (firebaseApp.auth().currentUser) {
      // Then we are going to change some rules
      this.isLoggedIn = true;
      this.currentUser = firebaseApp.auth().currentUser.email;
    }
  }
};
</script>
