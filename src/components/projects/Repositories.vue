<script setup>

</script>

<template>
  <h1 class="text-lg font-medium mb-4 mt-6">My Repositories</h1>
  <ol class="repos">
    <li v-for="repo in [1, 2, 3, 4]" :key="repo">
      <a href="#" class="">
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
          <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
        </svg>

        <div class="content">
          <h3 class="text-[16px] font-semibold mb-1">Repository Name</h3>
          <p class="text-base/relaxed text-[15px] text-gray-600 dark:text-gray-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
          </p>
        </div>
      </a>
    </li>
  </ol>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .repos {
    @apply grid sm:grid-cols-2 grid-cols-1 gap-4;
  }

  .repos li {
    @apply relative p-4 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-2xl 
    border border-solid dark:border-zinc-900 border-gray-300 ease-in-out duration-300 
    transform hover:-translate-y-[2px] dark:hover:bg-dark-surface/80 hover:bg-white/70 ;
  }

  .repos svg {
    @apply w-6 h-6 fill-primary mb-3;
  }
</style>