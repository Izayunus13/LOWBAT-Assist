/*
===========================================================
DATA TEMPLATE JARKOMAN — LOWBAT ASSIST
===========================================================

Template aktif:
1. H-1 Pertandingan Basket OLIMDIPO 2026

Placeholder:

{MIKAT_LABEL}
= Seniora / Soraya / Mikatan / Mikat + Fakultas
Contoh:
Seniora Fakultas Teknik

{FACULTY}
= Nama fakultas/delegasi lengkap
Contoh:
Fakultas Teknik

{BASKET_CATEGORY}
= PUTRA / PUTRI

{MATCHUP}
= Fakultas yang dijarkom VS Fakultas Lawan
Contoh:
FT vs FISIP

CATATAN:
Fakultas yang dijarkom SELALU berada di sebelah kiri,
baik status pertandingan HOME maupun AWAY.

{MATCH_STATUS}
= HOME / AWAY

{DAY_DATE}
= Hari dan tanggal pertandingan

{REGISTRATION_TIME}
= Jam registrasi

{TIPOFF_TIME}
= Jam Tip Off

{VENUE}
= Venue pertandingan
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
     SINGKATAN FAKULTAS
     Digunakan pada bagian pertandingan.
     Contoh: FT vs FISIP
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
     VENUE
     ========================================================= */

  venues: [
    "Gor Basket UNDIP"
  ],


  /* =========================================================
     SPORTS MAP

     Tetap disediakan supaya struktur app.js lama
     tidak terganggu.
     ========================================================= */

  sportsMap: {
    "Basket": [
      "Basket Putra",
      "Basket Putri"
    ]
  },


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


      /*
      Field bawaan generator.
      */

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,


      /*
      Menandakan template ini menggunakan
      form khusus pertandingan Basket.
      */

      requiresBasketMatch: true,


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