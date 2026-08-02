# LOWBAT Assist

Website dashboard dan generator jarkoman untuk Staff Liaison Officer OLIMDIPO 2026.

## Cara Menjalankan di VS Code

1. Ekstrak folder `LOWBAT-Assist`.
2. Buka folder tersebut melalui **Visual Studio Code**.
3. Pasang extension **Live Server**.
4. Klik kanan `index.html`.
5. Pilih **Open with Live Server**.

Website juga bisa dibuka langsung melalui `index.html`, tetapi Live Server lebih disarankan.

## Struktur Folder

```text
LOWBAT-Assist/
├── assets/
│   ├── logo-lowbat.png
│   └── background-lowbat.png
├── css/
│   └── styles.css
├── js/
│   ├── app.js
│   ├── rundown.js
│   └── templates.js
├── index.html
└── README.md
```

## Mengubah atau Menambah Rundown

Buka file:

```text
js/rundown.js
```

Contoh data:

```javascript
{
  id: "match-001",
  sport: "Futsal Putra",
  faculty: "Fakultas Teknik vs Fakultas Sains dan Matematika",
  date: "2026-08-10",
  time: "08:00",
  place: "GOR Undip",
  stage: "Penyisihan",
  isDemo: false
}
```

Ketentuan:

- `date` menggunakan format `YYYY-MM-DD`.
- `time` menggunakan format `HH:MM`.
- Setiap data harus memiliki `id` yang berbeda.
- Hapus data berlabel `isDemo: true` setelah rundown resmi tersedia.

## Mengubah atau Menambah Template Jarkoman

Buka file:

```text
js/templates.js
```

Placeholder yang tersedia:

```text
{GREETING}     Sapaan berdasarkan waktu WIB.
{MIKAT_LABEL}  Gabungan nama Mikat dan fakultas.
{FACULTY}      Nama fakultas/delegasi.
{SPORT}        Nama atau kategori cabang olahraga.
{DAY_DATE}     Hari dan tanggal.
{TIME}         Waktu dengan format titik.
{PLACE}        Tempat atau venue.
```

Contoh template baru:

```javascript
{
  id: "nama-template-baru",
  title: "Judul Template",
  icon: "📣",
  description: "Deskripsi singkat template.",
  requiresSport: true,
  requiresDate: true,
  requiresTime: true,
  requiresPlace: true,
  content: `Selamat {GREETING} Rekan-Rekan {MIKAT_LABEL}!

📅 Hari/Tanggal: {DAY_DATE}
⏰ Waktu: {TIME} WIB
📍 Tempat: {PLACE}`
}
```

Jangan lupa memberikan koma di antara objek template.

## Wilayah dan Daerah

Pilihan **Wilayah dan Daerah** sudah diatur agar tidak menampilkan opsi Seniora, Soraya, Mikatan, atau Mikat. Generator langsung menggunakan nama “Wilayah dan Daerah”.

## Penyimpanan Riwayat

Riwayat jarkoman disimpan pada `localStorage` browser. Data hanya tersimpan pada browser/perangkat yang digunakan dan tidak dikirim ke server.

Untuk menghapus riwayat, hapus key:

```text
lowbat-jarkoman-history
```

melalui menu **Developer Tools → Application → Local Storage**.

## Pengembangan Selanjutnya

- Login khusus staff LO.
- Database rundown terpusat.
- Status follow-up tiap fakultas.
- Notifikasi pertandingan terdekat.
- Panel admin untuk mengubah template tanpa membuka source code.

---

## Riwayat Bersama dengan Supabase

Versi ini sudah terhubung ke tabel Supabase `jarkoman_history`.

Fitur tambahannya:

- Nama staff pembuat pada tahap delegasi.
- Jarkoman otomatis disimpan ke Supabase setelah generate.
- Menu **Riwayat Bersama** dapat dilihat dari seluruh perangkat.
- Pencarian dan filter fakultas/jenis jarkoman.
- Membuka detail dan copy ulang jarkoman.
- Cadangan lokal apabila internet atau database bermasalah.
- Data tertunda akan dicoba disinkronkan kembali saat perangkat online.

### File koneksi

```text
js/supabase-config.js
```

File tersebut hanya boleh berisi:

- Project URL.
- Publishable key (`sb_publishable_...`).

Jangan pernah memasukkan `sb_secret_...` atau `service_role` ke source code frontend.

### Tabel dan RLS

Kode SQL cadangan tersedia di:

```text
supabase-setup.sql
```

Policy saat ini mengizinkan pengguna website untuk:

- Membaca riwayat (`SELECT`).
- Menambahkan riwayat (`INSERT`).

Pengguna website tidak memperoleh izin untuk mengubah atau menghapus data.

### Update ke GitHub dan Vercel

Setelah mengganti file project lokal dengan versi ini:

```powershell
git add .
git commit -m "add shared jarkoman history with Supabase"
git push
```

Vercel akan memperbarui website secara otomatis karena repository sudah terhubung.
