/*
===========================================================
DATA TEMPLATE JARKOMAN — LOWBAT ASSIST
===========================================================

Template aktif:
1. Technical Meeting Basket
2. Technical Meeting Badminton

Data yang disesuaikan melalui generator:
{FACULTY}  = Fakultas / Sekolah Vokasi / Wilayah dan Daerah
{DAY_DATE} = Hari dan tanggal pelaksanaan

Cabor, jam, dan tempat sudah ditetapkan langsung
di masing-masing template.
*/

window.LOWBAT_DATA = {
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

  mikatOptions: [
    "Seniora",
    "Soraya",
    "Mikatan",
    "Mikat"
  ],

  sportsMap: {
    "Futsal": ["Futsal Putra", "Futsal Putri"],
    "Basket": ["Basket Putra", "Basket Putri"],
    "Sepak Bola": ["Sepak Bola"],
    "Atletik": ["Atletik"],
    "Voli": ["Voli Putra"],
    "Badminton": [
      "Tunggal Putra",
      "Tunggal Putri",
      "Ganda Putra",
      "Ganda Putri",
      "Ganda Campuran"
    ],
    "Karate": ["Karate Putra", "Karate Putri"],
    "Silat": ["Silat Putra", "Silat Putri"],
    "Taekwondo": [
      "Kyorugi Putra",
      "Kyorugi Putri",
      "Poomsae Putra",
      "Poomsae Putri"
    ]
  },

  templates: [
    {
      id: "technical-meeting-basket",
      title: "Technical Meeting Basket",
      icon: "🏀",
      description:
        "Informasi Technical Meeting Cabang Olahraga Basket OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `📢 *[INFORMASI TECHNICAL MEETING (TM) CABANG OLAHRAGA BASKET OLIMDIPO 2026]* 🏀

Halo Rekan-Rekan Mikat / Mikatan / Soraya / Seniora dan Official/Manajer Basket Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Sehubungan dengan digelarnya OLIMDIPO 2026, berikut kami sampaikan informasi mengenai pelaksanaan *Technical Meeting (TM) Cabang Olahraga Basket:*

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

Mohon informasi ini dapat diteruskan kepada official/manajer dan tim Basket dari kontingen masing-masing, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Terima kasih atas perhatian dan kerja samanya. Mari bersama-sama menjaga koordinasi dan sportivitas selama rangkaian OLIMDIPO 2026! 🏀🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },

    {
      id: "technical-meeting-badminton",
      title: "Technical Meeting Badminton",
      icon: "🏸",
      description:
        "Informasi Technical Meeting Cabang Olahraga Badminton OLIMDIPO 2026.",

      requiresSport: false,
      requiresDate: true,
      requiresTime: false,
      requiresPlace: false,

      content: `📢 *[INFORMASI TECHNICAL MEETING (TM) CABANG OLAHRAGA BADMINTON OLIMDIPO 2026]* 🏸

Halo Rekan-Rekan Mikat / Mikatan / Soraya / Seniora dan Official/Manajer Badminton Kontingen {FACULTY} Universitas Diponegoro! 👋✨

Sehubungan dengan digelarnya OLIMDIPO 2026, berikut kami sampaikan informasi mengenai pelaksanaan *Technical Meeting (TM) Cabang Olahraga Badminton:*

🗓️ *Hari, Tanggal:* {DAY_DATE}
📍 *Tempat:* Student Center Lt. 2 Universitas Diponegoro

⏰ *RINCIAN WAKTU PELAKSANAAN*
• 15.00 WIB — Open Gate
• 15.00 – 15.30 WIB — Registrasi Peserta
• 15.30 – 18.00 WIB — Pelaksanaan Technical Meeting

⚠️ *PENTING!*

1. Setiap kontingen *wajib mengirimkan 1 perwakilan official (Mikat/Mikatan/Soraya/Seniora) dan 1 perwakilan atlet* untuk mengikuti Technical Meeting.
2. Peserta diharapkan sudah hadir sejak *Open Gate pukul 15.00 WIB* dan segera melakukan registrasi sesuai waktu yang telah ditentukan.
3. *Technical Meeting akan dimulai pukul 15.30 WIB*, sehingga seluruh peserta diharapkan sudah menyelesaikan registrasi sebelum acara dimulai.
4. Technical Meeting akan membahas regulasi pertandingan, drawing, serta ketentuan teknis lainnya terkait pelaksanaan Cabor Badminton OLIMDIPO 2026.
5. Mohon setiap perwakilan mengikuti rangkaian Technical Meeting dari awal hingga selesai agar tidak ada informasi teknis pertandingan yang terlewat.

Mohon informasi ini dapat diteruskan kepada official/manajer dan tim Badminton dari kontingen masing-masing, serta memastikan perwakilan yang ditunjuk dapat hadir dan mengikuti rangkaian Technical Meeting dari awal hingga selesai.

Terima kasih atas perhatian dan kerja samanya. Mari bersama-sama menjaga koordinasi dan sportivitas selama rangkaian OLIMDIPO 2026! 🏸🔥

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    }
  ]
};