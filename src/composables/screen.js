import { useMediaQuery } from "@vueuse/core";
import { ref, watchEffect } from "vue";

export function useIsMobile(breakpoint = 767.99) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoint}px)`);
  return isMobile;
}

export function useResize(breakpoint = 767.99) {
  const isResized = ref(false);
  const max = useMediaQuery(`(max-width: ${breakpoint}px)`);

  watchEffect(() => {
    isResized.value = max.value; // Reactive berdasarkan media query
  });

  return { isResized };
}
