<script setup>

</script>

<template>
  <ul>
    <li>
      <router-link to="/" exact-active-class="active">
        <i class="fi fi-rr-house-chimney"></i>
        <span>Home</span>
      </router-link>
    </li>
    <li>
      <router-link to="/about" exact-active-class="active">
        <i class="fi fi-rr-info"></i>
        <span>About Me</span>
      </router-link>
    </li>
    <li>
      <router-link to="/edu" exact-active-class="active">
        <i class="fi fi-rr-graduation-cap"></i>
        <span>Education</span>
      </router-link>
    </li>
    <li>
      <router-link to="/experience" exact-active-class="active">
        <i class="fi fi-rr-flask-potion"></i>
        <span>Experience</span>
      </router-link>
    </li>
    <li>
      <router-link to="/projects" exact-active-class="active">
        <i class="fi fi-rr-workflow-alt"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li>
      <router-link to="/contact" exact-active-class="active">
        <i class="fi fi-rr-envelope"></i>
        <span>Contact</span>
      </router-link>
    </li>
    <li>
      <router-link to="/activity" exact-active-class="active">
        <i class="fi fi-rr-chart-pie-alt"></i>
        <span>My Activity</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>
  @reference "tailwindcss";
  @import "@/assets/main.css";

  ul {
    @apply flex flex-col gap-1.5;
  }

  li:first-child a {
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  li:last-child a {
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
  }

  li a {
    @apply flex items-center px-[15px] py-[12px] gap-4 bg-surface/50 dark:bg-dark-background2/50 backdrop-blur-lg rounded-[4px]
    border border-gray-300 dark:border-zinc-900 font-medium text-[15px];
    transform: translateX(0);
    transition: ease-in-out 0.1s;
  }

  li a:not(.active):hover {
    transform: translateX(-5px);
    @apply hover:bg-bg-primary hover:text-primary border-bg-primary dark:hover:bg-dark-bg-primary 
      dark:hover:text-dark-primary dark:border-dark-bg-primary;
  }

  li i {
    @apply text-[20px] mt-[4px];
  }

  .active {
    @apply bg-primary dark:bg-dark-primary text-white;
  }
</style>