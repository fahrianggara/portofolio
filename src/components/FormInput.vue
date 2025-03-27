<script setup>
import { defineProps, defineEmits, computed, watch, ref, onMounted, nextTick } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  type: { 
    type: String, 
    default: 'text',
  },
  placeholder: String,
  error: Array,
  maxlength: Number,
  minlength: Number,
  options: Array, 
});

const emit = defineEmits(['update:modelValue']);
const errorMessage = computed(() => (props.error?.[0] ? props.error[0] : ''));
const charCount = computed(() => props.modelValue?.length || 0);
const textareaRef = ref(null);

const defaultHeight = '48px'; 
const maxHeight = '200px'; 

const truncateValue = (value) => {
  if (!props.maxlength || !value) return value;
  return String(value).slice(0, props.maxlength);
};

const adjustHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = defaultHeight; // **Trigger default height dulu**
    
    nextTick(() => { 
      let newHeight = textareaRef.value.scrollHeight;
    
      if (newHeight > parseInt(maxHeight)) {
        textareaRef.value.style.height = maxHeight;
        textareaRef.value.style.overflowY = 'auto'; 
        textareaRef.value.setAttribute('data-lenis-prevent', ''); 
      } else {
        textareaRef.value.style.height = `${newHeight}px`;
        textareaRef.value.style.overflowY = 'hidden'; 
        textareaRef.value.removeAttribute('data-lenis-prevent');
      }
    });
  }
};

const handleInput = (event) => {
  const value = event.target.value;
  const truncatedValue = truncateValue(value);
  
  if (value !== truncatedValue) {
    event.target.value = truncatedValue;
  }

  emit('update:modelValue', truncatedValue);
  adjustHeight(); 
};

watch(() => props.modelValue, (value) => {
  if (value) {
    const truncatedValue = truncateValue(value);
    if (truncatedValue !== value) {
      emit('update:modelValue', truncatedValue);
    }
  }
  adjustHeight(); 
}, { immediate: true });

onMounted(() => {
  nextTick(() => {
    adjustHeight(); // **Trigger awal setelah render**
  });
});
</script>

<template>
  <div class="mb-2">
    <p v-if="maxlength" class="text-xs text-gray-500 mb-1 float-right">
      <template v-if="minlength">
        {{ charCount }}/{{ minlength || 0 }} - {{ maxlength }}
      </template>
      <template v-else>
        {{ charCount }} - {{ maxlength }}
      </template>
    </p>

    <input v-if="['text', 'email'].includes(type)"
      :type="type" :value="modelValue" :placeholder="placeholder"
      @input="handleInput"
      :maxlength="maxlength" class="w-full p-2 border rounded-md"
      :class="{ 'is-invalid': errorMessage }"
    />

    <textarea v-else-if="type === 'textarea'"
      ref="textareaRef"
      :value="modelValue" :placeholder="placeholder" :maxlength="maxlength"
      @input="handleInput"
      rows="1"
      class="w-full p-2 border rounded-md resize-none overflow-hidden"
      :class="{ 'is-invalid': errorMessage }"></textarea>

    <p v-if="errorMessage" :class="{
      'mt-1': type === 'textarea',
      'mt-2': type !== 'textarea'
    }" class="text-[13.5px] text-red-500">
      {{ errorMessage }}
    </p>
  </div>
</template>
