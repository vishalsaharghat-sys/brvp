
"use strict";

// Current year in the footer
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile navigation menu
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "मेन्यू बंद करें" : "मेन्यू खोलें"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
      menuToggle.textContent = "☰";
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "मेन्यू खोलें");
      menuToggle.textContent = "☰";
    }
  });
}

// Product category filters and search
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const searchInput = document.getElementById("productSearch");
const noResults = document.getElementById("noResults");

let selectedCategory = "all";

function filterProducts() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase("hi");
  let visibleCount = 0;

  productCards.forEach((card) => {
    const category = card.dataset.category || "";
    const name = (card.dataset.name || "").toLocaleLowerCase("hi");
    const heading = card.querySelector("h3")?.textContent || "";
    const description = card.querySelector(".product-info p")?.textContent || "";

    const searchableText = `${name} ${heading} ${description}`
      .toLocaleLowerCase("hi");

    const matchesCategory =
      selectedCategory === "all" || category === selectedCategory;

    const matchesSearch = searchableText.includes(searchTerm);
    const shouldShow = matchesCategory && matchesSearch;

    card.hidden = !shouldShow;

    if (shouldShow) visibleCount++;
  });

  noResults.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectedCategory = button.dataset.filter || "all";

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    filterProducts();
  });
});

if (searchInput) {
  searchInput.addEventListener("input", filterProducts);
}

// Category cards take visitors to the products section
const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.dataset.category;

    const matchingButton = document.querySelector(
      `.filter-btn[data-filter="${category}"]`
    );

    if (matchingButton) {
      matchingButton.click();
    }

    document.getElementById("products")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  });
});

// WhatsApp product enquiry
// India country code: 91
// Shop WhatsApp number: 7004196826
const whatsappNumber = "917004196826";

function openWhatsApp(productName) {
  const message =
    `नमस्ते BRVP RP ENTERPRISES! मुझे ${productName} के बारे में जानकारी चाहिए। कृपया इसकी कीमत और उपलब्धता बताएं।`;

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".order-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const productName = button.dataset.product || "प्रोडक्ट";
    openWhatsApp(productName);
  });
});

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
