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
  ];

  const fetchPromises = storeInstances.map(store => {
    return typeof store.fetchData === "function" ? store.fetchData() : null;
  });

  await Promise.all(fetchPromises);
}
