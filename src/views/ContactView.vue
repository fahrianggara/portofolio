<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";

  const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white mb-3 hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-5.5">
          <div class="contact-wrapper">
            <div class="contact-box lg:col-span-2 md:col-span-3 sm:col-span-full col-span-1">
              <h1>What's Next?</h1>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              <form class="contact-form" autocomplete="off">
                <div class="grid grid-cols-1 gap-3 ">
                  <div>
                    <input type="text" id="name" name="name" placeholder="Enter your full name"
                    class="is-invalid" />
                    <p class="text-red-500 text-[13px] mt-2">This field is required</p>
                  </div>
                  <div>
                    <input type="email" id="email" name="email" placeholder="Enter your valid email" />
                  </div>
                  <div>
                    <input type="text" id="subject" name="subject" placeholder="Enter your valid subject" />
                  </div>
                  <div>
                    <textarea id="message" name="message" placeholder="Enter your message" rows="3"></textarea>
                  </div>
                  <div>
                    <button type="submit" >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div class="contact-info w-full sm:col-span-3 lg:col-span-1">
              <div class="contact-box">
                <h1 class="mb-1">Email</h1>
                <a href="mailto:fahriangga30@gmail.com" class="">
                  fahriangga30@gmail.com
                </a>
              </div>
              <div class="contact-box">
                <h1>Social Media</h1>
                <div class="flex flex-row flex-wrap gap-x-1 gap-y-0 mt-1">
                  <a href="https://www.linkedin.com/in/fahrianggara" target="_blank" class="text-primary">LinkedIn</a>
                  <a href="https://www.github.com/fahrianggara" target="_blank" class="text-primary">GitHub</a>
                  <a href="https://www.instagram.com/fahrianggara" target="_blank" class="text-primary">Instagram</a>
                </div>
              </div>
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

  .contact-wrapper {
    @apply grid sm:grid-cols-3 gap-6;
  }

  .contact-box {
    @apply dark:bg-dark-surface/60 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300 bg-white/60
    px-5 py-4 rounded-xl;
  }

  .contact-box > h1 {
    @apply text-[18px] dark:text-white text-gray-900 font-semibold mt-1;
  }

  .contact-box > p {
    @apply text-[15px] leading-6 dark:text-gray-500 text-gray-600 mt-1.5;
  }
  
  .contact-form {
    @apply mt-5 mb-2;
  }

  .contact-form input, .contact-form textarea {
    @apply w-full px-4 py-2.5 border border-solid dark:border-zinc-900 border-gray-300 rounded-lg
    text-[15px] dark:text-white text-gray-900 dark:bg-dark-surface/90 backdrop-blur-2xl bg-white
    focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/30 focus:shadow-md placeholder:text-[14px] 
    placeholder:font-normal placeholder:text-gray-600 dark:placeholder-gray-500;
  }

  .contact-form input.is-invalid, .contact-form textarea.is-invalid {
    @apply border-red-500 ring-2 ring-red-500/50 text-red-600 placeholder-red-500;
  }

  .contact-form [type="submit"] {
    @apply w-full px-4 py-3 
    dark:bg-dark-bg-primary text-primary bg-bg-primary 
    rounded-lg text-[14px] font-medium cursor-pointer ease-in-out transition-all duration-300
    hover:bg-primary hover:text-bg-primary;
  }

  .contact-info {
    @apply lg:flex lg:flex-col gap-5 grid md:grid-cols-2 grid-cols-1;
  }

  .contact-info .contact-box {
    @apply dark:bg-dark-surface/60 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300 bg-white/60
    px-5 py-3 rounded-xl;
  }

  .contact-info .contact-box h1 {
    @apply text-[15px] dark:text-white text-gray-900 font-semibold mt-1;
  }

  .contact-info .contact-box p,
  .contact-info .contact-box a {
    @apply text-[15px] leading-6 dark:text-gray-500 text-gray-600 mt-0.5 mb-1
    md:text-[13px];
  }

  .contact-info .contact-box a {
    @apply text-primary hover:underline p-0 m-0;
  }

  @media (max-width: 499.99px) {
    .contact-box {
      @apply bg-transparent border-none backdrop-blur-none p-0;
    }

    .contact-form input, .contact-form textarea {
      @apply dark:bg-dark-surface/50 backdrop-blur-2xl bg-white/70 py-[13px] placeholder:text-gray-950 dark:placeholder-white;
    }

    .contact-form [type="submit"] {
      @apply py-[14px] text-[13px];
    }

    .contact-info {
      @apply gap-0 overflow-hidden;
    }

    .contact-wrapper {
      @apply flex flex-col-reverse;
    }

    .contact-info .contact-box {
      @apply rounded-none;
    }

    .contact-info .contact-box:first-child {
      border-bottom: none;
      border-top-left-radius: 24px;
      border-top-right-radius: 24px;
    }

    .contact-info .contact-box:last-child {
      border-bottom-left-radius: 24px;
      border-bottom-right-radius: 24px;
    }
  }
</style>
