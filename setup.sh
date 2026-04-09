#!/bin/bash

# LifeOS — Script de Setup Rápido

echo "🚀 LifeOS Setup Iniciando..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js não está instalado${NC}"
    echo "Instale em: https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js ${NC}$(node -v)"

# Install Backend
echo ""
echo -e "${YELLOW}📦 Instalando Backend...${NC}"
cd backend
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar Backend${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Backend instalado${NC}"

# Install Frontend
echo ""
echo -e "${YELLOW}📦 Instalando Frontend...${NC}"
cd ../frontend
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Erro ao instalar Frontend${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Frontend instalado${NC}"

# Create .env files
echo ""
echo -e "${YELLOW}📝 Criando arquivos de configuração...${NC}"

if [ ! -f "../backend/.env" ]; then
    cp ../backend/.env.example ../backend/.env
    echo -e "${GREEN}✅ backend/.env criado${NC}"
    echo -e "${YELLOW}⚠️  Edite backend/.env com suas credenciais Supabase${NC}"
fi

if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✅ frontend/.env.local criado${NC}"
    echo -e "${YELLOW}⚠️  Edite frontend/.env.local com suas credenciais Supabase${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup Completo!${NC}"
echo ""
echo -e "${YELLOW}📌 Próximos passos:${NC}"
echo "1. Edite backend/.env e frontend/.env.local"
echo "2. Execute em 2 terminais:"
echo "   Terminal 1: cd backend && npm run dev"
echo "   Terminal 2: cd frontend && npm run dev"
echo "3. Acesse: http://localhost:5173"
echo ""
