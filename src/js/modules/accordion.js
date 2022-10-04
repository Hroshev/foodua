const accordions = document.querySelectorAll(".accordion__content")
accordions.forEach((accordion) => {
    accordion.addEventListener("click", () => {
        accordion.classList.toggle("active");
    });
});