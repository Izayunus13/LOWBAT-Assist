(() => {
  "use strict";

  const data = window.LOWBAT_DATA;
  const rundown = Array.isArray(window.RUNDOWN_DATA) ? window.RUNDOWN_DATA : [];
  const tursoApi = window.LOWBAT_TURSO?.apiPath || "/api/history";

  if (!data) {
    console.error("LOWBAT_DATA tidak ditemukan. Pastikan js/templates.js sudah dimuat.");
    return;
  }

  const state = {
    page: "dashboard",
    currentStep: 1,
    selectedTemplateId: "",
    selectedFaculty: "",
    selectedMikat: "",
    selectedSportCategory: "",
    selectedSport: "",
    eventDate: "",

    basketCategory: "",
    opponentFaculty: "",
    matchStatus: "HOME",
    registrationTime: "",
    tipOffTime: "",
    basketVenue: "",

    timeMode: "single",
    eventTime: "",
    eventPlace: "",

    staffName: localStorage.getItem("lowbat-staff-name") || "",
    generatedText: "",
    sharedHistory: [],
    historyLoading: false,
    databaseOnline: false,
    activeHistoryId: null
  };

  const $ = (id) => document.getElementById(id);

  const dom = {
    navItems: [...document.querySelectorAll(".nav-item")],
    pageSections: [...document.querySelectorAll(".page-section")],
    pageTitle: $("pageTitle"),
    sidebar: $("sidebar"),
    menuButton: $("menuButton"),
    dynamicGreeting: $("dynamicGreeting"),
    wibClock: $("wibClock"),

    statUpcoming: $("statUpcoming"),
    statToday: $("statToday"),
    statGenerated: $("statGenerated"),
    statDatabaseStatus: $("statDatabaseStatus"),
    statDatabaseCaption: $("statDatabaseCaption"),
    scheduleList: $("scheduleList"),
    recentList: $("recentList"),

    templatePreviewGrid: $("templatePreviewGrid"),
    resultPanel: $("resultPanel"),
    resultText: $("resultText"),
    copyResultButton: $("copyResultButton"),
    copyStatus: $("copyStatus"),

    databaseChip: $("databaseChip"),
    databaseStatusLabel: $("databaseStatusLabel"),
    historySearchInput: $("historySearchInput"),
    historyFacultyFilter: $("historyFacultyFilter"),
    historyTemplateFilter: $("historyTemplateFilter"),
    refreshHistoryButton: $("refreshHistoryButton"),
    historyCountLabel: $("historyCountLabel"),
    sharedHistoryList: $("sharedHistoryList"),

    modal: $("generatorModal"),
    closeModalButton: $("closeModalButton"),
    wizardSteps: [...document.querySelectorAll(".wizard-step")],
    stepDots: [...document.querySelectorAll(".step-dot")],
    backButton: $("backButton"),
    nextButton: $("nextButton"),
    generateButton: $("generateButton"),

    templateChoiceGrid: $("templateChoiceGrid"),
    templateError: $("templateError"),
    staffNameInput: $("staffNameInput"),
    facultySelect: $("facultySelect"),
    mikatField: $("mikatField"),
    mikatOptions: $("mikatOptions"),
    territoryNote: $("territoryNote"),
    delegationError: $("delegationError"),

    eventDetailFields: $("eventDetailFields"),
    noDetailMessage: $("noDetailMessage"),

    sportCategoryField: $("sportCategoryField"),
    sportCategorySelect: $("sportCategorySelect"),

    sportVariantField: $("sportVariantField"),
    sportVariantSelect: $("sportVariantSelect"),

    dateField: $("dateField"),
    eventDateInput: $("eventDateInput"),

    timeField: $("timeField"),
    timeModeButtons: [...document.querySelectorAll(".time-mode")],
    timeSingleMode: $("timeSingleMode"),
    timeRangeMode: $("timeRangeMode"),
    timeFinishMode: $("timeFinishMode"),

    eventTimeInput: $("eventTimeInput"),
    eventTimeStartInput: $("eventTimeStartInput"),
    eventTimeEndInput: $("eventTimeEndInput"),
    eventTimeFinishInput: $("eventTimeFinishInput"),

    placeField: $("placeField"),
    eventPlaceInput: $("eventPlaceInput"),

    detailError: $("detailError"),

    reviewGrid: $("reviewGrid"),
    wizardPreview: $("wizardPreview"),

    crosscheckInput: $("crosscheckInput"),
    crosscheckError: $("crosscheckError"),

    historyDetailModal: $("historyDetailModal"),
    closeHistoryDetailButton: $("closeHistoryDetailButton"),

    historyDetailTitle: $("historyDetailTitle"),
    historyDetailMeta: $("historyDetailMeta"),
    historyDetailText: $("historyDetailText"),

    copyHistoryDetailButton: $("copyHistoryDetailButton"),

    toast: $("toast"),
    toastText: $("toastText")
  };

  const pageTitles = {
    dashboard: "Dashboard",
    generator: "Jarkoman Generator",
    history: "Riwayat Bersama",
    guide: "Panduan LO"
  };

  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember"
  ];

  const dayNames = [
    "Minggu",
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu"
  ];

  function getWIBDate() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23"
    }).formatToParts(new Date());

    const values = {};

    parts.forEach((part) => {
      if (part.type !== "literal") {
        values[part.type] = part.value;
      }
    });

    return {
      year: Number(values.year),
      month: Number(values.month),
      day: Number(values.day),
      hour: Number(values.hour),
      minute: Number(values.minute),
      second: Number(values.second),
      isoDate: `${values.year}-${values.month}-${values.day}`,
      time: `${values.hour}:${values.minute}:${values.second}`
    };
  }

  function getGreetingWord() {
    const hour = getWIBDate().hour;

    if (hour >= 4 && hour < 10) return "Pagi";
    if (hour >= 10 && hour < 15) return "Siang";
    if (hour >= 15 && hour < 18) return "Sore";

    return "Malam";
  }

  function updateClock() {
    const now = getWIBDate();

    dom.wibClock.textContent = now.time;
    dom.dynamicGreeting.textContent =
      `Selamat ${getGreetingWord()}, LOWBAT!`;
  }

  function switchPage(page) {
    state.page = page;

    dom.navItems.forEach((item) => {
      item.classList.toggle(
        "active",
        item.dataset.page === page
      );
    });

    dom.pageSections.forEach((section) => {
      section.classList.toggle(
        "active",
        section.id === `page-${page}`
      );
    });

    dom.pageTitle.textContent =
      pageTitles[page] || "LOWBAT Assist";

    dom.sidebar.classList.remove("open");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    if (page === "history") {
      loadSharedHistory({
        silent: state.sharedHistory.length > 0
      });
    }
  }

  function getTemplateById(id) {
    return data.templates.find(
      (template) => template.id === id
    );
  }

  function isTerritoryFaculty(
    faculty = state.selectedFaculty
  ) {
    const normalized = String(faculty || "")
      .trim()
      .toLowerCase()
      .replace(/\s*&\s*/g, " dan ")
      .replace(/\s+/g, " ");

    return normalized === "wilayah dan daerah";
  }

  function makeSportDisplay(category, variant) {
    if (!variant) return "";

    return ["Badminton", "Taekwondo"].includes(category)
      ? `${category} ${variant}`
      : variant;
  }

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function createUUID() {
    if (window.crypto?.randomUUID) {
      return window.crypto.randomUUID();
    }

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
      .replace(/[xy]/g, (char) => {
        const random = Math.floor(
          Math.random() * 16
        );

        const value =
          char === "x"
            ? random
            : (random & 0x3) | 0x8;

        return value.toString(16);
      });
  }

  function formatEventDate(value) {
    if (!value) return "-";

    const [year, month, day] =
      value.split("-").map(Number);

    const date = new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );

    return `${dayNames[date.getUTCDay()]}, ${day} ${monthNames[month - 1]} ${year}`;
  }

  function formatTime(value) {
    if (!value) return "-";

    const text = String(value).trim();

    if (
      text
        .toLowerCase()
        .includes("selesai")
    ) {
      const start =
        text.split(" - ")[0]?.trim();

      return `${String(start)
        .slice(0, 5)
        .replace(":", ".")} - Selesai`;
    }

    if (text.includes(" - ")) {
      const [start, end] =
        text.split(" - ");

      return `${String(start)
        .slice(0, 5)
        .replace(":", ".")} - ${String(end)
        .slice(0, 5)
        .replace(":", ".")}`;
    }

    return text
      .slice(0, 5)
      .replace(":", ".");
  }

  function getSelectedTimeValue() {
    if (state.timeMode === "range") {
      const start =
        dom.eventTimeStartInput?.value || "";

      const end =
        dom.eventTimeEndInput?.value || "";

      return start && end
        ? `${start} - ${end}`
        : "";
    }

    if (state.timeMode === "finish") {
      const start =
        dom.eventTimeFinishInput?.value || "";

      return start
        ? `${start} - Selesai`
        : "";
    }

    return dom.eventTimeInput?.value || "";
  }

  function setTimeMode(mode = "single") {
    state.timeMode =
      ["single", "range", "finish"].includes(mode)
        ? mode
        : "single";

    dom.timeModeButtons.forEach((button) => {
      const isActive =
        button.dataset.timeMode ===
        state.timeMode;

      button.classList.toggle(
        "active",
        isActive
      );

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    dom.timeSingleMode?.classList.toggle(
      "active",
      state.timeMode === "single"
    );

    dom.timeRangeMode?.classList.toggle(
      "active",
      state.timeMode === "range"
    );

    dom.timeFinishMode?.classList.toggle(
      "active",
      state.timeMode === "finish"
    );

    state.eventTime =
      getSelectedTimeValue();
  }

  function validateTimeInput() {
    if (state.timeMode === "range") {
      const start =
        dom.eventTimeStartInput?.value || "";

      const end =
        dom.eventTimeEndInput?.value || "";

      if (!start || !end) {
        return {
          valid: false,
          message:
            "Isi waktu mulai dan waktu selesai terlebih dahulu."
        };
      }

      if (end <= start) {
        return {
          valid: false,
          message:
            "Waktu selesai harus setelah waktu mulai."
        };
      }

      return {
        valid: true,
        value: `${start} - ${end}`
      };
    }

    if (state.timeMode === "finish") {
      const start =
        dom.eventTimeFinishInput?.value || "";

      if (!start) {
        return {
          valid: false,
          message:
            "Isi waktu mulai terlebih dahulu."
        };
      }

      return {
        valid: true,
        value: `${start} - Selesai`
      };
    }

    const time =
      dom.eventTimeInput?.value || "";

    if (!time) {
      return {
        valid: false,
        message:
          "Isi waktu kegiatan terlebih dahulu."
      };
    }

    return {
      valid: true,
      value: time
    };
  }

  function resetTimeFields() {
    if (dom.eventTimeInput) {
      dom.eventTimeInput.value = "";
    }

    if (dom.eventTimeStartInput) {
      dom.eventTimeStartInput.value = "";
    }

    if (dom.eventTimeEndInput) {
      dom.eventTimeEndInput.value = "";
    }

    if (dom.eventTimeFinishInput) {
      dom.eventTimeFinishInput.value = "";
    }

    state.eventTime = "";

    setTimeMode("single");
  }

  /* =========================================================
     BASKET MATCH
     ========================================================= */

  function getFacultyShort(faculty) {
    return (
      data.facultyShortMap?.[faculty] ||
      faculty ||
      "-"
    );
  }

  /*
  PENTING:
  Fakultas yang sedang dijarkom selalu di kiri.
  HOME / AWAY tidak pernah membalik matchup.
  */

  function getMatchupText() {
    if (
      !state.selectedFaculty ||
      !state.opponentFaculty
    ) {
      return "";
    }

    return (
      `${getFacultyShort(state.selectedFaculty)} vs ` +
      `${getFacultyShort(state.opponentFaculty)}`
    );
  }

  function setBasketCategory(
    category = ""
  ) {
    state.basketCategory =
      category;

    dom.basketCategoryButtons
      ?.forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.basketCategory ===
            category
        );
      });

    updateBasketMatchPreview();
  }

  function setMatchStatus(
    status = "HOME"
  ) {
    state.matchStatus =
      status;

    dom.matchStatusButtons
      ?.forEach((button) => {
        button.classList.toggle(
          "active",
          button.dataset.matchStatus ===
            status
        );
      });

    updateBasketMatchPreview();
  }

  function updateBasketMatchPreview() {
    if (!dom.basketMatchPreview) {
      return;
    }

    if (
      !state.selectedFaculty ||
      !state.opponentFaculty
    ) {
      dom.basketMatchPreview.innerHTML = `
        <div class="match-preview-icon">
          🏀
        </div>

        <div>
          <small>
            Preview Pertandingan
          </small>

          <strong>
            Pilih fakultas lawan
          </strong>
        </div>
      `;

      return;
    }

    const category =
      state.basketCategory
        ? `${state.basketCategory} · `
        : "";

    dom.basketMatchPreview.innerHTML = `
      <div class="match-preview-icon">
        🏀
      </div>

      <div>
        <small>
          Preview Pertandingan
        </small>

        <strong>
          ${escapeHTML(
            getMatchupText()
          )}
        </strong>

        <span>
          ${escapeHTML(
            category +
              state.matchStatus
          )}
        </span>
      </div>
    `;
  }

  function updateOpponentButton() {
    if (!dom.opponentPickerButton) {
      return;
    }

    if (!state.opponentFaculty) {
      dom.opponentPickerButton.innerHTML = `
        <span class="opponent-picker-icon">
          ⚔️
        </span>

        <span class="opponent-picker-content">
          <small>
            Lawan Pertandingan
          </small>

          <strong>
            Pilih Fakultas Lawan
          </strong>
        </span>

        <span class="opponent-picker-arrow">
          ›
        </span>
      `;

      return;
    }

    dom.opponentPickerButton.innerHTML = `
      <span class="opponent-picker-icon">
        ⚔️
      </span>

      <span class="opponent-picker-content">
        <small>
          Lawan Pertandingan
        </small>

        <strong>
          ${escapeHTML(
            getFacultyShort(
              state.opponentFaculty
            )
          )}
        </strong>

        <em>
          ${escapeHTML(
            state.opponentFaculty
          )}
        </em>
      </span>

      <span class="opponent-picker-arrow">
        ›
      </span>
    `;
  }

  function renderOpponentChoices() {
    if (!dom.opponentGrid) {
      return;
    }

    const faculties =
      data.faculties.filter(
        (faculty) =>
          faculty !==
          state.selectedFaculty
      );

    dom.opponentGrid.innerHTML =
      faculties
        .map(
          (faculty) => `
            <button
              type="button"
              class="opponent-option ${
                state.opponentFaculty === faculty
                  ? "active"
                  : ""
              }"
              data-opponent-faculty="${escapeHTML(
                faculty
              )}"
            >
              <strong>
                ${escapeHTML(
                  getFacultyShort(
                    faculty
                  )
                )}
              </strong>

              <span>
                ${escapeHTML(
                  faculty
                )}
              </span>
            </button>
          `
        )
        .join("");
  }

  function openOpponentPicker() {
    renderOpponentChoices();

    dom.opponentModal
      ?.classList.remove(
        "hidden"
      );

    dom.opponentModal
      ?.setAttribute(
        "aria-hidden",
        "false"
      );
  }

  function closeOpponentPicker() {
    dom.opponentModal
      ?.classList.add(
        "hidden"
      );

    dom.opponentModal
      ?.setAttribute(
        "aria-hidden",
        "true"
      );
  }

  function ensureBasketMatchUI() {
    if (
      document.getElementById(
        "basketMatchBeforeDate"
      ) ||
      !dom.eventDetailFields
    ) {
      return;
    }

    /*
    Bagian ini diletakkan sebelum input tanggal:
    Cabor Basket
    ↓
    Putra/Putri
    ↓
    Lawan
    ↓
    Home/Away
    ↓
    Tanggal
    */

    const beforeDate =
      document.createElement(
        "div"
      );

    beforeDate.id =
      "basketMatchBeforeDate";

    beforeDate.className =
      "basket-match-fields hidden";

    beforeDate.innerHTML = `
      <div class="field full-field basket-special-field">

        <span>
          Kategori Basket
        </span>

        <div class="basket-choice-grid">

          <button
            type="button"
            class="basket-choice-button"
            data-basket-category="PUTRA"
          >
            <span class="basket-choice-icon">
              🏀
            </span>

            <span>
              <small>
                Kategori
              </small>

              <strong>
                PUTRA
              </strong>
            </span>
          </button>


          <button
            type="button"
            class="basket-choice-button"
            data-basket-category="PUTRI"
          >
            <span class="basket-choice-icon">
              🏀
            </span>

            <span>
              <small>
                Kategori
              </small>

              <strong>
                PUTRI
              </strong>
            </span>
          </button>

        </div>

      </div>


      <div class="field full-field basket-special-field">

        <span>
          Fakultas Lawan
        </span>

        <button
          type="button"
          class="opponent-picker-button"
          id="opponentPickerButton"
        >

          <span class="opponent-picker-icon">
            ⚔️
          </span>

          <span class="opponent-picker-content">

            <small>
              Lawan Pertandingan
            </small>

            <strong>
              Pilih Fakultas Lawan
            </strong>

          </span>

          <span class="opponent-picker-arrow">
            ›
          </span>

        </button>

      </div>


      <div class="field full-field basket-special-field">

        <span>
          Status Pertandingan
        </span>

        <div class="basket-choice-grid">

          <button
            type="button"
            class="basket-choice-button active"
            data-match-status="HOME"
          >
            <span class="basket-choice-icon">
              🏠
            </span>

            <span>
              <small>
                Status
              </small>

              <strong>
                HOME
              </strong>
            </span>
          </button>


          <button
            type="button"
            class="basket-choice-button"
            data-match-status="AWAY"
          >
            <span class="basket-choice-icon">
              🚌
            </span>

            <span>
              <small>
                Status
              </small>

              <strong>
                AWAY
              </strong>
            </span>
          </button>

        </div>

      </div>


      <div
        class="basket-match-preview full-field"
        id="basketMatchPreview"
      ></div>
    `;

    /*
    Bagian ini diletakkan setelah input tanggal:
    Registrasi
    ↓
    Tip Off
    ↓
    Venue
    */

    const afterDate =
      document.createElement(
        "div"
      );

    afterDate.id =
      "basketMatchAfterDate";

    afterDate.className =
      "basket-match-fields hidden";

    afterDate.innerHTML = `
      <label class="field basket-special-field">

        <span>
          Jam Registrasi
        </span>

        <input
          type="time"
          id="registrationTimeInput"
        />

        <small class="basket-field-note">
          WIB ditambahkan otomatis.
        </small>

      </label>


      <label class="field basket-special-field">

        <span>
          Jam Tip Off
        </span>

        <input
          type="time"
          id="tipOffTimeInput"
        />

        <small class="basket-field-note">
          WIB ditambahkan otomatis.
        </small>

      </label>


      <label class="field full-field basket-special-field">

        <span>
          Venue Pertandingan
        </span>

        <select
          id="basketVenueSelect"
        >

          <option value="">
            Pilih venue pertandingan
          </option>

          ${(
            data.venues || []
          )
            .map(
              (venue) => `
                <option
                  value="${escapeHTML(
                    venue
                  )}"
                >
                  ${escapeHTML(
                    venue
                  )}
                </option>
              `
            )
            .join("")}

        </select>

      </label>
    `;

    dom.eventDetailFields.insertBefore(
      beforeDate,
      dom.dateField
    );

    dom.dateField.insertAdjacentElement(
      "afterend",
      afterDate
    );

    /*
    POPUP PEMILIHAN LAWAN
    */

    const opponentModal =
      document.createElement(
        "div"
      );

    opponentModal.id =
      "opponentModal";

    opponentModal.className =
      "opponent-picker-backdrop hidden";

    opponentModal.setAttribute(
      "aria-hidden",
      "true"
    );

    opponentModal.innerHTML = `
      <div
        class="opponent-picker-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="opponentPickerTitle"
      >

        <div class="opponent-picker-header">

          <div>

            <span class="opponent-picker-eyebrow">
              🏀 OLIMDIPO 2026
            </span>

            <h3 id="opponentPickerTitle">
              Pilih Fakultas Lawan
            </h3>

            <p>
              Fakultas yang sedang dijarkom tidak ditampilkan sebagai pilihan lawan.
            </p>

          </div>


          <button
            type="button"
            class="opponent-close-button"
            id="closeOpponentButton"
            aria-label="Tutup"
          >
            ✕
          </button>

        </div>


        <div
          class="opponent-grid"
          id="opponentGrid"
        ></div>

      </div>
    `;

    document.body.appendChild(
      opponentModal
    );

    dom.basketMatchSections = [
      beforeDate,
      afterDate
    ];

    dom.basketCategoryButtons = [
      ...beforeDate.querySelectorAll(
        "[data-basket-category]"
      )
    ];

    dom.matchStatusButtons = [
      ...beforeDate.querySelectorAll(
        "[data-match-status]"
      )
    ];

    dom.opponentPickerButton =
      $("opponentPickerButton");

    dom.basketMatchPreview =
      $("basketMatchPreview");

    dom.registrationTimeInput =
      $("registrationTimeInput");

    dom.tipOffTimeInput =
      $("tipOffTimeInput");

    dom.basketVenueSelect =
      $("basketVenueSelect");

    dom.opponentModal =
      $("opponentModal");

    dom.closeOpponentButton =
      $("closeOpponentButton");

    dom.opponentGrid =
      $("opponentGrid");

    /*
    KATEGORI PUTRA / PUTRI
    */

    dom.basketCategoryButtons
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            setBasketCategory(
              button.dataset
                .basketCategory
            );

            dom.detailError
              .textContent = "";
          }
        );
      });

    /*
    HOME / AWAY
    */

    dom.matchStatusButtons
      .forEach((button) => {
        button.addEventListener(
          "click",
          () => {
            setMatchStatus(
              button.dataset
                .matchStatus
            );

            dom.detailError
              .textContent = "";
          }
        );
      });

    /*
    OPEN POPUP
    */

    dom.opponentPickerButton
      .addEventListener(
        "click",
        openOpponentPicker
      );

    /*
    CLOSE POPUP
    */

    dom.closeOpponentButton
      .addEventListener(
        "click",
        closeOpponentPicker
      );

    dom.opponentModal
      .addEventListener(
        "click",
        (event) => {
          if (
            event.target ===
            dom.opponentModal
          ) {
            closeOpponentPicker();
          }
        }
      );

    /*
    PILIH LAWAN
    */

    dom.opponentGrid
      .addEventListener(
        "click",
        (event) => {
          const option =
            event.target.closest(
              "[data-opponent-faculty]"
            );

          if (!option) {
            return;
          }

          state.opponentFaculty =
            option.dataset
              .opponentFaculty;

          updateOpponentButton();

          updateBasketMatchPreview();

          dom.detailError
            .textContent = "";

          closeOpponentPicker();
        }
      );

    /*
    JAM REGISTRASI
    */

    dom.registrationTimeInput
      .addEventListener(
        "input",
        () => {
          state.registrationTime =
            dom.registrationTimeInput
              .value;

          dom.detailError
            .textContent = "";
        }
      );

    /*
    JAM TIP OFF
    */

    dom.tipOffTimeInput
      .addEventListener(
        "input",
        () => {
          state.tipOffTime =
            dom.tipOffTimeInput
              .value;

          dom.detailError
            .textContent = "";
        }
      );

    /*
    VENUE
    */

    dom.basketVenueSelect
      .addEventListener(
        "change",
        () => {
          state.basketVenue =
            dom.basketVenueSelect
              .value;

          dom.detailError
            .textContent = "";
        }
      );

    setBasketCategory("");

    setMatchStatus("HOME");

    updateOpponentButton();

    updateBasketMatchPreview();
  }

  function formatCreatedAt(value) {
    if (!value) return "-";

    return new Intl.DateTimeFormat(
      "id-ID",
      {
        timeZone:
          "Asia/Jakarta",

        day:
          "2-digit",

        month:
          "short",

        year:
          "numeric",

        hour:
          "2-digit",

        minute:
          "2-digit"
      }
    ).format(
      new Date(value)
    );
  }

  function setDatabaseStatus(
    status,
    message
  ) {
    state.databaseOnline =
      status === "online";

    const dot =
      dom.databaseChip
        ?.querySelector(
          ".status-dot"
        );

    if (dot) {
      dot.classList.remove(
        "checking",
        "online",
        "offline"
      );

      dot.classList.add(
        status
      );
    }

    if (
      dom.databaseStatusLabel
    ) {
      dom.databaseStatusLabel
        .textContent =
        message;
    }

    if (
      dom.statDatabaseStatus
    ) {
      dom.statDatabaseStatus
        .textContent =
        status === "online"
          ? "ONLINE"
          : status === "offline"
            ? "OFFLINE"
            : "...";
    }

    if (
      dom.statDatabaseCaption
    ) {
      dom.statDatabaseCaption
        .textContent =
        status === "online"
          ? "Turso terhubung"
          : status === "offline"
            ? "menggunakan cadangan lokal"
            : "mengecek koneksi";
    }
  }

  function renderTemplateCards() {
    dom.templatePreviewGrid.innerHTML =
      "";

    dom.templateChoiceGrid.innerHTML =
      "";

    data.templates.forEach(
      (template, index) => {
        const card =
          document.createElement(
            "article"
          );

        card.className =
          "template-preview-card";

        card.dataset.number =
          String(index + 1)
            .padStart(2, "0");

        card.tabIndex = 0;

        card.innerHTML = `
          <div class="template-icon">
            ${template.icon}
          </div>

          <h4>
            ${escapeHTML(
              template.title
            )}
          </h4>

          <p>
            ${escapeHTML(
              template.description
            )}
          </p>
        `;

        card.addEventListener(
          "click",
          () => {
            openGenerator(
              template.id
            );
          }
        );

        card.addEventListener(
          "keydown",
          (event) => {
            if (
              event.key ===
                "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();

              openGenerator(
                template.id
              );
            }
          }
        );

        dom.templatePreviewGrid
          .appendChild(
            card
          );

        const choice =
          document.createElement(
            "div"
          );

        choice.className =
          "template-choice";

        choice.innerHTML = `
          <input
            type="radio"
            name="template-choice"
            id="template-${template.id}"
            value="${template.id}"
          />

          <label
            for="template-${template.id}"
          >

            <span>
              ${template.icon}
            </span>

            <strong>
              ${escapeHTML(
                template.title
              )}
            </strong>

            <small>
              ${escapeHTML(
                template.description
              )}
            </small>

          </label>
        `;

        choice
          .querySelector(
            "input"
          )
          .addEventListener(
            "change",
            (event) => {
              state.selectedTemplateId =
                event.target.value;

              dom.templateError
                .textContent = "";
            }
          );

        dom.templateChoiceGrid
          .appendChild(
            choice
          );
      }
    );
  }

  function populateFields() {
    data.faculties.forEach(
      (faculty) => {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          faculty;

        option.textContent =
          faculty;

        dom.facultySelect
          .appendChild(
            option
          );

        const filterOption =
          document.createElement(
            "option"
          );

        filterOption.value =
          faculty;

        filterOption.textContent =
          faculty;

        dom.historyFacultyFilter
          .appendChild(
            filterOption
          );
      }
    );

    data.templates.forEach(
      (template) => {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          template.title;

        option.textContent =
          template.title;

        dom.historyTemplateFilter
          .appendChild(
            option
          );
      }
    );

    data.mikatOptions.forEach(
      (mikat) => {
        const wrapper =
          document.createElement(
            "div"
          );

        wrapper.className =
          "segmented-option";

        wrapper.innerHTML = `
          <input
            type="radio"
            name="mikat-name"
            id="mikat-${slugify(
              mikat
            )}"
            value="${mikat}"
          />

          <label
            for="mikat-${slugify(
              mikat
            )}"
          >
            ${mikat}
          </label>
        `;

        wrapper
          .querySelector(
            "input"
          )
          .addEventListener(
            "change",
            (event) => {
              state.selectedMikat =
                event.target.value;

              dom.delegationError
                .textContent = "";
            }
          );

        dom.mikatOptions
          .appendChild(
            wrapper
          );
      }
    );

    Object.keys(
      data.sportsMap || {}
    ).forEach(
      (category) => {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          category;

        option.textContent =
          category;

        dom.sportCategorySelect
          .appendChild(
            option
          );
      }
    );
  }

  function updateDelegationUI() {
    const isTerritory =
      isTerritoryFaculty();

    dom.mikatField
      .classList.toggle(
        "hidden",
        isTerritory
      );

    dom.territoryNote
      .classList.toggle(
        "hidden",
        !isTerritory
      );

    if (isTerritory) {
      state.selectedMikat = "";

      document
        .querySelectorAll(
          'input[name="mikat-name"]'
        )
        .forEach(
          (input) => {
            input.checked =
              false;
          }
        );
    }
  }

  function updateSportVariantOptions() {
    const variants =
      data.sportsMap?.[
        state.selectedSportCategory
      ] || [];

    dom.sportVariantSelect
      .innerHTML =
      '<option value="">Pilih kategori</option>';

    variants.forEach(
      (variant) => {
        const option =
          document.createElement(
            "option"
          );

        option.value =
          variant;

        option.textContent =
          variant;

        dom.sportVariantSelect
          .appendChild(
            option
          );
      }
    );

    if (
      variants.length === 1
    ) {
      state.selectedSport =
        makeSportDisplay(
          state.selectedSportCategory,
          variants[0]
        );

      dom.sportVariantSelect.value =
        variants[0];

      dom.sportVariantField
        .classList.add(
          "hidden"
        );
    } else {
      state.selectedSport = "";

      dom.sportVariantField
        .classList.toggle(
          "hidden",
          variants.length === 0
        );
    }
  }

  function configureDetailFields() {
    const template =
      getTemplateById(
        state.selectedTemplateId
      );

    if (!template) {
      return;
    }

    const hasDetail =
      template.requiresSport ||
      template.requiresDate ||
      template.requiresTime ||
      template.requiresPlace ||
      template.requiresBasketMatch;

    dom.noDetailMessage
      .classList.toggle(
        "hidden",
        hasDetail
      );

    dom.eventDetailFields
      .classList.toggle(
        "hidden",
        !hasDetail
      );

    dom.sportCategoryField
      .classList.toggle(
        "hidden",
        !template.requiresSport
      );

    dom.dateField
      .classList.toggle(
        "hidden",
        !template.requiresDate
      );

    dom.timeField
      .classList.toggle(
        "hidden",
        !template.requiresTime
      );

    dom.placeField
      .classList.toggle(
        "hidden",
        !template.requiresPlace
      );

    if (
      template.requiresSport
    ) {
      const variants =
        data.sportsMap?.[
          state.selectedSportCategory
        ] || [];

      dom.sportVariantField
        .classList.toggle(
          "hidden",
          !state.selectedSportCategory ||
            variants.length <= 1
        );
    } else {
      dom.sportVariantField
        .classList.add(
          "hidden"
        );
    }

    /*
    Bagian lanjutan Basket hanya muncul
    SETELAH user memilih cabor Basket.
    */

    const basketReady =
      Boolean(
        template.requiresBasketMatch
      ) &&
      state.selectedSportCategory ===
        "Basket" &&
      Boolean(
        state.selectedSport
      );

    dom.basketMatchSections
      ?.forEach(
        (section) => {
          section.classList.toggle(
            "hidden",
            !basketReady
          );
        }
      );

    /*
    Tanggal juga baru muncul setelah
    Basket dipilih.
    */

    if (
      template.requiresBasketMatch
    ) {
      dom.dateField
        .classList.toggle(
          "hidden",
          !basketReady
        );
    }

    if (basketReady) {
      renderOpponentChoices();

      updateOpponentButton();

      updateBasketMatchPreview();
    }
  }

  function resetGenerator() {
    Object.assign(
      state,
      {
        currentStep: 1,

        selectedTemplateId:
          "",

        selectedFaculty:
          "",

        selectedMikat:
          "",

        selectedSportCategory:
          "",

        selectedSport:
          "",

        eventDate:
          "",

        basketCategory:
          "",

        opponentFaculty:
          "",

        matchStatus:
          "HOME",

        registrationTime:
          "",

        tipOffTime:
          "",

        basketVenue:
          "",

        timeMode:
          "single",

        eventTime:
          "",

        eventPlace:
          ""
      }
    );

    document
      .querySelectorAll(
        'input[name="template-choice"], input[name="mikat-name"]'
      )
      .forEach(
        (input) => {
          input.checked =
            false;
        }
      );

    dom.staffNameInput.value =
      state.staffName;

    dom.facultySelect.value =
      "";

    dom.sportCategorySelect.value =
      "";

    dom.sportVariantSelect
      .innerHTML =
      '<option value="">Pilih kategori</option>';

    dom.eventDateInput.value =
      "";

    resetTimeFields();

    dom.eventPlaceInput.value =
      "";

    if (
      dom.registrationTimeInput
    ) {
      dom.registrationTimeInput.value =
        "";
    }

    if (
      dom.tipOffTimeInput
    ) {
      dom.tipOffTimeInput.value =
        "";
    }

    if (
      dom.basketVenueSelect
    ) {
      dom.basketVenueSelect.value =
        "";
    }

    setBasketCategory("");

    state.opponentFaculty =
      "";

    setMatchStatus("HOME");

    updateOpponentButton();

    updateBasketMatchPreview();

    dom.crosscheckInput.checked =
      false;

    [
      dom.templateError,
      dom.delegationError,
      dom.detailError,
      dom.crosscheckError
    ].forEach(
      (element) => {
        if (element) {
          element.textContent =
            "";
        }
      }
    );

    updateDelegationUI();

    showWizardStep(1);
  }

  function openGenerator(
    preselectedId = ""
  ) {
    resetGenerator();

    if (preselectedId) {
      state.selectedTemplateId =
        preselectedId;

      const radio =
        document.querySelector(
          `input[name="template-choice"][value="${preselectedId}"]`
        );

      if (radio) {
        radio.checked =
          true;
      }
    }

    dom.modal
      .classList.remove(
        "hidden"
      );

    dom.modal
      .setAttribute(
        "aria-hidden",
        "false"
      );

    document.body
      .classList.add(
        "modal-open"
      );
  }

  function closeGenerator() {
    dom.modal
      .classList.add(
        "hidden"
      );

    dom.modal
      .setAttribute(
        "aria-hidden",
        "true"
      );

    document.body
      .classList.remove(
        "modal-open"
      );
  }

  function showWizardStep(step) {
    state.currentStep =
      step;

    dom.wizardSteps.forEach(
      (section) => {
        section.classList.toggle(
          "active",
          Number(
            section.dataset.step
          ) === step
        );
      }
    );

    dom.stepDots.forEach(
      (dot) => {
        const value =
          Number(
            dot.dataset.stepDot
          );

        dot.classList.toggle(
          "active",
          value === step
        );

        dot.classList.toggle(
          "completed",
          value < step
        );
      }
    );

    dom.backButton
      .classList.toggle(
        "hidden",
        step === 1
      );

    dom.nextButton
      .classList.toggle(
        "hidden",
        step === 4
      );

    dom.generateButton
      .classList.toggle(
        "hidden",
        step !== 4
      );

    if (step === 3) {
      configureDetailFields();
    }

    if (step === 4) {
      renderReview();
    }
  }

  function validateStep(step) {
    if (step === 1) {
      if (
        !state.selectedTemplateId
      ) {
        dom.templateError
          .textContent =
          "Pilih salah satu jenis jarkoman terlebih dahulu.";

        return false;
      }

      dom.templateError
        .textContent = "";

      return true;
    }

    if (step === 2) {
      state.staffName =
        dom.staffNameInput
          .value
          .trim();

      state.selectedFaculty =
        dom.facultySelect
          .value;

      if (!state.staffName) {
        dom.delegationError
          .textContent =
          "Isi nama staff pembuat terlebih dahulu.";

        return false;
      }

      if (
        !state.selectedFaculty
      ) {
        dom.delegationError
          .textContent =
          "Fakultas atau delegasi belum dipilih.";

        return false;
      }

      if (
        !isTerritoryFaculty() &&
        !state.selectedMikat
      ) {
        dom.delegationError
          .textContent =
          "Pilih Seniora, Soraya, Mikatan, atau Mikat.";

        return false;
      }

      localStorage.setItem(
        "lowbat-staff-name",
        state.staffName
      );

      dom.delegationError
        .textContent = "";

      return true;
    }

    if (step === 3) {
      const template =
        getTemplateById(
          state.selectedTemplateId
        );

      if (!template) {
        return false;
      }

      state.selectedSportCategory =
        dom.sportCategorySelect
          .value;

      state.selectedSport =
        makeSportDisplay(
          state.selectedSportCategory,
          dom.sportVariantSelect
            .value
        ) ||
        state.selectedSport;

      state.eventDate =
        dom.eventDateInput
          .value;

      state.eventPlace =
        dom.eventPlaceInput
          .value
          .trim();

      /*
      VALIDASI PERTANDINGAN BASKET
      */

      if (
        template.requiresBasketMatch
      ) {
        if (
          state.selectedSportCategory !==
            "Basket" ||
          !state.selectedSport
        ) {
          dom.detailError
            .textContent =
            "Pilih cabang olahraga Basket terlebih dahulu.";

          return false;
        }

        state.registrationTime =
          dom.registrationTimeInput
            ?.value || "";

        state.tipOffTime =
          dom.tipOffTimeInput
            ?.value || "";

        state.basketVenue =
          dom.basketVenueSelect
            ?.value || "";

        if (
          !state.basketCategory
        ) {
          dom.detailError
            .textContent =
            "Pilih kategori Basket PUTRA atau PUTRI terlebih dahulu.";

          return false;
        }

        if (
          !state.opponentFaculty
        ) {
          dom.detailError
            .textContent =
            "Pilih fakultas lawan terlebih dahulu.";

          return false;
        }

        if (
          !state.matchStatus
        ) {
          dom.detailError
            .textContent =
            "Pilih status HOME atau AWAY terlebih dahulu.";

          return false;
        }

        if (
          !state.eventDate
        ) {
          dom.detailError
            .textContent =
            "Pilih hari/tanggal pertandingan terlebih dahulu.";

          return false;
        }

        if (
          !state.registrationTime
        ) {
          dom.detailError
            .textContent =
            "Isi jam registrasi terlebih dahulu.";

          return false;
        }

        if (
          !state.tipOffTime
        ) {
          dom.detailError
            .textContent =
            "Isi jam Tip Off terlebih dahulu.";

          return false;
        }

        if (
          state.registrationTime >=
          state.tipOffTime
        ) {
          dom.detailError
            .textContent =
            "Jam registrasi harus lebih awal dari jam Tip Off.";

          return false;
        }

        if (
          !state.basketVenue
        ) {
          dom.detailError
            .textContent =
            "Pilih venue pertandingan terlebih dahulu.";

          return false;
        }

        /*
        History lama tetap kompatibel:
        sport = Basket
        time = Tip Off
        place = Venue
        */

        state.selectedSport =
          "Basket";

        state.eventTime =
          state.tipOffTime;

        state.eventPlace =
          state.basketVenue;
      }

      if (
        template.requiresTime
      ) {
        const timeValidation =
          validateTimeInput();

        if (
          !timeValidation.valid
        ) {
          dom.detailError
            .textContent =
            timeValidation.message;

          return false;
        }

        state.eventTime =
          timeValidation.value;
      } else if (
        !template.requiresBasketMatch
      ) {
        state.eventTime = "";
      }

      const missing = [];

      if (
        template.requiresSport &&
        !state.selectedSport
      ) {
        missing.push(
          "cabang olahraga"
        );
      }

      if (
        template.requiresDate &&
        !state.eventDate
      ) {
        missing.push(
          "hari/tanggal"
        );
      }

      if (
        template.requiresPlace &&
        !state.eventPlace
      ) {
        missing.push(
          "tempat"
        );
      }

      if (missing.length) {
        dom.detailError
          .textContent =
          `Lengkapi ${missing.join(", ")} terlebih dahulu.`;

        return false;
      }

      dom.detailError
        .textContent = "";

      return true;
    }

    return true;
  }

  function getMikatLabel() {
    return isTerritoryFaculty()
      ? state.selectedFaculty
      : `${state.selectedMikat} ${state.selectedFaculty}`.trim();
  }

  function buildJarkoman() {
    const template =
      getTemplateById(
        state.selectedTemplateId
      );

    if (!template) {
      return "";
    }

    const replacements = {
      "{GREETING}":
        getGreetingWord(),

      "{MIKAT_LABEL}":
        getMikatLabel(),

      "{FACULTY}":
        state.selectedFaculty ||
        "-",

      "{SPORT}":
        state.selectedSport ||
        "-",

      "{DAY_DATE}":
        formatEventDate(
          state.eventDate
        ),

      "{TIME}":
        formatTime(
          state.eventTime
        ),

      "{PLACE}":
        state.eventPlace ||
        "-",

      "{BASKET_CATEGORY}":
        state.basketCategory ||
        "-",

      /*
      Fakultas yang dijarkom
      selalu berada di kiri.
      */

      "{MATCHUP}":
        getMatchupText() ||
        "-",

      "{MATCH_STATUS}":
        state.matchStatus ||
        "-",

      "{REGISTRATION_TIME}":
        formatTime(
          state.registrationTime
        ),

      "{TIPOFF_TIME}":
        formatTime(
          state.tipOffTime
        ),

      "{VENUE}":
        state.basketVenue ||
        "-"
    };

    let output =
      template.content;

    Object.entries(
      replacements
    ).forEach(
      ([
        placeholder,
        value
      ]) => {
        output =
          output
            .split(
              placeholder
            )
            .join(value);
      }
    );

    return output.trim();
  }

  function renderReview() {
    const template =
      getTemplateById(
        state.selectedTemplateId
      );

    const items = [
      [
        "Dibuat Oleh",
        state.staffName ||
          "-"
      ],

      [
        "Jenis Jarkoman",
        template?.title ||
          "-"
      ],

      [
        "Fakultas / Delegasi",
        state.selectedFaculty ||
          "-"
      ],

      [
        "Nama Mikat",
        isTerritoryFaculty()
          ? "Tidak diperlukan"
          : state.selectedMikat ||
            "-"
      ]
    ];

    if (
      template?.requiresSport
    ) {
      items.push([
        "Cabang Olahraga",
        state.selectedSport ||
          "-"
      ]);
    }

    if (
      template
        ?.requiresBasketMatch
    ) {
      items.push([
        "Kategori Basket",
        state.basketCategory ||
          "-"
      ]);

      items.push([
        "Pertandingan",
        getMatchupText() ||
          "-"
      ]);

      items.push([
        "Status",
        state.matchStatus ||
          "-"
      ]);

      if (
        template?.requiresDate
      ) {
        items.push([
          "Hari / Tanggal",
          formatEventDate(
            state.eventDate
          )
        ]);
      }

      items.push([
        "Registrasi",
        state.registrationTime
          ? `${formatTime(
              state.registrationTime
            )} WIB`
          : "-"
      ]);

      items.push([
        "Tip Off",
        state.tipOffTime
          ? `${formatTime(
              state.tipOffTime
            )} WIB`
          : "-"
      ]);

      items.push([
        "Venue",
        state.basketVenue ||
          "-"
      ]);
    } else if (
      template?.requiresDate
    ) {
      items.push([
        "Hari / Tanggal",
        formatEventDate(
          state.eventDate
        )
      ]);
    }

    if (
      template?.requiresTime
    ) {
      items.push([
        "Waktu",
        `${formatTime(
          state.eventTime
        )} WIB`
      ]);
    }

    if (
      template?.requiresPlace
    ) {
      items.push([
        "Tempat",
        state.eventPlace ||
          "-"
      ]);
    }

    dom.reviewGrid.innerHTML =
      items
        .map(
          ([
            label,
            value
          ]) => `
            <div class="review-item">

              <small>
                ${escapeHTML(
                  label
                )}
              </small>

              <strong>
                ${escapeHTML(
                  value
                )}
              </strong>

            </div>
          `
        )
        .join("");

    dom.wizardPreview
      .textContent =
      buildJarkoman();
  }

  function getLocalHistory() {
    try {
      const parsed =
        JSON.parse(
          localStorage.getItem(
            "lowbat-jarkoman-history"
          ) || "[]"
        );

      return Array.isArray(
        parsed
      )
        ? parsed
        : [];
    } catch {
      return [];
    }
  }

  function saveLocalHistory(record) {
    const history =
      getLocalHistory();

    history.unshift({
      id:
        record.id,

      title:
        record.template_title,

      template_title:
        record.template_title,

      faculty:
        record.faculty,

      mikat_name:
        record.mikat_name,

      sport:
        record.sport,

      event_date:
        record.event_date,

      event_time:
        record.event_time,

      event_place:
        record.event_place,

      text:
        record.generated_text,

      generated_text:
        record.generated_text,

      created_by:
        record.created_by,

      createdAt:
        record.created_at,

      created_at:
        record.created_at
    });

    localStorage.setItem(
      "lowbat-jarkoman-history",
      JSON.stringify(
        history.slice(
          0,
          30
        )
      )
    );
  }

  function getPendingQueue() {
    try {
      const parsed =
        JSON.parse(
          localStorage.getItem(
            "lowbat-pending-sync"
          ) || "[]"
        );

      return Array.isArray(
        parsed
      )
        ? parsed
        : [];
    } catch {
      return [];
    }
  }

  function savePendingQueue(queue) {
    localStorage.setItem(
      "lowbat-pending-sync",
      JSON.stringify(queue)
    );
  }

  function queuePendingRecord(record) {
    const queue =
      getPendingQueue();

    if (
      !queue.some(
        (item) =>
          item.id === record.id
      )
    ) {
      queue.push(record);
    }

    savePendingQueue(
      queue.slice(-50)
    );
  }

  async function insertSharedRecord(
    record
  ) {
    if (!tursoApi) {
      throw new Error(
        "Turso belum dikonfigurasi."
      );
    }

    const response =
      await fetch(
        tursoApi,
        {
          method:
            "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body:
            JSON.stringify(
              record
            )
        }
      );

    const payload =
      await response
        .json()
        .catch(
          () => ({})
        );

    if (!response.ok) {
      throw new Error(
        payload.error ||
          "Gagal menyimpan ke Turso."
      );
    }

    return true;
  }

  async function syncPendingRecords() {
    if (
      !tursoApi ||
      !navigator.onLine
    ) {
      return;
    }

    const queue =
      getPendingQueue();

    if (!queue.length) {
      return;
    }

    const remaining = [];

    for (
      const record of queue
    ) {
      try {
        await insertSharedRecord(
          record
        );
      } catch (error) {
        console.warn(
          "Riwayat tertunda belum tersinkron:",
          error
        );

        remaining.push(
          record
        );
      }
    }

    savePendingQueue(
      remaining
    );
  }

  function makeHistoryRecord(
    text
  ) {
    const template =
      getTemplateById(
        state.selectedTemplateId
      );

    return {
      id:
        createUUID(),

      template_title:
        template?.title ||
        "Jarkoman",

      faculty:
        state.selectedFaculty,

      mikat_name:
        isTerritoryFaculty()
          ? null
          : state.selectedMikat ||
            null,

      sport:
        state.selectedSport ||
        null,

      event_date:
        state.eventDate ||
        null,

      event_time:
        state.eventTime ||
        null,

      event_place:
        state.eventPlace ||
        null,

      generated_text:
        text,

      created_by:
        state.staffName,

      created_at:
        new Date()
          .toISOString()
    };
  }

  async function generateJarkoman() {
    if (
      !dom.crosscheckInput
        .checked
    ) {
      dom.crosscheckError
        .textContent =
        "Centang konfirmasi crosscheck sebelum generate.";

      return;
    }

    dom.crosscheckError
      .textContent = "";

    dom.generateButton
      .disabled = true;

    dom.generateButton
      .textContent =
      "Menyimpan...";

    state.generatedText =
      buildJarkoman();

    const record =
      makeHistoryRecord(
        state.generatedText
      );

    saveLocalHistory(
      record
    );

    let sharedSaved =
      false;

    try {
      await insertSharedRecord(
        record
      );

      sharedSaved =
        true;
    } catch (error) {
      console.error(
        "Gagal menyimpan riwayat bersama:",
        error
      );

      queuePendingRecord(
        record
      );
    }

    dom.resultText
      .textContent =
      state.generatedText;

    dom.resultPanel
      .classList.remove(
        "hidden"
      );

    dom.copyStatus
      .textContent =
      sharedSaved
        ? "Jarkoman dibuat dan tersimpan pada Riwayat Bersama."
        : "Jarkoman dibuat. Cadangan lokal tersimpan dan akan disinkronkan saat koneksi tersedia.";

    dom.copyStatus
      .classList.toggle(
        "sync-warning",
        !sharedSaved
      );

    dom.generateButton
      .disabled = false;

    dom.generateButton
      .textContent =
      "⚡ Generate Jarkoman";

    closeGenerator();

    switchPage(
      "generator"
    );

    if (sharedSaved) {
      await loadSharedHistory({
        silent: true
      });
    } else {
      renderDashboard();
    }

    setTimeout(
      () => {
        dom.resultPanel
          .scrollIntoView({
            behavior:
              "smooth",

            block:
              "start"
          });
      },
      120
    );

    showToast(
      sharedSaved
        ? "Jarkoman tersimpan di Riwayat Bersama!"
        : "Jarkoman tersimpan lokal. Sinkronisasi tertunda."
    );
  }

  function getCountdownLabel(
    dateString
  ) {
    const now =
      getWIBDate();

    const current =
      new Date(
        `${now.isoDate}T00:00:00+07:00`
      );

    const target =
      new Date(
        `${dateString}T00:00:00+07:00`
      );

    const difference =
      Math.round(
        (
          target -
          current
        ) /
          86400000
      );

    if (
      difference === 0
    ) {
      return "Hari ini";
    }

    if (
      difference === 1
    ) {
      return "Besok";
    }

    return `${difference} hari lagi`;
  }

  function renderSchedule(items) {
    if (!items.length) {
      dom.scheduleList
        .innerHTML = `
          <div class="empty-state">

            <span>
              🏟️
            </span>

            <h4>
              Belum ada rundown.
            </h4>

            <p>
              Tambahkan jadwal secara manual melalui
              <code>js/rundown.js</code>.
            </p>

          </div>
        `;

      return;
    }

    dom.scheduleList
      .innerHTML =
      items
        .slice(
          0,
          6
        )
        .map(
          (item) => {
            const [
              ,
              month,
              day
            ] =
              item.date
                .split("-")
                .map(
                  Number
                );

            return `
              <article class="schedule-item">

                <div class="schedule-date">

                  <strong>
                    ${String(day)
                      .padStart(
                        2,
                        "0"
                      )}
                  </strong>

                  <span>
                    ${monthNames[
                      month - 1
                    ].slice(
                      0,
                      3
                    )}
                  </span>

                </div>


                <div class="schedule-main">

                  <h4>
                    ${escapeHTML(
                      item.sport
                    )}
                  </h4>

                  <p>
                    ${escapeHTML(
                      item.faculty
                    )}
                    ·
                    ${escapeHTML(
                      item.time
                    )}
                    WIB
                    ·
                    ${escapeHTML(
                      item.place
                    )}
                  </p>

                </div>


                <div class="schedule-meta">

                  <span class="countdown-badge">
                    ${escapeHTML(
                      getCountdownLabel(
                        item.date
                      )
                    )}
                  </span>

                  ${
                    item.isDemo
                      ? '<span class="demo-badge">DATA CONTOH</span>'
                      : ""
                  }

                </div>

              </article>
            `;
          }
        )
        .join("");
  }

  function normalizeLocalItem(item) {
    return {
      id:
        item.id,

      template_title:
        item.template_title ||
        item.title ||
        "Jarkoman",

      faculty:
        item.faculty ||
        "-",

      mikat_name:
        item.mikat_name ||
        null,

      sport:
        item.sport ||
        null,

      event_date:
        item.event_date ||
        null,

      event_time:
        item.event_time ||
        null,

      event_place:
        item.event_place ||
        null,

      generated_text:
        item.generated_text ||
        item.text ||
        "",

      created_by:
        item.created_by ||
        "Perangkat ini",

      created_at:
        item.created_at ||
        item.createdAt ||
        new Date()
          .toISOString()
    };
  }

  function renderRecent() {
    const source =
      state.databaseOnline
        ? state.sharedHistory
        : getLocalHistory()
            .map(
              normalizeLocalItem
            );

    if (!source.length) {
      dom.recentList
        .innerHTML = `
          <div class="empty-state">

            <span>
              📣
            </span>

            <h4>
              Belum ada jarkoman.
            </h4>

            <p>
              Hasil yang dibuat melalui generator akan tampil di sini.
            </p>

          </div>
        `;

      return;
    }

    dom.recentList
      .innerHTML =
      source
        .slice(
          0,
          4
        )
        .map(
          (item) => `
            <article class="recent-item">

              <div class="recent-item-top">

                <strong>
                  ${escapeHTML(
                    item.template_title
                  )}
                </strong>

                <time>
                  ${escapeHTML(
                    formatCreatedAt(
                      item.created_at
                    )
                  )}
                  WIB
                </time>

              </div>


              <p>
                ${escapeHTML(
                  item.generated_text
                )}
              </p>

            </article>
          `
        )
        .join("");
  }

  function renderDashboard() {
    const now =
      getWIBDate();

    const startToday =
      new Date(
        `${now.isoDate}T00:00:00+07:00`
      ).getTime();

    const upcoming =
      rundown
        .filter(
          (item) =>
            new Date(
              `${item.date}T${item.time || "00:00"}:00+07:00`
            ).getTime() >=
            startToday
        )
        .sort(
          (a, b) =>
            new Date(
              `${a.date}T${a.time || "00:00"}:00+07:00`
            ) -
            new Date(
              `${b.date}T${b.time || "00:00"}:00+07:00`
            )
        );

    dom.statUpcoming
      .textContent =
      String(
        upcoming.length
      );

    dom.statToday
      .textContent =
      String(
        rundown.filter(
          (item) =>
            item.date ===
            now.isoDate
        ).length
      );

    dom.statGenerated
      .textContent =
      String(
        state.databaseOnline
          ? state.sharedHistory
              .length
          : getLocalHistory()
              .length
      );

    renderSchedule(
      upcoming
    );

    renderRecent();
  }

  function getFilteredHistory() {
    const query =
      dom.historySearchInput
        .value
        .trim()
        .toLowerCase();

    const faculty =
      dom.historyFacultyFilter
        .value;

    const template =
      dom.historyTemplateFilter
        .value;

    return state.sharedHistory
      .filter(
        (item) => {
          if (
            faculty &&
            item.faculty !==
              faculty
          ) {
            return false;
          }

          if (
            template &&
            item.template_title !==
              template
          ) {
            return false;
          }

          if (!query) {
            return true;
          }

          const haystack = [
            item.template_title,
            item.faculty,
            item.mikat_name,
            item.sport,
            item.event_place,
            item.created_by,
            item.generated_text
          ]
            .filter(
              Boolean
            )
            .join(" ")
            .toLowerCase();

          return haystack
            .includes(
              query
            );
        }
      );
  }

  function renderSharedHistory() {
    const items =
      getFilteredHistory();

    dom.historyCountLabel
      .textContent =
      `${items.length} riwayat`;

    if (
      state.historyLoading
    ) {
      dom.sharedHistoryList
        .innerHTML = `
          <div class="history-loading">

            <span class="loading-spinner"></span>

            <p>
              Mengambil Riwayat Bersama...
            </p>

          </div>
        `;

      return;
    }

    if (
      !state.databaseOnline
    ) {
      dom.sharedHistoryList
        .innerHTML = `
          <div
            class="empty-state"
            style="grid-column:1/-1"
          >

            <span>
              ☁️
            </span>

            <h4>
              Database belum dapat diakses.
            </h4>

            <p>
              Periksa internet dan konfigurasi Turso.
              Jarkoman tetap tersimpan sebagai cadangan lokal
              pada perangkat ini.
            </p>

          </div>
        `;

      return;
    }

    if (!items.length) {
      dom.sharedHistoryList
        .innerHTML = `
          <div
            class="empty-state"
            style="grid-column:1/-1"
          >

            <span>
              🗂️
            </span>

            <h4>
              Belum ada riwayat yang cocok.
            </h4>

            <p>
              Generate jarkoman baru atau ubah kata kunci
              dan filter pencarian.
            </p>

          </div>
        `;

      return;
    }

    dom.sharedHistoryList
      .innerHTML =
      items
        .map(
          (item) => {
            const tags = [
              item.faculty,
              item.mikat_name,
              item.sport,
              item.event_date
                ? formatEventDate(
                    item.event_date
                  )
                : null
            ].filter(Boolean);

            return `
              <article class="shared-history-card">

                <div class="shared-history-card-top">

                  <div>

                    <h4>
                      ${escapeHTML(
                        item.template_title
                      )}
                    </h4>

                  </div>


                  <time>
                    ${escapeHTML(
                      formatCreatedAt(
                        item.created_at
                      )
                    )}
                    WIB
                  </time>

                </div>


                <div class="history-tags">

                  <span class="history-tag creator">
                    👤 ${escapeHTML(
                      item.created_by ||
                        "Tanpa nama"
                    )}
                  </span>


                  ${tags
                    .map(
                      (tag) =>
                        `<span class="history-tag">${escapeHTML(
                          tag
                        )}</span>`
                    )
                    .join("")}

                </div>


                <p class="shared-history-excerpt">
                  ${escapeHTML(
                    item.generated_text
                  )}
                </p>


                <div class="shared-history-actions">

                  <button
                    class="history-action-button"
                    type="button"
                    data-copy-history="${escapeHTML(
                      item.id
                    )}"
                  >
                    Copy
                  </button>


                  <button
                    class="history-action-button primary"
                    type="button"
                    data-open-history="${escapeHTML(
                      item.id
                    )}"
                  >
                    Lihat Detail
                  </button>

                </div>

              </article>
            `;
          }
        )
        .join("");
  }

  async function loadSharedHistory({
    silent = false
  } = {}) {
    if (!tursoApi) {
      state.historyLoading =
        false;

      setDatabaseStatus(
        "offline",
        "Turso belum dikonfigurasi"
      );

      renderSharedHistory();

      renderDashboard();

      return false;
    }

    if (!silent) {
      state.historyLoading =
        true;

      setDatabaseStatus(
        "checking",
        "Menghubungkan ke Turso..."
      );

      renderSharedHistory();
    }

    try {
      const response =
        await fetch(
          tursoApi,
          {
            method:
              "GET",

            headers: {
              "Accept":
                "application/json"
            }
          }
        );

      const payload =
        await response
          .json()
          .catch(
            () => ({})
          );

      if (!response.ok) {
        throw new Error(
          payload.error ||
            "Gagal mengambil riwayat dari Turso."
        );
      }

      state.sharedHistory =
        Array.isArray(
          payload.rows
        )
          ? payload.rows
          : [];

      state.historyLoading =
        false;

      setDatabaseStatus(
        "online",
        "Terhubung — riwayat tersinkron"
      );

      renderSharedHistory();

      renderDashboard();

      return true;
    } catch (error) {
      console.error(
        "Gagal mengambil riwayat bersama:",
        error
      );

      state.historyLoading =
        false;

      setDatabaseStatus(
        "offline",
        "Gagal terhubung ke database"
      );

      renderSharedHistory();

      renderDashboard();

      return false;
    }
  }

  function openHistoryDetail(id) {
    const item =
      state.sharedHistory.find(
        (row) =>
          String(row.id) ===
          String(id)
      );

    if (!item) {
      return;
    }

    state.activeHistoryId =
      item.id;

    dom.historyDetailTitle
      .textContent =
      item.template_title;

    dom.historyDetailText
      .textContent =
      item.generated_text;

    const meta = [
      `👤 ${item.created_by || "Tanpa nama"}`,

      item.faculty,

      item.mikat_name,

      item.sport,

      item.event_date
        ? formatEventDate(
            item.event_date
          )
        : null,

      item.event_time
        ? `${formatTime(
            item.event_time
          )} WIB`
        : null,

      item.event_place,

      `${formatCreatedAt(
        item.created_at
      )} WIB`
    ].filter(Boolean);

    dom.historyDetailMeta
      .innerHTML =
      meta
        .map(
          (value) =>
            `<span class="history-tag">${escapeHTML(
              value
            )}</span>`
        )
        .join("");

    dom.historyDetailModal
      .classList.remove(
        "hidden"
      );

    dom.historyDetailModal
      .setAttribute(
        "aria-hidden",
        "false"
      );

    document.body
      .classList.add(
        "modal-open"
      );
  }

  function closeHistoryDetail() {
    dom.historyDetailModal
      .classList.add(
        "hidden"
      );

    dom.historyDetailModal
      .setAttribute(
        "aria-hidden",
        "true"
      );

    state.activeHistoryId =
      null;

    document.body
      .classList.remove(
        "modal-open"
      );
  }

  async function copyText(text) {
    if (!text) {
      return false;
    }

    try {
      if (
        navigator.clipboard &&
        window.isSecureContext
      ) {
        await navigator.clipboard
          .writeText(
            text
          );

        return true;
      }

      const textarea =
        document.createElement(
          "textarea"
        );

      textarea.value =
        text;

      textarea.style.position =
        "fixed";

      textarea.style.opacity =
        "0";

      document.body
        .appendChild(
          textarea
        );

      textarea.focus();

      textarea.select();

      const success =
        document.execCommand(
          "copy"
        );

      textarea.remove();

      return success;
    } catch {
      return false;
    }
  }

  function showToast(message) {
    dom.toastText
      .textContent =
      message;

    dom.toast
      .classList.remove(
        "hidden"
      );

    clearTimeout(
      showToast.timeoutId
    );

    showToast.timeoutId =
      setTimeout(
        () => {
          dom.toast
            .classList.add(
              "hidden"
            );
        },
        2800
      );
  }

  function bindEvents() {
    dom.navItems.forEach(
      (item) => {
        item.addEventListener(
          "click",
          () => {
            switchPage(
              item.dataset.page
            );
          }
        );
      }
    );

    document
      .querySelectorAll(
        "[data-page-jump]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              switchPage(
                button.dataset
                  .pageJump
              );
            }
          );
        }
      );

    document
      .querySelectorAll(
        "[data-open-generator]"
      )
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              openGenerator();
            }
          );
        }
      );

    dom.menuButton
      .addEventListener(
        "click",
        () => {
          dom.sidebar
            .classList.toggle(
              "open"
            );
        }
      );

    dom.closeModalButton
      .addEventListener(
        "click",
        closeGenerator
      );

    dom.modal
      .addEventListener(
        "click",
        (event) => {
          if (
            event.target ===
            dom.modal
          ) {
            closeGenerator();
          }
        }
      );

    dom.staffNameInput
      .addEventListener(
        "input",
        () => {
          state.staffName =
            dom.staffNameInput
              .value
              .trim();

          dom.delegationError
            .textContent = "";
        }
      );

    dom.facultySelect
      .addEventListener(
        "change",
        () => {
          state.selectedFaculty =
            dom.facultySelect
              .value;

          dom.delegationError
            .textContent = "";

          updateDelegationUI();

          /*
          Kalau fakultas yang dijarkom berubah
          dan ternyata sama dengan lawan,
          lawan di-reset.
          */

          if (
            state.opponentFaculty ===
            state.selectedFaculty
          ) {
            state.opponentFaculty =
              "";
          }

          updateOpponentButton();

          updateBasketMatchPreview();

          renderOpponentChoices();
        }
      );

    /*
    PILIH CABANG OLAHRAGA
    */

    dom.sportCategorySelect
      .addEventListener(
        "change",
        () => {
          state.selectedSportCategory =
            dom.sportCategorySelect
              .value;

          dom.detailError
            .textContent = "";

          updateSportVariantOptions();

          /*
          Form PUTRA/PUTRI baru muncul
          kalau Basket sudah dipilih.
          */

          if (
            state.selectedSportCategory !==
            "Basket"
          ) {
            setBasketCategory("");

            state.opponentFaculty =
              "";

            setMatchStatus(
              "HOME"
            );

            updateOpponentButton();

            updateBasketMatchPreview();
          }

          configureDetailFields();
        }
      );

    dom.sportVariantSelect
      .addEventListener(
        "change",
        () => {
          state.selectedSport =
            makeSportDisplay(
              state.selectedSportCategory,
              dom.sportVariantSelect
                .value
            );

          dom.detailError
            .textContent = "";

          configureDetailFields();
        }
      );

    dom.eventDateInput
      .addEventListener(
        "input",
        () => {
          state.eventDate =
            dom.eventDateInput
              .value;

          dom.detailError
            .textContent = "";
        }
      );

    /*
    TIME MODE LAMA
    Tetap dipertahankan.
    */

    dom.timeModeButtons
      .forEach(
        (button) => {
          button.addEventListener(
            "click",
            () => {
              setTimeMode(
                button.dataset
                  .timeMode
              );

              dom.detailError
                .textContent = "";
            }
          );
        }
      );

    [
      dom.eventTimeInput,
      dom.eventTimeStartInput,
      dom.eventTimeEndInput,
      dom.eventTimeFinishInput
    ]
      .filter(Boolean)
      .forEach(
        (input) => {
          input.addEventListener(
            "input",
            () => {
              state.eventTime =
                getSelectedTimeValue();

              dom.detailError
                .textContent = "";
            }
          );
        }
      );

    dom.eventPlaceInput
      .addEventListener(
        "input",
        () => {
          state.eventPlace =
            dom.eventPlaceInput
              .value
              .trim();

          dom.detailError
            .textContent = "";
        }
      );

    dom.crosscheckInput
      .addEventListener(
        "change",
        () => {
          dom.crosscheckError
            .textContent = "";
        }
      );

    dom.nextButton
      .addEventListener(
        "click",
        () => {
          if (
            validateStep(
              state.currentStep
            )
          ) {
            showWizardStep(
              Math.min(
                4,
                state.currentStep + 1
              )
            );
          }
        }
      );

    dom.backButton
      .addEventListener(
        "click",
        () => {
          showWizardStep(
            Math.max(
              1,
              state.currentStep - 1
            )
          );
        }
      );

    dom.generateButton
      .addEventListener(
        "click",
        generateJarkoman
      );

    dom.copyResultButton
      .addEventListener(
        "click",
        async () => {
          const success =
            await copyText(
              state.generatedText ||
                dom.resultText
                  .textContent
            );

          dom.copyStatus
            .textContent =
            success
              ? "Berhasil disalin. Tinggal paste ke grup!"
              : "Gagal menyalin otomatis. Silakan blok teks secara manual.";

          showToast(
            success
              ? "Jarkoman berhasil disalin!"
              : "Gagal menyalin otomatis."
          );
        }
      );

    const filterHistory =
      () => {
        renderSharedHistory();
      };

    dom.historySearchInput
      .addEventListener(
        "input",
        filterHistory
      );

    dom.historyFacultyFilter
      .addEventListener(
        "change",
        filterHistory
      );

    dom.historyTemplateFilter
      .addEventListener(
        "change",
        filterHistory
      );

    dom.refreshHistoryButton
      .addEventListener(
        "click",
        async () => {
          dom.refreshHistoryButton
            .disabled =
            true;

          dom.refreshHistoryButton
            .textContent =
            "Menyegarkan...";

          await syncPendingRecords();

          await loadSharedHistory();

          dom.refreshHistoryButton
            .disabled =
            false;

          dom.refreshHistoryButton
            .textContent =
            "↻ Refresh";
        }
      );

    dom.sharedHistoryList
      .addEventListener(
        "click",
        async (event) => {
          const openButton =
            event.target.closest(
              "[data-open-history]"
            );

          const copyButton =
            event.target.closest(
              "[data-copy-history]"
            );

          if (openButton) {
            openHistoryDetail(
              openButton.dataset
                .openHistory
            );
          }

          if (copyButton) {
            const item =
              state.sharedHistory
                .find(
                  (row) =>
                    String(
                      row.id
                    ) ===
                    String(
                      copyButton
                        .dataset
                        .copyHistory
                    )
                );

            const success =
              await copyText(
                item
                  ?.generated_text ||
                  ""
              );

            showToast(
              success
                ? "Jarkoman berhasil disalin!"
                : "Gagal menyalin."
            );
          }
        }
      );

    dom.closeHistoryDetailButton
      .addEventListener(
        "click",
        closeHistoryDetail
      );

    dom.historyDetailModal
      .addEventListener(
        "click",
        (event) => {
          if (
            event.target ===
            dom.historyDetailModal
          ) {
            closeHistoryDetail();
          }
        }
      );

    dom.copyHistoryDetailButton
      .addEventListener(
        "click",
        async () => {
          const item =
            state.sharedHistory
              .find(
                (row) =>
                  String(
                    row.id
                  ) ===
                  String(
                    state.activeHistoryId
                  )
              );

          const success =
            await copyText(
              item
                ?.generated_text ||
                ""
            );

          showToast(
            success
              ? "Jarkoman berhasil disalin!"
              : "Gagal menyalin."
          );
        }
      );

    /*
    ESC
    Popup lawan ditutup lebih dulu.
    */

    window.addEventListener(
      "keydown",
      (event) => {
        if (
          event.key !==
          "Escape"
        ) {
          return;
        }

        if (
          dom.opponentModal &&
          !dom.opponentModal
            .classList
            .contains(
              "hidden"
            )
        ) {
          closeOpponentPicker();
        } else if (
          !dom.historyDetailModal
            .classList
            .contains(
              "hidden"
            )
        ) {
          closeHistoryDetail();
        } else if (
          !dom.modal
            .classList
            .contains(
              "hidden"
            )
        ) {
          closeGenerator();
        }
      }
    );

    window.addEventListener(
      "online",
      async () => {
        await syncPendingRecords();

        await loadSharedHistory({
          silent: true
        });
      }
    );

    window.addEventListener(
      "offline",
      () => {
        setDatabaseStatus(
          "offline",
          "Perangkat sedang offline"
        );

        renderSharedHistory();

        renderDashboard();
      }
    );
  }

  async function init() {
    renderTemplateCards();

    populateFields();

    /*
    Membuat UI Basket secara dinamis.
    index.html tidak perlu diubah.
    */

    ensureBasketMatchUI();

    setTimeMode(
      "single"
    );

    bindEvents();

    updateClock();

    renderDashboard();

    switchPage(
      "dashboard"
    );

    setInterval(
      updateClock,
      1000
    );

    setDatabaseStatus(
      "checking",
      "Mengecek koneksi Turso..."
    );

    await syncPendingRecords();

    await loadSharedHistory({
      silent: true
    });
  }

  init();

})();