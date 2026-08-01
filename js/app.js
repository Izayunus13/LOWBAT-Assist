(() => {
  "use strict";

  const data = window.LOWBAT_DATA;
  const rundown = Array.isArray(window.RUNDOWN_DATA) ? window.RUNDOWN_DATA : [];

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
    eventTime: "",
    eventPlace: "",
    generatedText: ""
  };

  const $ = (id) => document.getElementById(id);
  const dom = {
    navItems: [...document.querySelectorAll(".nav-item")],
    pageSections: [...document.querySelectorAll(".page-section")],
    pageTitle: $("pageTitle"), sidebar: $("sidebar"), menuButton: $("menuButton"),
    dynamicGreeting: $("dynamicGreeting"), wibClock: $("wibClock"),
    statUpcoming: $("statUpcoming"), statToday: $("statToday"), statGenerated: $("statGenerated"),
    scheduleList: $("scheduleList"), recentList: $("recentList"),
    templatePreviewGrid: $("templatePreviewGrid"), resultPanel: $("resultPanel"),
    resultText: $("resultText"), copyResultButton: $("copyResultButton"), copyStatus: $("copyStatus"),
    modal: $("generatorModal"), closeModalButton: $("closeModalButton"),
    wizardSteps: [...document.querySelectorAll(".wizard-step")],
    stepDots: [...document.querySelectorAll(".step-dot")],
    backButton: $("backButton"), nextButton: $("nextButton"), generateButton: $("generateButton"),
    templateChoiceGrid: $("templateChoiceGrid"), templateError: $("templateError"),
    facultySelect: $("facultySelect"), mikatField: $("mikatField"), mikatOptions: $("mikatOptions"),
    territoryNote: $("territoryNote"), delegationError: $("delegationError"),
    eventDetailFields: $("eventDetailFields"), noDetailMessage: $("noDetailMessage"),
    sportCategoryField: $("sportCategoryField"), sportCategorySelect: $("sportCategorySelect"),
    sportVariantField: $("sportVariantField"), sportVariantSelect: $("sportVariantSelect"),
    dateField: $("dateField"), eventDateInput: $("eventDateInput"),
    timeField: $("timeField"), eventTimeInput: $("eventTimeInput"),
    placeField: $("placeField"), eventPlaceInput: $("eventPlaceInput"), detailError: $("detailError"),
    reviewGrid: $("reviewGrid"), wizardPreview: $("wizardPreview"),
    crosscheckInput: $("crosscheckInput"), crosscheckError: $("crosscheckError"),
    toast: $("toast"), toastText: $("toastText")
  };

  const pageTitles = { dashboard: "Dashboard", generator: "Jarkoman Generator", guide: "Panduan LO" };
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  function getWIBDate() {
    const parts = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Jakarta", year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23"
    }).formatToParts(new Date());
    const values = {};
    parts.forEach((part) => { if (part.type !== "literal") values[part.type] = part.value; });
    return {
      year: Number(values.year), month: Number(values.month), day: Number(values.day),
      hour: Number(values.hour), minute: Number(values.minute), second: Number(values.second),
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
    dom.dynamicGreeting.textContent = `Selamat ${getGreetingWord()}, LOWBAT!`;
  }

  function switchPage(page) {
    state.page = page;
    dom.navItems.forEach((item) => item.classList.toggle("active", item.dataset.page === page));
    dom.pageSections.forEach((section) => section.classList.toggle("active", section.id === `page-${page}`));
    dom.pageTitle.textContent = pageTitles[page] || "LOWBAT Assist";
    dom.sidebar.classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function getTemplateById(id) { return data.templates.find((template) => template.id === id); }
  function makeSportDisplay(category, variant) {
    if (!variant) return "";
    return ["Badminton", "Taekwondo"].includes(category) ? `${category} ${variant}` : variant;
  }
  function slugify(value) { return String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }
  function escapeHTML(value) {
    return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
  }

  function renderTemplateCards() {
    dom.templatePreviewGrid.innerHTML = "";
    dom.templateChoiceGrid.innerHTML = "";

    data.templates.forEach((template, index) => {
      const card = document.createElement("article");
      card.className = "template-preview-card";
      card.dataset.number = String(index + 1).padStart(2, "0");
      card.tabIndex = 0;
      card.innerHTML = `<div class="template-icon">${template.icon}</div><h4>${escapeHTML(template.title)}</h4><p>${escapeHTML(template.description)}</p>`;
      card.addEventListener("click", () => openGenerator(template.id));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openGenerator(template.id); }
      });
      dom.templatePreviewGrid.appendChild(card);

      const choice = document.createElement("div");
      choice.className = "template-choice";
      choice.innerHTML = `<input type="radio" name="template-choice" id="template-${template.id}" value="${template.id}" />
        <label for="template-${template.id}"><span>${template.icon}</span><strong>${escapeHTML(template.title)}</strong><small>${escapeHTML(template.description)}</small></label>`;
      choice.querySelector("input").addEventListener("change", (event) => {
        state.selectedTemplateId = event.target.value;
        dom.templateError.textContent = "";
      });
      dom.templateChoiceGrid.appendChild(choice);
    });
  }

  function populateFields() {
    data.faculties.forEach((faculty) => {
      const option = document.createElement("option"); option.value = faculty; option.textContent = faculty;
      dom.facultySelect.appendChild(option);
    });

    data.mikatOptions.forEach((mikat) => {
      const wrapper = document.createElement("div");
      wrapper.className = "segmented-option";
      wrapper.innerHTML = `<input type="radio" name="mikat-name" id="mikat-${slugify(mikat)}" value="${mikat}" /><label for="mikat-${slugify(mikat)}">${mikat}</label>`;
      wrapper.querySelector("input").addEventListener("change", (event) => {
        state.selectedMikat = event.target.value;
        dom.delegationError.textContent = "";
      });
      dom.mikatOptions.appendChild(wrapper);
    });

    Object.keys(data.sportsMap).forEach((category) => {
      const option = document.createElement("option"); option.value = category; option.textContent = category;
      dom.sportCategorySelect.appendChild(option);
    });
  }

  function updateDelegationUI() {
    const isTerritory = state.selectedFaculty === "Wilayah dan Daerah";
    dom.mikatField.classList.toggle("hidden", isTerritory);
    dom.territoryNote.classList.toggle("hidden", !isTerritory);
    if (isTerritory) {
      state.selectedMikat = "";
      document.querySelectorAll('input[name="mikat-name"]').forEach((input) => input.checked = false);
    }
  }

  function updateSportVariantOptions() {
    const variants = data.sportsMap[state.selectedSportCategory] || [];
    dom.sportVariantSelect.innerHTML = '<option value="">Pilih kategori</option>';
    variants.forEach((variant) => {
      const option = document.createElement("option"); option.value = variant; option.textContent = variant;
      dom.sportVariantSelect.appendChild(option);
    });
    if (variants.length === 1) {
      state.selectedSport = makeSportDisplay(state.selectedSportCategory, variants[0]);
      dom.sportVariantSelect.value = variants[0];
      dom.sportVariantField.classList.add("hidden");
    } else {
      state.selectedSport = "";
      dom.sportVariantField.classList.toggle("hidden", variants.length === 0);
    }
  }

  function configureDetailFields() {
    const template = getTemplateById(state.selectedTemplateId);
    if (!template) return;
    const hasDetail = template.requiresSport || template.requiresDate || template.requiresTime || template.requiresPlace;
    dom.noDetailMessage.classList.toggle("hidden", hasDetail);
    dom.eventDetailFields.classList.toggle("hidden", !hasDetail);
    dom.sportCategoryField.classList.toggle("hidden", !template.requiresSport);
    dom.dateField.classList.toggle("hidden", !template.requiresDate);
    dom.timeField.classList.toggle("hidden", !template.requiresTime);
    dom.placeField.classList.toggle("hidden", !template.requiresPlace);
    if (template.requiresSport) {
      const variants = data.sportsMap[state.selectedSportCategory] || [];
      dom.sportVariantField.classList.toggle("hidden", !state.selectedSportCategory || variants.length <= 1);
    } else dom.sportVariantField.classList.add("hidden");
  }

  function resetGenerator() {
    Object.assign(state, {
      currentStep: 1, selectedTemplateId: "", selectedFaculty: "", selectedMikat: "",
      selectedSportCategory: "", selectedSport: "", eventDate: "", eventTime: "", eventPlace: ""
    });
    document.querySelectorAll('input[name="template-choice"], input[name="mikat-name"]').forEach((input) => input.checked = false);
    dom.facultySelect.value = "";
    dom.sportCategorySelect.value = "";
    dom.sportVariantSelect.innerHTML = '<option value="">Pilih kategori</option>';
    dom.eventDateInput.value = ""; dom.eventTimeInput.value = ""; dom.eventPlaceInput.value = "";
    dom.crosscheckInput.checked = false;
    [dom.templateError, dom.delegationError, dom.detailError, dom.crosscheckError].forEach((el) => el.textContent = "");
    updateDelegationUI();
    showWizardStep(1);
  }

  function openGenerator(preselectedId = "") {
    resetGenerator();
    if (preselectedId) {
      state.selectedTemplateId = preselectedId;
      const radio = document.querySelector(`input[name="template-choice"][value="${preselectedId}"]`);
      if (radio) radio.checked = true;
    }
    dom.modal.classList.remove("hidden");
    dom.modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  }

  function closeGenerator() {
    dom.modal.classList.add("hidden");
    dom.modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }

  function showWizardStep(step) {
    state.currentStep = step;
    dom.wizardSteps.forEach((section) => section.classList.toggle("active", Number(section.dataset.step) === step));
    dom.stepDots.forEach((dot) => {
      const value = Number(dot.dataset.stepDot);
      dot.classList.toggle("active", value === step);
      dot.classList.toggle("completed", value < step);
    });
    dom.backButton.classList.toggle("hidden", step === 1);
    dom.nextButton.classList.toggle("hidden", step === 4);
    dom.generateButton.classList.toggle("hidden", step !== 4);
    if (step === 3) configureDetailFields();
    if (step === 4) renderReview();
  }

  function validateStep(step) {
    if (step === 1) {
      if (!state.selectedTemplateId) { dom.templateError.textContent = "Pilih salah satu jenis jarkoman terlebih dahulu."; return false; }
      dom.templateError.textContent = ""; return true;
    }
    if (step === 2) {
      state.selectedFaculty = dom.facultySelect.value;
      if (!state.selectedFaculty) { dom.delegationError.textContent = "Fakultas atau delegasi belum dipilih."; return false; }
      if (state.selectedFaculty !== "Wilayah dan Daerah" && !state.selectedMikat) {
        dom.delegationError.textContent = "Pilih Seniora, Soraya, Mikatan, atau Mikat."; return false;
      }
      dom.delegationError.textContent = ""; return true;
    }
    if (step === 3) {
      const template = getTemplateById(state.selectedTemplateId);
      if (!template) return false;
      state.selectedSportCategory = dom.sportCategorySelect.value;
      state.selectedSport = makeSportDisplay(state.selectedSportCategory, dom.sportVariantSelect.value) || state.selectedSport;
      state.eventDate = dom.eventDateInput.value;
      state.eventTime = dom.eventTimeInput.value;
      state.eventPlace = dom.eventPlaceInput.value.trim();
      const missing = [];
      if (template.requiresSport && !state.selectedSport) missing.push("cabang olahraga");
      if (template.requiresDate && !state.eventDate) missing.push("hari/tanggal");
      if (template.requiresTime && !state.eventTime) missing.push("waktu");
      if (template.requiresPlace && !state.eventPlace) missing.push("tempat");
      if (missing.length) { dom.detailError.textContent = `Lengkapi ${missing.join(", ")} terlebih dahulu.`; return false; }
      dom.detailError.textContent = ""; return true;
    }
    return true;
  }

  function getMikatLabel() {
    return state.selectedFaculty === "Wilayah dan Daerah" ? "Wilayah dan Daerah" : `${state.selectedMikat} ${state.selectedFaculty}`.trim();
  }

  function formatEventDate(value) {
    if (!value) return "-";
    const [year, month, day] = value.split("-").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day));
    return `${dayNames[date.getUTCDay()]}, ${day} ${monthNames[month - 1]} ${year}`;
  }
  function formatTime(value) { return value ? value.replace(":", ".") : "-"; }

  function buildJarkoman() {
    const template = getTemplateById(state.selectedTemplateId);
    if (!template) return "";
    const replacements = {
      "{GREETING}": getGreetingWord(), "{MIKAT_LABEL}": getMikatLabel(),
      "{FACULTY}": state.selectedFaculty || "-", "{SPORT}": state.selectedSport || "-",
      "{DAY_DATE}": formatEventDate(state.eventDate), "{TIME}": formatTime(state.eventTime),
      "{PLACE}": state.eventPlace || "-"
    };
    let output = template.content;
    Object.entries(replacements).forEach(([placeholder, value]) => output = output.split(placeholder).join(value));
    return output.trim();
  }

  function renderReview() {
    const template = getTemplateById(state.selectedTemplateId);
    const items = [
      ["Jenis Jarkoman", template?.title || "-"],
      ["Fakultas / Delegasi", state.selectedFaculty || "-"],
      ["Nama Mikat", state.selectedFaculty === "Wilayah dan Daerah" ? "Tidak diperlukan" : state.selectedMikat || "-"]
    ];
    if (template?.requiresSport) items.push(["Cabang Olahraga", state.selectedSport || "-"]);
    if (template?.requiresDate) items.push(["Hari / Tanggal", formatEventDate(state.eventDate)]);
    if (template?.requiresTime) items.push(["Waktu", `${formatTime(state.eventTime)} WIB`]);
    if (template?.requiresPlace) items.push(["Tempat", state.eventPlace || "-"]);
    dom.reviewGrid.innerHTML = items.map(([label, value]) => `<div class="review-item"><small>${escapeHTML(label)}</small><strong>${escapeHTML(value)}</strong></div>`).join("");
    dom.wizardPreview.textContent = buildJarkoman();
  }

  function getHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem("lowbat-jarkoman-history") || "[]");
      return Array.isArray(parsed) ? parsed : [];
    } catch { return []; }
  }

  function saveGeneratedHistory(text) {
    const template = getTemplateById(state.selectedTemplateId);
    const history = getHistory();
    history.unshift({ id: Date.now(), title: template?.title || "Jarkoman", faculty: state.selectedFaculty, createdAt: new Date().toISOString(), text });
    localStorage.setItem("lowbat-jarkoman-history", JSON.stringify(history.slice(0, 10)));
  }

  function generateJarkoman() {
    if (!dom.crosscheckInput.checked) { dom.crosscheckError.textContent = "Centang konfirmasi crosscheck sebelum generate."; return; }
    dom.crosscheckError.textContent = "";
    state.generatedText = buildJarkoman();
    dom.resultText.textContent = state.generatedText;
    dom.resultPanel.classList.remove("hidden");
    dom.copyStatus.textContent = "Jarkoman berhasil dibuat dan siap disalin.";
    saveGeneratedHistory(state.generatedText);
    renderDashboard();
    closeGenerator();
    switchPage("generator");
    setTimeout(() => dom.resultPanel.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    showToast("Jarkoman berhasil dibuat!");
  }

  function getCountdownLabel(dateString) {
    const now = getWIBDate();
    const current = new Date(`${now.isoDate}T00:00:00+07:00`);
    const target = new Date(`${dateString}T00:00:00+07:00`);
    const difference = Math.round((target - current) / 86400000);
    if (difference === 0) return "Hari ini";
    if (difference === 1) return "Besok";
    return `${difference} hari lagi`;
  }

  function renderSchedule(items) {
    if (!items.length) {
      dom.scheduleList.innerHTML = `<div class="empty-state"><span>🏟️</span><h4>Belum ada rundown.</h4><p>Tambahkan jadwal secara manual melalui <code>js/rundown.js</code>.</p></div>`;
      return;
    }
    dom.scheduleList.innerHTML = items.slice(0, 6).map((item) => {
      const [, month, day] = item.date.split("-").map(Number);
      return `<article class="schedule-item">
        <div class="schedule-date"><strong>${String(day).padStart(2, "0")}</strong><span>${monthNames[month - 1].slice(0, 3)}</span></div>
        <div class="schedule-main"><h4>${escapeHTML(item.sport)}</h4><p>${escapeHTML(item.faculty)} · ${escapeHTML(item.time)} WIB · ${escapeHTML(item.place)}</p></div>
        <div class="schedule-meta"><span class="countdown-badge">${escapeHTML(getCountdownLabel(item.date))}</span>${item.isDemo ? '<span class="demo-badge">DATA CONTOH</span>' : ""}</div>
      </article>`;
    }).join("");
  }

  function renderRecent(history) {
    if (!history.length) {
      dom.recentList.innerHTML = `<div class="empty-state"><span>📣</span><h4>Belum ada jarkoman.</h4><p>Hasil yang dibuat melalui generator akan tampil di sini.</p></div>`;
      return;
    }
    dom.recentList.innerHTML = history.slice(0, 4).map((item) => {
      const time = new Intl.DateTimeFormat("id-ID", { timeZone: "Asia/Jakarta", day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(item.createdAt));
      return `<article class="recent-item"><div class="recent-item-top"><strong>${escapeHTML(item.title)}</strong><time>${escapeHTML(time)} WIB</time></div><p>${escapeHTML(item.text)}</p></article>`;
    }).join("");
  }

  function renderDashboard() {
    const now = getWIBDate();
    const startToday = new Date(`${now.isoDate}T00:00:00+07:00`).getTime();
    const upcoming = rundown.filter((item) => new Date(`${item.date}T${item.time || "00:00"}:00+07:00`).getTime() >= startToday)
      .sort((a, b) => new Date(`${a.date}T${a.time || "00:00"}:00+07:00`) - new Date(`${b.date}T${b.time || "00:00"}:00+07:00`));
    const history = getHistory();
    dom.statUpcoming.textContent = String(upcoming.length);
    dom.statToday.textContent = String(rundown.filter((item) => item.date === now.isoDate).length);
    dom.statGenerated.textContent = String(history.length);
    renderSchedule(upcoming);
    renderRecent(history);
  }

  async function copyText(text) {
    if (!text) return false;
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; }
      const textarea = document.createElement("textarea");
      textarea.value = text; textarea.style.position = "fixed"; textarea.style.opacity = "0";
      document.body.appendChild(textarea); textarea.focus(); textarea.select();
      const success = document.execCommand("copy"); textarea.remove(); return success;
    } catch { return false; }
  }

  function showToast(message) {
    dom.toastText.textContent = message;
    dom.toast.classList.remove("hidden");
    clearTimeout(showToast.timeoutId);
    showToast.timeoutId = setTimeout(() => dom.toast.classList.add("hidden"), 2600);
  }

  function bindEvents() {
    dom.navItems.forEach((item) => item.addEventListener("click", () => switchPage(item.dataset.page)));
    document.querySelectorAll("[data-page-jump]").forEach((button) => button.addEventListener("click", () => switchPage(button.dataset.pageJump)));
    document.querySelectorAll("[data-open-generator]").forEach((button) => button.addEventListener("click", () => openGenerator()));
    dom.menuButton.addEventListener("click", () => dom.sidebar.classList.toggle("open"));
    dom.closeModalButton.addEventListener("click", closeGenerator);
    dom.modal.addEventListener("click", (event) => { if (event.target === dom.modal) closeGenerator(); });
    window.addEventListener("keydown", (event) => { if (event.key === "Escape" && !dom.modal.classList.contains("hidden")) closeGenerator(); });

    dom.facultySelect.addEventListener("change", () => {
      state.selectedFaculty = dom.facultySelect.value; dom.delegationError.textContent = ""; updateDelegationUI();
    });
    dom.sportCategorySelect.addEventListener("change", () => {
      state.selectedSportCategory = dom.sportCategorySelect.value; dom.detailError.textContent = ""; updateSportVariantOptions(); configureDetailFields();
    });
    dom.sportVariantSelect.addEventListener("change", () => { state.selectedSport = makeSportDisplay(state.selectedSportCategory, dom.sportVariantSelect.value); dom.detailError.textContent = ""; });
    dom.eventDateInput.addEventListener("input", () => { state.eventDate = dom.eventDateInput.value; dom.detailError.textContent = ""; });
    dom.eventTimeInput.addEventListener("input", () => { state.eventTime = dom.eventTimeInput.value; dom.detailError.textContent = ""; });
    dom.eventPlaceInput.addEventListener("input", () => { state.eventPlace = dom.eventPlaceInput.value.trim(); dom.detailError.textContent = ""; });
    dom.crosscheckInput.addEventListener("change", () => dom.crosscheckError.textContent = "");
    dom.nextButton.addEventListener("click", () => { if (validateStep(state.currentStep)) showWizardStep(Math.min(4, state.currentStep + 1)); });
    dom.backButton.addEventListener("click", () => showWizardStep(Math.max(1, state.currentStep - 1)));
    dom.generateButton.addEventListener("click", generateJarkoman);
    dom.copyResultButton.addEventListener("click", async () => {
      const success = await copyText(state.generatedText || dom.resultText.textContent);
      dom.copyStatus.textContent = success ? "Berhasil disalin. Tinggal paste ke grup!" : "Gagal menyalin otomatis. Silakan blok teks secara manual.";
      showToast(success ? "Jarkoman berhasil disalin!" : "Gagal menyalin otomatis.");
    });
  }

  function init() {
    renderTemplateCards();
    populateFields();
    bindEvents();
    updateClock();
    renderDashboard();
    switchPage("dashboard");
    setInterval(updateClock, 1000);
  }

  init();
})();
