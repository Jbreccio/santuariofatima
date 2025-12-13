// frontend/src/App.tsx - NÃO MUDE NADA!
import React, { useEffect, useState } from "react"
import { BrowserRouter } from "react-router-dom"
import Popup from './components/popup/popup';
import AppRoutes from "./routes/AppRoutes"; // ← ADICIONE ESTA LINHA
import WhatsAppButton from "./components/layout/WhatsAppButton"
import Navigation from "./components/layout/Navigation"
import { ConteudoProvider } from "./contexts/ConteudoContext"

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando Santuário de Fátima...</p>
        </div>
      </div>
    )
  }

  return (
    <ConteudoProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white">
          <Navigation />
          <main className="flex-grow">
            {/* ⭐⭐ APENAS AppRoutes AQUI ⭐⭐ */}
            <AppRoutes />
          </main>
          <Popup />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </ConteudoProvider>
  )
}

export default App