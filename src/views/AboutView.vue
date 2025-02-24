<script setup>
  import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="dark:text-white mb-3">
          <Sidebar />
        </div>
        <div class="dark:text-white mb-3 col-span-2">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis voluptates voluptate placeat doloremque pariatur excepturi, neque assumenda impedit laboriosam! Velit molestias, odit mollitia natus dolorem ullam officiis laudantium est veritatis!</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
