# 🚀 DEPLOY COMPLETO - GUIA VISUAL PASSO A PASSO

> **⏱️ TEMPO TOTAL**: ~30 minutos | **DIFICULDADE**: Fácil | **STATUS**: 100% Automatizado

---

## 📋 ÍNDICE RÁPIDO

| Etapa | Tempo | Status |
|-------|-------|--------|
| 1️⃣ [SUPABASE](#-1-supabase---primeiro) | 10 min | ← Começar aqui |
| 2️⃣ [GITHUB](#-2-github---depois) | 5 min | Depois |
| 3️⃣ [VERCEL](#-3-vercel---por-último) | 10 min | Por último |
| 🐛 [CORRIGIR 404](#-corrigir-erro-404-no-vercel) | 5 min | Se der erro |

---

## 🔷 1. SUPABASE - Primeiro

### O que você vai fazer:
Criar um banco de dados na nuvem (gratuito) para armazenar os dados do seu app.

### ⬇️ PASSO-A-PASSO COM SCREENSHOTS

#### **PASSO 1.1: Acessar Supabase**

1. Abra navegador e vá para: **https://supabase.com**
2. Clique em **"Start your project"** (botão verde grande)
3. Clique em **"Sign Up"** (ou **"Sign In"** se já tem conta)

```
┌────────────────────────────────────────────────┐
│ https://supabase.com                           │
│                                                 │
│  [Start your project] ← CLIQUE AQUI            │
└────────────────────────────────────────────────┘
```

#### **PASSO 1.2: Criar Conta (ou Login)**

Se for primeira vez:
- Email: `seu_email@gmail.com`
- Password: `sua_senha_segura`
- Clique **"Sign Up"**

Se já tem conta:
- Clique **"Sign In"**
- Coloque email + password

```
┌────────────────────────────────────────────────┐
│ SUPABASE LOGIN                                  │
│                                                 │
│ Email: [seu_email@gmail.com           ]       │
│ Password: [••••••••••••]                       │
│                                                 │
│                    [SIGN UP] ← AQUI            │
└────────────────────────────────────────────────┘
```

#### **PASSO 1.3: Criar Projeto**

Depois de logar, você vê dashboards. Clique em:
- **"New Project"** ou **"Create a new project"**

```
┌────────────────────────────────────────────────┐
│ SUPABASE DASHBOARD                              │
│                                                 │
│ [➕ New Project] ← CLIQUE AQUI                 │
│                                                 │
│ Meus Projetos:                                  │
│ ├─ projeto_antigo                              │
│ └─ (nenhum)                                    │
└────────────────────────────────────────────────┘
```

#### **PASSO 1.4: Preencher Dados do Projeto**

```
┌────────────────────────────────────────────────┐
│ CREATE NEW PROJECT                              │
│                                                 │
│ Project Name:                                   │
│ [planejamento-familiar]  ← COPIE EXATAMENTE   │
│                                                 │
│ Database Password:                              │
│ [gerar_uma_senha_super_secreta_123!]          │
│ ⚠️ SALVE ESSA SENHA!                           │
│                                                 │
│ Region: [United States / us-east-1]            │
│                                                 │
│ Plan: [Free] ← É ISSO MESMO (grátis)          │
│                                                 │
│              [Create New Project] ← CLIQUE     │
└────────────────────────────────────────────────┘
```

⏳ **Aguarde 30-60 segundos** enquanto Supabase cria o banco...

#### **PASSO 1.5: Executar SQL**

Quando abrir o projeto, você vê na esquerda:
- Clique em **"SQL Editor"** (ícone de código ou consulta)

```
┌─────────────────┐
│ 📊 Dashboard    │
│ 📊 SQL Editor ← AQUI
│ 🛠️ Settings     │
│ ...              │
└─────────────────┘
```

Depois:
1. Clique em **"New Query"** ou **"+"**
2. **Copie TODO o código** de: `supabase_setup.sql` (arquivo no seu projeto)
3. Cole na janela grande
4. Clique **"RUN"** ou **Ctrl+Enter**

```
┌─────────────────────────────────────────────────┐
│ SQL EDITOR                                       │
│                                                  │
│ -- Cole o conteúdo de supabase_setup.sql aqui  │
│ CREATE TABLE families (                         │
│   id uuid primary key,                         │
│   ...                                           │
│ );                                              │
│                                                  │
│                            [RUN] ← CLIQUE      │
└─────────────────────────────────────────────────┘
```

✅ Quando terminar, você vê: **"Success! 1 query executed"**

#### **PASSO 1.6: Copiar Chaves**

Agora clique em **"Settings"** → **"API"** no menu esquerdo:

```
┌─────────────────────────────────────────────────┐
│ API SETTINGS                                     │
│                                                  │
│ Project URL:                                     │
│ https://xxxxx.supabase.co  ← COPIE ISSO       │
│ [📋 Copy]                                       │
│                                                  │
│ API Keys:                                        │
│ anon (public) key:                              │
│ eyJhbGc...xxxxx  ← COPIE ISSO                  │
│ [📋 Copy]                                       │
│                                                  │
│ service_role (secret) key:                      │
│ eyJhbGc...yyyyy                                 │
│ [📋 Copy]                                       │
└─────────────────────────────────────────────────┘
```

**COPIE:**
- `Project URL` → guardará como `VITE_SUPABASE_URL`
- `anon key` → guardará como `VITE_SUPABASE_ANON_KEY`

---

## 🔷 2. GITHUB - Depois

### O que você vai fazer:
Colocar seu código online no GitHub (controle de versão)

### ⬇️ PASSO-A-PASSO

#### **PASSO 2.1: Acessar GitHub**

1. Vá para: **https://github.com**
2. Se não tem conta, clique **"Sign Up"**, se tem clique **"Sign In"**

```
┌────────────────────────────────────────────────┐
│ https://github.com                              │
│                                                 │
│                 [Sign In] ← AQUI               │
│                 [Sign Up]                       │
└────────────────────────────────────────────────┘
```

#### **PASSO 2.2: Criar Repositório**

1. Clique no **"+"** no canto superior direito
2. Selecione **"New repository"**

```
┌────────────────────────────────────────────────┐
│ TOP RIGHT CORNER:                               │
│                                                 │
│ [+] ← CLIQUE AQUI                              │
│  ├─ New repository ← SELECIONE ISSO            │
│  ├─ New gist                                    │
│  └─ New organization                           │
└────────────────────────────────────────────────┘
```

#### **PASSO 2.3: Preencher Dados**

```
┌────────────────────────────────────────────────┐
│ CREATE NEW REPOSITORY                           │
│                                                 │
│ Repository name *                               │
│ [planejamento-familiar]  ← COPIE EXATAMENTE   │
│                                                 │
│ Description (optional)                          │
│ [App para planejamento financeiro familiar]    │
│                                                 │
│ ⭕ Public                                       │
│ ⭕ Private                                      │
│                                                 │
│ ☐ Add a README file                            │
│ ☐ Add .gitignore (escolher: Node)              │
│ ☐ Add a license                                │
│                                                 │
│            [Create repository] ← CLIQUE        │
└────────────────────────────────────────────────┘
```

#### **PASSO 2.4: Copiar URL do Repositório**

Depois de criar, você vê uma tela com:

```
┌────────────────────────────────────────────────┐
│ https://github.com/seu_usuario/planejamento... │
│                                                 │
│ [<> Code] ← CLIQUE AQUI                        │
│   ├─ HTTPS                                     │
│   │  https://github.com/seu_... ← COPIE ISSO │
│   └─ SSH                                       │
│                                                 │
│ OR                                              │
│                                                 │
│ ...or push an existing repository:              │
│ git remote add origin https://...              │
│ git branch -M main                             │
│ git push -u origin main                        │
└────────────────────────────────────────────────┘
```

**IMPORTANTE**: Copie a URL HTTPS (começa com `https://`)

#### **PASSO 2.5: Executar Comandos no Terminal**

Abra seu terminal (não VS Code, mas terminal mesmo - iTerm, Terminal, etc) e execute:

```bash
# Abra o terminal e vá pro diretório do projeto
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"

# Execute estes comandos (copie e cole):
git remote add origin https://github.com/SEU_USUARIO/planejamento-familiar.git
git branch -M main
git push -u origin main
```

**SUBSTITUIR**: `SEU_USUARIO` pelo seu usuário do GitHub (ex: `joaosilva`)

Se pedir **username/password**:
- Username: seu usuário GitHub
- Password: **NÃO é sua senha!** É um "Personal Access Token" (PAT)

Para criar PAT (se precisar):
1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Marcar: ✅ repo, ✅ write:packages
4. Copy o token
5. Colar no prompt do terminal quando pedir "password"

---

## 🔷 3. VERCEL - Por Último

### O que você vai fazer:
Fazer deploy do app (colocar online para acessar de qualquer lugar)

### ⬇️ PASSO-A-PASSO

#### **PASSO 3.1: Acessar Vercel**

1. Vá para: **https://vercel.com**
2. Clique **"Sign Up"** (ou **"Sign In"** se já tem)
3. Escolha **"Continue with GitHub"** (mais fácil)

```
┌────────────────────────────────────────────────┐
│ https://vercel.com                              │
│                                                 │
│ [Sign Up]                                      │
│   ├─ Continue with GitHub ← AQUI               │
│   ├─ Continue with GitLab                      │
│   └─ Continue with email                       │
└────────────────────────────────────────────────┘
```

Isso vai abrir GitHub pedindo permissão. Clique **"Authorize Vercel"**

#### **PASSO 3.2: Importar Repositório**

Depois de autorizar, você vê:

```
┌────────────────────────────────────────────────┐
│ VERCEL DASHBOARD                                │
│                                                 │
│ [Add New...] [Import Project] ← CLIQUE AQUI  │
│                                                 │
│ Meus Projetos:                                  │
│ (nenhum ainda)                                  │
└────────────────────────────────────────────────┘
```

Clique **"Import Project"**

#### **PASSO 3.3: Selecionar Repositório GitHub**

```
┌────────────────────────────────────────────────┐
│ IMPORT PROJECT                                  │
│                                                 │
│ Selecione a origem:                             │
│   ⭕ GitHub                                    │
│   ⭕ GitLab                                    │
│   ⭕ Bitbucket                                 │
│                                                 │
│ Seus repositórios:                              │
│ ☐ planejamento-familiar ← CLIQUE AQUI         │
│ ☐ outro_projeto                                │
│                                                 │
│                        [Import] ← DEPOIS AQUI │
└────────────────────────────────────────────────┘
```

#### **PASSO 3.4: Configurar Projeto**

```
┌────────────────────────────────────────────────┐
│ CONFIGURE PROJECT                               │
│                                                 │
│ Project Name:                                   │
│ [planejamento-familiar]                        │
│                                                 │
│ Framework Preset:                               │  
│ [Vite] ← DEVE APARECER AUTOMATICAMENTE         │
│                                                 │
│ Root Directory:                                 │
│ [./frontend]  ← IMPORTANTE! MUDE PARA ISSO    │
│                    (por padrão pode vir vazio) │
│                                                 │
│ Environment Variables: ← CLIQUE AQUI           │
│ ┌─────────────────────────────────────────┐   │
│ │ VITE_SUPABASE_URL                       │   │
│ │ [https://xxxxx.supabase.co]             │   │
│ │                                         │   │
│ │ VITE_SUPABASE_ANON_KEY                  │   │
│ │ [eyJhbGc...]                            │   │
│ │                                         │   │
│ │ VITE_API_URL                            │   │
│ │ [http://localhost:3000]                 │   │
│ └─────────────────────────────────────────┘   │
│                                                 │
│                [Deploy] ← CLIQUE AQUI          │
└────────────────────────────────────────────────┘
```

**IMPORTANTE AQUI:**
1. **Root Directory**: MUDE para `./frontend` (onde fica seu vite.config.js)
2. **Environment Variables**: Cole as 3 chaves (pegou lá do Supabase em 1.6)

#### **PASSO 3.5: Aguardar Deploy**

Vercel vai:
1. Puxar código do GitHub
2. Instalar dependências
3. Buildar o projeto
4. Fazer deploy

Isso leva 2-3 minutos. Você vê uma barrinha de progresso:

```
┌────────────────────────────────────────────────┐
│ DEPLOYMENT IN PROGRESS...                       │
│                                                 │
│ ▓▓▓▓▓▓▓░░░░░░░░░░░░░░░░░  50%                │
│                                                 │
│ ✅ GitHub connected                            │
│ ✅ Environment variables added                 │
│ ⏳ Building...                                  │
│ ⏳ Deploying...                                │
└────────────────────────────────────────────────┘
```

#### **PASSO 3.6: Acessar App**

Quando terminar, você vê:

```
┌────────────────────────────────────────────────┐
│ ✅ DEPLOYMENT SUCCESSFUL!                      │
│                                                 │
│ Visit: https://planejamento-familiar-xxxx.    │
│        vercel.app                              │
│                                                 │
│        [Go to Dashboard] [Visit]               │
└────────────────────────────────────────────────┘
```

**CLIQUE EM "Visit"** e seu app está ONLINE! 🎉

Teste:
- Login com: `sergio@gmail.com` / `123456`
- Signup com novo email
- Clique em módulos para verificar

---

## 🐛 CORRIGIR ERRO 404 NO VERCEL

Se ao fazer deploy receber erro `404: DEPLOYMENT_NOT_FOUND`, é por:

### ❌ CAUSA 1: Root Directory incorreto

**Solução:**
1. Va em **Vercel Dashboard** → seu projeto
2. Clique em **Settings**
3. Vá em **General**
4. Procure **"Root Directory"**
5. **Mude para** `./frontend`
6. Clique **Save**
7. Clique **Redeploy** (botão em cima)

### ❌ CAUSA 2: Environment Variables faltando

**Solução:**
1. Va em Vercel → seu projeto → **Settings**
2. Vá em **Environment Variables**
3. Adicione:
   ```
   VITE_SUPABASE_URL       = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY  = eyJhbGc...
   VITE_API_URL            = http://localhost:3000
   ```
4. Clique **Save**
5. Volte, clique **Deployments**
6. Clique no último deploy
7. Clique **Redeploy** (hambúrguer ☰)

### ❌ CAUSA 3: Build falhando

Veja os logs:
1. Vercel → seu projeto → **Deployments**
2. Clique no último (com ❌)
3. Clique em **Build Logs**
4. Procure por `error` ou `ERROR`
5. Se vir erro tipo `Cannot find module`, execute no terminal:
   ```bash
   cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR/frontend"
   npm install
   ```
6. Depois volta no GitHub/Push para retrigger deploy no Vercel

---

## 📋 CHECKLIST FINAL

Use isso para verificar se tudo funcionou:

```
SUPABASE:
☐ Criei conta em supabase.com
☐ Criei projeto "planejamento-familiar"
☐ Executei supabase_setup.sql
☐ Copiei Project URL
☐ Copiei anon key
☐ Salvei as 2 chaves em local seguro

GITHUB:
☐ Criei repositório "planejamento-familiar"
☐ Copiei URL HTTPS
☐ Executei: git remote add origin ...
☐ Executei: git push -u origin main
☐ Vi código aparecer no GitHub.com

VERCEL:
☐ Criei conta em vercel.com com GitHub
☐ Importei repositório planejamento-familiar
☐ Setei Root Directory para ./frontend
☐ Adicionei 3 environment variables
☐ Deploy completou com ✅ SUCCESS
☐ Cliquei em "Visit" e app abriu

APP ONLINE:
☐ Login funcionando
☐ Módulos carregando
☐ Dados salvando no Supabase
☐ 2 usuários conseguindo se logar
```

---

## 🎉 PRONTO!

Seu app está online em:
```
https://planejamento-familiar-xxxx.vercel.app
```

Com:
- ✅ Backend real (Supabase)
- ✅ Autenticação tipo Google
- ✅ 20 módulos financeiros
- ✅ Multi-usuário sincronizado
- ✅ Dados persistentes na nuvem

---

## 📞 SE DER ERRO

Erros comuns:

| Erro | Solução |
|------|---------|
| `404 DEPLOYMENT_NOT_FOUND` | Veja seção "Corrigir 404" acima |
| `VITE_SUPABASE_URL is undefined` | Faltam env vars → add no Vercel Settings |
| `Cannot POST /auth/signup` | Supabase não executou SQL → execute novamente |
| `Module not found @supabase/supabase-js` | Faltam dependências → `npm install` |
| `Cannot login` | Check`.env.local` tem valores corretos |

**Se mesmo assim não funcionar**, me avisa a mensagem de erro exata! 🚀

