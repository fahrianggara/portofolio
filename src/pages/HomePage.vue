<script setup>
import { useGreetingStore } from '../stores/greeting';
import ListSocial from '../components/ListSocial.vue';
import ListMenu from '../components/ListMenu.vue';
import { useMeta } from '../composables/meta';

const greeting = useGreetingStore();
useMeta(null, null);
</script>

<template>
  <section class="home relative">
    <div class="container-center">
      <div class="relative px-2 sm:px-4 lg:px-0">
        <div class="max-w-3xl lg:mx-0 md:mx-auto mx-0 home-box relative">
          <div class="img-home" :class="{ 'loading': greeting.loading }">
            <img class="w-[85px] h-[85px]" src="/logo.png" alt="logo" />
          </div>

          <div>
            <h1 class="text-[26px] md:text-[40px] sm:text-[33px] leading-10 
              md:leading-13 sm:leading-12 font-bold dark:text-white mb-3">
              {{ greeting.data.title }}
            </h1>

            <p class="md:text-base/8 text-base/7 text-[15px] sm:text-[16px] dark:text-gray-300 text-gray-800">
              {{ greeting.data.subtitle }}
            </p>

            <div class="social-links">
              <ListSocial :socials="greeting.data.socials" />
            </div>

            <div class="home-menu">
              <ListMenu :show-icon="false" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>