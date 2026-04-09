# 🏗️ Arquitetura LifeOS

## Diagrama da Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        USER (Navegador)                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP/HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│               FRONTEND (React + Vite)                        │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ React Components                                       │ │
│  │  • Login                                               │ │
│  │  • Dashboard                                           │ │
│  │  • FinanceModule (Transações)                          │ │
│  │  • DebtsModule (Dívidas)                               │ │
│  │  • CreditCardsModule (Cartões)                         │ │
│  │  • GoalsModule (Metas)                                 │ │
│  │  • HabitsModule (Hábitos)                              │ │
│  │  • ProfileModule (Perfil)                              │ │
│  └────────────────────────────────────────────────────────┘ │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ State Management & Utils                               │ │
│  │  • Supabase Client                                     │ │
│  │  • Custom Hooks                                        │ │
│  │  • Tailwind CSS                                        │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────┬────────────────────────────────────┘
                         │
        ┌────────────────┴───────────────┐
        │                                │
        │ API Calls                      │ Auth Token
        │ (REST)                         │
        │                                │
┌───────▼──────────┐         ┌──────────▼─────────┐
│  BACKEND         │         │ SUPABASE AUTH      │
│  (Node + Express)│         │ (JWT Tokens)       │
│  Port: 3001      │         │ Database Auth      │
│                  │         │ OAuth Providers    │
│ Routes:          │         └────────────────────┘
│  /auth/*         │
│  /api/profile    │         ┌──────────────────┐
│  /api/trans...   │         │ SUPABASE STORAGE │
│  /api/goals      │         │ (Files/Avatars)  │
│  /api/habits     │         └──────────────────┘
│  /api/debts      │
│  /api/cards      │         ┌──────────────────────────────┐
└────────┬─────────┘         │ POSTGRESQL DATABASE          │
         │                   │ (Supabase)                   │
         │ Supabase JS       │                              │
         │ Client            │ Tables:                      │
         │                   │  • profiles                  │
         └──────────────────▶│  • transactions              │
                             │  • debts                     │
                             │  • credit_cards              │
                             │  • goals                     │
                             │  • habits                    │
                             │  • habit_logs                │
                             │  • tasks                     │
                             │  • health_records            │
                             │  • diary_entries             │
                             │  • documents                 │
                             │  • etc...                    │
                             │                              │
                             │ RLS Policies: Habilitado     │
                             │ Row Level Security Ativo     │
                             └──────────────────────────────┘
```

---

## Fluxo de Dados

### 1. Autenticação
```
Login/Registro
     ↓
Frontend → Backend → Supabase Auth
     ↓
JWT Token (retorna)
     ↓
Frontend armazena token
     ↓
Token enviado em headers para APIs
```

### 2. CRUD de Dados
```
User Action (ex: adicionar transação)
     ↓
Component submete formulário
     ↓
Frontend → API Backend
     ↓
Backend valida + Supabase Insert
     ↓
RLS policies verifica permissão
     ↓
Dados salvos no PostgreSQL
     ↓
Resposta retorna ao Frontend
     ↓
UI atualiza com novo dado
```

### 3. Segurança
```
User Input
    ↓
Form Validation (Frontend)
    ↓
API Request com JWT
    ↓
Backend valida token
    ↓
Supabase RLS valida user_id
    ↓
Apenas dados do user são retornados
```

---

## Stack Detalhado

### Frontend
```
React 18
├── Vite (build tool)
├── Tailwind CSS (styling)
├── @supabase/supabase-js (client)
└── Componentes de UI
    ├── Login
    ├── Dashboard
    ├── Módulos (Finance, Goals, etc)
    └── Shared (Header, Navigation)
```

### Backend
```
Node.js
└── Express.js
    ├── Middleware (CORS, JSON)
    ├── Auth routes
    └── API routes (CRUD)
        ├── Profile
        ├── Transactions
        ├── Goals
        ├── Habits
        ├── Debts
        └── Credit Cards
```

### Database
```
PostgreSQL (Supabase)
├── Users (Auth)
├── Profiles
├── Finance
│   ├── Transactions
│   ├── Debts
│   └── Credit Cards
├── Goals & Wishlist
├── Habits & Logs
├── Health
├── Diary
└── Documents

Com RLS policies para cada tabela
```

---

## Fluxo de Requisição Completo

### Exemplo: Adicionar Transação

```
1. USER INTERACTS
   ┌─────────────────────────────────────┐
   │ User preenche formulário de transação
   │ Clica em "Salvar"
   └─────────────────────────────────────┘
                    ↓

2. FRONTEND VALIDATION
   ┌─────────────────────────────────────┐
   │ Valida campos (não vazio, etc)
   │ Prepara dados para envio
   └─────────────────────────────────────┘
                    ↓

3. API REQUEST
   ┌─────────────────────────────────────┐
   │ POST /api/transactions
   │ Headers:
   │   Authorization: Bearer <JWT>
   │   Content-Type: application/json
   │ Body: { type, category, amount, ... }
   └─────────────────────────────────────┘
                    ↓

4. BACKEND PROCESSING
   ┌─────────────────────────────────────┐
   │ middleware valida token
   │ extrai user_id do token
   │ sanitiza dados
   │ prepara insert
   └─────────────────────────────────────┘
                    ↓

5. DATABASE LAYER
   ┌─────────────────────────────────────┐
   │ INSERT INTO transactions (...)
   │ Supabase RLS verifica:
   │   - user autenticado?
   │   - user_id corresponde?
   └─────────────────────────────────────┘
                    ↓

6. RESPONSE
   ┌─────────────────────────────────────┐
   │ Retorna transação criada
   │ HTTP 201 Created
   │ Body: { id, user_id, ... }
   └─────────────────────────────────────┘
                    ↓

7. FRONTEND UPDATE
   ┌─────────────────────────────────────┐
   │ Recebe resposta
   │ Atualiza estado
   │ Re-renderiza UI
   │ Mostra sucesso/erro
   └─────────────────────────────────────┘
```

---

## Segurança em Camadas

```
Layer 1: Frontend
  └─ Form validation
  └─ HTTPS only
  └─ Token stored securely

Layer 2: API Gateway
  └─ CORS validation
  └─ Token verification
  └─ Request sanitization

Layer 3: Database
  └─ RLS Policies
  └─ user_id validation
  └─ Query parameterization

Layer 4: Auth Provider
  └─ Supabase handles
  └─ Password hashing
  └─ Session management
```

---

## Performance Considerations

### Frontend
- ✅ Code splitting com React lazy loading
- ✅ CSS minified com Tailwind
- ✅ Vite para fast dev server
- ✅ Component memoization (future)

### Backend
- ✅ Express middleware otimizado
- ✅ Database connection pooling
- ✅ Index criados (future)
- ✅ Caching (future)

### Database
- ✅ RLS policies eficientes
- ✅ Indexes nas FKs
- ✅ Triggers otimizados
- ✅ Connection limit configurado

---

## Extensibilidade

### Adicionar Novo Módulo

1. **Create component** `src/components/NewModule.jsx`
2. **Add to Dashboard** em `pages/Dashboard.jsx`
3. **Add backend routes** em `backend/server.js`
4. **Create DB schema** (se necessário) em migration

### Exemplo: Módulo de Receitas
```
1. Create RecipesModule.jsx
2. Add to modules object in Dashboard
3. Create API routes:
   GET /api/recipes
   POST /api/recipes
   PUT /api/recipes/:id
   DELETE /api/recipes/:id
4. Create recipes table in DB
```

---

## Monitoring & Debugging

### Frontend
- Console da rede (DevTools)
- Console.log para debugging
- React DevTools extension

### Backend
- Terminal output (logs)
- Postman/Insomnia para testar APIs
- Supabase Dashboard para inspeccionar DB

### Database
- Supabase SQL Editor
- Query Explorer
- Real-time subscribers monitor

---

## Scalability Path

```
Current State
└─ Single user app
└─ SQLite-like performance (Postgres)

Phase 2
└─ Add caching (Redis)
└─ CDN para static files
└─ Database read replicas

Phase 3
└─ Microservices architecture
└─ Message queues (Bull)
└─ Analytics service

Phase 4
└─ GraphQL API
└─ WebSocket real-time
└─ Multi-region deployment
```

---

## Deployment Topology

```
                    ┌──────────────────┐
                    │  Vercel (CDN)    │
                    │  Frontend        │
                    └────────┬─────────┘
                             │
                ┌────────────┴────────────┐
                │                         │
        ┌───────▼─────────┐      ┌────────▼────────┐
        │  Railway/Render │      │  Supabase Cloud │
        │  Backend        │      │  Database       │
        │  API Server     │      │  Auth           │
        │  Node.js        │      │  Storage        │
        └─────────────────┘      └─────────────────┘
```

---

## Disaster Recovery

- ✅ Supabase automated backups
- ✅ Version control (Git)
- ✅ Environment variables backup
- ✅ Database snapshots (Supabase)

---

Arquitetura simples e escalável! 🚀
