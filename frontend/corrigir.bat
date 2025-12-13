@echo off
echo 🚀 Corrigindo projeto React/Vite...

REM Crie os arquivos de configuração
echo import { defineConfig } from 'vite' > vite.config.ts
echo import react from '@vitejs/plugin-react' >> vite.config.ts
echo. >> vite.config.ts
echo // https://vitejs.dev/config/ >> vite.config.ts
echo export default defineConfig({ >> vite.config.ts
echo   plugins: [react()], >> vite.config.ts
echo   server: { >> vite.config.ts
echo     port: 3000, >> vite.config.ts
echo     open: true >> vite.config.ts
echo   }, >> vite.config.ts
echo   build: { >> vite.config.ts
echo     outDir: 'dist', >> vite.config.ts
echo     sourcemap: true >> vite.config.ts
echo   } >> vite.config.ts
echo }) >> vite.config.ts

echo ✅ vite.config.ts criado!

REM Corrige arquivos .tsx adicionando import React
powershell -Command "Get-ChildItem -Path src -Filter *.tsx -Recurse | ForEach-Object { $c = Get-Content $_.FullName -Raw; if (($c -match '<[A-Za-z]' -or $c -match 'useState') -and -not ($c -match 'import.*React')) { 'import React from ''react'';' + [Environment]::NewLine + [Environment]::NewLine + $c | Out-File $_.FullName -Encoding UTF8; echo ✅ Corrigido: $_.Name } }"

echo.
echo 📦 Instalando dependências...
call npm install

echo.
echo 🎉 PRONTO!
echo Inicie o servidor com: npm run dev
echo.
pause