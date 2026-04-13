import { createClient } from '@supabase/supabase-client'

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { team_name, captain_name, mpesa_code } = req.body

  const { data, error } = await supabase
    .from('registrations')
    .insert([{ team_name, captain_name, mpesa_code }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  // This tells the browser to go to your "thanks" page after it finishes saving the data
  res.redirect(303, '/thanks.html')
}
