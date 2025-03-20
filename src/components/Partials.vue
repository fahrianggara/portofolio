<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
</script>

<template>
  <div class="partials-wrapper">
    <div class="circle-wrapper -top-10 -left-40">
      <div class="circle w-[350px] h-[350px]"></div>
      <div class="inner-circle w-[100px] h-[100px]"></div>
    </div>
    <div class="circle-wrapper -top-50 left-[50%] transform translate-x-[-50%]">
      <div class="circle w-[350px] h-[350px]"></div>
      <div class="inner-circle w-[120px] h-[120px]"></div>
    </div>
    <div class="circle-wrapper bottom-1 -right-40">
      <div class="circle w-[500px] h-[500px]"></div>
      <div class="inner-circle w-[150px] h-[150px]"></div>
    </div>
    <div class="circle-wrapper -bottom-60 left-[10%]">
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
  @apply absolute flex items-center justify-center;
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
