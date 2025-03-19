<script setup>
import { defineProps, defineEmits, computed } from 'vue';

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
    <input v-if="type === 'text' || type === 'number' || type === 'email' || type === 'password'"
      :type="type" :value="modelValue" :placeholder="placeholder"
      @input="emit('update:modelValue', $event.target.value)"
      :maxlength="maxlength" class="w-full p-2 border rounded-md"
      :class="{ 'is-invalid': errorMessage }"
    />

    <!-- Textarea -->
    <textarea v-else-if="type === 'textarea'"
      :value="modelValue" :placeholder="placeholder" :maxlength="maxlength"
      @input="emit('update:modelValue', $event.target.value)"
      rows="3" class="w-full p-2 border rounded-md resize-none"
      :class="{ 'is-invalid': errorMessage }"></textarea>

    <!-- Select -->
    <select v-else-if="type === 'select'"
      :value="modelValue" @change="emit('update:modelValue', $event.target.value)"
      class="w-full p-2 border rounded-md" :class="{ 'is-invalid': errorMessage }">
      
      <option value="" disabled selected>Pilih...</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Error Message -->
    <p v-if="errorMessage" :class="{
      'mt-1': type === 'textarea',
      'mt-2': type !== 'textarea'
    }" class="text-[13.5px] text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>

</style>