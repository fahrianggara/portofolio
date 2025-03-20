<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
</script>

<template>
  <div class="partials-wrapper">
    <div class="circle-wrapper flex -top-20 -left-20">
      <div class="circle w-[350px] h-[350px] md:opacity-60 lg:opacity-100"></div>
      <div class="inner-circle w-[40px] h-[40px] md:w-[100px] md:h-[100px]"></div>
    </div>
    <div class="circle-wrapper lg:flex hidden md:-top-[30%] md:left-[70%] transform -top-50 lg:left-[60%] translate-x-[-50%]">
      <div class="circle xl:w-[350px] xl:h-[350px] w-[300px] h-[300px]"></div>
      <div class="inner-circle w-[120px] h-[120px]"></div>
    </div>
    <div class="circle-wrapper flex -bottom-20 -right-15 md:-bottom-40 md:-right-40 lg:-bottom-20 lg:-right-40">
      <div class="circle w-[300px] h-[300px] md:w-[500px] md:h-[500px] md:opacity-60 lg:opacity-100"></div>
      <div class="inner-circle md:w-[100px] md:h-[100px]"></div>
    </div>
    <div class="circle-wrapper lg:flex hidden xl:-bottom-60 xl:left-[10%] lg:left-[5%] lg:-bottom-70 md:-bottom-60 md:left-20">
      <div class="circle w-[400px] h-[400px]"></div>
      <div class="inner-circle w-[120px] h-[120px]"></div>
    </div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.partials-wrapper {
  @apply fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.circle-wrapper {
  @apply absolute items-center justify-center;
}

.circle {
  @apply dark:bg-[#041840] bg-[#c3d7ff]
  rounded-full z-0 relative;
}

.inner-circle {
  @apply bg-primary
  rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] z-10;
}
</style>
