<script setup>

</script>

<template>

  <h1>Capital</h1>

  <p>
    Visit <a href="https://vuejs.org/" target="_blank" rel="noopener">vuejs.org</a> to read the
    documentation
  </p>

  <nav>
    <router-link to="/register">Register here</router-link>
  </nav>

  <router-view/>

</template>

<style scoped>
  h1 {
    font-weight: normal;
    font-size: 2em;
    margin: 0;
  }

  nav {
    margin-top: 1em;
  }
</style>
