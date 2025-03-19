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
        autoX.value -
        scrollX.value,
      y: (i, target) =>
        ((window.innerHeight - mouseY.value * target.dataset.speed) / 100) +
        autoY.value -
        scrollY.value,
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

.parallax-item:nth-child(1) {
  top: 10%;
  left: 5%;
}

.parallax-item:nth-child(2) {
  top: 14%;
  left: 35%;
}

.parallax-item:nth-child(3) {
  top: 20%;
  left: 54%;
}

.parallax-item:nth-child(4) {
  top: 12%;
  left: 85%;
}

.parallax-item:nth-child(5) {
  top: 44%;
  left: 70%;
}

.parallax-item:nth-child(6) {
  top: 76%;
  left: 85%;
}

.parallax-item:nth-child(7) {
  top: 80%;
  left: 48%;
}

.parallax-item:nth-child(8) {
  top: 50%;
  left: 26%;
}

.parallax-item:nth-child(9) {
  top: 75%;
  left: 5%;
}

.parallax .out {
  @apply dark:fill-dark-bg-primary fill-bg-primary;
  transition: all .2s ease;
}

.parallax .in {
  @apply dark:fill-primary fill-primary;
  transition: all .2s ease;
}

@media (max-width: 1199.98px) {
  .parallax-item {
    height: 80px;
    width: 80px;
  }
}

@media (max-width: 991.98px) {
  .parallax-item {
    height: 70px;
    width: 70px;
  }
}

@media (max-width: 575.98px) {
  .parallax-item {
    display: none;
  }

  .parallax-item:where(:nth-child(1), :nth-child(2), :nth-child(3), :nth-child(4), :nth-child(5)) {
    display: block;
  }

  .parallax-item:nth-child(1) {
    top: 10%;
    left: 5%;
  }

  .parallax-item:nth-child(2) {
    top: 10%;
    left: 72%;
  }

  .parallax-item:nth-child(3) {
    top: 50%;
    left: 70%;
  }

  .parallax-item:nth-child(4) {
    top: 70%;
    left: 10%;

  }

  .parallax-item:nth-child(5) {
    top: 85%;
    left: 70%;
  }
}
</style>
