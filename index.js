document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".noticias");
    if (!carousel) return;

    const track = carousel.querySelector(".noticias-carrusel");
    const slides = Array.from(track.querySelectorAll(".noticia-slide"));
    const indicators = carousel.querySelector(".noticiasindicadores");
    const previousButton = carousel.querySelector(".flecha-noticias-anterior");
    const nextButton = carousel.querySelector(".flecha-noticias-siguiente");
    if (slides.length === 0) return;

    let activeSlide = 0;
    let visibleCount = 1;
    let currentPosition = 0;
    let isMoving = false;

    slides.forEach((slide, index) => {
        const indicator = document.createElement("button");
        indicator.className = "noticia-indicador";
        indicator.type = "button";
        indicator.setAttribute("aria-label", `Mostrar noticia ${index + 1} primero`);
        indicator.addEventListener("click", () => showSlide(index));
        indicators.appendChild(indicator);
    });

    const indicatorButtons = Array.from(indicators.querySelectorAll(".noticia-indicador"));

    function updateVisibleSlides() {
        slides.forEach((slide, index) => {
            const distance = (index - activeSlide + slides.length) % slides.length;
            slide.setAttribute("aria-hidden", String(distance >= visibleCount));
        });

        indicatorButtons.forEach((indicator, index) => {
            if (index === activeSlide) {
                indicator.setAttribute("aria-current", "true");
            } else {
                indicator.removeAttribute("aria-current");
            }
        });
    }

    function getVisibleCount() {
        const value = Number.parseInt(getComputedStyle(track).getPropertyValue("--visible-count"), 10);
        return Number.isNaN(value) ? 1 : Math.min(value, slides.length);
    }

    function getSlideStep() {
        const slide = track.querySelector(".noticia-slide:not([data-clone])");
        const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
        return slide.getBoundingClientRect().width + gap;
    }

    function setTrackPosition(animate) {
        if (!animate) {
            track.style.transition = "none";
        }

        track.style.transform = `translateX(-${currentPosition * getSlideStep()}px)`;

        if (!animate) {
            track.offsetHeight;
            track.style.removeProperty("transition");
        }
    }

    function configureTrack() {
        visibleCount = getVisibleCount();
        isMoving = false;
        const before = slides.slice(-visibleCount).map((slide) => createClone(slide));
        const after = slides.slice(0, visibleCount).map((slide) => createClone(slide));

        track.replaceChildren(...before, ...slides, ...after);
        currentPosition = visibleCount + activeSlide;
        setTrackPosition(false);
        updateVisibleSlides();
    }

    function createClone(slide) {
        const clone = slide.cloneNode(true);
        clone.dataset.clone = "true";
        clone.setAttribute("aria-hidden", "true");
        clone.setAttribute("inert", "");
        return clone;
    }

    function finishMove() {
        if (currentPosition === visibleCount + slides.length) {
            currentPosition = visibleCount;
            setTrackPosition(false);
        } else if (currentPosition === visibleCount - 1) {
            currentPosition = visibleCount + slides.length - 1;
            setTrackPosition(false);
        }

        isMoving = false;
        updateVisibleSlides();
    }

    function moveTo(index) {
        if (isMoving || slides.length === 0) return;

        activeSlide = (index + slides.length) % slides.length;
        currentPosition = visibleCount + activeSlide;
        isMoving = true;
        updateVisibleSlides();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finishMove();
            setTrackPosition(false);
        } else {
            setTrackPosition(true);
        }
    }

    function showSlide(index) {
        moveTo(index);
    }

    function moveBy(direction) {
        if (isMoving) return;

        activeSlide = (activeSlide + direction + slides.length) % slides.length;
        currentPosition += direction;
        isMoving = true;
        updateVisibleSlides();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            finishMove();
            setTrackPosition(false);
        } else {
            setTrackPosition(true);
        }
    }

    previousButton.addEventListener("click", () => moveBy(-1));
    nextButton.addEventListener("click", () => moveBy(1));

    track.addEventListener("transitionend", (event) => {
        if (event.target === track && event.propertyName === "transform") {
            finishMove();
        }
    });

    carousel.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft") {
            moveBy(-1);
        } else if (event.key === "ArrowRight") {
            moveBy(1);
        } else {
            return;
        }

        event.preventDefault();
    });

    window.addEventListener("resize", configureTrack);
    configureTrack();
});

document.addEventListener("DOMContentLoaded", () => {
    const carousel = document.querySelector(".identidad");
    const track = carousel?.querySelector(".vertical");
    const originalGroup = track?.querySelector(".identidad-grupo");
    if (!carousel || !track || !originalGroup) return;

    function configureIdentityCarousel() {
        track.classList.remove("identidad-moviendo");
        track.querySelectorAll(".identidad-grupo[data-clone]").forEach((clone) => clone.remove());

        const groupWidth = originalGroup.getBoundingClientRect().width;
        if (groupWidth <= 0) return;

        const groupCount = Math.ceil(carousel.clientWidth / groupWidth) + 1;
        for (let index = 1; index < groupCount; index += 1) {
            const clone = originalGroup.cloneNode(true);
            clone.dataset.clone = "true";
            clone.setAttribute("aria-hidden", "true");
            clone.setAttribute("inert", "");
            clone.querySelectorAll("img").forEach((image) => {
                image.alt = "";
            });
            track.appendChild(clone);
        }

        track.style.setProperty("--identidad-inicio", `-${groupWidth}px`);
        track.style.setProperty("--identidad-duracion", `${Math.max(45, groupWidth / 40)}s`);
        track.offsetWidth;
        track.classList.add("identidad-moviendo");
    }

    configureIdentityCarousel();
    window.addEventListener("resize", configureIdentityCarousel);
});