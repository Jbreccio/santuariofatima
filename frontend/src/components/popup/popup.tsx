// src/components/popup/Popup.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface PopupItem {
  id: string;
  imagem: string;
  tempoExibicao: number;
  ativo: boolean;
  ordem: number;
}

// ✅ POPUP PADRÃO: 4 imagens fixas
const POPUPS_PADRAO: PopupItem[] = [
  { id: '01', imagem: '/images/popup/popup01.png', tempoExibicao: 10, ativo: true, ordem: 0 },
  { id: '02', imagem: '/images/popup/popup02.png', tempoExibicao: 10, ativo: true, ordem: 1 },
  { id: '03', imagem: '/images/popup/popup03.png', tempoExibicao: 10, ativo: true, ordem: 2 },
  { id: '04', imagem: '/images/popup/popup04.png', tempoExibicao: 10, ativo: true, ordem: 3 },
];

export default function Popup() {
  const [popups, setPopups] = useState<PopupItem[]>(POPUPS_PADRAO);
  const [popupAtual, setPopupAtual] = useState<PopupItem | null>(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [carregado, setCarregado] = useState(false);
  const location = useLocation();

  // Carrega popups do localStorage ou usa fallback
  const carregarPopups = useCallback(() => {
    try {
      const dados = localStorage.getItem('santuario-dados');
      if (dados) {
        const parsed = JSON.parse(dados);
        const popupsSalvos = parsed.popups || [];
        const ativos = popupsSalvos.filter((p: PopupItem) => p.ativo);
        if (ativos.length > 0) {
          // Usa os do Painel Admin
          const ordenados = ativos.sort((a: PopupItem, b: PopupItem) => (a.ordem || 0) - (b.ordem || 0));
          setPopups(ordenados);
          setCarregado(true);
          return;
        }
      }
      // Usa o fallback padrão
      setPopups(POPUPS_PADRAO);
      setCarregado(true);
    } catch (err) {
      console.error('Erro ao carregar popups', err);
      setPopups(POPUPS_PADRAO);
      setCarregado(true);
    }
  }, []);

  useEffect(() => {
    carregarPopups();
    const listener = () => carregarPopups();
    window.addEventListener('dadosAtualizados', listener);
    return () => window.removeEventListener('dadosAtualizados', listener);
  }, [carregarPopups]);

  // Mostra o popup sempre que a rota muda
  useEffect(() => {
    if (!carregado || popups.length === 0) return;

    const timer = setTimeout(() => {
      setPopupAtual(popups[0]);
      setIndiceAtual(0);
      setMostrar(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location.pathname, carregado, popups]);

  // Avança automaticamente
  useEffect(() => {
    if (!mostrar || !popupAtual) return;

    const tempo = popupAtual.tempoExibicao || 10;
    const timer = setTimeout(() => {
      const proximoIndice = (indiceAtual + 1) % popups.length;
      if (proximoIndice === 0) {
        // Volta ao início → fecha o popup
        setMostrar(false);
      } else {
        setIndiceAtual(proximoIndice);
        setPopupAtual(popups[proximoIndice]);
      }
    }, tempo * 1000);

    return () => clearTimeout(timer);
  }, [mostrar, popupAtual, indiceAtual, popups]);

  const fecharPopup = () => setMostrar(false);
  const avancar = () => {
    const proximo = (indiceAtual + 1) % popups.length;
    if (proximo === 0) {
      fecharPopup();
    } else {
      setIndiceAtual(proximo);
      setPopupAtual(popups[proximo]);
    }
  };
  const retroceder = () => {
    const anterior = indiceAtual === 0 ? popups.length - 1 : indiceAtual - 1;
    setIndiceAtual(anterior);
    setPopupAtual(popups[anterior]);
  };

  if (!mostrar || !popupAtual || !carregado) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-2 sm:p-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] flex items-center justify-center">
        <button
          onClick={fecharPopup}
          className="absolute top-2 right-2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80"
        >
          <X size={20} />
        </button>

        {popups.length > 1 && (
          <>
            <button
              onClick={retroceder}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={avancar}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        <img
          src={popupAtual.imagem}
          alt={`Popup ${indiceAtual + 1}`}
          className="max-w-full max-h-full object-contain rounded"
          style={{ maxHeight: '80vh' }}
          onError={(e) => (e.currentTarget.src = '/images/popup/popup01.png')}
        />

        {popups.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {popups.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setIndiceAtual(i);
                  setPopupAtual(popups[i]);
                }}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  i === indiceAtual ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}