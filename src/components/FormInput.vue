<script setup>
import { defineProps, defineEmits, computed, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  type: { 
    type: String, 
    default: 'text',
  },
  placeholder: String,
  error: Array, // Menyimpan pesan error
  maxlength: Number,
  minlength: Number,
  options: Array, // Untuk select: [{ value: '1', label: 'Option 1' }]
});

const emit = defineEmits(['update:modelValue']);
const errorMessage = computed(() => (props.error?.[0] ? props.error[0] : ''));
const charCount = computed(() => props.modelValue?.length || 0);
const isBelowMin = computed(() => props.minlength && charCount.value < props.minlength);

// Fungsi untuk memotong input berdasarkan maxlength
const truncateValue = (value) => {
  if (!props.maxlength || !value) return value;
  return String(value).slice(0, props.maxlength);
};

// Handle input dengan memastikan tidak melebihi maxlength
const handleInput = (event) => {
  const value = event.target.value;
  const truncatedValue = truncateValue(value);
  
  // Jika nilai sudah terpotong, update nilai di input
  if (value !== truncatedValue) {
    event.target.value = truncatedValue;
  }
  
  emit('update:modelValue', truncatedValue);
};

// Watch untuk memastikan modelValue tidak melebihi maxlength
watch(() => props.modelValue, (newValue) => {
  if (newValue) {
    const truncatedValue = truncateValue(newValue);
    if (truncatedValue !== newValue) {
      emit('update:modelValue', truncatedValue);
    }
  }
}, { immediate: true });
</script>

<template>
  <div class="mb-2">
    <!-- Counter -->
    <p v-if="maxlength" class="text-xs text-gray-500 mb-1 float-right">
      <template v-if="minlength">
        {{ charCount }}/{{ minlength || 0 }} - {{ maxlength }}
      </template>
      <template v-else>
        {{ charCount }} - {{ maxlength }}
      </template>
    </p>

    <!-- Input -->
    <input v-if="['text', 'email'].includes(type)"
      :type="type" :value="modelValue" :placeholder="placeholder"
      @input="handleInput"
      :maxlength="maxlength" class="w-full p-2 border rounded-md"
      :class="{ 'is-invalid': errorMessage }"
    />

    <!-- Textarea -->
    <textarea v-else-if="type === 'textarea'"
      :value="modelValue" :placeholder="placeholder" :maxlength="maxlength"
      @input="handleInput"
      rows="3" class="w-full p-2 border rounded-md resize-none"
      :class="{ 'is-invalid': errorMessage }"></textarea>

    <!-- Error Message -->
    <p v-if="errorMessage" :class="{
      'mt-1': type === 'textarea',
      'mt-2': type !== 'textarea'
    }" class="text-[13.5px] text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>