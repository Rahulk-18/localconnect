import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aqsidulbceyxvkccvksn.supabase.co'
const supabaseKey = 'sb_publishable_rztnNKaIfFjGquYDQ8cxWA_QvgEJihy'

export const supabase = createClient(supabaseUrl, supabaseKey)
