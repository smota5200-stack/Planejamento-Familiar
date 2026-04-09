#!/bin/bash

# Dados do Supabase
SUPABASE_URL="https://wvncdusvpfbdsnclynxl.supabase.co"
ANON_KEY="sb_publishable_z4Lj8R0e1VGKav0XdvfN2w_ZQmBFsF7"

echo "🔄 Criando usuários no Supabase..."

# Usuário 1: smota5200@gmail.com
echo ""
echo "1️⃣  Criando smota5200@gmail.com / 1234"
curl -X POST "$SUPABASE_URL/auth/v1/signup" \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "smota5200@gmail.com",
    "password": "1234"
  }' 2>/dev/null | python3 -m json.tool 2>/dev/null || echo "Usuário pode já existir"

# Usuário 2: elainex2018@gmail.com  
echo ""
echo "2️⃣  Criando elainex2018@gmail.com / 1234"
curl -X POST "$SUPABASE_URL/auth/v1/signup" \
  -H "apikey: $ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "elainex2018@gmail.com",
    "password": "1234"
  }' 2>/dev/null | python3 -m json.tool 2>/dev/null || echo "Usuário pode já existir"

echo ""
echo "✅ Processo concluído!"
