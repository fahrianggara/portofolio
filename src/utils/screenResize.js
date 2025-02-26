import { ref, onMounted, onUnmounted } from "vue";

export function useScreenSize(breakpoint = 767.99) {
    const resizeScreen = ref(window.innerWidth <= breakpoint);

    const checkScreenSize = () => {
        resizeScreen.value = window.innerWidth <= breakpoint;
    };

    onMounted(() => {
        window.addEventListener("resize", checkScreenSize);
        checkScreenSize();
    });

    onUnmounted(() => {
        window.removeEventListener("resize", checkScreenSize);
    });

    return { resizeScreen };
}
