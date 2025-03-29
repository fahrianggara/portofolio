<script setup>
import { useMeta } from '../composables/meta';
import { useToast } from '../composables/toast';
import { useGreetingStore } from '../stores/greeting';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import FormInput from '../components/FormInput.vue';
import Contact from '../models/contact';
import apiClient from '../composables/axios';
import Loading from '../components/icon/Loading.vue';
import { replaceText } from '../composables/helpers';

const toast = useToast();
const greeting = useGreetingStore();
const contact = ref(new Contact());
const loading = ref(false);
const description = "Have a project, idea, or opportunity? Let’s make it happen!";

const submitForm = async () => {
  loading.value = true;

  try {
    const res = await apiClient.post(`api/contact`, contact.value);
    toast.success(res.data.message);
    contact.value.reset();
  } catch (err) {
    const res = err.response;
    if (res.status === 401) {
      toast.error(res.data.message);
    } else if (res.status === 422) {
      contact.value.setErrors(res.data.data);
    } else {
      toast.error("An error occurred. Please try again later.");
    }
  } finally {
    loading.value = false;
  }
}

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
});

useMeta("Contact Me", description);
</script>

<template>
  <div class="flex flex-col-reverse gap-5 lg:grid lg:grid-cols-3">
    <div class="contact-box lg:col-span-2 md:col-span-3 sm:col-span-2 col-span-1">
      <h1>Let's Connect!</h1>
      <p>{{ description }}</p>

      <form class="contact-form grid grid-cols-1 gap-3" @submit.prevent="submitForm" autocomplete="off">
        <FormInput v-model="contact.name" type="text" :maxlength="50"
          placeholder="What's your name?" :error="contact.errors.name" />
        <FormInput v-model="contact.email" type="email" :maxlength="80" 
          placeholder="What's your email address?" :error="contact.errors.email" />
        <FormInput v-model="contact.subject" type="text" :maxlength="100" 
          placeholder="What's the subject?" :error="contact.errors.subject" />
        <FormInput v-model="contact.message" type="textarea" :maxlength="1000" :minlength="10"
          placeholder="Please write your message here..." :error="contact.errors.message" />

        <button v-if="loading" disabled type="button" class="">
          <Loading /> Loading...
        </button>

        <button v-else type="submit">
          Send Message
        </button>
      </form>
    </div>

    <div class="contact-info lg:flex lg:flex-col hp:grid hp:grid-cols-2 flex flex-col gap-5">
      <div class="contact-box">
        <h1 class="mb-1">Email</h1>
        <a v-if="email" :href="email.link" target="_blank" rel="noopener noreferrer"> 
          {{ replaceText(email.link, "mailto:", "") }}
        </a>
      </div>

      <div class="contact-box">
        <h1 class="mb-1">Social Media</h1>
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