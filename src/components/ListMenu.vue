<script setup>
import { useIsDesktop } from "../composables/screen";
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useConfigStore } from "../stores/configuration";

const route = useRoute();
const isDesktop = useIsDesktop();
const config = useConfigStore();
const downloadCV = () => config.downloadCV();

const props = defineProps({
  extraClass: {
    type: String,
    default: "",
  },
  showIcon: {
    type: Boolean,
    default: true,
  },
  hideResume: {
    type: Boolean,
    default: false,
  },
  downloadCV: Function,
});

const showResume = computed(() => {
  return route.path !== "/" && !isDesktop.value && !props.hideResume;
});
</script>

<template>
  <ul>
    <li>
      <router-link :to="{ name: 'home' }" exact-active-class="active">
        <i class="fi fi-rr-house-chimney" v-if="showIcon"></i>
        <span>Home</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'about' }" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-user" v-if="showIcon"></i>
        <span>About Me</span>
      </router-link>
    </li>
    <li>
      <router-link :to="{ name: 'education' }" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-graduation-cap" v-if="showIcon"></i>
        <span>Education</span>
      </router-link>
    </li>
    <li v-if="showResume">
      <a href="javascript:void(0)" @click="downloadCV">
        <i class="fi fi-rr-file" v-if="showIcon"></i>
        <span>Resume</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>