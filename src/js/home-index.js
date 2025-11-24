const slides = document.querySelector(".slides");
const imagens = document.querySelectorAll(".slides img");
const btnEsq = document.querySelector(".seta-esq");
const btnDir = document.querySelector(".seta-dir");

let index = 0;
let intervalo = setInterval(nextSlide, 3000);

function atualizarSlide() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {
    index = (index + 1) % imagens.length;
    atualizarSlide();
}

function prevSlide() {
    index = (index - 1 + imagens.length) % imagens.length;
    atualizarSlide();
}

btnEsq.addEventListener("click", () => {
    prevSlide();
    resetTimer();
});

btnDir.addEventListener("click", () => {
    nextSlide();
    resetTimer();
});

function resetTimer() {
    clearInterval(intervalo);
    intervalo = setInterval(nextSlide, 3000);
}