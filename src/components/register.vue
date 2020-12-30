<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col s12 m8 offset-mk2">
          <div class="login card-panel grey lighten-4 black-text center">
            <h3>Register</h3>
            <form>
              <div class="input-field">
                <i class="material-icons prefix">email</i>
                <input v-model='email' type="text" id="email" placeholder='Email'>
              </div>
              <div class="input-field">
                <i class="material-icons prefix">lock</i>
                <input v-model='password' type="password" id="password" placeholder='Password'>
              </div>
              <button @click = "register" class ="btn btn-large grey ligten-4 black-text">Register</button>
            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseInit from './db.js'

export default{
  name: 'register',
  data(){
    return{
      email: '',
      password: '',
    }
  },
  methods: {
    register: function(e){
      firebaseInit.auth().createUserWithEmailAndPassword(this.email, this.password).then(obj=>{
        alert(`Account created for ${obj.user.email}`)
        // We are going to redirect after they register to the homepage
        this.$router.push('/')
      },
      err=>{
        alert(err.message)
      })
      e.preventDefault()
    }
  },

}
</script>

<style scoped>
::placeholder{
  color: black;
}
</style>