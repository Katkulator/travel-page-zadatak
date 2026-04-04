import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "/styles/main.css";

import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import Swiper from "swiper";

import heroPartial from "./partials/hero.html?raw";
import promotionPartial from "./partials/promotion.html?raw";
import offersPartial from "./partials/offers.html?raw";
import { heroSlidesData, offersData } from "./swiper-data.js";

const createHeroSlide = (slide) => `
    <div
        class="swiper-slide hero-slide"
        style="
            background-image:
                linear-gradient(0deg, rgba(0, 0, 0, 0.20), rgba(0, 0, 0, 0.20)),
                url('${slide.image}');
            background-position: ${slide.position};
        "
    ></div>
`;

const createOfferSlide = (offer) => `
    <div class="swiper-slide">
        <article class="offer-card">
            <div class="offer-card__image">
                <img src="${offer.image}" alt="${offer.alt}" />
            </div>
            <div class="offer-card__content">
                <h3 class="offer-card__title">${offer.title}</h3>
                <p class="offer-card__text">${offer.description}</p>
                <div class="offer-card__meta">
                    <span class="offer-card__price">${offer.price}</span>
                    <span class="offer-card__rating">★ ${offer.rating}</span>
                </div>
            </div>
        </article>
    </div>
`;

const renderApp = () => {
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = `
        ${heroPartial}
        <main>
            ${promotionPartial}
            ${offersPartial}
        </main>
    `;
};

const renderHeroSlides = () => {
    const heroWrapper = document.querySelector("#hero-swiper-wrapper");
    if (!heroWrapper) return;

    heroWrapper.innerHTML = heroSlidesData.map(createHeroSlide).join("");
};

const renderOffers = () => {
    const offersWrapper = document.querySelector("#offers-swiper-wrapper");
    if (!offersWrapper) return;

    offersWrapper.innerHTML = offersData.map(createOfferSlide).join("");
};

const initSwipers = () => {
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

const initNav = () => {
    const nav = document.querySelector(".nav");
    const navToggle = document.querySelector(".nav__toggle");

    if (!nav || !navToggle) return;

    const setNavState = (isOpen) => {
        nav.classList.toggle("nav--open", isOpen);
        navToggle.setAttribute("aria-expanded", String(isOpen));
        navToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        document.body.style.overflow = isOpen ? "hidden" : "";
    };

    const closeNav = () => setNavState(false);

    navToggle.addEventListener("click", () => {
        const isOpen = !nav.classList.contains("nav--open");
        setNavState(isOpen);
    });

    const navLinks = nav.querySelectorAll(".nav__list a");
    navLinks.forEach((link) => {
        link.addEventListener("click", closeNav);
    });

    let resizeTimer;

    window.addEventListener("resize", () => {
        nav.classList.add("nav--no-transition");
        closeNav();

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            nav.classList.remove("nav--no-transition");
        }, 150);
    });
};

const initLoadAnimations = () => {
    window.addEventListener("load", () => {
        const loadItems = document.querySelectorAll(".animate-on-load");
        loadItems.forEach((item) => item.classList.add("is-visible"));
    });
};

const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll(".reveal");
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15,
        }
    );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
};

renderApp();
renderHeroSlides();
renderOffers();
initSwipers();
initNav();
initLoadAnimations();
initRevealAnimations();
