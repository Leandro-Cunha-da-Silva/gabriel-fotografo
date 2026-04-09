const fotos = document.querySelectorAll(".fotos");

if (window.innerWidth <= 768) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ativo");
            } else {
                entry.target.classList.remove("ativo");
            }
        });
    }, {
        threshold: 1
    });


    fotos.forEach(foto => {
        observer.observe(foto);
    });
}