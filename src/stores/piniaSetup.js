import { createPinia } from "pinia";

export function piniaSetup() {
  const pinia = createPinia();

  if (import.meta.env.SSR === false && window.__PINIA_STATE__) {
    pinia.state.value = window.__PINIA_STATE__;
  }

  return pinia;
}