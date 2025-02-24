<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/composables/screenResize.js";
const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="dark:text-white mb-3" v-if="!resizeScreen">
          <Sidebar />
        </div>
        <div class="dark:text-white mb-3 col-span-2">
          <h1 class="text-2xl mb-3">Ini halaman Education</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit quas numquam modi quos magni beatae eaque enim maxime delectus corrupti molestiae quisquam asperiores ad, dicta labore perspiciatis. Beatae, incidunt explicabo.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
