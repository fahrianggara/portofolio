<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/composables/screenResize.js";

  const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 lg:gap-8 relative">
        <div class="dark:text-white mb-3 hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2">
          <h1 class="text-2xl mb-3">Ini halaman EXPERIENCE</h1>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
          <p class="mb-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur velit facere corporis, voluptas omnis ut, laudantium repellendus tempora explicabo in dolorum labore culpa, est esse molestiae quia voluptates vero cupiditate.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
