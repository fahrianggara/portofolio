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
        <template class="links">
          <a v-for="(social, i) in socials" :key="i" class="text-primary"
            :href="social.link" target="_blank" rel="noopener noreferrer">
            {{ social.platform }}
          </a>
        </template>
      </div>
    </div>

  </div>
</template>

<style>
@import '../assets/style.css';

.contact-box {
	@apply dark:bg-dark-surface/60
  border border-solid dark:border-zinc-900 border-gray-300 bg-white/60
  px-5 py-4 hp:rounded-xl rounded-none;
}

.contact-box > h1 {
	@apply md:text-[18px] text-[15px] dark:text-white text-gray-900 font-semibold mt-1;
}

.contact-box > p {
	@apply text-[15px] leading-6 dark:text-gray-400 text-gray-700 mt-1.5;
}

.contact-form {
	@apply mt-4 mb-2;
}

.contact-form input,
.contact-form textarea {
	@apply w-full px-4 py-2.5 border border-solid dark:border-zinc-900 border-gray-300 rounded-lg
  text-[15px] dark:text-white text-gray-900 dark:bg-dark-surface/90 backdrop-blur-2xl bg-white
  focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/30 focus:shadow-md placeholder:text-[14px] 
  placeholder:font-normal placeholder:text-gray-600 dark:placeholder-gray-400;
}

.contact-form input.is-invalid,
.contact-form textarea.is-invalid {
	@apply border-red-500 ring-0 ring-red-500/50 dark:placeholder-gray-400 
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

.contact-info .contact-box {
	@apply dark:bg-dark-surface/60
  border border-solid dark:border-zinc-900 border-gray-300 bg-white/60
  px-5 py-3 hp:rounded-xl rounded-none h-auto w-auto;
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
	@apply text-primary hover:underline p-0 m-0 break-all;
}

.contact-info .contact-box .links {
	@apply flex flex-row flex-wrap gap-x-1 gap-y-0 mt-1;
}

@media (max-width: 500px) {
	.contact-form input,
	.contact-form textarea {
	@apply dark:bg-dark-surface/50 bg-white/70 py-[13px] 
  placeholder:text-gray-600 dark:placeholder:text-gray-400;
	}

	.contact-form [type="submit"] {
		@apply py-[15px] text-[13px];
	}

	.contact-info {
		@apply gap-4 overflow-hidden;
	}

	.contact-info .contact-box .links {
		@apply gap-x-4;
	}
}
</style>