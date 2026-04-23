import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Debug: Log environment variable status
console.log("🔍 Supabase Config Check:");
console.log("URL exists:", !!supabaseUrl);
console.log("Key exists:", !!supabaseAnonKey);
console.log("URL value:", supabaseUrl ? "Set" : "Missing");
console.log(
  "Key value:",
  supabaseAnonKey ? "Set (length: " + supabaseAnonKey.length + ")" : "Missing",
);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ CRITICAL: Supabase environment variables missing!");
  console.error(
    "Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in Vercel environment variables",
  );
  throw new Error(
    "Supabase configuration incomplete. Check environment variables.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test connection
supabase
  .from("entities")
  .select("count")
  .limit(1)
  .then((result) => {
    if (result.error) {
      console.error("❌ Supabase connection test failed:", result.error);
    } else {
      console.log("✅ Supabase connection successful");
    }
  });
