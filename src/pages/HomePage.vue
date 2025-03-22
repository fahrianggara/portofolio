<script setup>
import { onMounted } from 'vue';
import { useGreetingStore } from '../stores/greeting';

const greeting = useGreetingStore();

onMounted(() => {
  greeting.fetchData();
});
</script>

<template>
  <section class="home relative">
    <div class="container-center">
      <div class="relative px-2 sm:px-4 lg:px-0">
        <div class="max-w-3xl lg:mx-0 md:mx-auto mx-0 home-box relative">
          <div class="img-container" :class="{ 'loading': greeting.loading }">
            <img src="/public/android-chrome-512x512.png" alt="logo" />
          </div>

          <div v-if="greeting.loading">
            <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-6 w-[100%] rounded-xl"></div>
            <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-2 w-[100%] rounded-xl mt-5"></div>
            <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-2 w-[100%] rounded-xl mt-3"></div>
            <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-2 w-[100%] rounded-xl mt-3"></div>
            <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-2 w-[100%] rounded-xl mt-3"></div>
            <div class="flex flex-wrap mt-5 gap-2">
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-8 w-8 rounded-full"></div>
            </div>
            <div class="flex flex-wrap mt-6 gap-2">
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
              <div class="animate-pulse bg-gray-300 dark:bg-gray-700 h-9 w-[90px] rounded-xl"></div>
            </div>
          </div>

          <div v-else>
            <h1 class="text-[26px] md:text-[40px] sm:text-[33px] leading-10 
              md:leading-13 sm:leading-12 font-bold dark:text-white mb-3">
              {{ greeting.data.title }}
            </h1>

            <p class="md:text-base/8 text-base/7 text-[15px] sm:text-[16px] dark:text-gray-300 text-gray-800">
              {{ greeting.data.subtitle }}
            </p>

            <!-- <div class="social-links">
              <ListSocial :socials="greeting.data.socials" />
            </div>

            <div class="home-menu">
              <ListMenu :show-icon="false" />
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference "tailwindcss";
  @import "@/assets/style.css";

  .link {
    @apply ease-in rounded-lg text-[15px] px-[15px] py-[10px];
  }

  .img-container {
    @apply mb-[25px] relative inline-block z-10;
  }

  .img-container::before {
    @apply blur-[70px] opacity-[0];
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 190%;
    height: 190%;
    background-color: #003f91;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: 0.3s ease-in-out;
  }

  .img-container.loading::before {
    animation: pulse 1.8s infinite;
  }

  .img-container img {
    @apply w-[85px] h-[85px];
  }

  @keyframes pulse {
    0%, 100% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.8);
    }
  }
</style>