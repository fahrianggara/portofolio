import { setActivePinia } from "pinia";
import { useGreetingStore } from "@/stores/greeting";

export async function piniaFetch(pinia) {
  setActivePinia(pinia);

  const storeInstances = [ // If has more stores, add them here of course with fetchData method
    useGreetingStore()
  ];

  const fetchPromises = storeInstances.map(store => {
    return typeof store.fetchData === "function" ? store.fetchData() : null;
  });

  await Promise.all(fetchPromises);
}
