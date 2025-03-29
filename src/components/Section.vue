<script setup> 
import { ref } from 'vue';
import { useIsDesktop } from '../composables/screen';
import ListMenu from './ListMenu.vue';

const isDesktop = useIsDesktop(768);
const noPadding = ref(false);
</script>

<template>
  <section>
    <div class="container" :class="{ 'no-padding': noPadding }">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6">
        <aside class="sidebar-menu">
          <ListMenu class="sticky top-26" />
        </aside>
        <section class="dark:text-white col-span-2 w-full mb-5">
          <keep-alive>
            <RouterView @no-padding="noPadding = $event" />
          </keep-alive>
        </section>
      </div>
    </div>
  </section>
</template>
