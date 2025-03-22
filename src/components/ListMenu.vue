<script setup>
import { isActiveRoute } from "../composables/helpers";
import { useResize } from "../composables/screen";
import { computed } from "vue";

const isActive = isActiveRoute();
const resizeScreen = useResize();

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

const showResume = computed(() => {
  return route.path !== "/" && !props.hideResume ? resizeScreen.value : false;
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
      <router-link :to="{ name: 'about' }" exact-active-class="active">
        <i class="fi fi-rr-user" v-if="showIcon"></i>
        <span>About</span>
      </router-link>
    </li>
  </ul>
</template>

<style scoped>

</style>