import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  // 1. Fix: Explicitly check for POST
  if (req.method === 'POST') {
    try {
      const { team_name, captain_name, mpesa_code } = req.body

      // 2. Insert into Supabase
      const { data, error } = await supabase
        .from('registrations')
        .insert([{ team_name, captain_name, mpesa_code }])

      if (error) throw error

      // 3. Success redirect
      return res.redirect(303, '/thanks.html')
      
    } catch (err) {
      return res.status(500).json({ error: err.message })
    }
  } else {
    // If someone tries to just "visit" the link, tell them No.
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
