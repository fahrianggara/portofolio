<script setup>
import gsap from "gsap";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useIsMobile } from "../composables/screen";

const route = useRoute();
const cursorGlowRef = ref(null);
const isMobile = useIsMobile();
const isCursorVisible = ref(false);

const showCursor = () => {
  if (!cursorGlowRef.value || isMobile.value || isCursorVisible.value) return;
  isCursorVisible.value = true;
  cursorGlowRef.value.classList.remove("opacity-0");
  cursorGlowRef.value.classList.add("opacity-100");
  cursorGlowRef.value.classList.remove("hidden");
};

const hideCursor = () => {
  if (!cursorGlowRef.value || isMobile.value) return;
  isCursorVisible.value = false;
  cursorGlowRef.value.classList.add("hidden");
  cursorGlowRef.value.classList.remove("opacity-100");
  cursorGlowRef.value.classList.add("opacity-0");
};

const animateMouseOver = () => {
  if (!cursorGlowRef.value || isMobile.value) return;
  gsap.to(cursorGlowRef.value, { width: 15, height: 15, borderWidth: 2, duration: 0.2 });
};

const animateMouseLeave = () => {
  if (!cursorGlowRef.value || isMobile.value) return;
  gsap.to(cursorGlowRef.value, { width: 40, height: 40, borderWidth: 1, duration: 0.2 });
};

const animateClick = () => {
  if (!cursorGlowRef.value || isMobile.value) return;
  gsap.fromTo(cursorGlowRef.value, { scale: 1 }, { scale: 1.5, duration: 0.2, repeat: 1, yoyo: true });
};

const attachEventListeners = () => {
  if (isMobile.value) return;

  document.querySelectorAll("[href], img, button, [data-gallery], g").forEach((el) => {
    el.addEventListener("mouseover", animateMouseOver);
    el.addEventListener("mouseleave", animateMouseLeave);
    el.addEventListener("click", animateClick);
  });

  document.querySelectorAll("input, textarea").forEach((el) => {
    el.addEventListener("focus", () => gsap.to(cursorGlowRef.value, { scale: 0 }));
    el.addEventListener("blur", () => gsap.to(cursorGlowRef.value, { scale: 1 }));
  });
};

const removeEventListeners = () => {
  document.querySelectorAll("[href], img, button, [data-gallery], g").forEach((el) => {
    el.removeEventListener("mouseover", animateMouseOver);
    el.removeEventListener("mouseleave", animateMouseLeave);
    el.removeEventListener("click", animateClick);
  });

  document.querySelectorAll("input, textarea").forEach((el) => {
    el.removeEventListener("focus", () => gsap.to(cursorGlowRef.value, { scale: 0 }));
    el.removeEventListener("blur", () => gsap.to(cursorGlowRef.value, { scale: 1 }));
  });
};

const handleResize = () => {
  if (!isMobile.value) {
    attachEventListeners();
  } else {
    removeEventListeners();
    hideCursor(); // Sembunyikan cursor saat pindah ke mobile
  }
};

onMounted(async () => {
  await nextTick();

  if (!cursorGlowRef.value) return;

  const firstMouseMove = () => {
    showCursor();
    document.removeEventListener("mousemove", firstMouseMove);
  };

  document.addEventListener("mousemove", firstMouseMove);

  document.addEventListener("mousemove", (e) => {
    gsap.to(cursorGlowRef.value, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.6,
      ease: "power1.out",
    });
  });

  handleResize();
});

onUnmounted(() => {
  removeEventListeners();
});

watch(route, () => attachEventListeners());

// 🔹 Watch perubahan `isMobile`
watch(isMobile, () => handleResize());
</script>

<template>
  <div
    class="cursor-circle border-primary border-1 border-solid fixed w-[40px] h-[40px] rounded-[50%]
      pointer-events-none transform translate-x-[-50%] translate-y-[-50%] z-9999 hidden opacity-0 transition-opacity duration-300"
    ref="cursorGlowRef">
  </div>
</template>
