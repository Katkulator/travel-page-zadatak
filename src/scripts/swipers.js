import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Swiper from "swiper";

export const initSwipers = () => {
    new Swiper(".hero-swiper", {
        modules: [Autoplay, EffectFade, Pagination],
        effect: "fade",
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".hero-swiper__pagination",
            clickable: true,
        },
        resizeObserver: false,
    });

    new Swiper(".offers-swiper", {
        modules: [Pagination],
        loop: true,
        speed: 1000,
        spaceBetween: 40,
        slidesPerGroup: 1,
        pagination: {
            el: ".offers-swiper__pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 24,
            },
            1440: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 40,
            },
        },
    });
};
