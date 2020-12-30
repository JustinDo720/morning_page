<template>
  <nav>
    <div class="nav-wrapper blue">
      <div class="container">
        <router-link to="/" class="brand-logo left">Home Page</router-link>
        <ul class="right">
          <li>
            <router-link to="/todo" >Todo-Testing Page</router-link>
          </li>
          <li>
            <router-link to="/login" >Login</router-link>
          </li>
          <li>
            <router-link to="/register" >Register</router-link>
          </li>
          <li>
            <button @:click= 'logout' class='btn black'>Logout</button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import firebaseApp from './components/db.js'

export default{
  name: 'navigation',
  data(){
    return{
      isLoggedIn: false, // Default value
      currentUser: false,
    }
  },
  methods: {
    logout: function() {
      firebaseApp.auth().signOut().then(()=>{
        this.$router.push('/login')
      })
    }
  }
}
</script>