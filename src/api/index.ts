import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://kfpkiikevxjdqahdppxx.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmcGtpaWtldnhqZHFhaGRwcHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4MTMzNDIsImV4cCI6MTk4MDM4OTM0Mn0.88GnIfRuUv2-iO7uOGFnl1fXVkjQ5Q6bx9gmf5NHqz8";
export const supabase = createClient(supabaseUrl, supabaseKey);
