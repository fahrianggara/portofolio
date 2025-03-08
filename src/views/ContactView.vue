<script setup>
import { onMounted, ref } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import apiService from "@/utils/apiService";
import Contact from "@/models/contact";
import { useToast } from "@/utils/useToast";

const toast = useToast();
const contact = ref(new Contact());
const loading = ref(false);
const { resizeScreen } = useScreenSize();

const submitForm = async () => {
  loading.value = true;

  try {
    const response = await apiService.post("/contact", contact.value);
    toast.success(response.message);
    contact.value.reset();
  } catch (err) {
    if (err.response.status === 401) {
      toast.error(err.response.data.message);
    } else if (err.response.status === 422) {
      contact.value.setErrors(err.response.data.data);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  } finally {
    loading.value = false;
  }
}
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
              <h1>Let's Talk</h1>
              <p>Fill out the form below and we'll get back to you as soon as possible.</p>
              <form class="contact-form" @submit.prevent="submitForm" autocomplete="off">
                <div class="grid grid-cols-1 gap-3">
                  <div class="mb-2">
                    <input type="text" v-model="contact.name" placeholder="What's your name?" 
                      :class="{ 'is-invalid': contact.errors.name }" />
                    <p v-if="contact.errors.name" class="text-[13.5px] mt-2 text-red-500">
                      {{ contact.errors.name[0] }}
                    </p>
                  </div>

                  <div class="mb-2">
                    <input type="email" v-model="contact.email" placeholder="What's your email address?" 
                      :class="{ 'is-invalid': contact.errors.email }" />
                    <p v-if="contact.errors.email" class="text-[13.5px] mt-2 text-red-500">
                      {{ contact.errors.email[0] }}
                    </p>
                  </div>

                  <div class="mb-2">
                    <input type="text" v-model="contact.subject" placeholder="What's the subject?" 
                      :class="{ 'is-invalid': contact.errors.subject }" />
                    <p v-if="contact.errors.subject" class="text-[13.5px] mt-2 text-red-500">
                      {{ contact.errors.subject[0] }}
                    </p>
                  </div>

                  <div class="mb-2">
                    <textarea v-model="contact.message" placeholder="Please write your message here..." 
                    :class="{ 'is-invalid': contact.errors.message }" rows="3"></textarea>
                    <p v-if="contact.errors.message" class="text-[13.5px] mt-2 text-red-500">
                      {{ contact.errors.message[0] }}
                    </p>
                  </div>

                  <div>
                    <button v-if="loading" disabled type="button" class="">
                      <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-2 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
                      </svg>
                      Loading...
                    </button>

                    <button v-else type="submit">
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
                <div class="flex flex-row flex-wrap gap-x-1 gap-y-0 mt-1 links">
                  <a href="https://www.linkedin.com/in/fahrianggara" target="_blank" class="text-primary">LinkedIn</a>
                  <a href="https://www.github.com/fahrianggara" target="_blank" class="text-primary">GitHub</a>
                  <a href="https://www.instagram.com/fahrianqqara" target="_blank" class="text-primary">Instagram</a>
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
    placeholder:font-normal placeholder:text-gray-600 dark:placeholder-gray-400;
  }

  .contact-form input.is-invalid, .contact-form textarea.is-invalid {
    @apply border-red-500 ring-0 ring-red-500/50 dark:placeholder:placeholder-gray-400 
    placeholder:text-gray-600 focus:border-red-500 focus:ring-3;
  }

  .contact-form button {
    @apply w-full px-4 py-3 
    dark:bg-dark-bg-primary text-primary bg-bg-primary 
    rounded-lg text-[14px] font-medium cursor-pointer ease-in-out transition-all duration-300
    hover:bg-primary hover:text-bg-primary;
  }

  .contact-form button:disabled {
    @apply text-white cursor-not-allowed bg-primary;
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
    .contact-form input, .contact-form textarea {
      @apply dark:bg-dark-surface/50 backdrop-blur-2xl bg-white/70 py-[13px] 
      placeholder:text-gray-600 dark:placeholder:text-gray-400;
    }

    .contact-form [type="submit"] {
      @apply py-[15px] text-[13px] bg-primary text-white;
    }

    .contact-info {
      @apply gap-4 overflow-hidden;
    }

    .contact-wrapper {
      @apply flex flex-col-reverse;
    }

    .contact-info .contact-box h1 {
      @apply text-[18px] mb-1.5;
    }

    .contact-info .contact-box .links {
      @apply gap-x-4;
    }
  }
</style>
