import promotionMainImage from "../../assets/images/promotion/promotion-main.png";
import promotionShapeImage from "../../assets/images/promotion/promotion-shape.png";

import heroPartial from "../partials/hero.html?raw";
import promotionPartial from "../partials/promotion.html?raw";
import offersPartial from "../partials/offers.html?raw";
import { heroSlidesData, offersData } from "./swiper-data.js";

const renderedPromotionPartial = promotionPartial
    .replace("{{promotionShapeImage}}", promotionShapeImage)
    .replace("{{promotionMainImage}}", promotionMainImage);

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

export const renderApp = () => {
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = `
        ${heroPartial}
        <main>
            ${renderedPromotionPartial}
            ${offersPartial}
        </main>
    `;
};

export const renderHeroSlides = () => {
    const heroWrapper = document.querySelector("#hero-swiper-wrapper");
    if (!heroWrapper) return;

    heroWrapper.innerHTML = heroSlidesData.map(createHeroSlide).join("");
};

export const renderOffers = () => {
    const offersWrapper = document.querySelector("#offers-swiper-wrapper");
    if (!offersWrapper) return;

    offersWrapper.innerHTML = offersData.map(createOfferSlide).join("");
};
