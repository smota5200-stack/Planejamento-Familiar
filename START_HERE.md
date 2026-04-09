# 🚀 COMECE AQUI — LifeOS App

Bem-vindo! Seu app **LifeOS** está 100% completo e pronto para usar. Este arquivo vai guiar você pelos próximos passos.

---

## ✅ O Que Você Tem

```
✨ FRONTEND (React 18 + Vite)
├─ Autenticação completa
├─ 10 componentes prontos
├─ Dark theme lindo (roxo/rosa)
├─ Totalmente responsivo

✨ BACKEND (Node.js + Express)
├─ API REST com 16+ rotas
├─ Integração Supabase
├─ Autenticação JWT
├─ Validação de dados

✨ DATABASE (PostgreSQL)
├─ Schema com 18+ tabelas
├─ Row Level Security (RLS)
├─ Triggers automáticos
├─ Índices otimizados

✨ DOCUMENTAÇÃO (8 arquivos)
├─ Guia de setup
├─ Arquitetura explicada
├─ FAQ & Troubleshooting
├─ Guia de design
```

---

## ⚡ Quick Start (10 minutos)

### Passo 1: Preparar Supabase (5 min)

1. Abra [supabase.com](https://supabase.com)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Vá em **SQL Editor** → **New Query**
5. Copie TODO o conteúdo de `life-os-schema.sql`
6. Cole no editor e clique **Run**
7. Copie sua **URL** e **API Key** (em Settings → API)

### Passo 2: Configurar Variáveis (.env)

**Backend** - Crie `backend/.env`:
```
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://seu_projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_publica_aqui
SUPABASE_SERVICE_ROLE=sua_chave_privada_aqui
FRONTEND_URL=http://localhost:5173
JWT_SECRET=any_secret_key_here
```

**Frontend** - Crie `frontend/.env.local`:
```
VITE_SUPABASE_URL=https://seu_projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
VITE_API_URL=http://localhost:3001
```

### Passo 3: Instalar Dependências (3 min)

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Passo 4: Rodar o Projeto (2 min)

Em **dois terminais diferentes**:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (em outro terminal)
cd frontend
npm run dev
```

### Passo 5: Acessar & Testar

1. Abra [http://localhost:5173](http://localhost:5173)
2. **Registre** uma conta nova
3. **Adicione** uma transação financeira
4. **Veja** o saldo atualizar automaticamente ✨

---

## 📚 Documentação (Leia Nesta Ordem)

| Documento | Tempo | Propósito |
|-----------|-------|----------|
| **README.md** | 5 min | Visão geral do projeto |
| **SETUP_GUIDE.md** | 10 min | Instruções completas |
| **QUICK_START.md** | 3 min | Checklist rápido |
| **ARCHITECTURE.md** | 15 min | Como funciona interno |
| **DESIGN_GUIDE.md** | 10 min | Cores e componentes |
| **FAQ_TROUBLESHOOTING.md** | Conforme precisar | Resolver problemas |
| **PROJECT_SUMMARY.md** | 10 min | Resumo executivo |
| **FILES_INDEX.md** | 5 min | Índice de tudo |

---

## 🎯 Módulos Disponíveis

### 💰 Financeiro
Adicione transações (renda/despesa):
- [x] Renda
- [x] Despesas (com categoria)
- [x] Métodos de pagamento
- [x] Resumo automático

### 📊 Dívidas
Rastreie suas dívidas:
- [x] Registre dívidas
- [x] Acompanhe saldo
- [x] Calcule juros
- [x] Marque como pago

### 💳 Cartões de Crédito
Gerencie cartões:
- [x] Registre cartões
- [x] Limite de crédito
- [x] Datas de vencimento
- [x] Cores customizadas

### 🎯 Metas
Crie objetivos:
- [x] Metas por categoria
- [x] Priorizar (1-5)
- [x] Rastrear progresso
- [x] Múltiplas áreas de vida

### ✅ Hábitos
Rastreie hábitos:
- [x] Registre hábitos
- [x] Frequência
- [x] Ícones customizados
- [x] Cores personalizadas

### 👤 Perfil
Edite seu perfil:
- [x] Nome completo
- [x] Moeda preferida
- [x] Renda mensal
- [x] Informações de conta

---

## 🎨 Design

- **Tema**: Dark mode (roxo/rosa)
- **Mobile**: 100% responsivo
- **Performance**: Ultra-rápido (Vite)
- **Acessibilidade**: Bom contraste

---

## 🔐 Segurança

- ✅ Autenticação com JWT
- ✅ Row Level Security (RLS) no banco
- ✅ Cada usuário isolado
- ✅ Sem hardcoded credentials
- ✅ CORS configurado

---

## ⚙️ Stack Tecnológico

```
Frontend:     React 18 + Vite + Tailwind CSS
Backend:      Node.js + Express
Database:     PostgreSQL (Supabase)
Auth:         Supabase Auth + JWT
Build:        Vite (dev), npm run build
```

---

## 🆘 Se Tiver Problema

1. **Verificar erro no console** → F12 → Console
2. **Ler FAQ_TROUBLESHOOTING.md** → Solução rápida
3. **Revisar variáveis .env** → Credenciais corretas?
4. **Testar Health Check** → `http://localhost:3001/health`
5. **Olhar logs do backend** → Terminal está mostrando erro?

---

## 📁 Estrutura (Resumo)

```
Projeto/
├── backend/          ← API Express
├── frontend/         ← App React
├── life-os-schema.sql ← Database schema
├── README.md         ← Documentação principal
├── SETUP_GUIDE.md    ← Como começar (detalhado)
├── QUICK_START.md    ← Checklist rápido
└── [+ 5 docs]        ← Mais documentação
```

---

## 🚀 Deploy (Depois)

Quando estiver pronto para produção:

**Frontend → Vercel**
```bash
npm run build
git push  # Auto-deploy no Vercel
```

**Backend → Railway/Render**
```bash
git push  # Auto-deploy
```

---

## 💡 Dicas

1. **Supabase Dashboard** é seu amigo para debug
2. **DevTools** (F12) mostra erros JS
3. **Terminal** do backend mostra logs API
4. **RLS** garante que cada user vê apenas seus dados
5. **Hot reload** funciona automaticamente (Vite)

---

## ✨ Funcionalidades Prontas

- [x] Registrar/Login
- [x] Adicionar transações
- [x] Calcular saldo
- [x] Criar metas
- [x] Rastrear hábitos
- [x] Editar perfil
- [x] Logout seguro
- [x] Dados isolados por user

---

## 📈 Próximas Features (Fáceis de Adicionar)

- [ ] Gráficos de despesas
- [ ] Exportar PDF
- [ ] Notificações
- [ ] Fotos de perfil
- [ ] Modo colaborativo (famílias)
- [ ] Relatórios
- [ ] Integração com APIs externas

---

## ⏱️ Tempo Estimado

```
Setup Supabase:     5 minutos
Clonar/instalar:    5 minutos
Configurar .env:    5 minutos
Rodar projeto:      1 minuto
Testar:             5 minutos
─────────────────────────────
TOTAL:              ~20 minutos
```

---

## 🎓 O Que Você Vai Aprender

- React Hooks (useState, useEffect)
- Componentes funcionais
- API REST com Express
- Supabase & PostgreSQL
- Tailwind CSS
- Autenticação & JWT
- RLS & segurança

---

## 📞 Próximos Passos

### Agora:
1. [ ] Crie conta Supabase
2. [ ] Execute schema.sql
3. [ ] Crie arquivos .env
4. [ ] Instale dependências
5. [ ] Rode o projeto

### Depois:
1. [ ] Teste todas as funcionalidades
2. [ ] Leia ARCHITECTURE.md
3. [ ] Explore os componentes
4. [ ] Adicione suas próprias features
5. [ ] Deploy em produção

---

## 🎉 Tudo Pronto!

**Você tem tudo que precisa.**

Próximo passo? Abra **SETUP_GUIDE.md** ou comece direto com o Quick Start acima!

---

### 🔗 Links Importantes

- 📘 [Documentação React](https://react.dev)
- 📦 [Supabase Docs](https://supabase.com/docs)
- ✨ [Vite Docs](https://vitejs.dev)
- 🎨 [Tailwind CSS](https://tailwindcss.com)
- 📚 [Express.js](https://expressjs.com)

---

**Boa sorte! 🚀**

Criado com ❤️ para Planejamento Familiar — April 2026
