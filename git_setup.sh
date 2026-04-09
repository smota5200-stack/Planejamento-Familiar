#!/bin/bash

# ===================================
# GIT SETUP SCRIPT
# Execute este arquivo para inicializar o Git
# ===================================

echo "🚀 Iniciando setup do Git..."

# Configurar git user (opcional, faça manualmente se preferir)
echo "Configurando git user.name e user.email..."

# Se quiser usar valores específicos, edite aqui:
# git config --global user.name "Seu Nome"
# git config --global user.email "seu@email.com"

echo ""
echo "📝 Adicionar remoto do GitHub..."
echo "Substitua SEU_USER e SEU_REPOSITORIO pelos seus valores:"
echo ""
echo "git remote add origin https://github.com/SEU_USER/planejamento-familiar.git"
echo ""

echo "✅ Próximos passos:"
echo "1. Adicione todas as mudanças:"
echo "   git add ."
echo ""
echo "2. Faça o primeiro commit:"
echo "   git commit -m 'Initial commit: Planejamento Familiar App'"
echo ""
echo "3. Mude a branch para main:"
echo "   git branch -M main"
echo ""
echo "4. Faça push para GitHub:"
echo "   git push -u origin main"
echo ""
echo "5. Agora configure no Vercel em: https://vercel.com"
echo ""
echo "🎉 Pronto! Seu app estará no ar!"
