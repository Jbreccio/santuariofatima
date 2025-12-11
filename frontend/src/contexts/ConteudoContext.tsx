// contexts/ConteudoContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface CarrosselItem {
  id: string;
  imagem: string; // Base64 ou URL
  titulo?: string;
  ordem: number;
  ativo: boolean;
}

interface EventoLiturgico {
  id: string;
  periodo: string;
  cor: 'verde' | 'branco' | 'vermelho' | 'roxo' | 'rosa' | 'amarelo';
  tituloFaixa: string;
  imagens: string[]; // Base64 ou URLs
  ativo: boolean;
}

interface PopupItem {
  id: string;
  imagem: string; // Base64 ou URL
  tempoExibicao: number;
  ativo: boolean;
  ordem: number;
}

interface RecadoItem {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'texto';
  dataCriacao: string;
  ativo: boolean;
  urgente?: boolean;
}

interface ConteudoContextType {
  carrossel: CarrosselItem[];
  momentosLiturgicos: EventoLiturgico[];
  popups: PopupItem[];
  recados: RecadoItem[];
  recarregarDados: () => void;
}

const ConteudoContext = createContext<ConteudoContextType | undefined>(undefined);

export function ConteudoProvider({ children }: { children: ReactNode }) {
  const [carrossel, setCarrossel] = useState<CarrosselItem[]>([]);
  const [momentosLiturgicos, setMomentosLiturgicos] = useState<EventoLiturgico[]>([
    {
      id: 'cinzas',
      periodo: 'Cinzas',
      cor: 'roxo',
      tituloFaixa: 'CINZAS 2025',
      imagens: [],
      ativo: true
    },
    {
      id: 'jubileu',
      periodo: 'Jubileu',
      cor: 'amarelo',
      tituloFaixa: 'ANO JUBILAR 2025',
      imagens: [],
      ativo: true
    },
    {
      id: 'ramos',
      periodo: 'Domingo de Ramos',
      cor: 'vermelho',
      tituloFaixa: 'DOMINGO DE RAMOS 2025',
      imagens: [],
      ativo: true
    }
  ]);
  
  const [popups, setPopups] = useState<PopupItem[]>([
    {
      id: 'popup1',
      imagem: '/images/popup/popup001.png',
      tempoExibicao: 30,
      ativo: true,
      ordem: 0
    },
    {
      id: 'popup2',
      imagem: '/images/popup/popup002.png',
      tempoExibicao: 30,
      ativo: true,
      ordem: 1
    },
    {
      id: 'popup3',
      imagem: '/images/popup/popup003.png',
      tempoExibicao: 30,
      ativo: true,
      ordem: 2
    },
    {
      id: 'popup4',
      imagem: '/images/popup/popup004.png',
      tempoExibicao: 30,
      ativo: true,
      ordem: 3
    }
  ]);
  
  const [recados, setRecados] = useState<RecadoItem[]>([]);

  const carregarDados = () => {
    try {
      const dados = localStorage.getItem('santuario-dados');
      if (dados) {
        const parsed = JSON.parse(dados);
        console.log('📦 Dados carregados do localStorage:', parsed);
        
        if (parsed.carrossel && Array.isArray(parsed.carrossel)) {
          setCarrossel(parsed.carrossel);
        }
        
        if (parsed.momentosLiturgicos && Array.isArray(parsed.momentosLiturgicos)) {
          setMomentosLiturgicos(parsed.momentosLiturgicos);
        }
        
        if (parsed.popups && Array.isArray(parsed.popups)) {
          setPopups(parsed.popups);
        }
        
        if (parsed.recados && Array.isArray(parsed.recados)) {
          setRecados(parsed.recados);
        }
      } else {
        console.log('ℹ️ Nenhum dado encontrado no localStorage. Usando valores padrão.');
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados:', error);
    }
  };

// NO ConteudoContext.tsx - OUVIR ATUALIZAÇÕES
useEffect(() => {
  carregarDados();
  
  const handleDadosAtualizados = (event: any) => {
    console.log('🔄 EVENTO RECEBIDO: dadosAtualizados', event?.detail?.origem || 'desconhecida');
    console.log('⏰ Recarregando dados do localStorage...');
    carregarDados();
  };
  
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'santuario-dados') {
      console.log('💽 Storage alterado: santuario-dados');
      carregarDados();
    }
  };
  
  // Ouvir eventos CUSTOMIZADOS (do PainelAdmin)
  window.addEventListener('dadosAtualizados', handleDadosAtualizados);
  
  // Ouvir eventos do LOCALSTORAGE (se abrir outra aba)
  window.addEventListener('storage', handleStorageChange);
  
  return () => {
    window.removeEventListener('dadosAtualizados', handleDadosAtualizados);
    window.removeEventListener('storage', handleStorageChange);
  };
}, []);
  const contextValue: ConteudoContextType = {
    carrossel,
    momentosLiturgicos,
    popups,
    recados,
    recarregarDados: carregarDados
  };

  return (
    <ConteudoContext.Provider value={contextValue}>
      {children}
    </ConteudoContext.Provider>
  );
}

export function useConteudo() {
  const context = useContext(ConteudoContext);
  if (!context) {
    throw new Error('useConteudo deve ser usado dentro de ConteudoProvider');
  }
  return context;
}