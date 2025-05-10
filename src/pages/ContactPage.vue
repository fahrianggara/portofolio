<script setup>
import { useMeta } from '../composables/meta';
import { useToast } from '../composables/toast';
import { useGreetingStore } from '../stores/greeting';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { replaceText } from '../composables/helpers';
import FormInput from '../components/FormInput.vue';
import Contact from '../models/contact';
import apiClient from '../composables/axios';
import Loading from '../components/icon/Loading.vue';

const toast = useToast();
const greeting = useGreetingStore();
const contact = ref(new Contact());
const loading = ref(false);
const throttleSeconds = ref(0);
let intervalId = null;

const description = "Have a project, idea, or opportunity? Let’s make it happen!";

const submitForm = async () => {
  if (!contact.value.isValid()) return;

  loading.value = true;

  try {
    const trackUser = await apiClient.post('/track-user');
    contact.value.ip_address = trackUser.data.ip;
    contact.value.user_agent = navigator.userAgent;

    const res = await apiClient.post(`api/contact`, contact.value);
    toast.success(res.data.message);
    contact.value.reset();
  } catch (err) {
    const res = err.response;

    if (res.status === 401) {
      toast.error(res.data.message);
    } else if (res.status === 422) {
      contact.value.setErrors(res.data.data);
    } else if (res.status === 429) {
      // Set retry time
      throttleSeconds.value = res.data.data?.retry_after || 60;

      // Clear interval if exists and start new one
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (throttleSeconds.value > 0) {
          throttleSeconds.value--;
        } else {
          clearInterval(intervalId);
        }
      }, 1000);

      toast.error(`Too many requests! Please try again later.`);
    } else {
      console.log(err);
      toast.error("An error occurred. Please try again later.");
    }
  } finally {
    loading.value = false;
  }
};

const socials = computed(() => {
  return greeting.data.socials.filter(social => !social.link.includes("@"));
});

const email = computed(() => {
  return greeting.data.socials.find(social => social.link.includes("@"));
});

const emit = defineEmits(["no-padding"]);

onMounted(() => {
  emit("no-padding", true);
});

onUnmounted(() => {
  emit("no-padding", false);
  clearInterval(intervalId);
});

const dynamicKeywords = [
  email.value ? email.value.link.replace("mailto:", "") : "", 
  ...socials.value.map(social => social.platform)
].join(", ");

useMeta({
  title: 'Contact Me',
  description,
  keywords: `fahri anggara, angga, ${dynamicKeywords}, kontak saya, sosial media, email, komunikasi profesional, kontak fahri anggara, contact fahri anggara`
});
</script>

<template>
  <div class="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-3">
    <div class="contact-box lg:col-span-2 md:col-span-3 sm:col-span-2 col-span-1">
      <h2>Let's Connect!</h2>
      <p>{{ description }}</p>

      <!-- Alert throttle -->
      <div v-if="throttleSeconds > 0" class="alert danger mt-4">
        <p class="text-sm">
          Too many requests! Please try again in 
          <span v-if="throttleSeconds >= 60">{{ Math.floor(throttleSeconds / 60) }} minutes and</span> 
          {{ throttleSeconds % 60 }} seconds.
        </p>
      </div>

      <form class="contact-form grid grid-cols-1 gap-3" @submit.prevent="submitForm" autocomplete="off">
        <FormInput 
          type="text" 
          placeholder="What's your name?" 
          v-model="contact.name" 
          :maxlength="50"
          :minlength="3"
          :error="contact.errors.name" />

        <FormInput 
          type="email" 
          placeholder="What's your email address?" 
          v-model="contact.email" 
          :maxlength="80" 
          :error="contact.errors.email" />

        <FormInput 
          type="text" 
          placeholder="What's the subject?" 
          v-model="contact.subject" 
          :maxlength="100"
          :minlength="3"
          :error="contact.errors.subject" />
        
        <FormInput 
          type="textarea" 
          placeholder="Please write your message here..." 
          v-model="contact.message" 
          :maxlength="1000" 
          :minlength="10"
          :error="contact.errors.message" />

        <button 
          :disabled="throttleSeconds > 0 || loading" 
          type="submit" 
          class="flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
          <Loading v-if="loading" /> 
          <span>{{ loading ? 'Loading...' : 'Send Message' }}</span>
        </button>
      </form>
    </div>

    <div class="contact-info lg:flex lg:flex-col hp:grid hp:grid-cols-2 flex flex-col gap-5">
      <div class="contact-box">
        <h3 class="mb-1">Email</h3>
        <a v-if="email" :href="email.link" target="_blank" rel="noopener noreferrer"> 
          {{ replaceText(email.link, "mailto:", "") }}
        </a>
      </div>

      <div class="contact-box">
        <h3 class="mb-1">Social Media</h3>
        <div class="links">
          <a v-for="(social, i) in socials" :key="i" class="text-primary"
            :href="social.link" target="_blank" rel="noopener noreferrer">
            {{ social.platform }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
