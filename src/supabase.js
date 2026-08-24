import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bvxmfqpnkqxpueuwkavg.supabase.co'
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_WCWXfcuocbjrVA6LTK6H8w_gwZGMdLt'

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)