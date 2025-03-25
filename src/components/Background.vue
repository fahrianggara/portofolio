<template>
  <div class="parallax">
    <svg class="parallax-item polygon" data-speed="-1" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path class="out"
        d="M33 1.1547C34.2376 0.44017 35.7624 0.440169 37 1.1547L63.3109 16.3453C64.5485 17.0598 65.3109 18.3803 65.3109 19.8094V50.1906C65.3109 51.6197 64.5485 52.9402 63.3109 53.6547L37 68.8453C35.7624 69.5598 34.2376 69.5598 33 68.8453L6.68911 53.6547C5.45151 52.9402 4.68911 51.6197 4.68911 50.1906V19.8094C4.68911 18.3803 5.45151 17.0598 6.68911 16.3453L33 1.1547Z" />
      <path class="in"
        d="M33 16.1547C34.2376 15.4402 35.7624 15.4402 37 16.1547L50.3205 23.8453C51.5581 24.5598 52.3205 25.8803 52.3205 27.3094V42.6906C52.3205 44.1197 51.5581 45.4402 50.3205 46.1547L37 53.8453C35.7624 54.5598 34.2376 54.5598 33 53.8453L19.6795 46.1547C18.4419 45.4402 17.6795 44.1197 17.6795 42.6906V27.3094C17.6795 25.8803 18.4419 24.5598 19.6795 23.8453L33 16.1547Z" />
    </svg>

    <svg class="parallax-item star" data-speed="2" width="90" height="90" viewBox="0 0 90 90" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path class="out"
        d="M44.0886 2.01786C44.443 1.23334 45.557 1.23334 45.9114 2.01786L58.8452 30.655C58.9454 30.8769 59.1231 31.0546 59.345 31.1548L87.9821 44.0886C88.7667 44.443 88.7667 45.557 87.9821 45.9114L59.345 58.8452C59.1231 58.9454 58.9454 59.1231 58.8452 59.345L45.9114 87.9821C45.557 88.7667 44.443 88.7667 44.0886 87.9821L31.1548 59.345C31.0546 59.1231 30.8769 58.9454 30.655 58.8452L2.01786 45.9114C1.23334 45.557 1.23334 44.443 2.01786 44.0886L30.655 31.1548C30.8769 31.0546 31.0546 30.8769 31.1548 30.655L44.0886 2.01786Z" />
      <path class="in"
        d="M43.5886 26.0179C43.943 25.2333 45.057 25.2333 45.4114 26.0179L50.7226 37.7776C50.8228 37.9995 51.0005 38.1772 51.2224 38.2774L62.9821 43.5886C63.7667 43.943 63.7667 45.057 62.9821 45.4114L51.2224 50.7226C51.0005 50.8228 50.8228 51.0005 50.7226 51.2224L45.4114 62.9821C45.057 63.7667 43.943 63.7667 43.5886 62.9821L38.2774 51.2224C38.1772 51.0005 37.9995 50.8228 37.7776 50.7226L26.0179 45.4114C25.2333 45.057 25.2333 43.943 26.0179 43.5886L37.7776 38.2774C37.9995 38.1772 38.1772 37.9995 38.2774 37.7776L43.5886 26.0179Z" />
    </svg>

    <svg class="parallax-item circular" data-speed="-2" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="out" cx="35" cy="35" r="35" />
      <circle class="in" cx="35" cy="35" r="20" />
    </svg>

    <svg class="parallax-item square" data-speed="3" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect class="out" width="70" height="70" rx="11" />
      <rect class="in" x="15" y="15" width="40" height="40" rx="6" />
    </svg>

    <svg class="parallax-item star" data-speed="-1" width="90" height="90" viewBox="0 0 90 90" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path class="out"
        d="M44.0886 2.01786C44.443 1.23334 45.557 1.23334 45.9114 2.01786L58.8452 30.655C58.9454 30.8769 59.1231 31.0546 59.345 31.1548L87.9821 44.0886C88.7667 44.443 88.7667 45.557 87.9821 45.9114L59.345 58.8452C59.1231 58.9454 58.9454 59.1231 58.8452 59.345L45.9114 87.9821C45.557 88.7667 44.443 88.7667 44.0886 87.9821L31.1548 59.345C31.0546 59.1231 30.8769 58.9454 30.655 58.8452L2.01786 45.9114C1.23334 45.557 1.23334 44.443 2.01786 44.0886L30.655 31.1548C30.8769 31.0546 31.0546 30.8769 31.1548 30.655L44.0886 2.01786Z" />
      <path class="in"
        d="M43.5886 26.0179C43.943 25.2333 45.057 25.2333 45.4114 26.0179L50.7226 37.7776C50.8228 37.9995 51.0005 38.1772 51.2224 38.2774L62.9821 43.5886C63.7667 43.943 63.7667 45.057 62.9821 45.4114L51.2224 50.7226C51.0005 50.8228 50.8228 51.0005 50.7226 51.2224L45.4114 62.9821C45.057 63.7667 43.943 63.7667 43.5886 62.9821L38.2774 51.2224C38.1772 51.0005 37.9995 50.8228 37.7776 50.7226L26.0179 45.4114C25.2333 45.057 25.2333 43.943 26.0179 43.5886L37.7776 38.2774C37.9995 38.1772 38.1772 37.9995 38.2774 37.7776L43.5886 26.0179Z" />
    </svg>

    <svg class="parallax-item circular" data-speed="2" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle class="out" cx="35" cy="35" r="35" />
      <circle class="in" cx="35" cy="35" r="20" />
    </svg>

    <svg class="parallax-item polygon" data-speed="-1" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path class="out"
        d="M33 1.1547C34.2376 0.44017 35.7624 0.440169 37 1.1547L63.3109 16.3453C64.5485 17.0598 65.3109 18.3803 65.3109 19.8094V50.1906C65.3109 51.6197 64.5485 52.9402 63.3109 53.6547L37 68.8453C35.7624 69.5598 34.2376 69.5598 33 68.8453L6.68911 53.6547C5.45151 52.9402 4.68911 51.6197 4.68911 50.1906V19.8094C4.68911 18.3803 5.45151 17.0598 6.68911 16.3453L33 1.1547Z" />
      <path class="in"
        d="M33 16.1547C34.2376 15.4402 35.7624 15.4402 37 16.1547L50.3205 23.8453C51.5581 24.5598 52.3205 25.8803 52.3205 27.3094V42.6906C52.3205 44.1197 51.5581 45.4402 50.3205 46.1547L37 53.8453C35.7624 54.5598 34.2376 54.5598 33 53.8453L19.6795 46.1547C18.4419 45.4402 17.6795 44.1197 17.6795 42.6906V27.3094C17.6795 25.8803 18.4419 24.5598 19.6795 23.8453L33 16.1547Z" />
    </svg>

    <svg class="parallax-item square" data-speed="-1" width="70" height="70" viewBox="0 0 70 70" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect class="out" width="70" height="70" rx="11" />
      <rect class="in" x="15" y="15" width="40" height="40" rx="6" />
    </svg>

    <svg class="parallax-item star" data-speed="-2" width="90" height="90" viewBox="0 0 90 90" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path class="out"
        d="M44.0886 2.01786C44.443 1.23334 45.557 1.23334 45.9114 2.01786L58.8452 30.655C58.9454 30.8769 59.1231 31.0546 59.345 31.1548L87.9821 44.0886C88.7667 44.443 88.7667 45.557 87.9821 45.9114L59.345 58.8452C59.1231 58.9454 58.9454 59.1231 58.8452 59.345L45.9114 87.9821C45.557 88.7667 44.443 88.7667 44.0886 87.9821L31.1548 59.345C31.0546 59.1231 30.8769 58.9454 30.655 58.8452L2.01786 45.9114C1.23334 45.557 1.23334 44.443 2.01786 44.0886L30.655 31.1548C30.8769 31.0546 31.0546 30.8769 31.1548 30.655L44.0886 2.01786Z" />
      <path class="in"
        d="M43.5886 26.0179C43.943 25.2333 45.057 25.2333 45.4114 26.0179L50.7226 37.7776C50.8228 37.9995 51.0005 38.1772 51.2224 38.2774L62.9821 43.5886C63.7667 43.943 63.7667 45.057 62.9821 45.4114L51.2224 50.7226C51.0005 50.8228 50.8228 51.0005 50.7226 51.2224L45.4114 62.9821C45.057 63.7667 43.943 63.7667 43.5886 62.9821L38.2774 51.2224C38.1772 51.0005 37.9995 50.8228 37.7776 50.7226L26.0179 45.4114C25.2333 45.057 25.2333 43.943 26.0179 43.5886L37.7776 38.2774C37.9995 38.1772 38.1772 37.9995 38.2774 37.7776L43.5886 26.0179Z" />
    </svg>
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
@import "@/assets/style.css";

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
  @apply dark:fill-[#0937be] fill-[#0937be];
  transition: all .2s ease;
}

.parallax .in {
  @apply dark:fill-[#0937be] fill-[#0937be];
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