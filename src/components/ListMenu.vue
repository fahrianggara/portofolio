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
  });

  const { resizeScreen } = useScreenSize();
  const route = useRoute();

  const showResume = computed(() => {
    // return route.path !== "/" ? resizeScreen.value : false;
    if (route.path !== "/") {
      if (props.hideResume) {
        return false;
      } else {
        return resizeScreen.value;
      }
    } else {
      return false;
    }
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
      <router-link to="/about" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-user" v-if="showIcon"></i>
        <span>About Me</span>
      </router-link>
    </li>
    <li>
      <router-link to="/edu" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-graduation-cap" v-if="showIcon"></i>
        <span>Education</span>
      </router-link>
    </li>
    <li>
      <router-link to="/experience" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-briefcase" v-if="showIcon"></i>
        <span>Experience</span>
      </router-link>
    </li>
    <li>
      <router-link to="/projects" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-flask-potion" v-if="showIcon"></i>
        <span>Projects</span>
      </router-link>
    </li>
    <li>
      <router-link to="/contact" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-paper-plane" v-if="showIcon"></i>
        <span>Contact</span>
      </router-link>
    </li>
    <li>
      <router-link to="/activity" exact-active-class="active" @click="$emit('close-menu')">
        <i class="fi fi-rr-chart-pie-alt" v-if="showIcon"></i>
        <span>My Activity</span>
      </router-link>
    </li>
    <li v-if="showResume">
      <router-link to="/resume" exact-active-class="active" @click="$emit('close-menu')" >
        <i class="fi fi-rr-file" v-if="showIcon"></i>
        <span>Download CV</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>