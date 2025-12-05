import { useState, useEffect } from 'react';

interface PopupConfig {
  id: number;
  imagem: string;
  alt: string;
  expiracao?: string; // Formato: "2025-12-25T18:30:00"
  ativo: boolean;
}

// Configure cada popup com suas datas de expiração
const popupsConfig: PopupConfig[] = [
  { 
    id: 1, 
    imagem: '/images/popup/popup001.png',
    alt: 'Aviso importante do Santuário',
    expiracao: '2025-12-25T18:30:00', // Não mostrará após 25/12/2025 às 18:30
    ativo: true
  },
  { 
    id: 2, 
    imagem: '/images/popup/popup002.png',
    alt: 'Eventos do mês',
    expiracao: '2025-12-31T23:59:59', 
    ativo: true
  },
  { 
    id: 3, 
    imagem: '/images/popup/popup003.png',
    alt: 'Campanha especial',
    ativo: true
  },
  { 
    id: 4, 
    imagem: '/images/popup/popup004.png',
    alt: 'Horários de Missas',
    expiracao: '2025-12-15T12:00:00', 
    ativo: true
  }
];

const Popup = () => {
  const [currentPopupIndex, setCurrentPopupIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [popupsAtivos, setPopupsAtivos] = useState<PopupConfig[]>([]);

  // Função para verificar se um popup NÃO está expirado
  const verificarNaoExpirado = (expiracao?: string): boolean => {
    if (!expiracao) return true; // Se não tem data, não está expirado
    
    const dataExpiracao = new Date(expiracao);
    const agora = new Date();
    
    return agora < dataExpiracao; // Retorna TRUE se AINDA NÃO expirou
  };

  // Filtra popups ativos e NÃO expirados
  useEffect(() => {
    const popupsFiltrados = popupsConfig.filter(popup => {
      // Verifica se está ativo E NÃO está expirado
      return popup.ativo && verificarNaoExpirado(popup.expiracao);
    });
    
    setPopupsAtivos(popupsFiltrados);
    
    // Se não tem popups ativos, não mostra nada
    if (popupsFiltrados.length === 0) {
      setShow(false);
      return;
    }
  }, []);

  useEffect(() => {
    // Mostra popup após 3 segundos (apenas se houver popups ativos)
    if (popupsAtivos.length > 0) {
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
    }
  }, [popupsAtivos]);

  // Alterna entre popups ativos a cada 10s
  useEffect(() => {
    if (show && popupsAtivos.length > 1) {
      const interval = setInterval(() => {
        setCurrentPopupIndex(prev => (prev + 1) % popupsAtivos.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [show, popupsAtivos]);

  const handleClose = () => {
    setShow(false);
    // Marca como fechado apenas para HOJE
    localStorage.setItem('popupClosed', 'true');
    
    // Limpa amanhã
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    amanha.setHours(0, 0, 0, 0);
    
    const tempoAteAmanha = amanha.getTime() - Date.now();
    setTimeout(() => {
      localStorage.removeItem('popupClosed');
    }, tempoAteAmanha);
  };

  // Verificação diária de expiração (opcional)
  useEffect(() => {
    const verificarExpiracaoDiaria = () => {
      const popupsFiltrados = popupsConfig.filter(popup => 
        popup.ativo && verificarNaoExpirado(popup.expiracao)
      );
      setPopupsAtivos(popupsFiltrados);
    };

    // Verifica a cada hora se algum popup expirou
    const intervalo = setInterval(verificarExpiracaoDiaria, 3600000); // 1 hora
    
    return () => clearInterval(intervalo);
  }, []);

  if (!show || popupsAtivos.length === 0) return null;

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

        {/* Imagem do popup */}
        <div className="relative">
          <img
            src={currentPopup.imagem}
            alt={currentPopup.alt}
            className="w-full h-auto max-h-[70vh] object-contain"
            onError={(e) => {
              console.error(`Erro ao carregar popup: ${currentPopup.imagem}`);
              e.currentTarget.style.display = 'none';
              const parent = e.currentTarget.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="p-12 text-center bg-gradient-to-r from-blue-100 to-purple-100">
                    <div class="text-6xl mb-4">⛪</div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">Bem-vindo ao Santuário</h3>
                    <p class="text-gray-600">Nossa Senhora de Fátima</p>
                    <button onclick="this.closest('[class*=\\"fixed\\"]').querySelector('button').click()" 
                      class="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                      Continuar para o site
                    </button>
                  </div>
                `;
              }
            }}
          />
          
          {/* Indicadores (se tiver mais de 1 popup) */}
          {popupsAtivos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {popupsAtivos.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPopupIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === currentPopupIndex ? 'bg-blue-600 scale-125' : 'bg-gray-300 hover:bg-gray-400'}`}
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