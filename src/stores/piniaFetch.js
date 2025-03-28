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

  // Tambahin store yang baru disini buat fetch data di SSR
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
    useWakatimeStore()
  ];

  const fetchPromises = storeInstances.map(store => {
    console.info(`Fetching data for ${store.$id}`);
    return typeof store.fetchData === "function" ? store.fetchData() : null;
  });

  await Promise.all(fetchPromises);
}
