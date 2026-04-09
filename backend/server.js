import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Middleware de autenticação
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Para development, apenas validar que o token existe
  req.user = { token };
  next();
};

// ============================================================
// ROTAS PÚBLICAS
// ============================================================

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LifeOS Backend is running' });
});

// ============================================================
// ROTAS DE AUTENTICAÇÃO
// ============================================================

app.post('/auth/register', async (req, res) => {
  try {
    const { email, password, full_name } = req.body;

    const { data, error } = await supabase.auth.signUpWithPassword({
      email,
      password,
      options: {
        data: {
          full_name
        }
      }
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'User registered successfully',
      user: data.user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      message: 'Login successful',
      user: data.user,
      session: data.session
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - PERFIL
// ============================================================

app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      return res.status(404).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { full_name, currency, monthly_income } = req.body;

    const { data, error } = await supabase
      .from('profiles')
      .update({
        full_name,
        currency,
        monthly_income,
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - TRANSAÇÕES
// ============================================================

app.get('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/transactions', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      type,
      category,
      subcategory,
      description,
      amount,
      is_fixed,
      recurrence,
      payment_method
    } = req.body;

    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        user_id: user.id,
        type,
        category,
        subcategory,
        description,
        amount,
        is_fixed,
        recurrence,
        reference_month: new Date().toISOString().split('T')[0].slice(0, 7) + '-01',
        payment_method
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/transactions/:id', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;
    const updateData = { ...req.body, updated_at: new Date().toISOString() };

    const { data, error } = await supabase
      .from('transactions')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/transactions/:id', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { id } = req.params;

    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Transaction deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - METAS
// ============================================================

app.get('/api/goals', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/goals', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { title, description, area, target_value, target_date, priority } =
      req.body;

    const { data, error } = await supabase
      .from('goals')
      .insert([{
        user_id: user.id,
        title,
        description,
        area,
        target_value,
        target_date,
        priority
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - HÁBITOS
// ============================================================

app.get('/api/habits', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/habits', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { name, description, frequency, color, icon } = req.body;

    const { data, error } = await supabase
      .from('habits')
      .insert([{
        user_id: user.id,
        name,
        description,
        frequency,
        color,
        icon
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - DÍVIDAS
// ============================================================

app.get('/api/debts', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/debts', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      creditor,
      original_amount,
      remaining_amount,
      monthly_payment,
      interest_rate,
      due_day
    } = req.body;

    const { data, error } = await supabase
      .from('debts')
      .insert([{
        user_id: user.id,
        creditor,
        original_amount: parseFloat(original_amount),
        remaining_amount: parseFloat(remaining_amount),
        monthly_payment: parseFloat(monthly_payment),
        interest_rate: parseFloat(interest_rate),
        due_day: parseInt(due_day),
        start_date: new Date().toISOString().split('T')[0],
        status: 'active'
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// ROTAS PROTEGIDAS - CARTÕES DE CRÉDITO
// ============================================================

app.get('/api/credit-cards', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/credit-cards', authenticateToken, async (req, res) => {
  try {
    const { data: { user } } = await supabase.auth.getUser(req.user.token);

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const {
      name,
      bank,
      credit_limit,
      closing_day,
      due_day,
      color
    } = req.body;

    const { data, error } = await supabase
      .from('credit_cards')
      .insert([{
        user_id: user.id,
        name,
        bank,
        credit_limit: parseFloat(credit_limit),
        closing_day: parseInt(closing_day),
        due_day: parseInt(due_day),
        color,
        is_active: true
      }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============================================================
// Error Handler
// ============================================================

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ============================================================
// Start Server
// ============================================================

app.listen(port, () => {
  console.log(`✅ LifeOS Backend running on http://localhost:${port}`);
  console.log(`📚 Supabase URL: ${supabaseUrl}`);
});
