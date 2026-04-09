# ⚡ QUICK START - DEPLOY EM 5 MINUTOS

> **Para o usuário impaciente que quer começar YÁ**

---

## 🎯 OBJETIVO
Colocar seu app online em 3 serviços diferentes. Total: ~30 min.

---

## 📍 MAPA RÁPIDO

```
SEU COMPUTADOR              NUVEM (Internet)
│                           │
├─ Código aqui              ├─ GitHub (armazena código)
├─ Git commands             │
│                           ├─ Supabase (banco de dados)
│                           │
│                           └─ Vercel (faz app rodar online)
```

---

## 3️⃣ SERVIÇOS QUE VOCÊ VAI USAR

| # | Serviço | O quê | URL | Tempo |
|---|---------|-------|-----|-------|
| 1 | **Supabase** | Banco de dados + Autenticação | supabase.com | 10 min |
| 2 | **GitHub** | Guardar código na nuvem | github.com | 5 min |
| 3 | **Vercel** | Fazer app rodar 24/7 online | vercel.com | 10 min |

---

## 🚀 PASSO 1: SUPABASE (10 min)

### O que você vai fazer
Criar banco de dados na NUVEM que guarda dados do app.

### Passo-a-passo

```
1. Abra website: supabase.com
   
2. Clique "Start your project"
   
3. Escolha "Sign Up" (ou Sign In se tem conta)
   
4. Preencha: email + password
   
5. Clique "Create a new project"
   
6. Preencha:
   ☐ Project Name: "planejamento-familiar"
   ☐ Password: uma senha segura
   ☐ Region: qualquer uma
   ☐ Plan: FREE (selecionado por padrão)
   
7. Aguarde 60 segundos...
   
8. Clique "SQL Editor" (esquerda)
   
9. Clique "New Query" ou "+"
   
10. COPIE e COLE todo conteúdo do arquivo:
    supabase_setup.sql
    
11. Clique "RUN" e aguarde terminar
    (vai aparecer "Success")
    
12. Clique "Settings" → "API" (esquerda)
    
13. COPIE estas 2 chaves:
    ✓ Project URL (começa com https://xxxxx.supabase.co)
    ✓ anon (public) key (começa com eyJh...)
    
14. SALVE em lugar seguro (Word, Notepad, etc)
```

### ✅ Pronto quando
Você tem 2 chaves copiadas e guardadas.

---

## 🚀 PASSO 2: GITHUB (5 min)

### O que você vai fazer
Colocar seu código online no GitHub (controle de versão).

### Passo-a-passo

```
1. Abra website: github.com
   
2. Se não tem conta: "Sign Up"
   Se tem: "Sign In"
   
3. Clique "+" (canto superior direito)
   
4. Selecione "New repository"
   
5. Preencha:
   ☐ Repository name: "planejamento-familiar"
   ☐ Description: "App para planejamento financeiro"
   ☐ PUBLIC (deixar público)
   
6. Clique "Create repository"
   
7. Você vê uma página com instrução "...or push existing repo"
   
8. COPIE estes 3 comandos e COLE no terminal:
   
   git remote add origin https://github.com/seu_usuario/planejamento-familiar.git
   git branch -M main
   git push -u origin main
   
   (substituir "seu_usuario" pelo seu user do GitHub)
```

### Como executar os comandos

```
1. Abra Terminal (não VS Code, mas Terminal mesmo)
   
2. Digite (ou copie e cole):
   cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
   
3. Copie e cole CADA LINHA:
   git remote add origin https://github.com/seu_usuario/planejamento-familiar.git
   git branch -M main
   git push -u origin main
   
4. Vai pedir username e password:
   Username: seu usuário GitHub
   Password: NÃO é sua senha! É um "token"
            (veja seção "CRIAR PERSONAL TOKEN" abaixo)
```

### Como criar Personal Access Token (PAT)

Se GitHub pedir "password" e você não sabe qual é:

```
1. Va em github.com
   
2. Sua foto (canto superior direito) → Settings
   
3. Developer settings (esquerda abaixo)
   
4. Personal access tokens → Tokens (classic)
   
5. Clique "Generate new token"
   
6. Preencha:
   ☐ Note: "Deploy token"
   ☐ Marque: ✅ repo
   ☐ Marque: ✅ write:packages
   
7. Clique "Generate token" e COPIE a chave gigante
   
8. Volte no terminal onde está pedindo "password"
   
9. Cole a chave (vai parecer que não está digitando, é normal)
   
10. Clique ENTER
```

### ✅ Pronto quando
Seu código aparecer em github.com/<seu_usuario>/planejamento-familiar

---

## 🚀 PASSO 3: UPDATE .env.local (2 min)

### O que você vai fazer
Alimentar as chaves do Supabase no seu projeto.

### Passo-a-passo

```
1. Abra VS Code
   
2. Abra arquivo: frontend/.env.local
   
3. Você vê algo tipo:
   VITE_SUPABASE_URL=
   VITE_SUPABASE_ANON_KEY=
   VITE_API_URL=
   
4. Preencha com valores do Supabase (pegou em PASSO 1):
   
   VITE_SUPABASE_URL=https://seu_projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGc...sua_chave_aqui...
   VITE_API_URL=http://localhost:3000
   
5. Salve (Ctrl+S)
   
6. Abra terminal e execute:
   cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
   git add .
   git commit -m "Add Supabase environment variables"
   git push
```

### ✅ Pronto quando
O arquivo está salvo com as chaves corretas.

---

## 🚀 PASSO 4: VERCEL (10 min)

### O que você vai fazer
Fazer app rodar online 24/7 no servidor Vercel.

### Passo-a-passo

```
1. Abra website: vercel.com
   
2. Clique "Sign Up"
   
3. Selecione "Continue with GitHub"
   (mais fácil que criar conta nova)
   
4. GitHub vai pedir permissão. Clique "Authorize Vercel"
   
5. Você vê Vercel Dashboard
   
6. Clique "Add New..." → "Import Project"
   
7. Você vê lista de repositórios GitHub
   
8. Procure "planejamento-familiar" e clique
   
9. Clique "Import"
   
10. Você vê tela "Configure Project"
    Preencha:
    ☐ Project Name: "planejamento-familiar"
    ☐ Framework: deve estar "Vite" (auto-detectado)
    ☐ Root Directory: MUDE para "./frontend"
                     (importante!)
    
11. Scroll down, procure "Environment Variables"
    
12. Clique "Add Environment Variable" e adicione:
    
    Nome: VITE_SUPABASE_URL
    Valor: https://seu_projeto.supabase.co
    
    Nome: VITE_SUPABASE_ANON_KEY
    Valor: eyJhbGc...
    
    Nome: VITE_API_URL
    Valor: http://localhost:3000
    
13. Clique "Deploy"
    
14. Vercel vai fazer build... aguarde 2-3 minutos
    
15. Quando aparecer "Deployment Successful ✅"
    Clique "Visit"
    
16. 🎉 SEU APP ESTÁ ONLINE!
```

### ✅ Pronto quando
URL aparecer tipo: `https://planejamento-familiar-xxxx.vercel.app`

---

## 🧪 TESTE SEU APP

```
1. Clique na URL que Vercel te deu
   
2. Você vê tela de LOGIN (bonita, cor roxo)
   
3. Teste login:
   Email: sergio@gmail.com
   Senha: 123456
   Clique ENTRAR
   
4. Você vê DASHBOARD com 22 módulos
   
5. Clique em qualquer módulo (ex: Balanço)
   
6. Dados salvam no Supabase automaticamente
   
7. Agora teste multi-user:
   Clique logout (seu perfil > logout)
   Clique SIGNUP
   Digite novo email e senha
   Preencha nome
   Clique SIGNUP
   
8. Você está agora como novo usuário
   
9. Clique "Balanço" → adicione algo
   
10. Faça logout
    
11. Login novamente como sergio@gmail.com
    
12. Você vê os dados que ELE adicionou!
    ✅ MULTI-USUÁRIO FUNCIONANDO!
```

---

## 🐛 SE DER ERRO 404 (DEPLOYMENT_NOT_FOUND)

```
❌ ERRO: "404: NÃO ENCONTRADO"

SOLUÇÃO (escolha uma):

A. Root Directory errado
   → Vercel → Settings → General
   → Root Directory: ./frontend
   → Save
   → Redeploy

B. Env vars faltando
   → Vercel → Settings → Environment Variables
   → Cheque se tem as 3 chaves
   → Se falta, adicione
   → Redeploy

C. Build falhou
   → Vercel → Deployments → último (❌)
   → Build Logs
   → Procura por "ERROR"
   → Se vir erro aí, conserta
   → git push (para retrigger deploy)

Se mesmo assim não funcionar:
→ Abra arquivo: 🐛_CORRIGIR_ERRO_404_VERCEL.md
→ Siga instruções detalhadas lá
```

---

## 📋 CHECKLIST FINAL

```
SUPABASE:
☐ Projeto criado em supabase.com
☐ SQL executado com sucesso
☐ 2 chaves copiadas e guardadas

GITHUB:
☐ Repositório criado em github.com
☐ Código feito push (aparece online)
☐ URL: github.com/<usuario>/planejamento-familiar

ARQUIVO .env.local:
☐ Atualizado com chaves do Supabase
☐ Arquivo salvo
☐ Git push feito

VERCEL:
☐ Conta criada em vercel.com
☐ Repo importado
☐ Root Directory: ./frontend
☐ 3 env vars adicionadas
☐ Deploy completou (✅ Success)
☐ URL funciona: vercel.app

APP:
☐ Login page carrega
☐ Consegue fazer login
☐ Dashboard mostra 22 módulos
☐ Dados salvam
☐ Multi-user funciona
```

---

## 🎉 RESULTADO FINAL

Seu app está ONLINE em:
```
https://planejamento-familiar-xxxx.vercel.app
```

Com:
```
✅ Backend real (Supabase PostgreSQL)
✅ Autenticação real
✅ 2+ usuários conseguindo se conectar
✅ Dados sincronizados automaticamente
✅ 22 módulos financeiros
✅ 24/7 online
✅ GRÁTIS (planos free dos 3 serviços)
```

Compartilhe a URL com Sergio, Elaine e Enzo para testarem!

---

## 💡 PRÓXIMOS PASSOS (Se quiser evolucionar)

```
☐ Domínio próprio (em vez de .vercel.app)
☐ App mobile (React Native)
☐ Notificações por email
☐ Relatórios em PDF
☐ Integração bancária real
☐ Dashboard com gráficos
☐ Dark mode
☐ Multi-idioma
```

Qualquer dúvida, avisa! 🚀

