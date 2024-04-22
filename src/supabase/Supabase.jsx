import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://yjapmahwvxrjbimuztid.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlqYXBtYWh3dnhyamJpbXV6dGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM4MDY0NDEsImV4cCI6MjAyOTM4MjQ0MX0.pZc-3Y75x_V5_U2o2e4H2U03E7iJ9HBeMVzWdKLbGls'
export const supabase = createClient(supabaseUrl, supabaseKey)
