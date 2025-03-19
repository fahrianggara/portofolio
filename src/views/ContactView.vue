<script setup>
import { computed, onMounted, ref } from "vue";
import { useScreenSize } from "@/utils/screenResize.js";
import { useToast } from "@/utils/useToast";
import { useHomeStore } from "@/stores/home";
import { replaceText } from "@/utils/helpers";
import Sidebar from "@/components/Sidebar.vue";
import Contact from "@/models/contact";
import apiClient from "@/utils/axios";
import FormInput from "@/components/FormInput.vue";

const toast = useToast();
const homeStore = useHomeStore();
const contact = ref(new Contact());
const loading = ref(false);
const { resizeScreen } = useScreenSize();

const submitForm = async () => {
  loading.value = true;

  try {
    const response = await apiClient.post(`api/contact`, contact.value);
    toast.success(response.data.message);
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

onMounted(() => {
  homeStore.getGreeting();
});

const socials = computed(() => {
  return homeStore.greeting.socials.filter(social => !social.link.includes("@"));
});

const email = computed(() => {
  return homeStore.greeting.socials.find(social => social.link.includes("@"));
});
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
              <h1>Let's Connect!</h1>
              <p>
                Have a project, idea, or opportunity? Let’s make it happen!
              </p>
              <form class="contact-form" @submit.prevent="submitForm" autocomplete="off">
                <div class="grid grid-cols-1 gap-3">

                  <FormInput v-model="contact.name" type="text" :maxlength="50"
                    placeholder="What's your name?" :error="contact.errors.name" />
                  <FormInput v-model="contact.email" type="email" :maxlength="80" 
                    placeholder="What's your email address?" :error="contact.errors.email" />
                  <FormInput v-model="contact.subject" type="text" :maxlength="100" 
                    placeholder="What's the subject?" :error="contact.errors.subject" />
                  <FormInput v-model="contact.message" type="textarea" :maxlength="1000" :minlength="10"
                    placeholder="Please write your message here..." :error="contact.errors.message" />

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
                <div v-if="homeStore.loading" class="animate-pulse md:w-full w-[200px] h-1.5 bg-gray-400 
                  dark:bg-zinc-800 rounded-lg mt-3"></div>

                  <template v-else>
                    <a v-if="email" :href="email.link" target="_blank" rel="noopener noreferrer"> 
                      {{ replaceText(email.link, "mailto:", "") }}
                    </a>
                  </template>
              </div>

              <div class="contact-box">
                <h1>Social Media</h1>

                <div v-if="homeStore.loading">
                  <div class="animate-pulse flex flex-row flex-wrap gap-x-1 gap-y-2 mt-3">
                    <div class="w-12 h-1.5 bg-gray-400 dark:bg-zinc-800 rounded-full"></div>
                    <div class="w-12 h-1.5 bg-gray-400 dark:bg-zinc-800 rounded-full"></div>
                    <div class="w-12 h-1.5 bg-gray-400 dark:bg-zinc-800 rounded-full"></div>
                  </div>
                </div>

                <div class="links" v-else>
                  <a v-for="(social, index) in socials" :key="index" class="text-primary"
                    :href="social.link" target="_blank" rel="noopener noreferrer">
                    {{ social.platform }}
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>
