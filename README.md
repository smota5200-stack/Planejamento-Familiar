# LifeOS — Planejamento Familiar Completo

Um app SaaS completo para planejamento financeiro, metas, hábitos, saúde e desenvolvimento pessoal familiar.

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL via Supabase
- **Autenticação**: Supabase Auth
- **Deploy**: Vercel (Frontend) / Railway ou Render (Backend)

## 📦 Estrutura do Projeto

```
PROGRAMA_PLANEJAMENTO_FAMILIAR/
├── frontend/           # React + Vite
│   ├── src/
│   │   ├── pages/          # Páginas principais
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── hooks/          # Custom hooks
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── backend/            # Express API
│   ├── server.js      # Servidor principal
│   ├── .env.example   # Variáveis de ambiente
│   └── package.json
├── life-os-schema.sql # Schema completo do banco
└── README.md
```

## 🛠️ Setup Inicial

### 1. Clonar e Instalar Dependências

```bash
# Instalar dependências do backend
cd backend
npm install

# Instalar dependências do frontend
cd ../frontend
npm install
```

### 2. Configurar Supabase

1. Crie uma conta em [supabase.com](https://supabase.com)
2. Crie um novo projeto
3. Acesse o SQL Editor e execute o arquivo `life-os-schema.sql`
4. Copie suas credenciais (URL e API Key)

### 3. Variáveis de Ambiente

**Backend** (`backend/.env`):
```
PORT=3001
NODE_ENV=development
SUPABASE_URL=sua_url_aqui
SUPABASE_ANON_KEY=sua_chave_publica_aqui
SUPABASE_SERVICE_ROLE=sua_chave_privada_aqui
FRONTEND_URL=http://localhost:5173
JWT_SECRET=sua_chave_secreta_aqui
```

**Frontend** (`frontend/.env.local`):
```
VITE_SUPABASE_URL=sua_url_aqui
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
VITE_API_URL=http://localhost:3001
```

### 4. Rodando o Projeto

Em dois terminais diferentes:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

O app estará disponível em `http://localhost:5173`

## 📚 Módulos Disponíveis

### 💰 Financeiro
- Ganhos e renda
- Despesas fixas e variáveis
- Dívidas e empréstimos
- Cartões de crédito
- Investimentos
- Poupança e cofrinho

### 🎯 Metas
- Metas por categoria (financeiro, saúde, carreira, etc)
- Wishlist e mural dos sonhos
- Priorização de metas
- Rastreamento de progresso

### ✅ Hábitos & Tarefas
- Rastreador de hábitos com streak
- Tarefas com prioridade
- Calendário de tarefas
- Mood tracker

### 🏥 Saúde
- Registro de peso, sono, água
- Medicamentos
- Consultas
- Pressão arterial e glicose

### 👤 Pessoal
- Diário/Journal
- Documentos importantes
- Autoconhecimento

## 🔐 Segurança & Autenticação

- Autenticação via Supabase Auth (Email/Senha + Google OAuth)
- Row Level Security (RLS) para isolamento de dados
- Tokens JWT para API
- Cada usuário só pode acessar seus próprios dados

## 📱 Responsivo

O design é totalmente responsivo para:
- Desktop
- Tablet
- Mobile (iOS/Android)

## 🚀 Deploy

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Fazer push para GitHub
# Conectar no Vercel (auto-deploy)
```

### Backend (Railway/Render)
```bash
cd backend
# Fazer push para GitHub
# Conectar no Railway/Render
```

## 📝 Próximos Passos

1. Completar módulo de Saúde
2. Adicionar Alimentação/Receitas
3. Implementar Notificações push
4. Adicionar Relatórios PDF exportáveis
5. Setup de Stripe para planos pagos
6. Mobile app (React Native)
7. Integração com APIs (weather, calendar, etc)

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

Feito com ❤️ para planejamento familiar
