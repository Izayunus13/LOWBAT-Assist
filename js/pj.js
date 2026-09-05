(() => {
  "use strict";

  const plottingData = [
    {
      faculty: "Fakultas Teknik",
      people: [
        { name: "Aurora", sports: "Futsal, Karate" },
        { name: "Fariza", sports: "Basket, Atletik" },
        { name: "Rifat", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Bunga", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Sekolah Vokasi",
      people: [
        { name: "Cardio", sports: "Futsal, Karate" },
        { name: "Susan", sports: "Basket, Atletik" },
        { name: "Nasya Dea", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Shindy", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Hukum",
      people: [
        { name: "Albany", sports: "Futsal, Karate" },
        { name: "Ibel", sports: "Basket, Atletik" },
        { name: "Alya", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Aqilla", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Ilmu Sosial dan Ilmu Politik",
      people: [
        { name: "Anisa Meili", sports: "Futsal, Karate" },
        { name: "Amanda", sports: "Basket, Atletik" },
        { name: "Selma", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Tulaini", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Perikanan dan Ilmu Kelautan",
      people: [
        { name: "Adzanandya", sports: "Futsal, Karate, Badminton" },
        { name: "Salma", sports: "Basket, Atletik, Taekwondo" },
        { name: "Alodia", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Ilmu Budaya",
      people: [
        { name: "Satria", sports: "Futsal, Karate, Badminton" },
        { name: "Jannaz", sports: "Basket, Atletik, Taekwondo" },
        { name: "Sila", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Sains dan Matematika",
      people: [
        { name: "Sanesa", sports: "Futsal, Karate, Badminton" },
        { name: "Zefanya", sports: "Basket, Atletik, Taekwondo" },
        { name: "Hafla", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Ekonomika dan Bisnis",
      people: [
        { name: "Hecira", sports: "Futsal, Karate, Badminton" },
        { name: "Cici", sports: "Basket, Atletik, Taekwondo" },
        { name: "Berliana", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Kedokteran",
      people: [
        { name: "Kenny", sports: "Futsal, Karate, Badminton" },
        { name: "Cleovea", sports: "Basket, Atletik, Taekwondo" },
        { name: "Nevia", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Wilayah dan Daerah/PSDKU",
      people: [
        { name: "Irma", sports: "Futsal, Karate, Badminton" },
        { name: "Ayesha", sports: "Basket, Atletik, Taekwondo" },
        { name: "Nila", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Psikologi",
      people: [
        { name: "Vanessa", sports: "Futsal, Karate, Badminton" },
        { name: "Jihan", sports: "Basket, Atletik, Taekwondo" },
        { name: "Rizka", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Kesehatan Masyarakat",
      people: [
        { name: "Chiara", sports: "Futsal, Karate, Badminton" },
        { name: "Fellysha", sports: "Basket, Atletik, Taekwondo" },
        { name: "Rara", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Peternakan dan Pertanian",
      people: [
        { name: "Regina", sports: "Futsal, Karate, Badminton" },
        { name: "Maria", sports: "Basket, Atletik, Taekwondo" },
        { name: "Savaira", sports: "Sepak Bola, Silat, Voli" }
      ]
    }
  ];

  const escapeHTML = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function makeFacultyCard(item) {
    const rows = item.people.map((person) => `
      <div class="pj-row">
        <div class="pj-name"><span class="pj-name-dot"></span><span>${escapeHTML(person.name)}</span></div>
        <div class="pj-sports">${escapeHTML(person.sports)}</div>
      </div>
    `).join("");

    return `
      <article class="pj-faculty-card">
        <div class="pj-faculty-head">
          <div class="pj-faculty-title">
            <span class="pj-faculty-icon">${escapeHTML(item.faculty)}</span>
            <div><strong>${escapeHTML(item.faculty)}</strong><small>Plottingan Penanggung Jawab</small></div>
          </div>
          <span class="pj-count">${item.people.length} PJ</span>
        </div>
        <div class="pj-list">${rows}</div>
      </article>
    `;
  }

  function injectNavigation() {
    const nav = document.querySelector(".sidebar-nav");
    if (!nav || nav.querySelector('[data-page="pj"]')) return;

    const guideButton = nav.querySelector('[data-page="guide"]');
    const button = document.createElement("button");
    button.className = "nav-item";
    button.type = "button";
    button.dataset.page = "pj";
    button.innerHTML = '<span class="nav-icon">👥</span><span><strong>Penanggung Jawab</strong><small>Plottingan tiap fakultas</small></span>';

    if (guideButton) nav.insertBefore(button, guideButton);
    else nav.appendChild(button);
  }

  function injectPage() {
    const main = document.querySelector(".main-content");
    if (!main || document.getElementById("page-pj")) return;

    const guidePage = document.getElementById("page-guide");
    const totalPeople = plottingData.reduce((total, item) => total + item.people.length, 0);

    const section = document.createElement("section");
    section.className = "page-section";
    section.id = "page-pj";
    section.innerHTML = `
      <article class="panel pj-hero">
        <div>
          <p class="section-label">PLOTTINGAN LO</p>
          <h3>Penanggung Jawab Setiap Fakultas</h3>
          <p>Lihat pembagian penanggung jawab tiap fakultas beserta cabang olahraga yang menjadi plottingannya.</p>
        </div>
        <div class="pj-summary" aria-label="Ringkasan plottingan">
          <div class="pj-summary-card"><strong>${plottingData.length}</strong><span>Fakultas / Delegasi</span></div>
          <div class="pj-summary-card"><strong>${totalPeople}</strong><span>Penanggung Jawab</span></div>
        </div>
      </article>

      <div class="pj-grid">
        ${plottingData.map(makeFacultyCard).join("")}
      </div>

      <div class="pj-note">
        <span>📌</span>
        <p>Nama penanggung jawab dan cabang olahraga pada halaman ini mengikuti plottingan yang diberikan. Jika ada perubahan pembagian, cukup edit data pada <code>js/pj.js</code> tanpa mengganggu generator, history, rundown, maupun panduan.</p>
      </div>
    `;

    if (guidePage) main.insertBefore(section, guidePage);
    else main.appendChild(section);
  }

  function keepPageTitle() {
    const pageTitle = document.getElementById("pageTitle");
    const pjPage = document.getElementById("page-pj");
    const pjButton = document.querySelector('[data-page="pj"]');
    if (!pageTitle || !pjPage || !pjButton) return;

    pjButton.addEventListener("click", () => {
      window.setTimeout(() => {
        if (pjPage.classList.contains("active")) {
          pageTitle.textContent = "Penanggung Jawab";
        }
      }, 0);
    });
  }

  injectNavigation();
  injectPage();
  keepPageTitle();
})();
