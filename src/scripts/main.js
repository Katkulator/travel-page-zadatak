import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "/styles/main.css";

import { initLoadAnimations, initRevealAnimations } from "./animations.js";
import { initNav } from "./nav.js";
import { renderApp, renderHeroSlides, renderOffers } from "./render.js";
import { initSwipers } from "./swipers.js";

renderApp();
renderHeroSlides();
renderOffers();
initSwipers();
initNav();
initLoadAnimations();
initRevealAnimations();
