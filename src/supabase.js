import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://sfqearntatnkzqahljra.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNmcWVhcm50YXRua3pxYWhsanJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1MjE5NzMsImV4cCI6MjA5MTA5Nzk3M30.y5Ot9GJKBlEtRSu4oU3b4SotqDIaIawGsu4FH1EJ0Gw'

export const supabase = createClient(supabaseUrl, supabaseKey)