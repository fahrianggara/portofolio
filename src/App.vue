<script setup>
  import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar :class="'font-inter dark:bg-black'" />
  <router-view :class="'font-inter dark:bg-black'" />
</template>

<style scoped>

</style>
