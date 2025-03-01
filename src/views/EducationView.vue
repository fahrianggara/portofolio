<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 lg:gap-8 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-5">
          <h1 class="mb-4 font-medium text-lg">My Educations</h1>
          <ol class="edu">
            <li>
              <div class="bullet"></div>
              <time>2019 - 2022 / Informatics Engineering</time>
              <h3 class="title">SMK Yadika 12 Depok</h3>
              <p class="text-base/relaxed font-normal text-gray-600 dark:text-gray-400">
                I graduated from SMK Yadika 12 Depok with a major in
                Teknologi Komputer Jaringan. I learned a lot about computer and network technology. 
                Of course, I also learned about programming and web development.
              </p>
            </li>
            <li>
              <div class="bullet"></div>
              <time>2022 - Now / Software Engineering</time>
              <h3 class="title">Bina Sarana Informatika University</h3>
              <p class="text-base/relaxed font-normal text-gray-600 dark:text-gray-400">
                I am currently studying at Bina Sarana Informatika University
                majoring in Software Engineering. I am learning about
                programming, web development, software engineering and design website.
              </p>
              <ol class="achievement">
                <li>
                  <p class="font-medium text-base/relaxed">
                    Meraih juara 3 dalam IT Bootcamp "Software Development".
                  </p>
                  <p class="mt-1 text-base/relaxed dark:text-gray-400 text-gray-600">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Qui, unde quisquam. Et, vel reiciendis necessitatibus eaque possimus.
                  </p>
                </li>
              </ol>
            </li>
          </ol>
          <div class="certificates mt-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              My Certificates
            </h2>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4" v-glightbox>
              <a v-for="(src, index) in [
                  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
                  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
                  'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg'
                ]"
                :key="index"
                :href="src"
                class="glightbox"
                data-gallery="certificates"
                data-type="image"
              > 
                <img :src="src" alt="">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.glightbox img {
  @apply h-auto max-w-full rounded-lg cursor-pointer transform ease-in-out duration-300 
  translate-y-0 hover:-translate-y-1;
}

.title {
  @apply text-lg font-semibold text-gray-900 dark:text-white mb-1.5;
}

.edu {
  @apply relative border-s border-gray-300 dark:border-zinc-800;
}

.edu > li {
  @apply mb-4 ms-7
  bg-white/40 dark:bg-dark-surface/60 backdrop-blur-2xl 
  relative p-4 px-5 rounded-2xl 
  border border-solid dark:border-zinc-900 border-gray-300;
}

time {
  @apply mb-1 text-sm font-normal leading-none text-gray-600 dark:text-gray-500;
}

.bullet {
  @apply absolute w-3 h-3 rounded-full mt-1.5 -start-[35px] border border-primary bg-primary;
}

.achievement {
  @apply list-disc list-outside pl-4 mt-3 mb-2;
}

.achievement li {
  @apply pl-1.5;
}
</style>
