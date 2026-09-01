// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileCloseBtn = document.getElementById("mobileCloseBtn");

function closeMobileMenu() {
  const navRow = document.querySelector(".nav-row");
  if (navRow) {
    navRow.classList.remove("mobile-menu-open");
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    const navRow = document.querySelector(".nav-row");
    if (navRow) {
      navRow.classList.toggle("mobile-menu-open");
    }
  });
}

// Close mobile menu when clicking outside
document.addEventListener("click", function (e) {
  const navRow = document.querySelector(".nav-row");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  if (
    navRow &&
    mobileMenuBtn &&
    !navRow.contains(e.target) &&
    !mobileMenuBtn.contains(e.target)
  ) {
    navRow.classList.remove("mobile-menu-open");
  }
});

// Close mobile menu when clicking on a nav link or close button
document.addEventListener("DOMContentLoaded", function () {
  const mobileCloseBtnReady = document.getElementById("mobileCloseBtn");
  if (mobileCloseBtnReady) {
    mobileCloseBtnReady.addEventListener("click", function (e) {
      e.stopPropagation();
      closeMobileMenu();
    });
  }

  // Close menu on simple nav link click
  const simpleNavLinks = document.querySelectorAll(
    ".nav-row > .container > .nav-link-custom",
  );
  simpleNavLinks.forEach((link) => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  // Close menu when clicking on dropdown items
  const dropdownItems = document.querySelectorAll(
    "#aboutDropdown .about-dropdown-item a",
  );
  dropdownItems.forEach((item) => {
    item.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
});

function toggleDropdown() {
  const dropdown = document.getElementById("langDropdown");
  dropdown.classList.toggle("active");
}

window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("langDropdown");
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
function toggleAboutDropdown() {
  const dropdown = document.getElementById("aboutDropdown");
  dropdown.classList.toggle("active");
}

window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("aboutDropdown");
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const archiveBtn = document.querySelector("[data-view-archive]");
  const hiddenCards = document.querySelectorAll(".archive-extra");

  archiveBtn?.addEventListener("click", () => {
    const show = hiddenCards[0]?.classList.contains("d-none");
    hiddenCards.forEach((card) => card.classList.toggle("d-none", !show));
    archiveBtn.textContent = show ? "View less" : "View more";
  });

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      document
        .querySelectorAll(".tab")
        .forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
    });
  });
});
