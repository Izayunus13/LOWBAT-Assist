/*
===========================================================
KONEKSI SUPABASE — LOWBAT ASSIST
===========================================================

Publishable key memang ditujukan untuk aplikasi browser dan tetap
wajib dilindungi menggunakan Row Level Security (RLS).

JANGAN pernah menaruh sb_secret_... atau service_role di file ini.
*/

(() => {
  "use strict";

  const SUPABASE_URL = "https://goiwumhavifflvpiwgay.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_HNX1KViirSNb2wEtnnGJtw_YdtZLJJ4";

  if (!window.supabase || typeof window.supabase.createClient !== "function") {
    console.error("Library Supabase gagal dimuat.");
    window.LOWBAT_SUPABASE = {
      client: null,
      configured: false
    };
    return;
  }

  const client = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    }
  );

  window.LOWBAT_SUPABASE = {
    client,
    configured: true,
    projectUrl: SUPABASE_URL
  };
})();
