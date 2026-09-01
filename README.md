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

Riwayat jarkoman disimpan pada **Turso** melalui API server-side `/api/history`.

Fitur:
- Jarkoman otomatis disimpan ke Turso setelah generate.
- Menu **Riwayat Bersama** dapat dilihat dari seluruh perangkat.
- Pencarian dan filter fakultas/jenis jarkoman tetap sama.
- Cadangan lokal tetap digunakan jika internet/database bermasalah.
- Data tertunda akan dicoba disinkronkan kembali saat perangkat online.

### Struktur Turso

Jalankan SQL dari:

```text
turso-setup.sql
```

pada database Turso. Schema menggunakan SQLite/libSQL.

### Konfigurasi Turso di Vercel

**Jangan menaruh auth token Turso di JavaScript frontend.** Token disimpan sebagai Environment Variables di Vercel:

```text
TURSO_DATABASE_URL=libsql://nama-database-nama-organisasi.turso.io
TURSO_AUTH_TOKEN=token_turso_kamu
```

API server ada di:

```text
api/history.js
```

Frontend hanya memanggil:

```text
/api/history
```

### Deploy

Project ini sekarang membutuhkan runtime API Vercel karena token Turso harus tetap server-side.

Setelah menambahkan Environment Variables di Vercel, lakukan deploy/push seperti biasa:

```powershell
git add .
git commit -m "migrate shared history from Supabase to Turso"
git push
```

### Catatan penting

Tampilan, CSS, generator, rundown, template, dan logic non-database **tidak diubah**. Perubahan hanya pada koneksi/penyimpanan Riwayat Bersama dari Supabase ke Turso.
