<script setup>
import Toast from './Toast.vue';
import { useToast } from '../composables/toast';

const { toasts, remove } = useToast();
const handleClose = (id) => remove(id);
</script>

<template>
  <div class="toast-container">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :message="toast.message"
      :duration="toast.duration"
      :auto-close="toast.autoClose"
      @close="handleClose(toast.id)"
    />
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.toast-container {
  @apply fixed bottom-0 right-4 z-[10000] flex flex-col items-end;
  pointer-events: none;
}

.toast-container > * {
  pointer-events: auto;
}
</style>