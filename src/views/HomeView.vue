<script setup>

</script>

<template>
  <section class="home dark:bg-dark-background">
    <div class="container-center flex flex-col dark:bg-dark-background w-full mx-auto">
      <div class="relative px-4 sm:px-8 lg:px-0">
        <div class="max-w-4xl mx-auto">
          <img src="https://fahrianggara.my.id/storage/photos/shares/web/angga.jpg" 
            class="w-[90px] h-[90px] md:w-[100px] md:h-[100px] mb-[30px] rounded-2xl" />

          <h1 class="text-3xl md:text-[48px] sm:text-4xl leading-10 
            md:leading-15 sm:leading-12 font-bold dark:text-white mb-4">
            Web/Mobile Developer, UI/UX Designer &amp; Entrepreneur
          </h1>

          <p class="text-lg text-base/8 dark:text-gray-400 text-gray-600">
            I’m Fahri Anggara, a web developer, designer, and entrepreneur from Jakarta. 
            A fresh graduate passionate about web development and design, specializing in PHP, Laravel, 
            Flutter, and Vue, with hands-on project experience.
          </p>

          <ul class="flex flex-wrap md:gap-2 mt-7 gap-y-6 gap-x-2">
            <li>
              <router-link to="/" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary">
                Home
              </router-link>
            </li>
            <li>
              <router-link to="/about" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                About Me
              </router-link>
            </li>
            <li>
              <router-link to="/edu" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                Education
              </router-link>
            </li>
            <li>
              <router-link to="/experience" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                Experience
              </router-link>
            </li>
            <li>
              <router-link to="/project" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                Projects
              </router-link>
            </li>
            <li>
              <router-link to="/resume" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                Resume
              </router-link>
            </li>
            <li>
              <router-link to="/contact" exact-active-class="active" class="link text-primary bg-bg-primary 
                dark:bg-dark-bg-primary dark:text-dark-primary hover:bg-primary hover:text-white">
                Contact
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference "tailwindcss";

  .link {
    @apply ease-in rounded-lg text-[15px] px-[15px] py-[10px];
  }


  .active {
    @apply text-white bg-blue-500;
  }

  ul {
    @apply flex flex-wrap md:gap-2 mt-7 gap-y-2 gap-x-2;
  }

  ul li {
    @apply flex items-center min-w-[50px] transform translate-y-[0px];
    transition: ease-in 0.1s;
  }

  li:hover {
    transform: translateY(-4px);
  }

  /* .link {
    @apply ease-in-out rounded-lg text-[16px];
  }

  .link:not(.active) {
    @apply hover:text-blue-500 hover:underline italic;
  }

  .link.active {
    @apply text-blue-500 before:content-['🚀'] before:mr-[3px];
  } */
</style>