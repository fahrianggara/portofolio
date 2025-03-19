<template>
  <div class="parallax">
    
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from "vue";
  import gsap from "gsap";

  const mouseX = ref(0);
  const mouseY = ref(0);
  const autoX = ref(0);
  const autoY = ref(0);
  const scrollX = ref(0);
  const scrollY = ref(0);

  const updateParallax = () => {
    gsap.to(".parallax-item", {
      x: (i, target) =>
        ((window.innerWidth - mouseX.value * target.dataset.speed) / 100) +
        autoX.value - scrollX.value,
      y: (i, target) =>
        ((window.innerHeight - mouseY.value * target.dataset.speed) / 100) +
        autoY.value - scrollY.value,
      ease: "power2.out",
      duration: 0.3,
    });

    requestAnimationFrame(updateParallax);
  };

  const handleMouseMove = (e) => {
    mouseX.value = e.clientX;
    mouseY.value = e.clientY;
  };

  const autoAnimate = () => {
    autoX.value = Math.sin(Date.now() / 500) * 10;
    autoY.value = Math.cos(Date.now() / 1000) * 10;
    requestAnimationFrame(autoAnimate);
  };

  onMounted(() => {
    window.addEventListener("mousemove", handleMouseMove);
    updateParallax();
    autoAnimate();
  });

  onUnmounted(() => {
    window.removeEventListener("mousemove", handleMouseMove);
  });
</script>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.parallax {
  @apply fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.parallax-item {
  position: absolute;
  object-fit: cover;
  width: 100px;
  height: 100px;
}
</style>
