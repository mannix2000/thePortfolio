import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/** null when the env vars are missing, so the site still works with defaults. */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const CONTENT_TABLE = "portfolio_content";
export const CONTENT_ROW_ID = 1;
