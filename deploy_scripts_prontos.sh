#!/bin/bash

# ╔════════════════════════════════════════════════════════════════════════╗
# ║          🚀 SCRIPTS PRONTOS PARA DEPLOY - COPIE E COLE               ║
# ╚════════════════════════════════════════════════════════════════════════╝

# Este arquivo contém todos os comandos prontos para você copiar e colar
# no terminal (ou um .bash_profile para automação completa)

###############################################################################
# 📋 ÍNDICE - COPIE CADA SEÇÃO CONFORME NECESSÁRIO
###############################################################################

# SEÇÃO 1: Depois de criar repo no GitHub
# SEÇÃO 2: Update .env.local com chaves Supabase
# SEÇÃO 3: Cleanup antes de fazer push
# SEÇÃO 4: Push para GitHub (final)
# SEÇÃO 5: Troubleshoot Vercel 404

###############################################################################
# ✅ SEÇÃO 1: GIT SETUP (Depois de criar repositório no GitHub)
###############################################################################

# COPIE E COLE NO TERMINAL:
# (Substitua "seu_usuario" pelo seu usuário GitHub e "sua_senha_ou_token")

cat << 'SCRIPTS_GIT'

# Entre na pasta correta
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"

# Execute ESTES comandos um por um (copie e cole):

# 1. Adicionar repositório remoto (substitua seu_usuario)
git remote add origin https://github.com/seu_usuario/planejamento-familiar.git

# 2. Renomear branch para "main"
git branch -M main

# 3. Fazer push (vai pedir GitHub username/password - use seu usuario e um PAT token)
git push -u origin main

# ✅ Se vir algo assim, funcionou:
# Enumerating objects: 63, done.
# Counting objects: 100% (63/63), done.
# Writing objects: 100% (63/63), xxx KiB
# remote: Resolving deltas: 100% (8/8), done.
# To https://github.com/seu_usuario/planejamento-familiar.git
#  * [new branch]      main -> main
# Branch 'main' set up to track remote branch 'main' from 'origin'.

SCRIPTS_GIT

###############################################################################
# ✅ SEÇÃO 2: UPDATE .env.local COM CHAVES SUPABASE
###############################################################################

cat << 'SCRIPTS_ENV'

# Depois de pegar as chaves do Supabase (PASSO 1.6 do guia), 
# coloque no arquivo .env.local

# 1. Abra VS Code ou editor
# 2. Abra arquivo: frontend/.env.local
# 3. Substitua pelos valores reais:

# ═══════════════════════════════════════════════════════════════
# COPIE E COLE NO ARQUIVO frontend/.env.local:
# ═══════════════════════════════════════════════════════════════

VITE_SUPABASE_URL=https://seu_projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.seu_chave_aqui...
VITE_API_URL=http://localhost:3000

# Depois disso, volte no terminal e execute:
# git add frontend/.env.local
# git commit -m "Add Supabase environment variables"
# git push

SCRIPTS_ENV

###############################################################################
# ✅ SEÇÃO 3: CLEANUP ANTES DO PUSH
###############################################################################

cat << 'SCRIPTS_CLEANUP'

# Se quiser garantir que tudo está pronto para push:

cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"

# Ver status
git status

# Se houver modificações não commitadas:
git add .
git commit -m "Final cleanup before deployment"

# Remover qualquer arquivo desnecessário:
npm install  # garantir dependências corretas

# Ver histórico de commits
git log --oneline

# Se vir algo como:
# * abc1234 Final cleanup before deployment
# * def5678 Add .env.local
# * ghi9012 Initial setup
# * jkl3456 (HEAD -> main)
# Seu git está pronto para push!

SCRIPTS_CLEANUP

###############################################################################
# ✅ SEÇÃO 4: PUSH PARA GITHUB (FINAL)
###############################################################################

cat << 'SCRIPTS_PUSH'

# Se tudo estiver com git status "clean", execute:

cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"

# Push final
git push

# ✅ Se vir:
# Everything up-to-date
# Significa que código já está online no GitHub!

SCRIPTS_PUSH

###############################################################################
# ✅ SEÇÃO 5: TROUBLESHOOT - SE DER ERRO 404 NO VERCEL
###############################################################################

cat << 'SCRIPTS_TROUBLESHOOT'

# Se ao fazer deploy no Vercel receber "404: DEPLOYMENT_NOT_FOUND":

# ========== OPÇÃO 1: Checar build localmente ==========

cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR/frontend"

# Verificar dependências
npm install

# Fazer build como Vercel vai fazer
npm run build

# Se der erro, procure por "ERROR" ou "error" na saída
# Se funcionar, saída será algo como:
# ✓ 1234 modules transformed.
# ✓ built in 5.23s

# ========== OPÇÃO 2: Diagnosticar problema Vercel ==========

# A. Clonar seu repo em pasta temporária e testar:
cd ~/Desktop
git clone https://github.com/seu_usuario/planejamento-familiar.git teste-vercel
cd teste-vercel/frontend
npm install
npm run build

# Se erfolgt localmente, o problema é nas settings do Vercel

# B. Verificar .gitignore não está excluindo arquivos críticos:
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
cat .gitignore | grep -v node_modules | grep -v dist

# Se vir "vite.config.js" ou "package.json" na saída, REMOVA DESSE .gitignore

# ========== OPÇÃO 3: Forçar novo deploy no Vercel ==========

# 1. Va em www.vercel.com
# 2. Selecione seu projeto "planejamento-familiar"
# 3. Abra "Deployments"
# 4. Clique no último com ❌
# 5. Clique "..." (menu hambúrguer)
# 6. Clique "Redeploy"

# Vai refazer o build. Se der erro, clique "Build Logs" para ver mensagem exata.

SCRIPTS_TROUBLESHOOT

###############################################################################
# 🎬 SCRIPT AUTOMÁTICO (SUPERA avançado - execute tudo de uma vez)
###############################################################################

cat << 'SCRIPTS_AUTO'

# ⚠️ APENAS PARA QUEM ESTÁ CONFORTÁVEL COM TERMINAL ⚠️
# Execute uma única vez para automatizar TUDO

#!/bin/bash

PROJECT_DIR="/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
GITHUB_USERNAME="seu_usuario"  # SUBSTITUA AQUI
GITHUB_TOKEN="seu_token_ou_senha"  # SUBSTITUA AQUI

# 1. Check status
echo "📋 Verificando Git status..."
cd "$PROJECT_DIR"
git status

# 2. Add all changes
echo "📦 Adicionando todas as mudanças..."
git add .

# 3. Commit if needed
if [[ $(git status --porcelain) ]]; then
    echo "💾 Fazendo commit..."
    git commit -m "Final prep for deployment"
else
    echo "✅ Já estava tudo commitado"
fi

# 4. Add remote if not exists
if ! git remote get-url origin &>/dev/null; then
    echo "🔗 Adicionando repositório remoto..."
    git remote add origin "https://github.com/$GITHUB_USERNAME/planejamento-familiar.git"
fi

# 5. Rename to main
echo "📝 Renomeando branch para main..."
git branch -M main

# 6. Push
echo "🚀 Fazendo push..."
git push -u origin main --force

echo "✅ PRONTO! Seu código está no GitHub!"
echo "🔗 https://github.com/$GITHUB_USERNAME/planejamento-familiar"
echo ""
echo "👉 Próximo passo:"
echo "   1. Va em www.vercel.com"
echo "   2. Clique 'Import Project'"
echo "   3. Selecione 'planejamento-familiar'"
echo "   4. Root Directory: ./frontend"
echo "   5. Environment Variables:"
echo "      - VITE_SUPABASE_URL"
echo "      - VITE_SUPABASE_ANON_KEY"
echo "      - VITE_API_URL"
echo "   6. Deploy!"

SCRIPTS_AUTO

###############################################################################
# 🔧 COMMANDS INDIVIDUAIS (para copiar e colar conforme necessário)
###############################################################################

cat << 'SCRIPTS_INDIVIDUAL'

# COPIE E COLE UMA LINHA POR VEZ NO TERMINAL:

# ==> Ver status git
git status

# ==> Adicionar todos os arquivos
git add .

# ==> Fazer commit
git commit -m "Deploy ready"

# ==> Adicionar repositório remoto GitHub
git remote add origin https://github.com/SEU_USUARIO/planejamento-familiar.git

# ==> Renomear branch
git branch -M main

# ==> Fazer push
git push -u origin main

# ==> Ver logs de commits
git log --oneline

# ==> Ver qual é o remote
git remote -v

# ==> Se precisar remover remote antigo
git remote remove origin

# ==> Se precisar mudar remote
git remote set-url origin https://github.com/NOVO_USUARIO/planejamento-familiar.git

# ==> Instalar dependências frontend
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR/frontend" && npm install

# ==> Buildar local (para testar como Vercel vai fazer)
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR/frontend" && npm run build

# ==> Rodar dev local
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR/frontend" && npm run dev

SCRIPTS_INDIVIDUAL

###############################################################################
# 📍 RESUMO - O QUE FAZER EM ORDEM
###############################################################################

cat << 'RESUMO'

┌──────────────────────────────────────────────────────────────────────────┐
│                   📋 ORDEM EXATA PARA NÃO ERRAR                          │
└──────────────────────────────────────────────────────────────────────────┘

1️⃣  SUPABASE (você faz isso manualmente no browser)
    ├─ Criar conta
    ├─ Criar projeto "planejamento-familiar"
    ├─ Executar SQL
    └─ Copiar chaves (guardar em local seguro)

2️⃣  UPDATE .env.local (no VS Code)
    ├─ Abra: frontend/.env.local
    ├─ Cole os valores do Supabase
    └─ Salve

3️⃣  GIT COMMIT & PUSH (no terminal)
    ├─ cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
    ├─ git add .
    ├─ git commit -m "Update env variables"
    ├─ git remote add origin https://github.com/seu_usuario/planejamento-familiar.git
    ├─ git branch -M main
    └─ git push -u origin main

4️⃣  GITHUB (você faz isso manualmente no browser)
    ├─ Criar repositório "planejamento-familiar"
    └─ Copiar URL (para colar no git remoto acima)

5️⃣  VERCEL (você faz isso manualmente no browser)
    ├─ Conectar com GitHub
    ├─ Importar repo "planejamento-familiar"
    ├─ Root Directory: ./frontend
    ├─ Environment Variables (3 chaves do Supabase)
    └─ Deploy!

6️⃣  SE DER ERRO 404
    ├─ Vercel → Settings → General
    ├─ Root Directory: ./frontend
    ├─ Save
    └─ Redeploy

✅ PRONTO! App está online em:
   https://planejamento-familiar-xxxx.vercel.app

RESUMO

echo "✅ Guia completo criado!"
echo ""
echo "📍 Use este arquivo como referência ao fazer deploy"
echo "📍 Copie e cole os comandos conforme necessário"
echo "📍 Siga a ordem do RESUMO para não errar"

