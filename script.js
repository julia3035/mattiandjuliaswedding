// ============================================================
// PASSWORD GATE
// This only hides content in the browser — anyone who looks at
// this file can read the password. It's a friendly deterrent for
// wedding guests, not real security. Don't put anything truly
// sensitive (like addresses of guests) behind it.
// ============================================================
const PASSWORD = "changeme"; // <-- change this before you publish!
const SESSION_KEY = "wedding-site-unlocked";

const gate = document.getElementById("gate");
const site = document.getElementById("site");
const gateForm = document.getElementById("gate-form");
const gateInput = document.getElementById("gate-password");

function unlock() {
  gate.hidden = true;
  site.hidden = false;
  sessionStorage.setItem(SESSION_KEY, "1");
}

if (sessionStorage.getItem(SESSION_KEY) === "1") {
  unlock();
}

gateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const errors = document.querySelectorAll(".gate-error");
  if (gateInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
    errors.forEach((el) => (el.hidden = true));
    unlock();
  } else {
    errors.forEach((el) => {
      if (el.dataset.lang === currentLang) el.hidden = false;
    });
    gateInput.focus();
    gateInput.select();
  }
});

// ============================================================
// LANGUAGE SWITCHING
// Every translatable element has a data-lang="en" or "de" attribute.
// We show the one matching the current language and hide the rest.
// ============================================================
const LANG_KEY = "wedding-site-lang";
let currentLang = "en";

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);
  document.querySelectorAll("[data-lang]").forEach((el) => {
    // Don't un-hide an error message that shouldn't be showing yet
    if (el.classList.contains("gate-error")) {
      el.hidden = true;
      return;
    }
    el.hidden = el.dataset.lang !== lang;
  });
  document.querySelectorAll(".lang-btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.langBtn === lang);
  });
  localStorage.setItem(LANG_KEY, lang);
}

document.querySelectorAll(".lang-btn").forEach((btn) => {
  btn.addEventListener("click", () => setLanguage(btn.dataset.langBtn));
});

// Detect: saved choice > browser language > default to English
const savedLang = localStorage.getItem(LANG_KEY);
const browserLang = navigator.language || navigator.userLanguage || "en";
const initialLang = savedLang || (browserLang.toLowerCase().startsWith("de") ? "de" : "en");
setLanguage(initialLang);

// ============================================================
// MOBILE NAV TOGGLE
// ============================================================
const navToggle = document.getElementById("nav-toggle");
const navLinks = document.getElementById("nav-links");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// ============================================================
// FAQ ACCORDION
// ============================================================
document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    item.querySelectorAll(".faq-question").forEach((b) => {
      b.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
});
