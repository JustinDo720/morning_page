<template>
  <div>
    <div class="container">
      <div class="row">
        <div style="margin:80px 100px 90px; margin-left: 240px; width:67%">
          <div class="login card-panel green white-text center">
            <h3>Login</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input
                  v-model="email"
                  type="text"
                  id="email"
                  placeholder="Email"
                />
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
              </div>
              <button
                @click="login"
                class="btn btn-large grey ligten-4 black-text"
              >
                Login
              </button>
            </form>
            <div>
              <h6>
                Need an account? Register
                <a href="/register" class="teal-text text-darken-2">Here</a>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseInit from "./db.js";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login: function(e) {
      firebaseInit
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          obj => {
            alert(`You are logged in as ${obj.user.email}`);
            // We are going to redirect after they register to the homepage
            this.$router.push("/");
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>
::placeholder {
  color: white;
}
</style>
