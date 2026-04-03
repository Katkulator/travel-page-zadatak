const heroSwiper = new Swiper(".hero-swiper", {
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
});

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
