export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    const SUPABASE_URL = 'https://wvncdusvpfbdsnclynxl.supabase.co';
    const SUPABASE_ANON_KEY = 'sb_publishable_z4Lj8R0e1VGKav0XdvfN2w_ZQmBFsF7';

    const response = await fetch(`${SUPABASE_URL}/auth/v1/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseText = await response.text();

    let data = {};
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      return res.status(response.status || 500).json({ 
        error: 'Invalid response from Supabase',
        details: responseText.substring(0, 50)
      });
    }

    if (!response.ok) {
      if (data.error_code === 'user_already_exists' || data.message?.includes('already exists')) {
        return res.status(409).json({ error: 'User already exists' });
      }
      return res.status(response.status).json({ error: data.message || data.error || 'Error creating user' });
    }

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: data.user,
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
