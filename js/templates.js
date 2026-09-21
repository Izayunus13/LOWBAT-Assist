/*
===========================================================
DATA TEMPLATE JARKOMAN — LOWBAT ASSIST
===========================================================

Template aktif:
1. H-1 Pertandingan Basket OLIMDIPO 2026

FLOW:
Template
→ Staff
→ Fakultas / Delegasi
→ Mikat / Mikatan / Soraya / Seniora
→ Cabang Olahraga: Basket
→ Kategori: PUTRA / PUTRI
→ Fakultas Lawan
→ Status: HOME / AWAY
→ Hari / Tanggal
→ Jam Registrasi
→ Jam Tip Off
→ Venue
→ Crosscheck
→ Generate

CATATAN:
Fakultas yang sedang dijarkom SELALU berada
di sebelah kiri pada bagian pertandingan.

Contoh:
Fakultas Teknik dijarkom
Lawan FISIP
Status AWAY

Hasil:
FT vs FISIP
Status: AWAY

HOME / AWAY TIDAK membalik posisi tim.
===========================================================
*/

window.LOWBAT_DATA = {

  /* =========================================================
     FAKULTAS / DELEGASI
     ========================================================= */

  faculties: [
    "Fakultas Teknik",
    "Fakultas Ekonomika dan Bisnis",
    "Fakultas Perikanan dan Ilmu Kelautan",
    "Fakultas Sains dan Matematika",
    "Fakultas Ilmu Budaya",
    "Fakultas Hukum",
    "Fakultas Ilmu Sosial dan Ilmu Politik",
    "Fakultas Peternakan dan Pertanian",
    "Fakultas Psikologi",
    "Fakultas Kedokteran",
    "Fakultas Kesehatan Masyarakat",
    "Sekolah Vokasi",
    "Wilayah dan Daerah"
  ],


  /* =========================================================
     SINGKATAN FAKULTAS / DELEGASI

     Digunakan pada bagian:
     FT vs FISIP
     FEB vs FPP
     dst.
     ========================================================= */

  facultyShortMap: {
    "Fakultas Teknik": "FT",
    "Fakultas Ekonomika dan Bisnis": "FEB",
    "Fakultas Perikanan dan Ilmu Kelautan": "FPIK",
    "Fakultas Sains dan Matematika": "FSM",
    "Fakultas Ilmu Budaya": "FIB",
    "Fakultas Hukum": "FH",
    "Fakultas Ilmu Sosial dan Ilmu Politik": "FISIP",
    "Fakultas Peternakan dan Pertanian": "FPP",
    "Fakultas Psikologi": "FPsi",
    "Fakultas Kedokteran": "FK",
    "Fakultas Kesehatan Masyarakat": "FKM",
    "Sekolah Vokasi": "SV",
    "Wilayah dan Daerah": "WILDA"
  },


  /* =========================================================
     PILIHAN MIKAT
     ========================================================= */

  mikatOptions: [
    "Seniora",
    "Soraya",
    "Mikatan",
    "Mikat"
  ],


  /* =========================================================
     CABANG OLAHRAGA

     Saat ini hanya Basket.
     Setelah Basket dipilih,
     baru form PUTRA / PUTRI akan muncul.
     ========================================================= */

  sportsMap: {
    "Basket": [
      "Basket"
    ]
  },


  /* =========================================================
     KATEGORI BASKET
     ========================================================= */

  basketCategories: [
    "PUTRA",
    "PUTRI"
  ],


  /* =========================================================
     STATUS PERTANDINGAN
     ========================================================= */

  matchStatuses: [
    "HOME",
    "AWAY"
  ],


  /* =========================================================
     VENUE PERTANDINGAN
     ========================================================= */

  venues: [
    "Gor Basket UNDIP"
  ],


  /* =========================================================
     TEMPLATE JARKOMAN
     ========================================================= */

  templates: [

    {
      id: "h1-pertandingan-basket",

      title: "H-1 Pertandingan Basket",

      icon: "🏀",

      description:
        "Jarkoman H-1 pertandingan Basket OLIMDIPO 2026.",


      /* =====================================================
         FIELD GENERATOR
         ===================================================== */

      /*
      TRUE karena user tetap harus
      memilih Cabang Olahraga: Basket.
      */

      requiresSport: true,

      /*
      Hari / tanggal pertandingan wajib dipilih.
      */

      requiresDate: true,

      /*
      Waktu generic tidak digunakan,
      karena Basket memakai:
      - Jam Registrasi
      - Jam Tip Off
      */

      requiresTime: false,

      /*
      Tempat generic tidak digunakan,
      karena venue memakai dropdown khusus.
      */

      requiresPlace: false,

      /*
      Mengaktifkan form khusus pertandingan Basket:
      PUTRA/PUTRI
      Lawan
      HOME/AWAY
      Registrasi
      Tip Off
      Venue
      */

      requiresBasketMatch: true,


      /* =====================================================
         ISI JARKOMAN
         ===================================================== */

      content: `📢 *[H-1 PERTANDINGAN BASKET OLIMDIPO 2026]* 🏀🔥

Halo Rekan-Rekan {MIKAT_LABEL} dan Official Basket Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Tidak terasa, *besok* Kontingen {FACULTY} akan melaksanakan pertandingan Basket OLIMDIPO 2026 dengan rincian:

🏀 *Kategori:* {BASKET_CATEGORY}
🏀 *{MATCHUP}*
🏠 *Status:* {MATCH_STATUS}
🗓️ *Hari, Tanggal:* {DAY_DATE}
📝 *Registrasi:* {REGISTRATION_TIME} WIB
⏰ *Tip Off:* {TIPOFF_TIME} WIB
📍 *Venue:* {VENUE}

⚠️ *PENGINGAT PENTING!*
• Seluruh atlet dan official diwajibkan hadir di venue *1 jam sebelum pertandingan* untuk melakukan persiapan dan registrasi.
• Seluruh atlet dihimbau untuk membawa KTM. Khusus mahasiswa baru Angkatan 2026 yang belum memiliki KTM fisik, diwajibkan membawa KTM dalam bentuk print/cetak, dan untuk official diwajibkan membawa kartu lisensi *(jika mempunyai)*.
• Pastikan seluruh perlengkapan dan kebutuhan pertandingan telah dipersiapkan sebelum menuju venue.
• Mohon memperhatikan kembali regulasi dan ketentuan pertandingan yang telah disampaikan pada saat Technical Meeting.
• Pastikan kembali kategori Putra/Putri, lawan, waktu registrasi, Tip Off, dan venue pertandingan agar tidak terjadi keterlambatan.

Mohon bantuan Rekan-Rekan untuk meneruskan informasi ini kepada seluruh atlet dan official Basket kontingennya.

Sampai bertemu di venue dan semangat untuk pertandingan besok! 🏀🏆🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    }

  ]

};