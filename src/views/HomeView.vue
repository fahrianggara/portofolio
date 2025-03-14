<script setup> 
import ListMenu from '@/components/ListMenu.vue';
import ListSocial from '@/components/ListSocial.vue';
</script>

<template>
  <section class="home relative">
    <div class="container-center">
      <div class="relative px-2 sm:px-4 lg:px-0">
        <div class="max-w-3xl lg:mx-0 md:mx-auto mx-0 home-box relative">
          <div class="img-container">
            <img src="@/assets/img/logo.png" alt="logo" />
          </div>

          <h1 class="text-[26px] md:text-[40px] sm:text-[33px] leading-10 
            md:leading-13 sm:leading-12 font-bold dark:text-white mb-3">
            Web Developer &amp; UI/UX Designer
          </h1>

          <p class="md:text-base/8 text-base/7 text-[15px] sm:text-[16px] dark:text-gray-300 text-gray-800">
            Hi, I`m Fahri Anggara.
            Experienced Web Developer and UI/UX Designer skilled in creating responsive websites and 
            intuitive interfaces. Strong problem-solving, communication, and adaptability.
          </p>

          <div class="social-links">
            <list-social />
          </div>

          <div class="home-menu">
            <ListMenu :show-icon="false" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference "tailwindcss";
  @import "@/assets/main.css";

  .link {
    @apply ease-in rounded-lg text-[15px] px-[15px] py-[10px];
  }

  .img-container {
    @apply mb-[25px] relative inline-block z-10;
  }

  .img-container::before {
    @apply blur-[70px] opacity-[1];
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 190%;
    height: 190%;
    background-color: #2a86ff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    transition: 0.3s ease-in-out;
  }

  .img-container img {
    @apply w-[85px] h-[85px] rounded-xl;
  }
</style>