
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://danqjihwpysjmcphrvhj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRhbnFqaWh3cHlzam1jcGhydmhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMzExNjIsImV4cCI6MjA1MzgwNzE2Mn0.2cPWD8zCiIITDDRRahOBZ6Ma-sJEVkXpMUolfRbzDG8';

export const supabase = createClient(supabaseUrl, supabaseKey);
        