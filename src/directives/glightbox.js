import GLightbox from 'glightbox'

export default {
    mounted(el) {
        el.lightbox = GLightbox({
            selector: ".glightbox",
        });

        el.lightbox.on('open', () => {
            document.body.classList.remove('glightbox-open');
        });
    },
    unmounted(el) {
        el.lightbox.destroy();
    }
}