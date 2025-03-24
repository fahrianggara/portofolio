<script setup>
import gsap from "gsap";
import { nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const cursorGlowRef = ref("");

const animateMouseOver = () => {
  if (!cursorGlowRef.value) return;
  gsap.to(cursorGlowRef.value, {
    width: 15,
    height: 15,
    borderWidth: 2,
    duration: 0.2,
  });
};

const animateMouseLeave = () => {
  if (!cursorGlowRef.value) return;
  gsap.to(cursorGlowRef.value, {
    width: 40,
    height: 40,
    borderWidth: 1,
    duration: 0.2,
  });
};

const animateClick = () => {
  if (!cursorGlowRef.value) return;
  gsap.fromTo(
    cursorGlowRef.value,
    { scale: 1 },
    { scale: 1.5, duration: 0.2, repeat: 1, yoyo: true }
  );
};

const attachEventListeners = () => {
  document.querySelectorAll("[href], img, button, [data-gallery], g").forEach((el) => {
    el.addEventListener("mouseover", animateMouseOver);
    el.addEventListener("mouseleave", animateMouseLeave);
    el.addEventListener("click", animateClick);
  });

  document.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("focus", () => {
      gsap.to(cursorGlowRef.value, { scale: 0 });
    });

    el.addEventListener("blur", () => {
      gsap.to(cursorGlowRef.value, { scale: 1 });
    });
  });
};

onMounted(async () => {
  await nextTick();

  if (!cursorGlowRef.value) return;

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlowRef.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: "power1.out",
    });
  });

  attachEventListeners();
});

watch(route, () => attachEventListeners());
</script>

<template>
  <div class="cursor-circle" ref="cursorGlowRef"></div>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/style.css';

.cursor-circle {
  @apply border-primary border-1 border-solid;
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
}
</style>
