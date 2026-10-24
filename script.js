/* =========================================================
   Personal Portfolio — Anmol Raj
   Plain JavaScript for:
   1) light / dark theme (saved in localStorage)
   2) mobile navigation menu
   3) live project search / filter
   No API keys and no chatbot in this version.
   ========================================================= */

(function () {
  "use strict";

  var THEME_KEY = "portfolio-theme";

  var html = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");
  var themeLabel = document.querySelector(".theme-label");
  var themeIcon = document.querySelector(".theme-icon");
  var navToggle = document.querySelector(".nav-toggle");
  var primaryNav = document.querySelector("#primary-nav");
  var navLinks = document.querySelectorAll("#primary-nav a");
  var searchInput = document.querySelector("#project-search");
  var projectCards = document.querySelectorAll(".project-card");
  var emptyMessage = document.querySelector("#project-empty");

  /* ----- Theme ----- */
  function applyTheme(theme) {
    var isLight = theme === "light";
    html.setAttribute("data-theme", theme);

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isLight));
      themeToggle.setAttribute(
        "aria-label",
        isLight ? "Switch to dark mode" : "Switch to light mode"
      );
    }

    if (themeLabel) {
      themeLabel.textContent = isLight ? "Dark" : "Light";
    }

    if (themeIcon) {
      themeIcon.textContent = isLight ? "🌙" : "☀️";
    }
  }

  function getSavedTheme() {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (error) {
      return null;
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (error) {
      // If storage is blocked, the theme still works for this visit.
    }
  }

  var savedTheme = getSavedTheme();
  applyTheme(savedTheme === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var nextTheme =
        html.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(nextTheme);
      saveTheme(nextTheme);
    });
  }

  /* ----- Mobile navigation ----- */
  function setMenuOpen(isOpen) {
    if (!primaryNav || !navToggle) {
      return;
    }

    primaryNav.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = navToggle.getAttribute("aria-expanded") === "true";
      setMenuOpen(!isOpen);
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      setMenuOpen(false);
    });
  });

  /* ----- Project search ----- */
  function filterProjects(rawQuery) {
    var query = (rawQuery || "").trim().toLowerCase();
    var visibleCount = 0;

    projectCards.forEach(function (card) {
      var haystack = [
        card.getAttribute("data-title") || "",
        card.getAttribute("data-description") || "",
        card.getAttribute("data-tech") || "",
        card.textContent || ""
      ]
        .join(" ")
        .toLowerCase();

      var matches = query === "" || haystack.indexOf(query) !== -1;
      card.classList.toggle("is-hidden", !matches);

      if (matches) {
        visibleCount += 1;
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = visibleCount !== 0;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      filterProjects(event.target.value);
    });
  }

  filterProjects("");
})();
