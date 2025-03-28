import { useMediaQuery } from "@vueuse/core";

export function useIsMobile(breakpoint = 768) {
  const isMobile = useMediaQuery(`(max-width: ${breakpoint}px)`);
  return isMobile;
}

export function useIsDesktop(breakpoint = 1024) {
  const isDesktop = useMediaQuery(`(min-width: ${breakpoint}px)`);
  return isDesktop;
}
