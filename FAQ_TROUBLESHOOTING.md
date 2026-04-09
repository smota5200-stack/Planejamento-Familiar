# 🔧 Troubleshooting & FAQ

## ❓ Perguntas Frequentes

### 1. Qual é a senha padrão?
**R**: Não há senha padrão. Cada usuário cria sua própria conta na tela de registro.

### 2. Posso usar o app sem Supabase?
**R**: Não. O projeto depende do Supabase para autenticação e banco de dados.

### 3. Quais são os requisitos mínimos?
**R**: Node.js 16+, npm 8+, e uma conta Supabase gratuita.

### 4. Posso hospedar em servidor próprio?
**R**: Sim, mas você precisará migrar do Supabase para outro provider (Firebase, AWS, etc).

### 5. Qual é a versão mínima do Node.js?
**R**: Node.js 16. Use `node -v` para verificar sua versão.

### 6. Posso adicionar mais módulos?
**R**: Sim! Veja a seção "Extensibilidade" em ARCHITECTURE.md

---

## 🐛 Problemas Comuns

### Erro: "Cannot find module '@supabase/supabase-js'"

**Causa**: Dependências não instaladas

**Solução**:
```bash
cd frontend
npm install

cd ../backend
npm install
```

---

### Erro: "VITE_SUPABASE_URL is not defined"

**Causa**: Arquivo `.env.local` não criado no frontend

**Solução**:
1. Crie `frontend/.env.local`
2. Copie o conteúdo de `frontend/.env.example`
3. Preencha com suas credenciais Supabase
4. Reinicie o servidor Vite

---

### Erro: "Port 5173 already in use"

**Causa**: Outra aplicação está usando a porta

**Solução**:
```bash
# Matar processo na porta
lsof -ti:5173 | xargs kill -9

# Ou usar porta diferente
VITE_PORT=5174 npm run dev
```

---

### Erro: "Port 3001 already in use"

**Causa**: Backend já está rodando ou outra app usa a porta

**Solução**:
```bash
# Matar processo na porta
lsof -ti:3001 | xargs kill -9

# Ou usar porta diferente no .env
PORT=3002 npm run dev
```

---

### Erro: "Supabase connection refused"

**Causa**: URL ou API Key incorreta, ou Supabase estar inativo

**Solução**:
1. Verificar URL em `backend/.env`
2. Verificar API Key em `backend/.env`
3. Garantir que o projeto Supabase está ativo
4. Testar a URL em um navegador

---

### Erro: "RLS policy violation"

**Causa**: User não tem permissão para acessar registro

**Solução**:
1. Verificar que `user_id` está correto no banco
2. Verificar RLS policies em Supabase dashboard
3. Garantir que o schema foi executado completamente

---

### Erro: "403 Forbidden" ao fazer requisição

**Causa**: Token JWT inválido ou expirado

**Solução**:
1. Fazer logout e novo login
2. Verificar que token é enviado em Authorization header
3. Verificar que o token é válido

---

### Erro: "Cannot POST /api/transactions"

**Causa**: Backend não está rodando ou rota não existe

**Solução**:
1. Verificar se backend está rodando em port 3001
2. Verificar que `VITE_API_URL` aponta para `http://localhost:3001`
3. Verificar que rota existe em `backend/server.js`

---

### Erro: "CORS error"

**Causa**: Origem não permitida no CORS

**Solução**:
1. Verificar `FRONTEND_URL` em `backend/.env`
2. Deve ser `http://localhost:5173` (com http)
3. Reiniciar backend após mudança

---

### Erro: "Database connection pool exhausted"

**Causa**: Muitas conexões abertas

**Solução**:
1. Reiniciar backend
2. Verificar se há queries travadas
3. Limitar conexões simultâneas (em produção)

---

### Erro: "Cannot read property 'id' of null"

**Causa**: User não está autenticado

**Solução**:
1. Fazer logout e novo login
2. Verificar que localStorage tem session storage
3. Clear cache do navegador

---

### Erro: "TypeError: Cannot read 'user' property"

**Causa**: Response da API vazia ou inválida

**Solução**:
1. Verificar no DevTools Network que API retorna dados
2. Verificar que user está autenticado
3. Verificar que dados existem no banco

---

## 📋 Checklist de Troubleshooting

Antes de pedir ajuda:

- [ ] Node.js instalado? `node -v`
- [ ] npm instalado? `npm -v`
- [ ] Dependências instaladas? `ls node_modules`
- [ ] Arquivos .env criados?
- [ ] Supabase projeto criado?
- [ ] Schema executado no Supabase?
- [ ] Backend rodando? `http://localhost:3001/health`
- [ ] Frontend rodando? `http://localhost:5173`
- [ ] Pode acessar Supabase dashboard?
- [ ] Credenciais corretas nos .env?

---

## 🔍 Debug Mode

### Frontend Debug
```javascript
// Adicione em App.jsx para ver autenticação
localStorage.setItem('debug', 'true');
console.log('User:', user);
console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
```

### Backend Debug
```javascript
// Adicionar logs no server.js
console.log('Request body:', req.body);
console.log('User ID:', req.user);
console.log('Supabase response:', data);
```

### Database Debug
```sql
-- Executar no Supabase SQL Editor
SELECT * FROM profiles LIMIT 1;
SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10;
SELECT * FROM auth.users;
```

---

## 💻 Commands Úteis

### NPM
```bash
npm install              # Instalar dependências
npm install <package>    # Adicionar package
npm uninstall <package>  # Remover package
npm update               # Atualizar packages
npm list                 # Ver dependências instaladas
```

### Node
```bash
node -v                  # Ver versão Node
npm -v                   # Ver versão npm
which node               # Mostrar path do Node
which npm                # Mostrar path do npm
```

### Git
```bash
git status               # Ver mudanças
git add .                # Adicionar tudo
git commit -m "msg"      # Fazer commit
git push                 # Fazer push
git log --oneline        # Ver commits
```

### System (macOS/Linux)
```bash
lsof -ti:PORT            # Ver processo na porta
kill PID                 # Matar processo
ps aux | grep node       # Ver processos Node
```

---

## 🌐 Recursos Úteis

### Documentação Oficial
- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Express Docs](https://expressjs.com)
- [Tailwind Docs](https://tailwindcss.com)

### Ferramentas
- [Postman](https://www.postman.com) - Testar APIs
- [Insomnia](https://insomnia.rest) - Testar APIs
- [VS Code](https://code.visualstudio.com) - Editor
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Debug

### Comunidades
- [Stack Overflow](https://stackoverflow.com)
- [React Discord](https://discord.gg/react)
- [Supabase Discord](https://discord.supabase.com)
- [Node.js Community](https://nodejs.org/community)

---

## 📞 Contatos de Suporte

### Supabase Issues
1. Ir em [supabase.com/support](https://supabase.com/support)
2. Ou criar issue no GitHub

### NPM Package Issues
1. Ir no GitHub do package
2. Criar issue com erro e stack trace
3. Procurar por issues similares

### Seu Projeto
1. Rever documentação (README.md, SETUP_GUIDE.md)
2. Testar sem dependências externas
3. Verificar console do navegador
4. Verificar logs do backend

---

## 💡 Dicas Pro

### Performance
```javascript
// Lazy load componentes (future improvement)
import React, { lazy } from 'react';
const FinanceModule = lazy(() => import('...'));
```

### Monitoring
```bash
# Ver uso de memória do Node
node --max-old-space-size=4096 server.js

# Profiling
node --prof server.js
```

### Development
```bash
# Watch mode para backend (com nodemon)
npm run dev  # Já configurado

# Debug com Chrome DevTools
node --inspect=9229 server.js
# chrome://inspect
```

---

## 🎓 Aprendendo

### Conceitos Importantes
- **JWT**: Token de autenticação seguro
- **RLS**: Row Level Security — apenas seu dado é seu
- **CORS**: Cross-Origin permite requisições
- **REST**: API architecture (GET/POST/PUT/DELETE)
- **ORM**: Abstração da manipulação de dados

### Recursos para Aprender
1. [Learn React Hook](https://react.dev/learn)
2. [Node.js Guide](https://nodejs.org/en/docs/guides/)
3. [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
4. [JWT Introduction](https://jwt.io/introduction)
5. [REST API Best Practices](https://restfulapi.net/)

---

## 🎯 Próximos Passos Após Deploy

1. **Monitorar**: Configurar alertas
2. **Backup**: Ativar backups automáticos
3. **Escalar**: Adicionar cache se necessário
4. **Otimizar**: Analisar performance
5. **Expandir**: Adicionar novos módulos

---

**Não encontrou sua pergunta? Crie uma issue ou revise a documentação!** 📚
