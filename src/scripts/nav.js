export const initNav = () => {
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
