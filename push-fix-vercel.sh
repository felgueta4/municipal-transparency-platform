#!/bin/bash

echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║     PUSH FIX VERCEL TO GITHUB                                  ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo ""
echo "Commit pendiente:"
echo "  b5f5391 - fix: Disable outputFileTracingRoot in Vercel to fix fsPath error"
echo ""
echo "─────────────────────────────────────────────────────────────────"
echo ""
echo "Elige el método de autenticación:"
echo ""
echo "1) Personal Access Token (PAT)"
echo "2) Credenciales manuales (te pedirá usuario/token)"
echo "3) Mostrar comando para copiar manualmente"
echo ""
read -p "Selecciona una opción (1-3): " opcion

case $opcion in
  1)
    echo ""
    echo "─────────────────────────────────────────────────────────────────"
    echo "INSTRUCCIONES PARA PERSONAL ACCESS TOKEN:"
    echo ""
    echo "1. Ve a: https://github.com/settings/tokens"
    echo "2. Click en 'Generate new token' → 'Generate new token (classic)'"
    echo "3. Selecciona scopes: 'repo' (todos los checks)"
    echo "4. Genera el token y cópialo"
    echo ""
    read -p "Pega tu token aquí: " token
    
    if [ -z "$token" ]; then
      echo "❌ No ingresaste un token. Abortando."
      exit 1
    fi
    
    echo ""
    echo "Ejecutando push con PAT..."
    git push https://${token}@github.com/felgueta4/municipal-transparency-platform.git main
    
    if [ $? -eq 0 ]; then
      echo ""
      echo "✅ Push exitoso!"
      echo ""
      echo "──────────────────────────────────────────────────────────────"
      echo "SIGUIENTE PASO:"
      echo "1. Ve a Vercel: https://vercel.com/dashboard"
      echo "2. Settings → General → Root Directory"
      echo "3. Cambiar de 'apps/api' a 'frontend/nextjs_space'"
      echo "4. Save y Redeploy"
      echo "──────────────────────────────────────────────────────────────"
    else
      echo ""
      echo "❌ Error en el push. Verifica tu token."
    fi
    ;;
    
  2)
    echo ""
    echo "Ejecutando push (te pedirá credenciales)..."
    git push origin main
    
    if [ $? -eq 0 ]; then
      echo ""
      echo "✅ Push exitoso!"
      echo ""
      echo "──────────────────────────────────────────────────────────────"
      echo "SIGUIENTE PASO:"
      echo "1. Ve a Vercel: https://vercel.com/dashboard"
      echo "2. Settings → General → Root Directory"
      echo "3. Cambiar de 'apps/api' a 'frontend/nextjs_space'"
      echo "4. Save y Redeploy"
      echo "──────────────────────────────────────────────────────────────"
    else
      echo ""
      echo "❌ Error en el push. Intenta con opción 1 (PAT)."
    fi
    ;;
    
  3)
    echo ""
    echo "─────────────────────────────────────────────────────────────────"
    echo "COMANDO PARA COPIAR Y EJECUTAR:"
    echo ""
    echo "cd /home/ubuntu/municipal_transparency_platform"
    echo "git push origin main"
    echo ""
    echo "O con Personal Access Token:"
    echo ""
    echo "git push https://[TU-TOKEN]@github.com/felgueta4/municipal-transparency-platform.git main"
    echo ""
    echo "Genera tu token en:"
    echo "https://github.com/settings/tokens"
    echo "─────────────────────────────────────────────────────────────────"
    ;;
    
  *)
    echo "❌ Opción inválida. Abortando."
    exit 1
    ;;
esac
