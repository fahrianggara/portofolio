import { reactive } from "vue";

export const eventBus = reactive({
    imageSrc: null,
    isOpen: false,
    openLightbox(image) {
        this.imageSrc = image;
        this.isOpen = !this.isOpen;
    },
});
