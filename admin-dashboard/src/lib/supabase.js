import { createClient } from "@supabase/supabase-js";

// Use Environment Variables (with fallback for easier local testing)
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://nfmvndmvkflzrqekmwwi.supabase.co";
const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "sb_publishable_FRVuOYngI8_ulaPffU_DAw_g3_DnDNq";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase Env Variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
