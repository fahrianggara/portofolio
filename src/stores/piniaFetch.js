import { setActivePinia } from "pinia";
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

export async function piniaFetch(pinia) {
  setActivePinia(pinia);

  // Store yang akan di-fetch
  const storeInstances = [
    useGreetingStore(),
    useAboutStore(),
    useSkillsStore(),
    useConfigStore(),
    useEducationStore(),
    useCertificateStore(),
    useExperienceStore(),
    useProjectStore(),
    useRepoStore(),
    useContributionStore(),
    useGithubStore(),
    useWakatimeStore(),
  ];

  console.time("Total Fetch Time");

  const fetchPromises = storeInstances.map(async (store) => {
    if (typeof store.fetchData === "function") {
      console.time(`Fetch Time: ${store.$id}`);
      await store.fetchData();
      console.timeEnd(`Fetch Time: ${store.$id}`);
    }
  });

  await Promise.all(fetchPromises);

  console.timeEnd("Total Fetch Time");
}
