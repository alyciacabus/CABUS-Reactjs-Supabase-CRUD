import { createClient } from "@supabase/supabase-js";

const supabase_PROJECT_URL = 'https://xgccdxpuuppuhafjivdp.supabase.co';
const supabase_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnY2NkeHB1dXBwdWhhZmppdmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNTY3NzMsImV4cCI6MjA3NjczMjc3M30.AdzuY4dFtSlKDJVaMnnUAEDcnXt-pNMmq7KhseRgzxk';

export const supabase = createClient( supabase_PROJECT_URL, supabase_ANON_KEY);