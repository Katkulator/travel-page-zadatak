import starIcon from "../../assets/icons/star.svg";

import destinationsPartial from "../partials/destinations.html?raw";
import heroPartial from "../partials/hero.html?raw";
import offersPartial from "../partials/offers.html?raw";
import promotionPartial from "../partials/promotion.html?raw";
import { destinationsData, heroSlidesData, offersData } from "./swiper-data.js";

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
        ${createTravelCard(offer, {
            cardClassName: "offers__card",
            metaFirst: false,
        })}
    </div>
`;

const createTravelCard = (item, { cardClassName = "", metaFirst = true } = {}) => {
    const metaMarkup = `
        <div class="travel-card__meta">
            <span class="travel-card__price">${item.price}</span>
            <span class="travel-card__rating">
                <img src="${starIcon}" alt="Star Icon" aria-hidden="true" />
                <span>${item.rating}</span>
            </span>
        </div>
    `;

    const contentMarkup = metaFirst
        ? `
            ${metaMarkup}
            <h3 class="travel-card__title">${item.title}</h3>
            <p class="travel-card__text">${item.description}</p>
        `
        : `
            <h3 class="travel-card__title">${item.title}</h3>
            <p class="travel-card__text">${item.description}</p>
            ${metaMarkup}
        `;

    return `
        <article class="travel-card ${cardClassName}">
            <div class="travel-card__image">
                <img src="${item.image}" alt="${item.alt}" />
            </div>
            <div class="travel-card__content">
                ${contentMarkup}
            </div>
        </article>
    `;
};

export const renderApp = () => {
    const app = document.querySelector("#app");
    if (!app) return;

    app.innerHTML = `
        ${heroPartial}
        <main>
            ${promotionPartial}
            ${offersPartial}
            ${destinationsPartial}
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

export const renderDestinations = () => {
    const destinationsGrid = document.querySelector("#destinations-grid");
    if (!destinationsGrid) return;

    destinationsGrid.innerHTML = destinationsData
        .map((destination) =>
            createTravelCard(destination, {
                cardClassName: "destinations__card",
            })
        )
        .join("");
};
