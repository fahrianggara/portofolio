import { createPinia } from "pinia";

export function setupPinia() {
  const pinia = createPinia();

  // Cek apakah ada state dari SSR
  if (import.meta.env.SSR === false && window.__PINIA_STATE__) {
    pinia.state.value = window.__PINIA_STATE__; // Restore state di client
  }

  return pinia;
}
