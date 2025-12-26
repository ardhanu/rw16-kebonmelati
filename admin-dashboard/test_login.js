import { createClient } from "@supabase/supabase-js";

// Same configs as verified working
const SUPABASE_URL = "https://nfmvndmvkflzrqekmwwi.supabase.co";
const SUPABASE_KEY = "sb_publishable_FRVuOYngI8_ulaPffU_DAw_g3_DnDNq";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function testLogin() {
  console.log("--- Testing Login Flow ---");
  const email = "admin@rw16.com";
  const password = "admin123";

  console.log(`1. Attempting signIn for: ${email}`);

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("❌ SignIn FAILED:", error.message);
    console.error("Full Error:", error);
    return;
  }

  console.log("✅ SignIn SUCCESS. User ID:", data.user.id);

  console.log("2. Verifying Role check...");
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.error("❌ Profile Check FAILED:", profileError.message);
    return;
  }

  console.log(`✅ Profile Role: ${profile.role}`);

  if (profile.role !== "admin") {
    console.error("❌ Role Mismatch! Expected admin.");
  } else {
    console.log("✅ ALL CHECKS PASSED. Login should work.");
  }
}

testLogin();
