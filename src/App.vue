<script setup>
  import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar :class="'font-inter'" />
  <router-view :class="'font-inter'" />
</template>

<style scoped>

</style>
