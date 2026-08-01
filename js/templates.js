/*
===========================================================
DATA TEMPLATE JARKOMAN — LOWBAT ASSIST
===========================================================

Cara menambah template:
1. Salin satu objek di bagian templates.
2. Ganti id dengan nama unik tanpa spasi.
3. Isi title, icon, description, kebutuhan field, dan content.
4. Gunakan placeholder berikut jika diperlukan:

{GREETING}     = Pagi / Siang / Sore / Malam sesuai WIB
{MIKAT_LABEL}  = Contoh: Seniora Fakultas Teknik
{FACULTY}      = Contoh: Fakultas Teknik
{SPORT}        = Contoh: Futsal Putra
{DAY_DATE}     = Contoh: Senin, 10 Agustus 2026
{TIME}         = Contoh: 15.00
{PLACE}        = Contoh: GOR Undip
*/

window.LOWBAT_DATA = {
  faculties: [
    "Fakultas Teknik",
    "Fakultas Ekonomi dan Bisnis",
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

  mikatOptions: ["Seniora", "Soraya", "Mikatan", "Mikat"],

  sportsMap: {
    "Futsal": ["Futsal Putra", "Futsal Putri"],
    "Basket": ["Basket Putra", "Basket Putri"],
    "Sepak Bola": ["Sepak Bola Putra"],
    "Atletik": ["Atletik"],
    "Voli": ["Voli Putra"],
    "Badminton": ["Tunggal Putra", "Tunggal Putri", "Ganda Putra", "Ganda Putri", "Ganda Campuran"],
    "Karate": ["Karate Putra", "Karate Putri"],
    "Silat": ["Silat Putra", "Silat Putri"],
    "Taekwondo": ["Kyorugi Putra", "Kyorugi Putri", "Poomsae Putra", "Poomsae Putri"]
  },

  templates: [
    {
      id: "request-pj",
      title: "Meminta Nomor PJ Cabor",
      icon: "📱",
      description: "Membuka jalur koordinasi dan meminta narahubung internal tiap cabor.",
      requiresSport: false,
      requiresDate: false,
      requiresTime: false,
      requiresPlace: false,
      content: `Selamat {GREETING} rekan-rekan delegasi {MIKAT_LABEL} yang sudah bergabung! 🤝✨

Terima kasih atas respons cepatnya. Grup ini resmi akan kita gunakan sebagai pintu utama penyebaran informasi teknis OLIMDIPO 2026.

Guna mempermudah alur komunikasi kepada para atlet fakultas yang akan bertanding, kami memohon bantuan rekan-rekan PJ delegasi untuk:

📱 1. Membuat/Menyiapkan Narahubung Internal
Menentukan perwakilan dari Mikat/Mikatan/Soraya/Seniora di fakultas masing-masing yang akan menjadi penanggung jawab (PJ) setiap cabang olahraga.

🔄 2. Penyebaran Informasi Satu Pintu
Memastikan nomor kontak atau ID LINE para PJ Fakultas tersebut disebarkan kepada seluruh atlet, agar para atlet tidak kebingungan dan dapat langsung menghubungi pihak fakultas apabila terdapat kendala teknis, logistik, maupun administrasi.

Mari kita pastikan tidak ada informasi yang terputus demi kenyamanan dan kesiapan para atlet di lapangan nanti. 🏅

Atas perhatian dan kerja sama maraton dari rekan-rekan semua, kami ucapkan terima kasih banyak! 🙏✨

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },

    {
      id: "opening-ceremony",
      title: "Opening Ceremony",
      icon: "🏆",
      description: "Undangan dan koordinasi kehadiran kontingen dalam upacara pembukaan.",
      requiresSport: false,
      requiresDate: true,
      requiresTime: true,
      requiresPlace: true,
      content: `[OPENING CEREMONY OLIMDIPO 2026] 🔥🏆

Halo Rekan-Rekan {MIKAT_LABEL}! 👋✨

Gong perjuangan akan segera ditabuh! 🎉 Mari kita satukan semangat dan kawal kontingen kebanggaan kita dalam Opening Ceremony OLIMDIPO 2026 yang akan dilaksanakan pada:

📅 Hari/Tanggal: {DAY_DATE}
⏰ Waktu: {TIME} WIB
📍 Tempat: {PLACE}

Mohon bantuannya untuk mengoordinasikan seluruh atlet, official, dan supporter dari {FACULTY} agar dapat hadir tepat waktu dan memeriahkan upacara pembukaan ini. Let's paint the venue with our pride! 🎨🔥

Terima kasih atas dedikasi dan kerja samanya! Sampai jumpa di venue! 🚀

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },

    {
      id: "technical-meeting",
      title: "Technical Meeting",
      icon: "📢",
      description: "Undangan TM cabor lengkap dengan jadwal, tempat, dan agenda.",
      requiresSport: true,
      requiresDate: true,
      requiresTime: true,
      requiresPlace: true,
      content: `[TECHNICAL MEETING OLIMDIPO {SPORT} 2026] 📢

Selamat {GREETING} Rekan-Rekan {MIKAT_LABEL}! 🙏

Demi kelancaran dan transparansi kompetisi, kami mengundang perwakilan official/kapten tim dari {FACULTY} untuk menghadiri Technical Meeting (TM) OLIMDIPO 2026 pada:

📅 Hari/Tanggal: {DAY_DATE}
⏰ Waktu: {TIME} WIB
📍 Tempat: {PLACE}

📌 Agenda: Pembahasan regulasi umum, peraturan cabang olahraga, dan drawing bagan pertandingan.

Mengingat pentingnya agenda ini untuk menyamakan persepsi dan aturan main, kehadiran perwakilan dari {FACULTY} bersifat WAJIB. ⚠️

Pastikan tidak ada informasi yang terlewat, ya! Jika terdapat kendala kehadiran, harap segera menghubungi narahubung terkait. 📱

Terima kasih atas perhatian dan kerja samanya! Bersama kita jaga sportivitas! 🤝🏅

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    },

    {
      id: "reminder-h2",
      title: "Reminder H-2 Pertandingan",
      icon: "⏳",
      description: "Pengingat pertandingan terdekat untuk cabang olahraga tertentu.",
      requiresSport: true,
      requiresDate: true,
      requiresTime: true,
      requiresPlace: true,
      content: `[H-2 PERTANDINGAN {SPORT} OLIMDIPO 2026] ⏳🔥

Semangat {GREETING} Rekan-Rekan {MIKAT_LABEL}! 💪🔥

Tidak terasa 2 HARI LAGI kontingen terbaik dari {FACULTY} akan mulai berlaga di medan juang OLIMDIPO 2026! 🏟️✨

Berikut adalah pengingat penting terkait jadwal pertandingan terdekat untuk fakultas kita:

📋 Detail Jadwal H-2:
• Cabang Olahraga: {SPORT}
• Hari/Tanggal: {DAY_DATE}
• Jam Tanding: {TIME} WIB
• Lapangan/Venue: {PLACE}

Mari kita persiapkan segalanya dengan matang demi hasil yang maksimal! Kerahkan seluruh dukungan terbaik kalian! 🗣️🥁

Terima kasih, dan selamat mempersiapkan diri! 🥇

#OLIMDIPO2026
#EarnYourMomentOwnTheStage
#BidangSenidanOlahraga2026
#BEMUNDIP2026`
    }
  ]
};
