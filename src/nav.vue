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
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default{
  name: 'nav'
}
</script>