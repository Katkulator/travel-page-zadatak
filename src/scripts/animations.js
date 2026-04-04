export const initLoadAnimations = () => {
    window.addEventListener("load", () => {
        const loadItems = document.querySelectorAll(".animate-on-load");
        loadItems.forEach((item) => item.classList.add("is-visible"));
    });
};

export const initRevealAnimations = () => {
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
