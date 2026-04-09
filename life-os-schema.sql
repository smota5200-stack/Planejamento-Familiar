-- ============================================================
-- LIFE OS — Schema SQL Completo para Supabase
-- Versão: 1.0 | Stack: PostgreSQL + RLS + Supabase Auth
-- ============================================================

-- ============================================================
-- EXTENSÕES
-- ============================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- PROFILES (vinculado ao auth.users)
-- ============================================================
CREATE TABLE profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT,
  avatar_url    TEXT,
  currency      TEXT DEFAULT 'BRL',
  locale        TEXT DEFAULT 'pt-BR',
  monthly_income NUMERIC(12,2) DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FINANÇAS — Transações
-- ============================================================
CREATE TABLE transactions (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('income','expense')),
  category      TEXT NOT NULL,  -- ex: 'Salário', 'Alimentação', 'Lazer'
  subcategory   TEXT,
  description   TEXT,
  amount        NUMERIC(12,2) NOT NULL,
  is_fixed      BOOLEAN DEFAULT false,
  recurrence    TEXT CHECK (recurrence IN ('monthly','weekly','yearly','none')),
  reference_month DATE,  -- primeiro dia do mês de referência
  due_date      DATE,
  paid_at       DATE,
  is_paid       BOOLEAN DEFAULT false,
  payment_method TEXT,  -- 'pix','cartão','dinheiro','boleto'
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_transactions_user_month ON transactions(user_id, reference_month);

-- ============================================================
-- FINANÇAS — Dívidas
-- ============================================================
CREATE TABLE debts (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id         UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  creditor        TEXT NOT NULL,
  original_amount NUMERIC(12,2) NOT NULL,
  remaining_amount NUMERIC(12,2) NOT NULL,
  interest_rate   NUMERIC(6,4) DEFAULT 0,  -- mensal em decimal ex: 0.0199
  monthly_payment NUMERIC(12,2),
  due_day         INT,  -- dia do vencimento
  start_date      DATE,
  end_date        DATE,
  status          TEXT DEFAULT 'active' CHECK (status IN ('active','paid','renegotiating')),
  notes           TEXT,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FINANÇAS — Cartões de Crédito
-- ============================================================
CREATE TABLE credit_cards (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  bank          TEXT,
  credit_limit  NUMERIC(12,2) NOT NULL,
  closing_day   INT NOT NULL,
  due_day       INT NOT NULL,
  current_balance NUMERIC(12,2) DEFAULT 0,
  color         TEXT DEFAULT '#6366F1',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE credit_card_expenses (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  card_id       UUID NOT NULL REFERENCES credit_cards(id) ON DELETE CASCADE,
  description   TEXT NOT NULL,
  amount        NUMERIC(12,2) NOT NULL,
  installments  INT DEFAULT 1,
  current_installment INT DEFAULT 1,
  purchase_date DATE NOT NULL,
  reference_month DATE NOT NULL,
  category      TEXT,
  is_recurring  BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FINANÇAS — Investimentos
-- ============================================================
CREATE TABLE investments (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  type          TEXT NOT NULL CHECK (type IN ('renda_fixa','acoes','fiis','criptomoedas','previdencia','outros')),
  broker        TEXT,
  invested_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  current_value NUMERIC(12,2),
  monthly_return_rate NUMERIC(6,4),  -- percentual esperado
  last_updated  DATE,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE investment_history (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  investment_id UUID NOT NULL REFERENCES investments(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reference_month DATE NOT NULL,
  value         NUMERIC(12,2) NOT NULL,
  recorded_at   TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- FINANÇAS — Reservas / Poupança
-- ============================================================
CREATE TABLE savings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,  -- ex: 'Reserva de emergência', 'Viagem'
  target_amount NUMERIC(12,2),
  current_amount NUMERIC(12,2) DEFAULT 0,
  target_date   DATE,
  color         TEXT DEFAULT '#10B981',
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- METAS E OBJETIVOS
-- ============================================================
CREATE TABLE goals (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  area          TEXT CHECK (area IN ('financeiro','saude','carreira','relacionamentos','educacao','lazer','espiritual','outros')),
  target_value  NUMERIC(12,2),
  current_value NUMERIC(12,2) DEFAULT 0,
  unit          TEXT,  -- 'R$', 'kg', 'livros', '%'
  target_date   DATE,
  status        TEXT DEFAULT 'active' CHECK (status IN ('active','achieved','paused','cancelled')),
  priority      INT DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- LISTA DE DESEJOS (Wishlist)
-- ============================================================
CREATE TABLE wishlist (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  category      TEXT,
  estimated_price NUMERIC(12,2),
  url           TEXT,
  priority      INT DEFAULT 3 CHECK (priority BETWEEN 1 AND 5),
  notes         TEXT,
  purchased     BOOLEAN DEFAULT false,
  purchased_at  DATE,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- HÁBITOS
-- ============================================================
CREATE TABLE habits (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  description   TEXT,
  area          TEXT,
  frequency     TEXT DEFAULT 'daily' CHECK (frequency IN ('daily','weekly','monthly')),
  target_days   INT[] DEFAULT '{1,2,3,4,5,6,7}',  -- dias da semana (1=dom, 7=sáb)
  color         TEXT DEFAULT '#8B5CF6',
  icon          TEXT DEFAULT '⭐',
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE habit_logs (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  habit_id      UUID NOT NULL REFERENCES habits(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  completed_at  DATE NOT NULL,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(habit_id, completed_at)
);

-- ============================================================
-- TAREFAS
-- ============================================================
CREATE TABLE tasks (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  area          TEXT,
  priority      TEXT DEFAULT 'medium' CHECK (priority IN ('low','medium','high','urgent')),
  status        TEXT DEFAULT 'todo' CHECK (status IN ('todo','in_progress','done','cancelled')),
  due_date      DATE,
  completed_at  TIMESTAMPTZ,
  tags          TEXT[],
  parent_id     UUID REFERENCES tasks(id),  -- subtarefas
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- SAÚDE
-- ============================================================
CREATE TABLE health_records (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type          TEXT NOT NULL CHECK (type IN ('weight','sleep','water','exercise','mood','blood_pressure','glucose','other')),
  value         NUMERIC(8,2),
  value2        NUMERIC(8,2),  -- para pressão: sistólica/diastólica
  unit          TEXT,
  notes         TEXT,
  recorded_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at    TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX idx_health_user_type_date ON health_records(user_id, type, recorded_at DESC);

CREATE TABLE medications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  dosage        TEXT,
  frequency     TEXT,
  start_date    DATE,
  end_date      DATE,
  notes         TEXT,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DIÁRIO / JOURNAL
-- ============================================================
CREATE TABLE diary_entries (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT,
  content       TEXT NOT NULL,
  mood          TEXT CHECK (mood IN ('great','good','neutral','bad','terrible')),
  mood_score    INT CHECK (mood_score BETWEEN 1 AND 10),
  tags          TEXT[],
  entry_date    DATE NOT NULL DEFAULT CURRENT_DATE,
  is_private    BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- DOCUMENTOS
-- ============================================================
CREATE TABLE documents (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  type          TEXT,  -- 'CPF', 'RG', 'CNH', 'Contrato', etc.
  description   TEXT,
  file_url      TEXT,  -- URL do Supabase Storage
  file_size     INT,
  expires_at    DATE,
  tags          TEXT[],
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- NOTIFICAÇÕES
-- ============================================================
CREATE TABLE notifications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  message       TEXT,
  type          TEXT DEFAULT 'info' CHECK (type IN ('info','warning','success','danger')),
  is_read       BOOLEAN DEFAULT false,
  action_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Habilitar RLS em todas as tabelas
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE debts ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_card_expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE investment_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE savings ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE habits ENABLE ROW LEVEL SECURITY;
ALTER TABLE habit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE diary_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Macro para criar policies padrão (SELECT, INSERT, UPDATE, DELETE)
-- Execute individualmente para cada tabela:

-- profiles
CREATE POLICY "users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- transactions
CREATE POLICY "own transactions" ON transactions FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- debts
CREATE POLICY "own debts" ON debts FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- credit_cards
CREATE POLICY "own cards" ON credit_cards FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own card expenses" ON credit_card_expenses FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- investments
CREATE POLICY "own investments" ON investments FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own investment history" ON investment_history FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- savings
CREATE POLICY "own savings" ON savings FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- goals
CREATE POLICY "own goals" ON goals FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- wishlist
CREATE POLICY "own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- habits
CREATE POLICY "own habits" ON habits FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own habit logs" ON habit_logs FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- tasks
CREATE POLICY "own tasks" ON tasks FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- health_records
CREATE POLICY "own health" ON health_records FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own medications" ON medications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- diary
CREATE POLICY "own diary" ON diary_entries FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- documents
CREATE POLICY "own documents" ON documents FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- notifications
CREATE POLICY "own notifications" ON notifications FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- TRIGGER: auto-criar profile ao registrar usuário
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: atualizar updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_profiles_updated        BEFORE UPDATE ON profiles        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_transactions_updated    BEFORE UPDATE ON transactions    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_debts_updated           BEFORE UPDATE ON debts           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_investments_updated     BEFORE UPDATE ON investments     FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_savings_updated         BEFORE UPDATE ON savings         FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_goals_updated           BEFORE UPDATE ON goals           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_habits_updated          BEFORE UPDATE ON habits          FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_tasks_updated           BEFORE UPDATE ON tasks           FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_diary_updated           BEFORE UPDATE ON diary_entries   FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_documents_updated       BEFORE UPDATE ON documents       FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- VIEWS ÚTEIS
-- ============================================================

-- Resumo financeiro mensal por usuário
CREATE VIEW monthly_summary AS
SELECT
  user_id,
  reference_month,
  SUM(CASE WHEN type = 'income'  THEN amount ELSE 0 END) AS total_income,
  SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense,
  SUM(CASE WHEN type = 'income'  THEN amount ELSE -amount END) AS balance,
  COUNT(*) FILTER (WHERE type = 'expense' AND is_fixed = true) AS fixed_expenses_count,
  COUNT(*) FILTER (WHERE type = 'expense' AND is_fixed = false) AS variable_expenses_count
FROM transactions
GROUP BY user_id, reference_month;

-- Streak de hábitos
CREATE VIEW habit_streaks AS
SELECT
  hl.habit_id,
  hl.user_id,
  COUNT(*) AS total_completions,
  MAX(hl.completed_at) AS last_completed
FROM habit_logs hl
GROUP BY hl.habit_id, hl.user_id;

-- ============================================================
-- STORAGE BUCKETS (executar no Supabase Dashboard ou API)
-- ============================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', false);

-- Storage RLS para avatars (público)
-- CREATE POLICY "avatars public read" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
-- CREATE POLICY "avatars own upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage RLS para documents (privado)
-- CREATE POLICY "docs own access" ON storage.objects FOR ALL USING (bucket_id = 'documents' AND auth.uid()::text = (storage.foldername(name))[1]);
