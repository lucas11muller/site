/* =========================================================
   Lucas Müller — interações do site
   ========================================================= */

// Ano atual no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Fecha o menu ao clicar em um link
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Envio do formulário.
// Padrão: monta um e-mail já preenchido no app do visitante (action="mailto:...").
// Se o action for trocado por um endpoint HTTP (ex.: Formspree), envia via AJAX.
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (e) => {
    const action = form.getAttribute("action") || "";

    // Fallback por e-mail: monta um mailto mais legível do que o POST nativo
    if (action.startsWith("mailto:")) {
      e.preventDefault();
      const dados = new FormData(form);
      const corpo = [
        `Nome: ${dados.get("nome") || ""}`,
        `Empresa: ${dados.get("empresa") || ""}`,
        `E-mail: ${dados.get("email") || ""}`,
        `Interesse: ${dados.get("interesse") || ""}`,
        "",
        `${dados.get("mensagem") || ""}`,
      ].join("\n");
      const assunto = `Contato pelo site — ${dados.get("interesse") || "Solicitação"}`;
      const destino = action.slice("mailto:".length);
      window.location.href =
        `${destino ? "mailto:" + destino : "mailto:lmuller@mullercapital.net"}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
      setStatus("Abrindo seu aplicativo de e-mail...", "ok");
      return;
    }

    // Envio AJAX para endpoint HTTP (sem recarregar a página)
    e.preventDefault();
    setStatus("Enviando...", "");
    try {
      const resp = await fetch(action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (resp.ok) {
        form.reset();
        setStatus("Mensagem enviada com sucesso! Retornarei em breve.", "ok");
      } else {
        setStatus("Não foi possível enviar. Tente novamente ou escreva para lmuller@mullercapital.net.", "err");
      }
    } catch (err) {
      setStatus("Erro de conexão. Escreva para lmuller@mullercapital.net.", "err");
    }
  });
}

function setStatus(msg, type) {
  if (!status) return;
  status.textContent = msg;
  status.className = "form-status" + (type ? " " + type : "");
}

/* ===================== Anima o gráfico de crescimento ===================== */
const growthChart = document.querySelector(".growth-chart");
if (growthChart) {
  if ("IntersectionObserver" in window) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    obs.observe(growthChart);
  } else {
    growthChart.classList.add("in-view"); // fallback: mostra direto
  }
}

/* ===================== Lightbox da galeria ===================== */
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxCaption = document.getElementById("lightbox-caption");
const galleryItems = Array.from(document.querySelectorAll(".gallery-item"));
let currentIndex = 0;

function openLightbox(index) {
  const item = galleryItems[index];
  if (!item) return;
  const img = item.querySelector("img");
  const caption = item.querySelector("figcaption");
  currentIndex = index;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.innerHTML = caption ? caption.innerHTML : "";
  lightbox.hidden = false;
  // força reflow para a transição de opacidade funcionar
  requestAnimationFrame(() => lightbox.classList.add("open"));
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
  setTimeout(() => { lightbox.hidden = true; }, 250);
}

function showRelative(step) {
  openLightbox((currentIndex + step + galleryItems.length) % galleryItems.length);
}

galleryItems.forEach((item, i) => {
  item.addEventListener("click", () => openLightbox(i));
});

if (lightbox) {
  document.getElementById("lightbox-close").addEventListener("click", closeLightbox);
  document.getElementById("lightbox-prev").addEventListener("click", (e) => { e.stopPropagation(); showRelative(-1); });
  document.getElementById("lightbox-next").addEventListener("click", (e) => { e.stopPropagation(); showRelative(1); });
  // clicar no fundo (fora da imagem) fecha
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
  // teclado: Esc fecha, setas navegam
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    else if (e.key === "ArrowLeft") showRelative(-1);
    else if (e.key === "ArrowRight") showRelative(1);
  });
}
