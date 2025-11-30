#!/bin/bash

echo "═══════════════════════════════════════════════════════"
echo "  🚀 Script de Push a GitHub - Municipal Platform"
echo "═══════════════════════════════════════════════════════"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -d ".git" ]; then
    echo "❌ Error: No estás en un repositorio Git"
    echo "   Ejecuta: cd /home/ubuntu/municipal_transparency_platform"
    exit 1
fi

# Mostrar estado actual
echo "📊 Estado actual del repositorio:"
git status -s
echo ""

# Verificar si hay commits sin push
UNPUSHED=$(git log origin/main..HEAD --oneline 2>/dev/null | wc -l)
if [ "$UNPUSHED" -eq 0 ]; then
    echo "✅ No hay commits pendientes por push"
    exit 0
fi

echo "📦 Commits pendientes por push: $UNPUSHED"
git log origin/main..HEAD --oneline
echo ""

# Menú de opciones
echo "Selecciona el método de autenticación:"
echo ""
echo "1) GitHub CLI (gh auth login)"
echo "2) SSH (usar clave SSH existente o crear nueva)"
echo "3) HTTPS con Personal Access Token"
echo "4) Intentar push directo (si ya tienes credenciales)"
echo "5) Cancelar"
echo ""
read -p "Opción [1-5]: " option

case $option in
    1)
        echo ""
        echo "🔐 Configurando GitHub CLI..."
        if ! command -v gh &> /dev/null; then
            echo "⚠️  GitHub CLI no está instalado."
            echo "   Instalando..."
            type -p curl >/dev/null || sudo apt install curl -y
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            sudo apt update
            sudo apt install gh -y
        fi
        
        echo "📱 Iniciando autenticación con GitHub..."
        gh auth login
        
        if [ $? -eq 0 ]; then
            echo "✅ Autenticación exitosa"
            echo "🚀 Haciendo push..."
            git push origin main
        else
            echo "❌ Error en la autenticación"
            exit 1
        fi
        ;;
    
    2)
        echo ""
        echo "🔑 Configurando SSH..."
        
        if [ ! -f ~/.ssh/id_ed25519 ]; then
            echo "📝 Generando nueva clave SSH..."
            read -p "Ingresa tu email de GitHub: " email
            ssh-keygen -t ed25519 -C "$email" -f ~/.ssh/id_ed25519 -N ""
            eval "$(ssh-agent -s)"
            ssh-add ~/.ssh/id_ed25519
        fi
        
        echo ""
        echo "📋 Esta es tu clave pública SSH. Cópiala y agrégala a GitHub:"
        echo "   https://github.com/settings/keys"
        echo ""
        cat ~/.ssh/id_ed25519.pub
        echo ""
        read -p "Presiona ENTER cuando hayas agregado la clave a GitHub..."
        
        # Cambiar remote a SSH
        git remote set-url origin git@github.com:felgueta4/municipal-transparency-platform.git
        
        echo "🚀 Haciendo push..."
        git push origin main
        ;;
    
    3)
        echo ""
        echo "🔐 Usando Personal Access Token..."
        echo ""
        echo "1. Ve a: https://github.com/settings/tokens"
        echo "2. Genera un nuevo token con permisos 'repo'"
        echo "3. Copia el token"
        echo ""
        read -p "Pega tu token aquí: " token
        
        if [ -z "$token" ]; then
            echo "❌ Token no puede estar vacío"
            exit 1
        fi
        
        # Configurar credential helper
        git config --global credential.helper store
        
        # Cambiar remote a HTTPS con token
        git remote set-url origin https://${token}@github.com/felgueta4/municipal-transparency-platform.git
        
        echo "🚀 Haciendo push..."
        git push origin main
        
        # Restaurar remote original (sin token expuesto)
        git remote set-url origin https://github.com/felgueta4/municipal-transparency-platform.git
        ;;
    
    4)
        echo ""
        echo "🚀 Intentando push directo..."
        git push origin main
        ;;
    
    5)
        echo "❌ Cancelado por el usuario"
        exit 0
        ;;
    
    *)
        echo "❌ Opción inválida"
        exit 1
        ;;
esac

# Verificar resultado
if [ $? -eq 0 ]; then
    echo ""
    echo "═══════════════════════════════════════════════════════"
    echo "  ✅ PUSH EXITOSO"
    echo "═══════════════════════════════════════════════════════"
    echo ""
    echo "🎯 Próximos pasos:"
    echo ""
    echo "1. Ir a Railway: https://railway.app"
    echo "2. Verificar que el deploy automático inició"
    echo "3. Monitorear logs: railway logs"
    echo "4. Cuando complete, ejecutar seed:"
    echo "   railway run sh run-seed-railway.sh"
    echo ""
    echo "📖 Ver documentación completa:"
    echo "   cat RAILWAY_DATABASE_MIGRATION_FIX.md"
else
    echo ""
    echo "❌ Error durante el push"
    echo "   Revisa los mensajes de error arriba"
    echo "   Consulta: RAILWAY_DATABASE_MIGRATION_FIX.md"
fi
