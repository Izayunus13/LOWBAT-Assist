/*
===========================================================
DATA RUNDOWN MATCH — LOWBAT ASSIST
===========================================================

File ini khusus untuk menambah atau mengubah jadwal pada Dashboard.

FORMAT WAJIB:
{
  id: "kode-unik",
  sport: "Nama Cabor",
  faculty: "Nama Fakultas / Delegasi",
  date: "YYYY-MM-DD",
  time: "HH:MM",
  place: "Nama Venue",
  stage: "Tahap Pertandingan",
  isDemo: false
}

CATATAN:
- Gunakan format tanggal YYYY-MM-DD.
- Gunakan format waktu 24 jam HH:MM.
- Hapus data contoh setelah rundown resmi tersedia.
- Tambahkan koma di antara setiap objek.
*/

window.RUNDOWN_DATA = [
  {
    id: "demo-001",
    sport: "Futsal Putra",
    faculty: "Fakultas Teknik vs Fakultas Sains dan Matematika",
    date: "2026-08-08",
    time: "08:00",
    place: "GOR Undip",
    stage: "Penyisihan",
    isDemo: true
  },
  {
    id: "demo-002",
    sport: "Basket Putri",
    faculty: "Fakultas Ilmu Sosial dan Ilmu Politik vs Fakultas Kedokteran",
    date: "2026-08-09",
    time: "13:00",
    place: "GOR Prof. Soedarto",
    stage: "Penyisihan",
    isDemo: true
  },
  {
    id: "demo-003",
    sport: "Badminton Ganda Campuran",
    faculty: "Fakultas Ekonomi dan Bisnis vs Sekolah Vokasi",
    date: "2026-08-10",
    time: "15:30",
    place: "Lapangan Badminton Undip",
    stage: "Perempat Final",
    isDemo: true
  }

  /*
  CONTOH MENAMBAHKAN JADWAL BARU:

  ,{
    id: "match-004",
    sport: "Voli Putra",
    faculty: "Fakultas Hukum vs Fakultas Psikologi",
    date: "2026-08-11",
    time: "09:00",
    place: "GOR Undip",
    stage: "Semifinal",
    isDemo: false
  }
  */
];
