-- ============================================
-- SUPABASE SCHEMA PARA PLANEJAMENTO FAMILIAR
-- Dados compartilhados entre Sergio e Elaine
-- ============================================

-- 1. TABELA DE FAMÍLIAS
CREATE TABLE families (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 2. TABELA DE USUÁRIOS DA FAMÍLIA
CREATE TABLE family_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'member', -- 'admin', 'member'
  color VARCHAR(20), -- Para exibição em UI
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(family_id, user_id),
  UNIQUE(family_id, email)
);

-- 3. TABELA DE CONTAS (COMPARTILHADA)
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  month VARCHAR(50) NOT NULL,
  description VARCHAR(255) NOT NULL,
  category VARCHAR(100),
  date DATE,
  value DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'A pagar', -- 'A pagar', 'Pago', 'Pendente'
  payment_method VARCHAR(100) DEFAULT 'Dinheiro',
  type VARCHAR(50) NOT NULL, -- 'entrada', 'saída'
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. TABELA DE IMPOSTOS/GOVERNO
CREATE TABLE government_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  family_id UUID NOT NULL REFERENCES families(id) ON DELETE CASCADE,
  person_name VARCHAR(255) NOT NULL,
  cpf VARCHAR(14),
  rg VARCHAR(20),
  titulo_eleitoral VARCHAR(20),
  type VARCHAR(50) NOT NULL, -- 'imposto', 'contribuicao', 'beneficio'
  description VARCHAR(255) NOT NULL,
  value DECIMAL(10, 2) NOT NULL,
  due_date DATE,
  status VARCHAR(50) DEFAULT 'Pendente', -- 'Pago', 'Pendente'
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 5. ÍNDICES PARA PERFORMANCE
CREATE INDEX idx_accounts_family_id ON accounts(family_id);
CREATE INDEX idx_accounts_year_month ON accounts(family_id, year, month);
CREATE INDEX idx_family_members_family_id ON family_members(family_id);
CREATE INDEX idx_government_family_id ON government_accounts(family_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS) - Segurança
-- ============================================

-- Habilitar RLS
ALTER TABLE families ENABLE ROW LEVEL SECURITY;
ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE government_accounts ENABLE ROW LEVEL SECURITY;

-- POLICIES: Families
-- Usuários veem apenas suas famílias (através de family_members)
CREATE POLICY "Users can see their families" 
  ON families FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM family_members 
      WHERE family_members.family_id = families.id 
      AND family_members.user_id = auth.uid()
    )
  );

-- POLICIES: Family Members
CREATE POLICY "Users can see family members of their family"
  ON family_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM family_members fm2
      WHERE fm2.family_id = family_members.family_id
      AND fm2.user_id = auth.uid()
    )
  );

-- POLICIES: Accounts (Compartilhado)
-- Todos na família veem/editam as mesmas contas
CREATE POLICY "Users can see accounts from their family"
  ON accounts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = accounts.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert accounts in their family"
  ON accounts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = accounts.family_id
      AND family_members.user_id = auth.uid()
    )
    AND created_by = auth.uid()
  );

CREATE POLICY "Users can update accounts in their family"
  ON accounts FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = accounts.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own accounts"
  ON accounts FOR DELETE
  USING (created_by = auth.uid());

-- POLICIES: Government Accounts
CREATE POLICY "Users can see government accounts from their family"
  ON government_accounts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = government_accounts.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can manage government accounts in their family"
  ON government_accounts FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = government_accounts.family_id
      AND family_members.user_id = auth.uid()
    )
  );

-- ============================================
-- FUNÇÕES AUXILIARES
-- ============================================

-- Função para criar família automaticamente
CREATE OR REPLACE FUNCTION create_family_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO families (name) VALUES (NEW.email || ' Family');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Disparador (Trigger)
-- Descomente se quiser criar automático
-- CREATE TRIGGER trigger_create_family
-- AFTER INSERT ON auth.users
-- FOR EACH ROW
-- EXECUTE FUNCTION create_family_for_user();
