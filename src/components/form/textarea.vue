<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  modelValue: String,
  placeholder: String,
  error: Array, // Menggunakan array untuk error
  rows: {
    type: Number,
    default: 3
  }
});

const emit = defineEmits(['update:modelValue']);

const errorMessage = computed(() => (props.error?.[0] ? props.error[0] : ''));
</script>

<template>
  <div class="mb-2">
    <textarea
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="{ 'is-invalid': errorMessage }"
      class="w-full p-2 border rounded-md"
      :rows="rows"
    ></textarea>
    <p v-if="errorMessage" class="text-[13.5px] mt-2 text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
