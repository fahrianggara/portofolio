<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  const xOffset = ref(0);
  const yOffset = ref(0);
  const smoothX = ref(0);
  const smoothY = ref(0);
  let animationFrameId = null;

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    xOffset.value = (clientX - window.innerWidth / 2) * 0.05;
    yOffset.value = (clientY - window.innerHeight / 2) * 0.05;
  };

  const animate = () => {
    smoothX.value += (xOffset.value - smoothX.value) * 0.1; // Lerp effect
    smoothY.value += (yOffset.value - smoothY.value) * 0.1;
    animationFrameId = requestAnimationFrame(animate);
  };

  onMounted(() => {
    animationFrameId = requestAnimationFrame(animate);
  });

  onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
  });
</script>

<template>
  <div class="parallax-container" @mousemove="handleMouseMove">
    <div class="parallax-item" :style="{
      transform: `translateX(${smoothX}px) translateY(${smoothY}px)`
    }">Move Me</div>
  </div>
</template>

<style scoped>
  .parallax-item {
    width: 200px;
    height: 100px;
    background-color: #61dafb;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: bold;
    border-radius: 10px;
    transition: transform 0.1s ease-out;
  }
</style>