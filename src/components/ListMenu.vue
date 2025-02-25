<script setup>
  defineProps({
    extraClass: {
      type: String,
      default: 'font-inter',
    },
  });

  import { useScreenSize } from "@/composables/screenResize.js";
  const { resizeScreen } = useScreenSize();
</script>

<template>
  <ul :class="extraClass">
    <li>
      <router-link to="/" exact-active-class="active">
        <i class="fi fi-rr-house-chimney"></i>
        <span>Home</span>
      </router-link>
    </li>
    <li>
      <router-link to="/about" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-info"></i>
        <span>About Me</span>
      </router-link>
    </li>
    <li>
      <router-link to="/edu" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-graduation-cap"></i>
        <span>Education</span>
      </router-link>
    </li>
    <li>
      <router-link to="/experience" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-flask-potion"></i>
        <span>Experience</span>
      </router-link>
    </li>
    <li>
      <router-link to="/projects" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-workflow-alt"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li>
      <router-link to="/contact" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-envelope"></i>
        <span>Contact</span>
      </router-link>
    </li>
    <li>
      <router-link to="/activity" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-chart-histogram"></i>
        <span>My Activity</span>
      </router-link>
    </li>
    <li v-if="resizeScreen">
      <router-link to="/" exact-active-class="active" @click="$emit('close-menu')" >
        <i class="fi fi-rr-file"></i>
        <span>Resume CV</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>