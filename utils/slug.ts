// utils/slug.ts
import type { SupabaseClient } from "@supabase/supabase-js";

const SLUG_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; 

export function generateSlug(length = 4): string {
  let slug = "";
  for (let i = 0; i < length; i++) {
    slug += SLUG_CHARS[Math.floor(Math.random() * SLUG_CHARS.length)];
  }
  return slug;
}

// Call this in a loop against Supabase until you get a non-colliding slug.
// With 33^4 ≈ 1.18M combinations, collisions will be rare, but always check.
export async function generateUniqueSlug(supabase: SupabaseClient): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = generateSlug();
    const { data } = await supabase
      .from("submissions")
      .select("id")
      .eq("token_id", slug)
      .maybeSingle();

    if (!data) return slug;
  }
  throw new Error("Could not generate a unique token id after 5 attempts");
}