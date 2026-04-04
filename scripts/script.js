import { offersData } from "./swiper-data.js";

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

const renderOffers = () => {
    const offersWrapper = document.querySelector("#offers-swiper-wrapper");
    if (!offersWrapper) return;

    offersWrapper.innerHTML = offersData.map(createOfferSlide).join("");
};

const initSwipers = () => {
    new Swiper(".hero-swiper", {
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

renderOffers();
initSwipers();

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav__toggle");

if (nav && navToggle) {
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
}

window.addEventListener("load", () => {
    const loadItems = document.querySelectorAll(".animate-on-load");
    loadItems.forEach((item) => item.classList.add("is-visible"));
});

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
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
}
