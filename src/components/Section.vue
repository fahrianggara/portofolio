<script setup>
import { useIsDesktop } from '../composables/screen';
import ListMenu from './ListMenu.vue';

const isDesktop = useIsDesktop();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
        <aside class="sidebar-menu" v-if="isDesktop">
          <ListMenu class="sticky top-26" />
        </aside>
        <div class="dark:text-white col-span-2 w-full mb-5">
          <router-view />
        </div>
      </div>
    </div>
  </section>
</template>