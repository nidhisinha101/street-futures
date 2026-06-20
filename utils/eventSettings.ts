// utils/eventSettings.ts
import { supabase } from "../src/lib/supabase";

export async function isSlugGenerationEnabled(): Promise<boolean> {
  const { data, error } = await supabase
    .from("event_settings")
    .select("token_gen_enabled")
    .eq("token_gen_enabled", true)
    .maybeSingle();

  if (error || !data) return false; // fail closed: no slug if we can't confirm
  return data.token_gen_enabled;
}