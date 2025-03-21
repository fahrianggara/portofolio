import { setActivePinia } from "pinia";
import { useGreetingStore } from "@/stores/greeting"; // Import store yang perlu di-fetch

export async function fetchStoresData(pinia) {
  setActivePinia(pinia); // Aktifkan Pinia di SSR

  const storeInstances = [
    useGreetingStore() // Panggil store dulu sebelum akses fetchData()
  ];

  const fetchPromises = storeInstances.map(store => {
    return typeof store.fetchData === "function" ? store.fetchData() : null;
  });

  await Promise.all(fetchPromises);
}
