-- LOWBAT Assist: tabel Riwayat Bersama untuk Turso / SQLite.
-- Jalankan di Turso SQL shell / Turso dashboard.

CREATE TABLE IF NOT EXISTS jarkoman_history (
  id TEXT PRIMARY KEY NOT NULL,
  template_title TEXT NOT NULL,
  faculty TEXT NOT NULL,
  mikat_name TEXT,
  sport TEXT,
  event_date TEXT,
  event_time TEXT,
  event_place TEXT,
  generated_text TEXT NOT NULL,
  created_by TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS jarkoman_history_created_at_idx
ON jarkoman_history (created_at DESC);
