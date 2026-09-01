/*
===========================================================
KONEKSI TURSO — LOWBAT ASSIST
===========================================================

Token Turso TIDAK ditaruh di browser.
Browser hanya memanggil API internal /api/history.
Token disimpan sebagai environment variable di Vercel:
  TURSO_DATABASE_URL
  TURSO_AUTH_TOKEN
*/

(() => {
  "use strict";

  window.LOWBAT_TURSO = {
    apiPath: "/api/history",
    configured: true
  };
})();
