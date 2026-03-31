const imagens = document.querySelectorAll(".fotos img");
const lightbox = document.getElementById("lightbox");
const imagemGrande = document.getElementById("imagemGrande");


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
    imagemGrande.classList.remove("zoom");
    imagemGrande.style.transform = "scale(1)";
    imagemGrande.style.cursor = "zoom-in";
}


imagemGrande.addEventListener("click", () => {
    zoomAtivo = !zoomAtivo;

    if (zoomAtivo) {
        imagemGrande.classList.add("zoom");
        imagemGrande.style.cursor ="zoom-out";
        imagemGrande.style.transition = "transform 0.1s ease-out";
        imagemGrande.style.transform = `scale(${zoomScale})`;
    } else {
        resetZoom();
    }
});

imagemGrande.addEventListener("mousemove", (e) => {
    if (!zoomAtivo) return;

    const rect = imagemGrande.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const moveX = (x - 0.5) * rect.width;
    const moveY = (y - 0.5) * rect.height;

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