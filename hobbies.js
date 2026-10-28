
/* ===================================
   BEYOND THE CODE
   Hobbies Page JavaScript
=================================== */

// Back to Top Button

const backToTop = document.getElementById("back-to-top");

if (backToTop) {

    backToTop.addEventListener("click", () => {

        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: reduceMotion ? "instant" : "smooth"
        });

    });

}

console.log("Beyond the Code loaded.");
