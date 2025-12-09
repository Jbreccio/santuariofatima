// frontend/src/components/popup/popup.tsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PopupData {
  id: string;
  titulo: string;
  mensagem: string;
  tipo: 'texto' | 'imagem';
  imagem?: string;
  ativo: boolean;
  intervalo: number;
  dataExpiracao?: string;
}

const Popup = () => {
  const location = useLocation();

  // ✅ NÃO RENDERIZAR NADA NA PÁGINA SECRETA
  if (location.pathname === '/loginsecret') {
    return null;
  }

  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [popupsAtivos, setPopupsAtivos] = useState<PopupData[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar popups do localStorage
  useEffect(() => {
    const carregarPopups = () => {
      try {
        const dados = localStorage.getItem('dados-santuario');
        if (dados) {
          const parsed = JSON.parse(dados);
          const popups = parsed.popups || [];
          
          // Filtrar popups ativos e não expirados
          const agora = new Date();
          const popupsFiltrados = popups.filter((popup: PopupData) => {
            if (!popup.ativo) return false;
            
            // Verificar se está expirado
            if (popup.dataExpiracao) {
              const dataExpiracao = new Date(popup.dataExpiracao);
              if (agora > dataExpiracao) return false;
            }
            
            return true;
          });
          
          setPopupsAtivos(popupsFiltrados);
        }
      } catch (error) {
        console.error('Erro ao carregar popups:', error);
        setPopupsAtivos([]);
      } finally {
        setLoading(false);
      }
    };

    carregarPopups();
    
    // Atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => {
      carregarPopups();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Mostrar popup após delay
  useEffect(() => {
    if (popupsAtivos.length === 0 || loading) return;
    
    const timer = setTimeout(() => {
      const hasClosedPopup = localStorage.getItem('popupClosed');
      const lastShown = localStorage.getItem('popupLastShown');
      const today = new Date().toDateString();
      
      if (!hasClosedPopup || lastShown !== today) {
        setShow(true);
        localStorage.setItem('popupLastShown', today);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [popupsAtivos, loading]);

  // Alternar entre popups se houver mais de um
  useEffect(() => {
    if (show && popupsAtivos.length > 1) {
      const popupAtual = popupsAtivos[currentPopupIndex];
      const intervalo = (popupAtual?.intervalo || 10) * 1000;
      
      const interval = setInterval(() => {
        setCurrentPopupIndex(prev => (prev + 1) % popupsAtivos.length);
      }, intervalo);
      
      return () => clearInterval(interval);
    }
  }, [show, popupsAtivos, currentPopupIndex]);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('popupClosed', 'true');
    
    // Limpar amanhã
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(0, 0, 0, 0);
    
    const tempoAteAmanha = amanha.getTime() - Date.now();
    setTimeout(() => {
      localStorage.removeItem('popupClosed');
    }, tempoAteAmanha);
  };

  if (loading || !show || popupsAtivos.length === 0) return null;

  const currentPopup = popupsAtivos[currentPopupIndex];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
        {/* Botão fechar */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
          aria-label="Fechar popup"
        >
          ✕
        </button>

        {/* Conteúdo do popup */}
        <div className="relative">
          {currentPopup.tipo === 'imagem' && currentPopup.imagem ? (
            // Popup com imagem
            <img
              src={currentPopup.imagem}
              alt={currentPopup.titulo}
              className="w-full h-auto max-h-[70vh] object-contain"
              onError={(e) => {
                console.error(`Erro ao carregar popup: ${currentPopup.imagem}`);
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = `
                    <div class="p-12 text-center bg-gradient-to-r from-blue-100 to-purple-100">
                      <div class="text-4xl mb-4">⛪</div>
                      <h3 class="text-xl font-bold text-gray-800 mb-2">${currentPopup.titulo}</h3>
                      <p class="text-gray-600">${currentPopup.mensagem}</p>
                    </div>
                  `;
                }
              }}
            />
          ) : (
            // Popup de texto
            <div className="p-8 text-center">
              <div className="text-5xl mb-4">⛪</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {currentPopup.titulo}
              </h3>
              <p className="text-gray-600 mb-6">
                {currentPopup.mensagem}
              </p>
              <button
                onClick={handleClose}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Continuar
              </button>
            </div>
          )}
          
          {/* Indicadores (se tiver mais de 1 popup) */}
          {popupsAtivos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {popupsAtivos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPopupIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentPopupIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Mostrar popup ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;