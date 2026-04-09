# 🚀 GUIA COMPLETO: SETUP MULTI-USUÁRIO + DEPLOY

## FASE 1: SUPABASE (Local + Cloud)

### 1.1 Criar Projeto Supabase
```
1. Acesse supabase.com
2. Sign up ou Login
3. Create new project
   - Name: planejamento-familiar
   - Region: South America (São Paulo)
4. Aguarde criar (~2 min)
```

### 1.2 Executar SQL Schema
```
1. Vá para: SQL Editor
2. New Query
3. Cole todo o conteúdo de: supabase_setup.sql
4. Run
5. Pronto! Tabelas criadas
```

### 1.3 Configurar Auth (Usuários)
```
1. Vá para: Authentication → Providers
2. Email/Password já está habilitado ✓
3. Vá para: Authentication → URL Configuration
4. Site URL: http://localhost:5173 (desenvolvimento)
                https://seu-dominio.com (produção)
5. Redirect URLs: http://localhost:5173/dashboard
                 https://seu-dominio.com/dashboard
```

### 1.4 Copiar Chaves de API
```
Settings → API
Copie:
- Project URL (ex: https://xxxxx.supabase.co)
- anon public key (ex: eyJ...)
- service_role secret (guarde em seguro!)
```

---

## FASE 2: FRONTEND (Código)

### 2.1 Instalar Supabase Client
```bash
cd frontend
npm install @supabase/supabase-js
```

### 2.2 Criar arquivo de configuração
Já vem no repo em: `src/lib/supabase.js`

### 2.3 Definir Variáveis de Ambiente
```bash
# Na pasta frontend/, crie .env.local:

VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_API_URL=http://localhost:3001
```

### 2.4 Testar Localmente
```bash
npm run dev
# Abra http://localhost:5173
# Tente fazer login/signup
```

---

## FASE 3: GIT + GITHUB

### 3.1 Criar Repositório GitHub
```bash
1. Vá para github.com
2. Clique + → New repository
3. Nome: planejamento-familiar
4. Descrição: "App de planejamento familiar multi-user"
5. Público ou Privado (recomendo privado)
6. Clique "Create repository"
```

### 3.2 Fazer Push do Código
```bash
cd /Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO\ FAMILIAR

# Inicialize git se não tiver
git init

# Adicione remoto
git remote add origin https://github.com/SEU_USER/planejamento-familiar.git

# Configure user (se not configured)
git config --global user.name "Seu Nome"
git config --global user.email "seu@email.com"

# Crie .gitignore
cat > .gitignore << EOF
node_modules/
.env.local
.env
dist/
build/
.DS_Store
*.log
venv/
.vscode/
EOF

# Adicione tudo
git add .

# Primeiro commit
git commit -m "Initial commit: Planejamento Familiar App"

# Push para main
git branch -M main
git push -u origin main
```

---

## FASE 4: CRIAR USUÁRIOS & TESTAR

### 4.1 Criar Usuário no Supabase
```
1. Vá para Authentication → Users
2. Clique "Add user"
3. Email: sergio@gmail.com
   Password: (copie a senha que já possui)
4. Marque "Auto confirm" (opcional, para teste)
5. Salve
6. Repita para: elainex@gmail.com (mesma senha)
```

### 4.2 Criar Família no Dashboard
```
1. Faça login com sergio@gmail.com
2. No app, crie uma família
3. Invite elainex@gmail.com
4. Elaine faz login e vê os MESMOS dados
5. Qualquer alteração de um aparece no outro!
```

---

## FASE 5: DEPLOY (VERCEL)

### 5.1 Conectar Vercel ao GitHub
```
1. Vá para vercel.com
2. Sign up (recomendo usar GitHub)
3. Selecione "Import Git Repository"
4. Selecione: seu-user/planejamento-familiar
5. Clique "Import"
```

### 5.2 Configurar Variáveis de Ambiente
```
Na página do Vercel, em Environment Variables:

VITE_SUPABASE_URL = https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY = eyJ...
VITE_API_URL = https://seu-dominio.vercel.app
```

### 5.3 Deploy
```
1. Clique "Deploy"
2. Aguarde (~2-3 min)
3. Vercel gera URL: https://planejamento-familiar-xxx.vercel.app
4. Pronto! 🎉
```

### 5.4 Atualizar Supabase (callback URLs)
```
Volta ao Supabase:
Authentication → URL Configuration

Site URL: https://planejamento-familiar-xxx.vercel.app
Redirect URLs:
- https://planejamento-familiar-xxx.vercel.app/dashboard
- https://planejamento-familiar-xxx.vercel.app/auth/callback
```

---

## FASE 6: USAR EM PRODUÇÃO

### Fluxo Normal de Trabalho:
```bash
# Fazer mudanças locais
code frontend/src/components/MinhaAlteracao.jsx

# Testar
npm run dev

# Commit e push
git add .
git commit -m "Descrição da alteração"
git push

# Vercel faz deploy automaticamente! ✅
```

---

## 🆘 TROUBLESHOOTING

### Erro: "Cannot read properties of undefined (reading 'supabase')"
**Solução**: Confirme que .env.local existe na pasta frontend/ com as chaves corretas

### Erro: "User not authenticated"
**Solução**: Limpe localStorage e cookies, faça login novamente

### Dados não sincronizam entre usuarios
**Solução**: Verifique RLS policies no Supabase (SQL errors)

### Deploy falha no Vercel
**Solução**: Verifique logs do Vercel, provavelmente variável de ambiente faltando

---

## ✅ CHECKLIST FINAL

- [ ] Projeto Supabase criado
- [ ] Schema SQL executado
- [ ] Chaves de API copiadas
- [ ] .env.local criado
- [ ] npm install @supabase/supabase-js
- [ ] Código faz push no GitHub
- [ ] Vercel conectado ao GitHub
- [ ] Variáveis de ambiente no Vercel
- [ ] Deploy realizado
- [ ] 2 usuários criados no Supabase
- [ ] Login testado com ambos
- [ ] Dados sincronizam entre usuários

---

## DÚVIDAS?

Se encontrar problemas:
1. Verifique os console.log (F12 no navegador)
2. Verifique logs do Vercel (em tempo real)
3. Verifique SQL Errors no Supabase (SQL Editor)
4. Teste no localhost antes de fazer deploy

**Bom luck! 🚀**
