<script setup>
  import AppNavbar from './components/AppNavbar.vue';
</script>

<template>

  <AppNavbar />

  <router-view/>

</template>

<style>

  nav {
    margin-top: 1em;
  }

  body{
    margin: 0;
    padding: 0;
  }
</style>
