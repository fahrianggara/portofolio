import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useIsMobile } from "./screen";

export function useSmoothScroll() {
  const isMobile = useIsMobile();
  const route = useRoute();
  const lenisInstance = ref(null);

  async function initLenis() {
    if (isMobile.value) return; // Jangan jalankan Lenis di mobile

    const { default: Lenis } = await import("lenis");
    const lenis = new Lenis();
    lenisInstance.value = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  watch(isMobile, (mobile) => {
    if (!mobile && !lenisInstance.value) {
      initLenis();
    }
  });

  watch(route, () => {
    if (lenisInstance.value) {
      lenisInstance.value.scrollTo(0, { behavior: "smooth" });
    }
  });

  onMounted(() => {
    if (!isMobile.value) {
      initLenis();
    }
  });
}
