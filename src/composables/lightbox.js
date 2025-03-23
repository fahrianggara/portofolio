import { ref, provide } from 'vue';

export function useLightbox() 
{
  const showLightbox = ref(false);
  const indexLightbox = ref(0);
  const imagesLightbox = ref([]);

  const closeLightbox = () => showLightbox.value = false;
  const openLightbox = (index, images) => {
    indexLightbox.value = index;
    showLightbox.value = true;
    imagesLightbox.value = images;
  }
  
  const nextImage = () => index.value = (index.value + 1) % imagesLightbox.value.length
  const prevImage = () => index.value = (index.value - 1 + imagesLightbox.value.length) % imagesLightbox.value.length

  provide('openLightbox', openLightbox);

  return { showLightbox, indexLightbox, imagesLightbox, openLightbox, closeLightbox, nextImage, prevImage }
}