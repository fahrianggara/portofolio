import { useRoute } from "vue-router";


export function isActiveRoute(routeName) {
  const route = useRoute();
  return route.name === routeName;
}