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
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});
function toggleAboutDropdown() {
  const dropdown = document.getElementById("aboutDropdown");
  dropdown.classList.toggle("active");
}

window.addEventListener("click", function (e) {
  const dropdown = document.getElementById("aboutDropdown");
  if (dropdown && !dropdown.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const authViews = document.querySelectorAll("[data-auth-view]");
  document.querySelectorAll("[data-auth-target]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const target = trigger.dataset.authTarget;
      authViews.forEach((view) => {
        view.hidden = view.dataset.authView !== target;
      });
    });
  });

  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  const resetForm = document.querySelector('[data-auth-view="forgot"] form');
  const authModal = document.querySelector("[data-auth-modal]");
  const modalCloseButtons = document.querySelectorAll("[data-modal-close]");

  const closeAuthModal = () => {
    if (authModal) authModal.hidden = true;
  };

  resetForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (authModal) authModal.hidden = false;
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener("click", closeAuthModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeAuthModal();
  });

  const registerSteps = document.querySelectorAll("[data-register-step]");
  const firstRegisterForm = document.querySelector(
    '[data-register-form="step-one"]',
  );
  const secondRegisterForm = document.querySelector(
    '[data-register-form="step-two"]',
  );

  const showRegisterStep = (step) => {
    registerSteps.forEach((view) => {
      view.hidden = view.dataset.registerStep !== String(step);
    });
  };

  firstRegisterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    showRegisterStep(2);
  });

  document.querySelectorAll("[data-register-back]").forEach((button) => {
    button.addEventListener("click", () => showRegisterStep(1));
  });

  secondRegisterForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const password = secondRegisterForm.elements.password;
    const passwordConfirm = secondRegisterForm.elements.passwordConfirm;

    if (password.value !== passwordConfirm.value) {
      passwordConfirm.setCustomValidity("Şifrələr uyğun deyil.");
      passwordConfirm.reportValidity();
      return;
    }

    passwordConfirm.setCustomValidity("");
    if (authModal) authModal.hidden = false;
  });

  const profileSidebar = document.querySelector("[data-profile-sidebar]");
  const profileMenuToggle = document.querySelector(
    "[data-profile-menu-toggle]",
  );
  profileMenuToggle?.addEventListener("click", () => {
    profileSidebar?.classList.toggle("is-open");
  });

  const profileTabs = document.querySelectorAll("[data-profile-tab]");
  const profilePanels = document.querySelectorAll("[data-profile-panel]");
  profileTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabName = tab.dataset.profileTab;
      profileTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });
      profilePanels.forEach((panel) => {
        panel.hidden = true;
      });
      const selectedPanel = document.querySelector(
        `[data-profile-panel="${tabName}"]`,
      );
      if (selectedPanel) {
        selectedPanel.hidden = false;
      } else {
        document
          .querySelector('[data-profile-panel="other"]')
          ?.removeAttribute("hidden");
      }
    });
  });

  document.querySelectorAll(".profile-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  });

  document.querySelectorAll("[data-editor-command]").forEach((button) => {
    button.addEventListener("click", () => {
      const editor = document.getElementById("profile-signature");
      if (!editor) return;
      editor.focus();
      const command = button.dataset.editorCommand;
      if (command === "code") {
        document.execCommand("formatBlock", false, "pre");
      } else if (command === "createLink") {
        const url = window.prompt("Link ünvanı:");
        if (url) document.execCommand("createLink", false, url);
      } else {
        document.execCommand(command, false);
      }
    });
  });

  const roleModal = document.querySelector("[data-role-modal]");
  document
    .querySelector("[data-role-modal-open]")
    ?.addEventListener("click", () => {
      if (roleModal) roleModal.hidden = false;
    });
  document.querySelectorAll("[data-role-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      if (roleModal) roleModal.hidden = true;
    });
  });
  document
    .querySelector("[data-role-form]")
    ?.addEventListener("submit", (event) => {
      event.preventDefault();
    });

  document.querySelector("[data-api-create]")?.addEventListener("click", () => {
    const apiKey = document.getElementById("profile-api-key");
    if (apiKey)
      apiKey.value = `unec_${crypto.randomUUID().replaceAll("-", "").slice(0, 24)}`;
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
  const tabs = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  tabs.forEach((tab) => {
    tab.addEventListener("click", (event) => {
      event.preventDefault();

      const panelName = tab.dataset.tab;

      // Active tab
      tabs.forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      // Active panel
      panels.forEach((panel) => {
        const isActive = panel.dataset.panel === panelName;

        panel.hidden = !isActive;
        panel.classList.toggle("active", isActive);
      });
    });
  });
  const searchForm = document.getElementById("searchForm");
  const titleInput = document.getElementById("searchTitle");
  const authorInput = document.getElementById("searchAuthor");
  const dateTrigger = document.getElementById("datePickerTrigger");
  const datePopover = document.getElementById("datePickerPopover");
  const dateLabel = document.getElementById("dateRangeLabel");
  const startPreview = document.getElementById("startDatePreview");
  const endPreview = document.getElementById("endDatePreview");
  const monthSelect = document.getElementById("dateMonthSelect");
  const yearSelect = document.getElementById("dateYearSelect");
  const dateGrid = document.getElementById("dateGrid");
  const cancelDateBtn = document.getElementById("cancelDate");
  const applyDateBtn = document.getElementById("applyDate");

  if (searchForm && titleInput && authorInput) {
    const resultCards = [...document.querySelectorAll(".search-result-card")];
    const emptyState = document.querySelector(".search-empty-state");

    const parseDate = (str) => {
      const [day, month, year] = str.split(".");
      return new Date(Number(year), Number(month) - 1, Number(day));
    };

    const formatMonthDayYear = (date) => {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }).format(date);
    };

    const formatRangeLabel = (start, end) => {
      if (!start || !end) return "Tarix aralığı";
      return `${formatMonthDayYear(start)} — ${formatMonthDayYear(end)}`;
    };

    const getResultText = (card) => {
      return (
        card.dataset.title ||
        card.querySelector(".search-result-title")?.textContent ||
        ""
      ).toLowerCase();
    };

    const getResultAuthor = (card) => {
      return (
        card.dataset.author ||
        card.querySelector(".search-author")?.textContent ||
        ""
      ).toLowerCase();
    };

    const getResultDate = (card) => {
      return (
        card.dataset.date ||
        card
          .querySelector(".search-date")
          ?.textContent.replace(/\D/g, ".")
          .replace(/\.+/g, ".")
          .replace(/^\./, "") ||
        ""
      );
    };

    const filterCards = () => {
      const titleTerm = titleInput.value.trim().toLowerCase();
      const authorTerm = authorInput.value.trim().toLowerCase();
      const start = dateTrigger.dataset.startDate
        ? new Date(dateTrigger.dataset.startDate)
        : null;
      const end = dateTrigger.dataset.endDate
        ? new Date(dateTrigger.dataset.endDate)
        : null;
      const hasAnyFilter = Boolean(titleTerm || authorTerm || (start && end));

      let visibleCount = 0;

      resultCards.forEach((card) => {
        if (!hasAnyFilter) {
          card.style.display = "none";
          return;
        }

        const titleMatch =
          !titleTerm || getResultText(card).includes(titleTerm);
        const authorMatch =
          !authorTerm || getResultAuthor(card).includes(authorTerm);

        let dateMatch = true;
        if (start && end) {
          const cardDate = parseDate(getResultDate(card).trim());
          dateMatch = cardDate >= start && cardDate <= end;
        }

        const shouldShow = titleMatch && authorMatch && dateMatch;
        card.style.display = shouldShow ? "flex" : "none";
        if (shouldShow) visibleCount += 1;
      });

      if (emptyState) {
        emptyState.style.display =
          hasAnyFilter && visibleCount === 0 ? "block" : "none";
      }
    };

    document.querySelectorAll(".clear-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const field = button.closest(".search-field");
        const target = field ? field.querySelector("input") : null;

        if (target) {
          target.value = "";
          target.focus();
        }
      });
    });

    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const titleTerm = titleInput.value.trim();
      const authorTerm = authorInput.value.trim();
      const start = dateTrigger.dataset.startDate
        ? new Date(dateTrigger.dataset.startDate)
        : null;
      const end = dateTrigger.dataset.endDate
        ? new Date(dateTrigger.dataset.endDate)
        : null;

      if (!titleTerm && !authorTerm && !(start && end)) {
        resultCards.forEach((card) => {
          card.style.display = "none";
        });
        const emptyState = document.querySelector(".search-empty-state");
        if (emptyState) {
          emptyState.style.display = "block";
          emptyState.textContent = "Axtarış üçün ən azı 1 field doldurun.";
        }
        return;
      }

      filterCards();
    });

    if (!document.querySelector(".search-empty-state")) {
      const empty = document.createElement("div");
      empty.className = "search-empty-state";
      empty.textContent = "Heç bir nəticə tapılmadı.";
      empty.style.display = "none";
      searchForm.parentElement.appendChild(empty);
    }
  }

  const dateRange = {
    start: new Date(2026, 0, 6),
    end: new Date(2026, 0, 12),
    currentMonth: new Date(2026, 0, 1),
  };

  const updateDateSelectors = () => {
    if (!monthSelect || !yearSelect) return;

    monthSelect.innerHTML = "";
    for (let month = 0; month < 12; month += 1) {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = new Intl.DateTimeFormat("az-AZ", {
        month: "long",
      }).format(new Date(2026, month, 1));
      monthSelect.appendChild(option);
    }

    const selectedYear = dateRange.currentMonth.getFullYear();
    yearSelect.innerHTML = "";
    for (let year = selectedYear - 10; year <= selectedYear + 10; year += 1) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }

    monthSelect.value = String(dateRange.currentMonth.getMonth());
    yearSelect.value = String(selectedYear);
  };

  const buildCalendar = () => {
    if (!dateGrid || !monthSelect || !yearSelect) return;

    const month = dateRange.currentMonth.getMonth();
    const year = dateRange.currentMonth.getFullYear();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startWeekday = (firstDay.getDay() + 6) % 7;
    const daysInMonth = lastDay.getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();
    const days = [];

    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        muted: true,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, muted: false, date: new Date(year, month, i) });
    }

    while (days.length % 7 !== 0) {
      const nextDay = days.length - (daysInMonth + startWeekday) + 1;
      days.push({
        day: nextDay,
        muted: true,
        date: new Date(year, month + 1, nextDay),
      });
    }

    updateDateSelectors();
    dateGrid.innerHTML = "";

    days.forEach(({ day, muted, date }) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `date-picker-day ${muted ? "muted" : ""}`;
      const start = dateTrigger?.dataset.startDate
        ? new Date(dateTrigger.dataset.startDate)
        : null;
      const end = dateTrigger?.dataset.endDate
        ? new Date(dateTrigger.dataset.endDate)
        : null;

      if (start && end && date >= start && date <= end) {
        btn.classList.add("in-range");
      }
      if (start && date.getTime() === start.getTime()) {
        btn.classList.add("selected");
      }
      if (end && date.getTime() === end.getTime()) {
        btn.classList.add("selected");
      }

      btn.textContent = day;
      btn.addEventListener("click", () => {
        const selectingFirstDate =
          !dateTrigger.dataset.startDate || dateTrigger.dataset.endDate;
        const selectedDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
        );

        if (
          !dateTrigger.dataset.startDate ||
          (dateTrigger.dataset.startDate && dateTrigger.dataset.endDate)
        ) {
          dateTrigger.dataset.startDate = selectedDate.toISOString();
          dateTrigger.dataset.endDate = "";
        } else {
          const startDate = new Date(dateTrigger.dataset.startDate);
          if (selectedDate < startDate) {
            dateTrigger.dataset.endDate = startDate.toISOString();
            dateTrigger.dataset.startDate = selectedDate.toISOString();
          } else {
            dateTrigger.dataset.endDate = selectedDate.toISOString();
          }
        }

        const rangeStart = dateTrigger.dataset.startDate
          ? new Date(dateTrigger.dataset.startDate)
          : null;
        const rangeEnd = dateTrigger.dataset.endDate
          ? new Date(dateTrigger.dataset.endDate)
          : null;
        startPreview.textContent = rangeStart
          ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(rangeStart)
          : "Jan 6, 2026";
        endPreview.textContent = rangeEnd
          ? new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(rangeEnd)
          : "Jan 12, 2026";
        dateLabel.textContent =
          rangeStart && rangeEnd
            ? `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(rangeStart)} — ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(rangeEnd)}`
            : "Tarix aralığı";

        buildCalendar();
        if (selectingFirstDate) {
          datePopover.classList.remove("open");
        }
      });

      dateGrid.appendChild(btn);
    });
  };

  if (dateTrigger && datePopover) {
    dateTrigger.addEventListener("click", () => {
      datePopover.classList.toggle("open");
    });

    dateTrigger.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        datePopover.classList.toggle("open");
      }
    });

    document.addEventListener("click", (event) => {
      if (
        !dateTrigger.contains(event.target) &&
        !datePopover.contains(event.target)
      ) {
        datePopover.classList.remove("open");
      }
    });

    dateTrigger.dataset.startDate = new Date(2026, 0, 6).toISOString();
    dateTrigger.dataset.endDate = new Date(2026, 0, 12).toISOString();
    startPreview.textContent = "Jan 6, 2026";
    endPreview.textContent = "Jan 12, 2026";
    dateLabel.textContent = "Jan 6, 2026 — Jan 12, 2026";
    buildCalendar();

    document.querySelectorAll(".date-nav").forEach((button) => {
      button.addEventListener("click", () => {
        const direction = button.dataset.nav === "next" ? 1 : -1;
        dateRange.currentMonth = new Date(
          dateRange.currentMonth.getFullYear(),
          dateRange.currentMonth.getMonth() + direction,
          1,
        );
        buildCalendar();
      });
    });

    monthSelect?.addEventListener("change", () => {
      dateRange.currentMonth = new Date(
        dateRange.currentMonth.getFullYear(),
        Number(monthSelect.value),
        1,
      );
      buildCalendar();
    });

    yearSelect?.addEventListener("change", () => {
      dateRange.currentMonth = new Date(
        Number(yearSelect.value),
        dateRange.currentMonth.getMonth(),
        1,
      );
      buildCalendar();
    });

    cancelDateBtn?.addEventListener("click", () => {
      dateTrigger.dataset.startDate = "";
      dateTrigger.dataset.endDate = "";
      dateLabel.textContent = "Tarix aralığı";
      startPreview.textContent = "Jan 6, 2026";
      endPreview.textContent = "Jan 12, 2026";
      datePopover.classList.remove("open");
      buildCalendar();
    });

    applyDateBtn?.addEventListener("click", () => {
      const start = dateTrigger.dataset.startDate
        ? new Date(dateTrigger.dataset.startDate)
        : null;
      const end = dateTrigger.dataset.endDate
        ? new Date(dateTrigger.dataset.endDate)
        : null;
      dateLabel.textContent =
        start && end
          ? `${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(start)} — ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(end)}`
          : "Tarix aralığı";
      datePopover.classList.remove("open");
      const activeForm = document.getElementById("searchForm");
      activeForm?.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true }),
      );
    });
  }
});
