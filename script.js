/* Khatiwada POS — shared vanilla JS. No framework, no build step, no CDN.
   i18n: elements carry both languages via data-en/data-ne (and the
   -html/-placeholder variants); toggling just swaps which one is shown and
   persists the choice to localStorage so it survives real page loads
   (this is a real multi-page site, not a single-page app). */
(function () {
  "use strict";
  const LANG_KEY = "khatiwada_lang";

  function getLang() {
    try { return localStorage.getItem(LANG_KEY) || "en"; } catch (e) { return "en"; }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "ne" ? "ne" : "en";
    document.querySelectorAll("[data-en]").forEach((el) => {
      const text = el.getAttribute(lang === "ne" ? "data-ne" : "data-en");
      if (text !== null) el.textContent = text;
    });
    document.querySelectorAll("[data-en-html]").forEach((el) => {
      const html = el.getAttribute(lang === "ne" ? "data-ne-html" : "data-en-html");
      if (html !== null) el.innerHTML = html;
    });
    document.querySelectorAll("[data-en-placeholder]").forEach((el) => {
      const ph = el.getAttribute(lang === "ne" ? "data-ne-placeholder" : "data-en-placeholder");
      if (ph !== null) el.setAttribute("placeholder", ph);
    });
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  function setLang(lang) {
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
    applyLang(lang);
  }

  window.KhatiwadaLang = { getLang, setLang, applyLang };

  // Turns "Ram Store" into "ramstore" for the signup subdomain preview.
  window.slugify = (s) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "");

  document.addEventListener("DOMContentLoaded", () => {
    applyLang(getLang());

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.addEventListener("click", () => setLang(btn.dataset.lang));
    });

    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuClose = document.querySelector(".mobile-menu-close");
    const mobileMenuBackdrop = document.querySelector(".mobile-menu-backdrop");

    function openMobileMenu() {
      mobileMenu.classList.add("open");
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeMobileMenu() {
      mobileMenu.classList.remove("open");
      if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove("open");
      document.body.style.overflow = "";
    }

    if (hamburger && mobileMenu) {
      hamburger.addEventListener("click", () => {
        mobileMenu.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
      });
    }
    if (mobileMenuClose) mobileMenuClose.addEventListener("click", closeMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener("click", closeMobileMenu);
    document.querySelectorAll(".mobile-menu a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });
  });
})();
