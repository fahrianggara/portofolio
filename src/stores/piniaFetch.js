import { setActivePinia } from "pinia";
import { useGlobalStore } from "./piniaGlobal";
import { useGreetingStore } from "./greeting";
import { useAboutStore } from "./about";
import { useSkillsStore } from "./skills";
import { useConfigStore } from "./configuration";
import { useEducationStore } from "./educations";
import { useCertificateStore } from "./certificates";
import { useExperienceStore } from "./experiences";
import { useProjectStore } from "./projects";
import { useRepoStore } from "./repositories";
import { useContributionStore } from "./contributions";
import { useGithubStore } from "./github";
import { useWakatimeStore } from "./wakatime";

export async function piniaFetch(pinia, route) {
  setActivePinia(pinia);
  const globalStore = useGlobalStore();

  const fetchMap = {
    home: [],
    about: [useSkillsStore, useAboutStore],
    education: [useEducationStore, useCertificateStore],
    experience: [useExperienceStore],
    projects: [useProjectStore, useRepoStore],
    project: [], // Untuk detail project
    activity: [useContributionStore, useGithubStore, useWakatimeStore],
  };

  const defaultStores = [useGreetingStore, useConfigStore, useAboutStore];
  const matchedStores = [...new Set([...(fetchMap[route.name] || []), ...defaultStores])];

  console.log(`Route:`, route.name);

  console.time(`Fetching data for ${route.name}`);

  await Promise.all(
    matchedStores.map(async (useStore) => {
      const store = useStore();
      console.log(`Checking store:`, store.$id);

      if (!globalStore.data[store.$id]) {
        if (typeof store.fetchData === "function") {
          console.log(`Fetching store:`, store.$id);
          await store.fetchData();
          globalStore.mergeData(store.$id, store.$state);
        } else {
          console.warn(`Store ${store.$id} tidak memiliki fetchData()`);
        }
      } else {
        console.log(`Skipping fetch for ${store.$id}, already stored in global.`);
      }
    })
  );

  console.timeEnd(`Fetching data for ${route.name}`);
}
