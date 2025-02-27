<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";
  import testImg from "@/assets/img/test.jpg";
  import { eventBus } from "@/eventBus"; // Import event bus
  const { resizeScreen } = useScreenSize();

  defineEmits(["zoomImage"]);
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 lg:gap-8 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 w-full">
          <div class="about">
            <!-- Gambar dengan float -->
            <img
              :src="testImg" 
              class="float-right w-1/3 ml-4 mb-4 rounded-2xl cursor-zoom-in" 
              alt="test" 
              loading="lazy"
              @click="eventBus.openLightbox(testImg)"
            />
            
            <!-- H1 dengan text wrap -->
            <h1 class="text-2xl sm:text-[32px] font-bold mb-3 text-wrap sm:leading-11">
              I’m Spencer Sharp. I live in New York City, where I design the future.
            </h1>

            <p class="mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.
              Cras porttitor metus vel lorem finibus convallis. Duis viverra lectus vel orci sollicitudin, eget dignissim tellus feugiat.
            </p>
            <p class="mb-4">
              Praesent euismod magna at purus cursus, eu faucibus justo semper. Mauris eu tellus blandit, convallis erat ac, fermentum sem.
              Maecenas vitae dui vel nibh aliquam fringilla non ac velit. Morbi gravida ante non volutpat commodo.
            </p>
            <p class="mb-4">
              Suspendisse potenti. Curabitur facilisis, urna vel egestas vulputate, tellus nisl viverra risus, in fringilla purus erat at mi.
              Suspendisse potenti. Sed id lorem justo. Cras sed semper enim.
            </p>

            <!-- Clear float untuk memastikan elemen di bawahnya tidak terpengaruh -->
            <div class="clear-both"></div>
          </div>

          <div class="skills">
            <h1 class="text-2xl font-bold my-4">My Skills</h1>
            <ul>
              <li>
                <a href="#">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/225px-HTML5_logo_and_wordmark.svg.png" alt="">
                  <span>HTML 5</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" alt="">
                  <span>Tailwind CSS</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/255px-Vue.js_Logo_2.svg.png" alt="">
                  <span>Vue.js</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Laravel.svg/180px-Laravel.svg.png" alt="">
                  <span>Laravel</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
  @import '@/assets/main.css';

  .skills ul {
    @apply flex flex-col gap-2.5 w-full sm:grid sm:grid-cols-2 sm:gap-2;
  }

  .skills li a {
    @apply flex items-center gap-3 bg-surface/70 dark:bg-dark-surface/80 
    border-gray-300 dark:border-zinc-900 border py-3 px-4 font-medium
    rounded-xl backdrop-blur-2xl ease-in-out duration-300 hover:dark:bg-dark-surface/40 
    hover:dark:border-dark-surface hover:bg-surface/20
    -translate-y-0 hover:-translate-y-[2px];
  }

  .skills li img {
    @apply aspect-square w-[40px];
  }
</style>
