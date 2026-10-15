import { createClient } from "@supabase/supabase-js";

// The anon key is public by design; Row Level Security in supabase/setup.sql
// is what limits writes to the owner. Env vars override these if set.
const url =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://pcjbygveymhcoxidkrrn.supabase.co";
const anonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjamJ5Z3ZleW1oY294aWRrcnJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1NjgwMjcsImV4cCI6MjA4NzE0NDAyN30.zW692KcysYCMKf-MKTO6BBDga4gu96aHnFKjq4uPNy0";

export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const CONTENT_TABLE = "portfolio_content";
export const CONTENT_ROW_ID = 1;
