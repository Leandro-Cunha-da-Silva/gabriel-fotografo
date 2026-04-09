const imagens = document.querySelectorAll(".fotos img");
const lightbox = document.getElementById("lightbox");
const imagemGrande = document.getElementById("imagemGrande");

// Mobile inico das variáveis
let touchStartX = 0;
let touchStartY = 0;
let currentTranslateX = 0;
let currentTranslateY = 0;
// Fim da variavél mobile

let indexAtual = 0;

imagens.forEach((img, index) => {
    img.addEventListener("click", (e) => {
        indexAtual = index;
        abrirLightbox();
    });
});

function abrirLightbox() {
    lightbox.style.display = "flex";
    imagemGrande.style.cursor = "zoom-in";
    atualizarImagem();
}

function atualizarImagem() {
    resetZoom();
    imagemGrande.src = imagens[indexAtual].src;
}



let zoomAtivo = false;
const zoomScale = 2;

function resetZoom() {
    zoomAtivo = false;
    currentTranslateX = 0;
    currentTranslateY = 0;

    imagemGrande.classList.remove("zoom");
    imagemGrande.style.transform = "scale(1)";
    imagemGrande.style.cursor = "zoom-in";
}


imagemGrande.addEventListener("click", () => {
    zoomAtivo = !zoomAtivo;

    if (zoomAtivo) {
        imagemGrande.classList.add("zoom");
        imagemGrande.style.cursor = "zoom-out";
        imagemGrande.style.transition = "transform 0.2s ease-out";
        imagemGrande.style.transform = `scale(${zoomScale})`;
    } else {
        resetZoom();
    }
});

imagemGrande.addEventListener("mousemove", (e) => {
    if (!zoomAtivo) return;

    const rect = imagemGrande.getBoundingClientRect();

    let x = (e.clientX - rect.left) / rect.width;
    let y = (e.clientY - rect.top) / rect.height;

    x = Math.max(0, Math.min(1, x));
    y = Math.max(0, Math.min(1, y));

    const intensidade = 0.6;

    const moveX = (x - 0.5) * rect.width * intensidade;
    const moveY = (y - 0.5) * rect.height * intensidade;

    imagemGrande.style.transform = `scale(${zoomScale}) translate(${-moveX / zoomScale}px, ${-moveY / zoomScale}px)`;
});



imagemGrande.addEventListener("mouseleave", () => {
    if (zoomAtivo) {
        imagemGrande.style.transform = `scale(${zoomScale})`;
    }
});




document.getElementById("avancar").onclick = () => {
    indexAtual = (indexAtual + 1) % imagens.length;
    atualizarImagem();
};

document.getElementById("voltar").onclick = () => {
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    atualizarImagem();
};



function fecharLightbox() {
    lightbox.style.display = "none";
    resetZoom();
}

document.querySelector(".fechar").onclick = fecharLightbox;

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        fecharLightbox();
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        fecharLightbox();
    }
});




// Mobile - início dos eventos de toque
imagemGrande.addEventListener("touchstart", (e) => {
    const touch = e.touches[0];

    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
});

imagemGrande.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;

    if (zoomAtivo) {
        e.preventDefault();

        const intensidade = 1;

        currentTranslateX += deltaX * intensidade;
        currentTranslateY += deltaY * intensidade;

        imagemGrande.style.transform = `scale(${zoomScale}) translate(${currentTranslateX}px, ${currentTranslateY}px)`;

        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }
});

imagemGrande.addEventListener("touchend", (e) => {
    if (zoomAtivo) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartX;
    const limite = 50;

    if (deltaX > limite) {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        atualizarImagem();
    } else if (deltaX < -limite) {
        indexAtual = (indexAtual + 1) % imagens.length;
        atualizarImagem();
    }
});

