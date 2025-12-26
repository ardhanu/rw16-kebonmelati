import { createClient } from "@supabase/supabase-js";

// Load env vars manually since we are running via 'node' not 'vite'
// Change these if your .env is different
const SUPABASE_URL = "https://nfmvndmvkflzrqekmwwi.supabase.co";
const SUPABASE_KEY = "sb_publishable_FRVuOYngI8_ulaPffU_DAw_g3_DnDNq";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function checkDB() {
  console.log("--- Checking Database Connection ---");

  // 1. Check Profiles
  const { data: profiles, error: errProfiles } = await supabase
    .from("profiles")
    .select("*");
  if (errProfiles) {
    console.error("❌ Error fetching profiles:", errProfiles.message);
  } else {
    console.log(`✅ Profiles found: ${profiles.length}`);
    profiles.forEach((p) =>
      console.log(
        `   - [${p.id.substring(0, 8)}...] ${p.full_name} (${
          p.role
        }) - Created: ${new Date(p.created_at).toLocaleString()}`
      )
    );
  }

  // 2. Check Service Types
  const { data: services, error: errServices } = await supabase
    .from("service_types")
    .select("*");
  if (errServices) {
    console.error("❌ Error fetching service_types:", errServices.message);
  } else {
    console.log(`✅ Service Types found: ${services.length}`);
  }

  // 3. Check Requests
  const { data: requests, error: errRequests } = await supabase
    .from("requests")
    .select("*");
  if (errRequests) {
    console.error("❌ Error fetching requests:", errRequests.message);
  } else {
    console.log(`✅ Requests found: ${requests.length}`);
  }

  console.log("--- End Check ---");
}

checkDB();
