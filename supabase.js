const SUPABASE_URL = 'https://mgdtpmkhpkpdmtohcysa.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iZnUJkKsS9ZWWe1Ide1bBw_sdH1ZzY_';

const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);