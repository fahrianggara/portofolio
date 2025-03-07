<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const cursorGlowRef = ref(null);

onMounted(() => {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlowRef.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6, // Glow agak lebih lambat dari cursor
      ease: "power1.out",
    });
  });
});
</script>

<template>
  <div class="custom-glow" ref="cursorGlowRef"></div>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.cursor-circle {
  @apply border-primary border-1 border-solid;
  position: fixed;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 999;
}

.custom-glow {
  @apply bg-primary;
  position: fixed;
  width: 80px; /* Lebih besar dari cursor */
  height: 80px;
  filter: blur(30px);
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: -1; /* Harus di bawah cursor utama */
}
</style>
