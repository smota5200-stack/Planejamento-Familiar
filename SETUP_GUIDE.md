# LifeOS SaaS - Guia de Instalação Rápida

## ✅ O que você tem agora:

### Backend ✨
- Express.js server em Node.js
- Integração completa com Supabase
- APIs RESTful para:
  - Autenticação (registro/login)
  - Perfil do usuário
  - Transações financeiras
  - Metas e objetivos
  - Hábitos

### Frontend ✨
- App React com Vite (super rápido!)
- Design dark-mode lindo (baseado no seu HTML)
- Componentes prontos:
  - Login/Registro
  - Dashboard
  - Módulo Financeiro
  - Módulo de Metas
  - Módulo de Hábitos
  - Perfil do usuário
- Tailwind CSS para styling

### Database ✨
- Schema PostgreSQL completo no arquivo `life-os-schema.sql`
- Todas as tabelas configuradas
- Row Level Security (RLS) para segurança
- Triggers para automação

---

## 🚀 Como Começar

### 1. Criar conta Supabase (5 min)
- Vá em [supabase.com](https://supabase.com)
- Crie uma conta grátis
- Crie um novo projeto
- Guarde a URL e API Key

### 2. Importar o banco de dados (2 min)
- No Supabase, vá em SQL Editor
- Crie uma nova query
- Copie todo o conteúdo de `life-os-schema.sql` aqui
- Execute

### 3. Configurar variáveis de ambiente (3 min)

**Backend** - Criar arquivo `backend/.env`:
```
PORT=3001
NODE_ENV=development
SUPABASE_URL=https://seu_projeto.supabase.co
SUPABASE_ANON_KEY=sua_chave_publica_aqui
SUPABASE_SERVICE_ROLE=sua_chave_privada_aqui
FRONTEND_URL=http://localhost:5173
JWT_SECRET=qualquer_string_secreta_aqui
```

**Frontend** - Criar arquivo `frontend/.env.local`:
```
VITE_SUPABASE_URL=https://seu_projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_publica_aqui
VITE_API_URL=http://localhost:3001
```

### 4. Instalar dependências
```bash
# No terminal, na pasta do projeto:
cd backend
npm install

cd ../frontend
npm install
```

### 5. Rodar o projeto
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend (em outro terminal)
cd frontend
npm run dev
```

### 6. Abrir o app
- Acesse `http://localhost:5173`
- Crie uma conta
- Pronto! 🎉

---

## 📱 Funcionalidades Atuais

✅ Autenticação (email + senha)
✅ Dashboard
✅ Adicionar transações (renda/despesas)
✅ Ver resumo financeiro
✅ Criar metas
✅ Criar hábitos
✅ Editar perfil
✅ Ver últimas transações

---

## 🔄 Próximas Features (Fácil de Adicionar)

- Editar/Deletar transações
- Filtrar por periodo
- Gráficos de despesas
- Cadastro de débitos
- Histórico de hábitos
- Foto de perfil
- Relatórios

---

## 🐛 Troubleshooting

**"Porta 3001 já está em uso"**
```bash
# Mudar a porta no .env ou:
lsof -ti:3001 | xargs kill -9
```

**"VITE_SUPABASE_URL não definido"**
- Verificar que o arquivo `.env.local` está na pasta `frontend/`
- Não esquecer de colocar `VITE_` no início da variável

**"Supabase connection failed"**
- Verificar URL e API Key no `.env`
- Garantir que o projeto Supabase está ativo
- Verificar que o schema foi executado

---

## 📚 Estrutura de Pastas

```
Backend (/backend)
- server.js → Arquivo principal com todas as rotas
- .env → Variáveis de ambiente
- package.json → Dependências

Frontend (/frontend)
- src/
  - pages/ → Páginas (Login, Dashboard)
  - components/ → Componentes reutilizáveis
  - App.jsx → Componente principal
  - index.css → Estilos globais
- public/ → Arquivos estáticos
- vite.config.js → Configuração do Vite
- tailwind.config.js → Configuração do Tailwind
```

---

## 🎨 Design Usado

- **Colors**: Dark mode com acentos roxo/rosa
- **Fonts**: Syne (títulos) + DM Sans (corpo)
- **Componentes**: Cards, botões gradientes, inputs estilizados
- **Responsivo**: Mobile-first, funciona em qualquer tamanho

---

## 💡 Dicas

1. Use o Supabase Dashboard para ver/editar dados diretamente
2. Verifique o console do navegador para erros do frontend
3. Verifique o terminal para erros do backend
4. Use o Storage do Supabase para uploads de fotos
5. RLS está habilitado por padrão - seus dados são privados!

---

**Pronto pra usar!** Se tiver dúvidas, é só me chamar! 🚀
