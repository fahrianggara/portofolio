<script setup>
  import { useRoute } from "vue-router";
  import { useScreenSize } from "@/utils/screenResize.js";
  import { computed } from "vue";

  const props = defineProps({
    extraClass: {
      type: String,
      default: 'font-inter',
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

  const { resizeScreen } = useScreenSize();
  const route = useRoute();

  // Fungsi untuk mengecek apakah menu aktif berdasarkan route path
  const isActiveMenu = (routePath) => {
    return route.path.startsWith(routePath);
  };

  // Menyembunyikan menu resume jika props hideResume bernilai true
  const showResume = computed(() => {
    if (route.path !== "/") {
      return props.hideResume ? false : resizeScreen.value;
    }
    return false;
  });
</script>

<template>
  <ul :class="extraClass">
    <li>
      <router-link to="/" exact-active-class="active">
        <i class="fi fi-rr-house-chimney" v-if="showIcon"></i>
        <span>Home</span>
      </router-link>
    </li>
    <li>
      <router-link to="/about" :class="{ active: isActiveMenu('/about') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-user" v-if="showIcon"></i>
        <span>About Me</span>
      </router-link>
    </li>
    <li>
      <router-link to="/edu" :class="{ active: isActiveMenu('/edu') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-graduation-cap" v-if="showIcon"></i>
        <span>Education</span>
      </router-link>
    </li>
    <li>
      <router-link to="/experience" :class="{ active: isActiveMenu('/experience') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-briefcase" v-if="showIcon"></i>
        <span>Experience</span>
      </router-link>
    </li>
    <li>
      <router-link to="/projects" :class="{ active: isActiveMenu('/projects') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-flask-potion" v-if="showIcon"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li>
      <router-link to="/contact" :class="{ active: isActiveMenu('/contact') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-paper-plane" v-if="showIcon"></i>
        <span>Contact</span>
      </router-link>
    </li>
    <li>
      <router-link to="/activity" :class="{ active: isActiveMenu('/activity') }" @click="$emit('close-menu')">
        <i class="fi fi-rr-time-fast" v-if="showIcon"></i>
        <span>Activity</span>
      </router-link>
    </li>
    
    <li v-if="showResume">
      <a href="#" :class="{ active: isActiveMenu('/resume') }" @click="downloadCV">
        <i class="fi fi-rr-file" v-if="showIcon"></i>
        <span>Download CV</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>