import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // Pode manter 5173
    host: true,          // Bom para acesso em rede local
    open: true           // Abre navegador automaticamente
  },
  // Adicione para melhor performance
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['lucide-react', 'sonner']
        }
      }
    }
  }
})