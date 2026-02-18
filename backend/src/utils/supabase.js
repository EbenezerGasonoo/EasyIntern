import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let client = null;

export function getSupabase() {
  if (!supabaseUrl || !supabaseServiceKey) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseServiceKey);
  }
  return client;
}

export const PROFILE_BUCKET = 'profile-pictures';
