export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Test connection to Supabase
    const supabaseUrl = 'https://wvncdusvpfbdsnclynxl.supabase.co';
    const supabaseKey = 'sb_publishable_z4Lj8R0e1VGKav0XdvfN2w_ZQmBFsF7';

    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
      }
    });

    const data = await response.text();

    return res.status(200).json({
      success: true,
      message: 'Supabase is reachable',
      status: response.status,
      data: data.substring(0, 100)
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      type: error.constructor.name
    });
  }
}
