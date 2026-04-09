# 🔐 COMO ATUALIZAR .env.local COM CHAVES SUPABASE

## 📍 Local do arquivo
```
frontend/.env.local
```

## 📝 Passo-a-passo

### 1. Abra o arquivo em VS Code
```
VS Code → File → Open → frontend/.env.local
```

### 2. Você verá
```
VITE_SUPABASE_URL=https://demo.supabase.co
VITE_SUPABASE_ANON_KEY=demo_key_local_development
VITE_API_URL=http://localhost:3001
```

### 3. Substitua pelos valores REAIS do Supabase

**Depois de criar projeto no Supabase:**
1. Va em: https://supabase.com → Seu projeto → Settings → API
2. Copie:
   - **Project URL** → substitua `VITE_SUPABASE_URL`
   - **anon (public) key** → substitua `VITE_SUPABASE_ANON_KEY`
3. Deixe `VITE_API_URL` como está (é para desenvolvimento local)

### 4. Arquivo atualizado deve parecer assim:

```env
VITE_SUPABASE_URL=https://seu_projeto_id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhieWt5amw...
VITE_API_URL=http://localhost:3001
```

### 5. Salve (Ctrl+S)

### 6. No Terminal, faça commit

```bash
cd "/Users/studio_motta/Desktop/PROGRAMA_PLANEJAMENTO FAMILIAR"
git add frontend/.env.local
git commit -m "Update Supabase environment variables"
git push
```

---

## ⚠️ IMPORTANTE

- **NÃO compartilhe** seu `VITE_SUPABASE_ANON_KEY` em público
- **NÃO comete** este arquivo com dados reais em repositórios públicos
- Se vazar a chave, regenere em Supabase Settings

---

## 🔄 Para VERCEL

Quando fazer deploy no Vercel, você também vai precisar adicionar estas MESMAS chaves em:

```
Vercel → Seu projeto → Settings → Environment Variables
```

Adicione:
- `VITE_SUPABASE_URL` com o mesmo valor
- `VITE_SUPABASE_ANON_KEY` com o mesmo valor
- `VITE_API_URL` pode ser `http://localhost:3000` ou deixar em branco

---

## 💡 Resumo

| Arquivo | O quê | Quando |
|---------|-------|--------|
| `frontend/.env.local` | Dev keys | Executa `npm run dev` |
| `Vercel Settings` | Deploy keys | After `vercel.com` import |

Ambas precisam ter as mesmas chaves do Supabase! ✅

