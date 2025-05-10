<script setup>
import Markdown from '../components/Markdown.vue';
import { inject } from 'vue'; 
import { useAboutStore } from '../stores/about';
import { useGreetingStore } from '../stores/greeting';
import { useSkillsStore } from '../stores/skills';
import { useMeta } from '../composables/meta';

const about = useAboutStore();
const greeting = useGreetingStore();
const skills = useSkillsStore();
const openLightbox = inject('openLightbox');

useMeta({
  title: 'About Me',
  description: 'Learn more about me, my skills, and how to connect with me.',
  ogImage: about.data.photo_link,
  keywords: "fahri anggara, angga, about fahri anggara, tentang fahri anggara, about me fahri anggara, web developer indonesia, mobile app developer, frontend developer, html programmer, programmer muda, developer jakarta, personal profile developer, junior developer, belajar coding, passionate developer",
})
</script>

<template>
  <div class="about">
    <img :src="about.data.photo_link"  :key="about.data.photo_link" alt="About Photo"
      class="float-right sm:w-1/3 w-[145px] ml-4 mb-4 rounded-2xl rotate-0 ease-in-out duration-300 hover:rotate-2 cursor-pointer"
      @click="openLightbox(0, [{ src: about.data.photo_link, title: 'About Photo' }])"
    />

    <h2 class="text-[22px] sm:text-[32px] font-bold mb-3 text-wrap leading-8 sm:leading-11">
      {{ about.data.title }}
    </h2>

    <Markdown :content="about.data.description" />

    <div class="clear-both"></div>

    <div class="items mt-5">
      <h2 class="mb-1 text-[18px] font-bold">Let's connect</h2>
      <p class="text-base/relaxed font-normal text-gray-800 dark:text-gray-300 mb-4">
        You can find me on the following platforms:
      </p>
      <div class="links grid">
        <template v-for="(social) in greeting.data.socials" :key="social.id">
          <a :href="social.link" class="link" target="_blank" rel="noopener noreferrer">
            <div class="flex items-center gap-3 mr-0 md:mr-2">
              <img class="aspect-square w-7 h-7 object-contain" :src="social.image_link" loading="lazy" />
              <span>{{ social.platform }}</span>
            </div>
            <i class="fi fi-rr-arrow-up-right-from-square"></i>
          </a>
        </template>
      </div>
    </div>
  
    <div class="items mt-5">
      <h2 class="text-[18px] font-bold mb-1">My Skills</h2>
      <p class="text-base/relaxed font-normal text-gray-800 dark:text-gray-300 mb-4">
        I have experience with the following technologies and tools:
      </p>
  
      <div class="links grid">
        <template v-for="(skill) in skills.data" :key="skill.id">
          <a :href="skill.website" class="link" target="_blank" rel="noopener noreferrer">
            <div class="flex items-center gap-3 mr-0 md:mr-2">
              <img class="aspect-square w-7 h-7 object-contain" :src="skill.image_url" loading="lazy" />
              <span>{{ skill.name }}</span>
            </div>
            <i class="fi fi-rr-arrow-up-right-from-square"></i>
          </a>
        </template>
      </div>
    </div>
  </div>

</template>