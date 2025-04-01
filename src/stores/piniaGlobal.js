import { defineStore } from "pinia";

export const useGlobalStore = defineStore("global", {
  state: () => ({
    data: {}, // Tempat menyimpan semua store yang sudah di-fetch
  }),
  actions: {
    mergeData(storeName, newData) {
      this.data[storeName] = {
        ...(this.data[storeName] || {}), // Data lama tetap ada
        ...newData,                      // Tambahkan data baru
      };
    },
  },
});
