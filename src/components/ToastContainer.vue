<!-- ToastContainer.vue -->
<script setup>
import { useToast } from '@/utils/useToast';
import ToastComponent from '@/components/Toast.vue';

const { toasts, remove } = useToast();

const handleClose = (id) => {
  remove(id);
};
</script>

<template>
  <div class="toast-container">
    <ToastComponent
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
@reference 'tailwindcss';

.toast-container {
  @apply fixed bottom-0 right-4 z-[10000] flex flex-col items-end;
}
</style>