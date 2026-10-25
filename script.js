
const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

// Abrir e fechar o menu no celular
botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");

  botaoMenu.setAttribute("aria-expanded", aberto);
  botaoMenu.setAttribute(
    "aria-label",
    aberto ? "Fechar menu" : "Abrir menu"
  );

  botaoMenu.textContent = aberto ? "✕" : "☰";
});

// Fechar o menu depois de clicar em um link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
    botaoMenu.textContent = "☰";
  });
});

// Atualizar o ano automaticamente
document.querySelector("#ano").textContent = new Date().getFullYear();

// Animação suave das seções ao aparecerem na tela
const elementos = document.querySelectorAll(
  ".secao, .projeto, .card-academico, .contato"
);

elementos.forEach((elemento) => {
  elemento.classList.add("revelar");
});

const observador = new IntersectionObserver(
  (entradas, observer) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visivel");
        observer.unobserve(entrada.target);
      }
    });
  },
  {
    threshold: 0.12
  }
);

elementos.forEach((elemento) => {
  observador.observe(elemento);
});
