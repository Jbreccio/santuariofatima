// frontend/src/components/popup/popup.tsx - VERSÃO RESPONSIVA
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PopupItem {
  id: string;
  imagem: string;
  tempoExibicao: number;
  ativo: boolean;
  ordem: number;
}

export default function Popup() {
  const [popups, setPopups] = useState<PopupItem[]>([]);
  const [popupAtual, setPopupAtual] = useState<PopupItem | null>(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Carregar popups do localStorage
  useEffect(() => {
    const carregarPopups = () => {
      try {
        let dadosPopups: PopupItem[] = [];
        const dadosString =
          localStorage.getItem('santuario-dados') ||
          localStorage.getItem('dados-santuario');

        if (dadosString) {
          const dados = JSON.parse(dadosString);
          dadosPopups = dados.popups || [];
        }

        if (dadosPopups.length === 0) {
          setCarregando(false);
          return;
        }

        const popupsAtivos = dadosPopups
          .filter(p => p.ativo === true)
          .sort((a, b) => (a.ordem || 0) - (b.ordem || 0));

        setPopups(popupsAtivos);
        setCarregando(false);

        if (popupsAtivos.length === 0) return;

        const hoje = new Date().toDateString();
        const fechadoHoje = localStorage.getItem('popupFechadoHoje') === hoje;
        if (fechadoHoje) return;

        setTimeout(() => {
          setPopupAtual(popupsAtivos[0]);
          setIndiceAtual(0);
          setMostrar(true);
        }, 500);
      } catch (error) {
        console.error('Erro no popup:', error);
        setCarregando(false);
      }
    };

    carregarPopups();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'santuario-dados' || e.key === 'dados-santuario') {
        carregarPopups();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Avança automaticamente
  useEffect(() => {
    if (!mostrar || !popupAtual) return;

    const tempo = popupAtual.tempoExibicao || 10;
    const timer = setTimeout(() => {
      avancarPopup();
    }, tempo * 1000);

    return () => clearTimeout(timer);
  }, [mostrar, popupAtual]);

  const fecharPopup = () => {
    setMostrar(false);
    const hoje = new Date().toDateString();
    localStorage.setItem('popupFechadoHoje', hoje);
  };

  const avancarPopup = () => {
    if (popups.length <= 1) {
      fecharPopup();
      return;
    }

    const novoIndice = (indiceAtual + 1) % popups.length;
    setIndiceAtual(novoIndice);
    setPopupAtual(popups[novoIndice]);
  };

  const retrocederPopup = () => {
    if (popups.length <= 1) return;

    const novoIndice = indiceAtual === 0 ? popups.length - 1 : indiceAtual - 1;
    setIndiceAtual(novoIndice);
    setPopupAtual(popups[novoIndice]);
  };

  if (carregando || !mostrar || !popupAtual || popups.length === 0) {
    return null;
  }

  const getImagemUrl = (url: string) => {
    if (!url) return '/images/popup/popup001.png';

    if (
      url.startsWith('http') ||
      url.startsWith('data:image') ||
      url.startsWith('/')
    ) {
      return url;
    }

    return `/images/${url}`;
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
      <div className="relative w-full h-full max-w-4xl max-h-[90vh] flex items-center justify-center">

        {/* IMAGEM + CONTROLES */}
        <div className="relative flex items-center justify-center p-2 sm:p-4">

          {/* BOTÃO FECHAR (COLADO NA IMAGEM) */}
          <button
            onClick={fecharPopup}
            className="absolute top-2 right-2 z-20 w-9 h-9 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors backdrop-blur-sm"
            aria-label="Fechar popup"
          >
            <X className="w-5 h-5" />
          </button>

          {/* SETA ESQUERDA */}
          {popups.length > 1 && (
            <button
              onClick={retrocederPopup}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Popup anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* SETA DIREITA */}
          {popups.length > 1 && (
            <button
              onClick={avancarPopup}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-9 h-9 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 transition-colors backdrop-blur-sm"
              aria-label="Próximo popup"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* IMAGEM */}
          <img
            src={getImagemUrl(popupAtual.imagem)}
            alt="Popup"
            className="w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            style={{
              maxWidth: 'min(100%, 1200px)',
              maxHeight: 'min(100%, 800px)'
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                '/images/popup/popup001.png';
            }}
          />
        </div>

        {/* INDICADORES */}
        {popups.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
            {popups.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIndiceAtual(idx);
                  setPopupAtual(popups[idx]);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  idx === indiceAtual
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Ir para popup ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
