(() => {
  "use strict";

  const plottingData = [
    {
      faculty: "Fakultas Teknik",
      people: [
        { name: "Aurora Saphira", sports: "Futsal, Karate" },
        { name: "Fariza Nur Khairani", sports: "Basket, Atletik" },
        { name: "Rifat Athallah", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Astianda Bunga", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Sekolah Vokasi",
      people: [
        { name: "Cardio Cholish", sports: "Futsal, Karate" },
        { name: "Susan Meilyana", sports: "Basket, Atletik" },
        { name: "Nasya Dea", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Shindy Fitriani", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Hukum",
      people: [
        { name: "Albany Brilliano", sports: "Futsal, Karate" },
        { name: "Aprillya Putri", sports: "Basket, Atletik" },
        { name: "Alya Fortuna", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Aqilla Zana", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Ilmu Sosial dan Ilmu Politik",
      people: [
        { name: "Anisa Meili", sports: "Futsal, Karate" },
        { name: "Amanda Tabina", sports: "Basket, Atletik" },
        { name: "Sellma Aulya", sports: "Sepak Bola, Silat, Taekwondo" },
        { name: "Anisa Tulaini", sports: "Voli, Badminton" }
      ]
    },
    {
      faculty: "Fakultas Perikanan dan Ilmu Kelautan",
      people: [
        { name: "Adzanandya", sports: "Futsal, Karate, Badminton" },
        { name: "Salma Hari", sports: "Basket, Atletik, Taekwondo" },
        { name: "Alodia Permata", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Ilmu Budaya",
      people: [
        { name: "Rhizky Satria", sports: "Futsal, Karate, Badminton" },
        { name: "Jannazra", sports: "Basket, Atletik, Taekwondo" },
        { name: "Sila Lituhayu", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Sains dan Matematika",
      people: [
        { name: "Sanesa Triani", sports: "Futsal, Karate, Badminton" },
        { name: "Nikeisha Zefanya", sports: "Basket, Atletik, Taekwondo" },
        { name: "Hafia Farah", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Ekonomika dan Bisnis",
      people: [
        { name: "Hecira Aulianisa", sports: "Futsal, Karate, Badminton" },
        { name: "Saxia Roswita", sports: "Basket, Atletik, Taekwondo" },
        { name: "Berliana Dewi", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Kedokteran",
      people: [
        { name: "Kenisha Poety", sports: "Futsal, Karate, Badminton" },
        { name: "Cleova Khansa", sports: "Basket, Atletik, Taekwondo" },
        { name: "Nevia Bilqis", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Wilayah dan Daerah/PSDKU",
      people: [
        { name: "Irma Carissa", sports: "Futsal, Karate, Badminton" },
        { name: "Ayesha Bilqis", sports: "Basket, Atletik, Taekwondo" },
        { name: "Nila Laela", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Psikologi",
      people: [
        { name: "Vanessa Laura", sports: "Futsal, Karate, Badminton" },
        { name: "Jihan Aulia", sports: "Basket, Atletik, Taekwondo" },
        { name: "Rizka Auralya", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Kesehatan Masyarakat",
      people: [
        { name: "Salsabila Chiara", sports: "Futsal, Karate, Badminton" },
        { name: "Fellysha Pramudhita", sports: "Basket, Atletik, Taekwondo" },
        { name: "Siti Rahma", sports: "Sepak Bola, Silat, Voli" }
      ]
    },
    {
      faculty: "Fakultas Peternakan dan Pertanian",
      people: [
        { name: "Regina Dinda", sports: "Futsal, Karate, Badminton" },
        { name: "Maria Helena", sports: "Basket, Atletik, Taekwondo" },
        { name: "Savaira Nashita", sports: "Sepak Bola, Silat, Voli" }
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
            <span class="pj-faculty-icon">
            <img src="assets/undip.png" alt="Logo Undip">
            </span>
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
