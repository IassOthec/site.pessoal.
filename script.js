
"use strict";

// =====================================
// 1. MENU PARA CELULARES
// =====================================

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

function fecharMenu() {
  if (!menuToggle || !navLinks) return;

  menuToggle.classList.remove("active");
  navLinks.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Abrir menu");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const estaAberto = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("active", estaAberto);
    menuToggle.setAttribute("aria-expanded", String(estaAberto));
    menuToggle.setAttribute(
      "aria-label",
      estaAberto ? "Fechar menu" : "Abrir menu"
    );
  });

  // Fecha o menu quando o usuário escolhe uma seção.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  // Fecha o menu se a tela voltar ao tamanho de computador.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
      fecharMenu();
    }
  });

  // Fecha o menu com a tecla Escape.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      fecharMenu();
      menuToggle.focus();
    }
  });
}

// =====================================
// 2. ANIMAÇÕES DE ENTRADA NA TELA
// =====================================

const elementosReveal = document.querySelectorAll(".reveal");

const movimentoReduzido = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !movimentoReduzido) {
  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  elementosReveal.forEach((elemento) => {
    observador.observe(elemento);
  });
} else {
  // Mantém o conteúdo visível em navegadores sem suporte
  // ou quando o usuário prefere movimento reduzido.
  elementosReveal.forEach((elemento) => {
    elemento.classList.add("visible");
  });
}

// =====================================
// 3. ANO AUTOMÁTICO NO RODAPÉ
// =====================================

const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// =====================================
// 4. FEEDBACK NO CONSOLE
// =====================================

console.info("Portfólio carregado com sucesso!");
