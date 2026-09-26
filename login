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
const gateError = document.getElementById("gate-error");

function unlock() {
  gate.hidden = true;
  site.hidden = false;
  sessionStorage.setItem(SESSION_KEY, "1");
}

// Skip the gate if already unlocked earlier this browser session
if (sessionStorage.getItem(SESSION_KEY) === "1") {
  unlock();
}

gateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (gateInput.value.trim().toLowerCase() === PASSWORD.toLowerCase()) {
    gateError.hidden = true;
    unlock();
  } else {
    gateError.hidden = false;
    gateInput.focus();
    gateInput.select();
  }
});

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
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });
});
