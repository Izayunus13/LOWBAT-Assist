/*
===========================================================
DATA TEMPLATE JARKOMAN — LOWBAT ASSIST
===========================================================

Template aktif:
1. Reminder H-2 TM Basket
2. Reminder H-2 TM Badminton
3. Today is The Day TM Basket
4. Today is The Day TM Badminton

Placeholder yang digunakan:

{MIKAT_LABEL}
= Pilihan Mikat / Mikatan / Soraya / Seniora + Fakultas
Contoh:
Seniora Fakultas Teknik

{FACULTY}
= Nama Fakultas / Sekolah Vokasi / Wilayah dan Daerah
Contoh:
Fakultas Teknik

{DAY_DATE}
= Hari dan tanggal pelaksanaan Technical Meeting
Contoh:
Sabtu, 12 September 2026

Cabang olahraga, jam, dan tempat sudah ditetapkan
langsung di masing-masing template.
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
     PILIHAN MIKAT
     ========================================================= */

  mikatOptions: [
    "Seniora",
    "Soraya",
    "Mikatan",
    "Mikat"
  ],


  /* =========================================================
     DATA CABANG OLAHRAGA
     Tetap dipertahankan agar struktur website tetap aman.
     ========================================================= */

  sportsMap: {

    "Futsal": [
      "Futsal Putra",
      "Futsal Putri"
    ],

    "Basket": [
      "Basket Putra",
      "Basket Putri"
    ],

    "Sepak Bola": [
      "Sepak Bola"
    ],

    "Atletik": [
      "Atletik"
    ],

    "Voli": [
      "Voli Putra"
    ],

    "Badminton": [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran"
    ],

    "Karate": [
      "Karate Putra",
      "Karate Putri"
    ],

    "Silat": [
      "Silat Putra",
      "Silat Putri"
    ],

    "Taekwondo": [
      "Kyorugi Putra",
      "Kyorugi Putri",
      "Poomsae Putra",
      "Poomsae Putri"
    ]

  },


  /* =========================================================
     TEMPLATE JARKOMAN
     ========================================================= */

  templates: [

    /* =======================================================
       REMINDER H-2 TECHNICAL MEETING BASKET
       ======================================================= */

    {
      id: "reminder-h2-tm-basket",

      title: "Reminder H-2 TM Basket",

      icon: "🏀",

      description:
        "Reminder H-2 Technical Meeting Cabang Olahraga Basket OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `📢 *[REMINDER H-2 TECHNICAL MEETING (TM) CABANG OLAHRAGA BASKET OLIMDIPO 2026]* 🏀

Halo Rekan-Rekan {MIKAT_LABEL} dan Official/Manajer Basket Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Tidak terasa, *2 hari lagi* akan dilaksanakan Technical Meeting (TM) Cabang Olahraga Basket OLIMDIPO 2026.

Berikut kami sampaikan kembali informasi terkait pelaksanaan Technical Meeting Basket:

🗓️ *Hari, Tanggal:* {DAY_DATE}
📍 *Tempat:* Student Center Universitas Diponegoro

⏰ *RINCIAN WAKTU PELAKSANAAN*
• 18.00 WIB — Open Gate
• 18.30 – 19.15 WIB — Registrasi Peserta
• 19.15 – 21.00 WIB — Pelaksanaan Technical Meeting

⚠️ *PENTING!*
1. Setiap kontingen *wajib mengirimkan 1 perwakilan official (Mikat/Mikatan/Soraya/Seniora) dan 1 perwakilan atlet* untuk mengikuti Technical Meeting.
2. Peserta diharapkan sudah hadir sejak *Open Gate pukul 18.00 WIB* dan melakukan registrasi sesuai waktu yang telah ditentukan.
3. *Technical Meeting akan dimulai pukul 19.15 WIB*, sehingga seluruh peserta diharapkan sudah menyelesaikan proses registrasi sebelum acara dimulai.
4. Technical Meeting akan membahas regulasi pertandingan, drawing, serta ketentuan teknis lainnya terkait pelaksanaan Cabang Olahraga Basket OLIMDIPO 2026.

Mohon bantuan Rekan-Rekan {MIKAT_LABEL} untuk kembali meneruskan informasi ini kepada official/manajer dan tim Basket dari kontingen {FACULTY}, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Pastikan tidak ada informasi teknis yang terlewat agar seluruh kontingen dapat mempersiapkan pertandingan dengan baik.

Terima kasih atas perhatian dan kerja samanya. Sampai bertemu di Technical Meeting Basket OLIMDIPO 2026! 🏀🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },


    /* =======================================================
       REMINDER H-2 TECHNICAL MEETING BADMINTON
       ======================================================= */

    {
      id: "reminder-h2-tm-badminton",

      title: "Reminder H-2 TM Badminton",

      icon: "🏸",

      description:
        "Reminder H-2 Technical Meeting Cabang Olahraga Badminton OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `📢 *[REMINDER H-2 TECHNICAL MEETING (TM) CABANG OLAHRAGA BADMINTON OLIMDIPO 2026]* 🏸

Halo Rekan-Rekan {MIKAT_LABEL} dan Official/Manajer Badminton Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Tidak terasa, *2 hari lagi* akan dilaksanakan Technical Meeting (TM) Cabang Olahraga Badminton OLIMDIPO 2026.

Berikut kami sampaikan kembali informasi terkait pelaksanaan Technical Meeting Badminton:

🗓️ *Hari, Tanggal:* {DAY_DATE}
📍 *Tempat:* Student Center Lt. 2 Universitas Diponegoro

⏰ *RINCIAN WAKTU PELAKSANAAN*
• 15.00 WIB — Open Gate
• 15.00 – 15.30 WIB — Registrasi Peserta
• 15.30 – 17.25 WIB — Pelaksanaan Technical Meeting

⚠️ *PENTING!*
1. Setiap kontingen *wajib mengirimkan 1 perwakilan official (Mikat/Mikatan/Soraya/Seniora) dan 1 perwakilan atlet* untuk mengikuti Technical Meeting.
2. Peserta diharapkan sudah hadir sejak *Open Gate pukul 15.00 WIB* dan segera melakukan registrasi sesuai waktu yang telah ditentukan.
3. *Technical Meeting akan dimulai pukul 15.30 WIB*, sehingga seluruh peserta diharapkan sudah menyelesaikan proses registrasi sebelum acara dimulai.
4. Technical Meeting akan membahas regulasi pertandingan, drawing, serta ketentuan teknis lainnya terkait pelaksanaan Cabang Olahraga Badminton OLIMDIPO 2026.
5. Setiap perwakilan diharapkan mengikuti rangkaian Technical Meeting dari awal hingga selesai agar tidak ada informasi teknis pertandingan yang terlewat.

Mohon bantuan Rekan-Rekan {MIKAT_LABEL} untuk kembali meneruskan informasi ini kepada official/manajer dan tim Badminton dari kontingen {FACULTY}, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Pastikan tidak ada informasi teknis yang terlewat agar seluruh kontingen dapat mempersiapkan pertandingan dengan baik.

Terima kasih atas perhatian dan kerja samanya. Sampai bertemu di Technical Meeting Badminton OLIMDIPO 2026! 🏸🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },


    /* =======================================================
       TODAY IS THE DAY — TECHNICAL MEETING BASKET
       ======================================================= */

    {
      id: "today-tm-basket",

      title: "Today is The Day TM Basket",

      icon: "🏀",

      description:
        "Jarkoman hari-H Technical Meeting Cabang Olahraga Basket OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `🚨 *[TODAY IS THE DAY! TECHNICAL MEETING (TM) CABANG OLAHRAGA BASKET OLIMDIPO 2026]* 🏀🔥

Halo Rekan-Rekan {MIKAT_LABEL} dan Official/Manajer Basket Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Hari yang ditunggu telah tiba! *Technical Meeting (TM) Cabang Olahraga Basket OLIMDIPO 2026* akan dilaksanakan *HARI INI*. Berikut informasi lengkap pelaksanaannya:

🗓️ *Hari, Tanggal:* {DAY_DATE}
📍 *Tempat:* Student Center Universitas Diponegoro

⏰ *RINCIAN WAKTU PELAKSANAAN*
• 18.00 WIB — Open Gate
• 18.30 – 19.15 WIB — Registrasi Peserta
• 19.15 – 21.00 WIB — Pelaksanaan Technical Meeting

⚠️ *PENTING!*

1. Setiap kontingen *wajib mengirimkan 1 perwakilan official (Mikat/Mikatan/Soraya/Seniora) dan 1 perwakilan atlet* untuk mengikuti Technical Meeting.
2. Peserta diharapkan sudah hadir sejak *Open Gate pukul 18.00 WIB* dan melakukan registrasi sesuai waktu yang telah ditentukan.
3. *Technical Meeting akan dimulai pukul 19.15 WIB*, sehingga seluruh peserta diharapkan sudah menyelesaikan registrasi sebelum acara dimulai.
4. Technical Meeting akan membahas regulasi pertandingan, drawing, serta ketentuan teknis lainnya terkait pelaksanaan Cabor Basket OLIMDIPO 2026.

Mohon bantuan Rekan-Rekan {MIKAT_LABEL} untuk meneruskan informasi ini kepada official/manajer dan tim Basket dari kontingen {FACULTY}, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Terima kasih atas perhatian dan kerja samanya. Sampai bertemu di *Technical Meeting Basket OLIMDIPO 2026*! 🏀🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },


    /* =======================================================
       TODAY IS THE DAY — TECHNICAL MEETING BADMINTON
       ======================================================= */

    {
      id: "today-tm-badminton",

      title: "Today is The Day TM Badminton",

      icon: "🏸",

      description:
        "Jarkoman hari-H Technical Meeting Cabang Olahraga Badminton OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `🚨 *[TODAY IS THE DAY! TECHNICAL MEETING (TM) CABANG OLAHRAGA BADMINTON OLIMDIPO 2026]* 🏸🔥

Halo Rekan-Rekan {MIKAT_LABEL} dan Official/Manajer Badminton Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Hari yang ditunggu telah tiba! *Technical Meeting (TM) Cabang Olahraga Badminton OLIMDIPO 2026* akan dilaksanakan *HARI INI*. Berikut informasi lengkap pelaksanaannya:

🗓️ *Hari, Tanggal:* {DAY_DATE}
📍 *Tempat:* Student Center Lt. 2 Universitas Diponegoro

⏰ *RINCIAN WAKTU PELAKSANAAN*
• 15.00 WIB — Open Gate
• 15.00 – 15.30 WIB — Registrasi Peserta
• 15.30 – 17.25 WIB — Pelaksanaan Technical Meeting

⚠️ *PENTING!*

1. Setiap kontingen *wajib mengirimkan 1 perwakilan official (Mikat/Mikatan/Soraya/Seniora) dan 1 perwakilan atlet* untuk mengikuti Technical Meeting.
2. Peserta diharapkan sudah hadir sejak *Open Gate pukul 15.00 WIB* dan segera melakukan registrasi sesuai waktu yang telah ditentukan.
3. *Technical Meeting akan dimulai pukul 15.30 WIB*, sehingga seluruh peserta diharapkan sudah menyelesaikan registrasi sebelum acara dimulai.
4. Technical Meeting akan membahas regulasi pertandingan, drawing, serta ketentuan teknis lainnya terkait pelaksanaan Cabor Badminton OLIMDIPO 2026.
5. Setiap perwakilan diharapkan mengikuti rangkaian Technical Meeting dari awal hingga selesai agar tidak ada informasi teknis pertandingan yang terlewat.

Mohon bantuan Rekan-Rekan {MIKAT_LABEL} untuk meneruskan informasi ini kepada official/manajer dan tim Badminton dari kontingen {FACULTY}, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Terima kasih atas perhatian dan kerja samanya. Sampai bertemu di *Technical Meeting Badminton OLIMDIPO 2026*! 🏸🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    }

  ]

};