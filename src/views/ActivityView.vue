<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";

  const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white mb-3 hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2">
          
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
