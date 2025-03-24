import { setActivePinia } from "pinia";
import { useGreetingStore } from "./greeting";
import { useAboutStore } from "./about";
import { useSkillsStore } from "./skills";
import { useConfigStore } from "./configuration";

export async function piniaFetch(pinia) {
  setActivePinia(pinia);

  // If has more stores, add them here of course with fetchData method
  const storeInstances = [
    useGreetingStore(),
    useAboutStore(),
    useSkillsStore(),
    useConfigStore()
  ];

  const fetchPromises = storeInstances.map(store => {
    return typeof store.fetchData === "function" ? store.fetchData() : null;
  });

  await Promise.all(fetchPromises);
}
