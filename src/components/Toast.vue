<!-- ToastComponent.vue -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import CheckIcon from './icon/Check.vue';
import CloseIcon from './icon/Close.vue';
import ErrorIcon from './icon/Error.vue';
import InfoIcon from './icon/Info.vue';
import WarningIcon from './icon/Warning.vue';

const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator: (value) => ['success', 'info', 'warning', 'error'].includes(value)
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 4000 // durasi dalam milidetik
  },
  autoClose: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['close']);

const isVisible = ref(true);
const isLeaving = ref(false);
let timer = null;
let autoCloseTimer = null;

const getIcon = () => {
  switch (props.type) {
    case 'success':
      return CheckIcon;
    case 'info':
      return InfoIcon;
    case 'warning':
      return WarningIcon;
    case 'error':
      return ErrorIcon;
    default:
      return InfoIcon;
  }
};

const close = () => {
  if (isLeaving.value) return; // Hindari double trigger

  isLeaving.value = true;

  // Tunggu sampai animasi selesai baru benar-benar hapus toast
  setTimeout(() => {
    isVisible.value = false;
    emit('close');
  }, 600); // Sesuai dengan durasi animasi keluar
};

onMounted(() => {
  if (props.autoClose && props.duration > 0) {
    timer = setTimeout(() => {
      close();
    }, props.duration - 600); // Tambahkan delay sebelum animasi keluar dimulai
  }
});
</script>

<template>
  <div v-if="isVisible" 
    :class="['toast', props.type, isLeaving ? 'toast-leaving' : '']" 
    role="alert">
    <div class="icon">
      <component :is="getIcon()" />
    </div>
    <div class="text">{{ props.message }}</div>
    <button type="button" aria-label="Close" @click="close">
      <span class="sr-only">Close</span>
      <CloseIcon />
    </button>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.toast {
  @apply flex items-start w-full max-w-[330px] p-4 mb-4 rounded-xl text-gray-600 dark:text-gray-400 
  bg-white/100 dark:bg-dark-surface/100 border border-solid border-gray-300 dark:border-zinc-900;

  /* Properti animasi */
  transform: translateX(0);
  opacity: 1;

  /* Efek masuk (debounce) */
  animation: toast-bounce-from-right 0.6s ease forwards;
}

.toast.toast-leaving {
  /* Efek keluar dengan debounce */
  animation: toast-bounce-to-right 0.6s ease forwards;
}

/* Animasi saat toast muncul */
@keyframes toast-bounce-from-right {
  0% {
    transform: translateX(120%);
    opacity: 0;
  }

  60% {
    transform: translateX(-5%);
    opacity: 1;
  }

  80% {
    transform: translateX(3%);
  }

  100% {
    transform: translateX(0);
  }
}

/* Animasi saat toast keluar (dengan debounce ke kanan) */
@keyframes toast-bounce-to-right {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  20% {
    transform: translateX(-5%);
    opacity: 1;
  }

  40% {
    transform: translateX(3%);
    opacity: 0.9;
  }

  100% {
    transform: translateX(120%);
    opacity: 0;
  }
}

.toast button {
  @apply ms-auto -mx-0.5 p-1.5 inline-flex items-center justify-center h-8 w-8 cursor-pointer;
}

.icon {
  @apply inline-flex items-center justify-center shrink-0 w-8 h-8 rounded-lg;
}

.toast.success .icon {
  @apply text-green-500 bg-green-100 dark:bg-green-800 dark:text-green-200;
}

.toast.info .icon {
  @apply text-blue-500 bg-blue-100 dark:bg-blue-800 dark:text-blue-200;
}

.toast.warning .icon {
  @apply text-yellow-500 bg-yellow-100 dark:bg-yellow-800 dark:text-yellow-200;
}

.toast.error .icon {
  @apply text-red-500 bg-red-100 dark:bg-red-800 dark:text-red-200;
}

.text {
  @apply ms-3 text-sm font-normal my-auto font-inter dark:text-gray-300 text-gray-600;
}
</style>