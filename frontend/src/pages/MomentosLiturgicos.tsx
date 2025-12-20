// pages/MomentosLiturgicos.tsx — VERSÃO CORRIGIDA COM ORDEM SOLICITADA
import React, { useState, useEffect } from 'react';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Calendar, MapPin, Clock, ChevronLeft, ChevronRight } from "lucide-react";

interface Recado {
  id: string;
  titulo: string;
  conteudo: string;
  tipo: 'evento' | 'recado' | 'popup' | 'carrossel';
  imagem?: string;
  ativo: boolean;
  dataCriacao: string;
  local?: string;
  data?: string;
  hora?: string;
}

interface CarrosselItem {
  id: string;
  imagem: string;
  titulo?: string;
  ordem: number;
  ativo: boolean;
  local: string;
}

interface EventoLiturgico {
  id: string;
  periodo: string;
  cor: string;
  tituloFaixa: string;
  imagens: string[];
  ativo: boolean;
}

// ✅ FALLBACK EMBUTIDO — ORDEM CORRIGIDA EXATAMENTE COMO PEDIDO
const DADOS_INICIAIS: EventoLiturgico[] = [
  {
    id: 'solenidade-consagracao',
    periodo: 'Renovação da Consagração ao Imaculado Coração de Maria',
    cor: 'verde',
    tituloFaixa: 'SOLENIDADE',
    imagens: [
      '/Solenidade-02.png',
      '/Solenidade-03.png',
      '/Solenidade-04.png',
      '/Solenidade-05.png',
      '/Solenidade-06.png'
    ],
    ativo: true
  },
  {
    id: 'jubileu-2025',
    periodo: 'Jubileu',
    cor: 'verde',
    tituloFaixa: 'ANO JUBILAR 2025',
    imagens: ['/Jubileo.png','/Jubileo2.png','/Jubileo3.png','/Jubileo4.png','/Jubileo5.png','/Jubileo6.png'],
    ativo: true
  },
  {
    id: 'ramos-2025',
    periodo: 'Domingo de Ramos',
    cor: 'vermelho',
    tituloFaixa: 'DOMINGO DE RAMOS 2025',
    imagens: ['/altarfrente.png','/snsf.png','/ramos01.png','/ramos02.png','/ramos03.png','/ramos04.png','/ramos05.png'],
    ativo: true
  },
  {
    id: 'cinzas-2025',
    periodo: 'Cinzas',
    cor: 'roxo',
    tituloFaixa: 'QUARTA-FEIRA DE CINZAS 2025',
    imagens: ['/Cinzas1.png','/Cinzas02.png','/Cinzas03.png','/Cinzas4.png','/Cinzas5.png','/Cinzas6.png'],
    ativo: true
  }
];

// ✅ CARROSSEL GENÉRICO
const CarrosselGenerico = ({ 
  slides, 
  titulo, 
  cor 
}: { 
  slides: { imagem: string; titulo?: string }[];
  titulo: string;
  cor: string;
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  if (slides.length === 0) return null;

  const getCorGradiente = (cor: string) => {
    switch (cor) {
      case 'roxo': return 'from-purple-900 to-purple-700';
      case 'amarelo': return 'from-amber-600 to-orange-600';
      case 'vermelho': return 'from-red-700 to-red-900';
      case 'verde': return 'from-green-600 to-emerald-600';
      case 'branco': return 'from-gray-100 to-gray-300';
      case 'rosa': return 'from-pink-600 to-rose-700';
      default: return 'from-gray-700 to-gray-900';
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="relative h-[300px] overflow-hidden">
        {slides.map((slide, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="relative w-full h-full">
              <div className="absolute inset-0 bg-cover bg-center blur-sm scale-105" style={{ backgroundImage: `url(${slide.imagem})` }} />
              <img src={slide.imagem} alt={slide.titulo || titulo} className="absolute inset-0 w-full h-full object-contain p-4" />
            </div>
          </div>
        ))}
        {slides.length > 1 && (
          <>
            <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm">
              <ChevronLeft size={20} />
            </button>
            <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm">
              <ChevronRight size={20} />
            </button>
          </>
        )}
        {slides.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {slides.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 rounded-full transition-all ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ✅ FUNÇÕES DE CORES
const getCorGradiente = (cor: string): string => {
  switch (cor) {
    case 'roxo': return 'from-purple-900 to-purple-700';
    case 'amarelo': return 'from-amber-600 to-orange-600';
    case 'vermelho': return 'from-red-700 to-red-900';
    case 'verde': return 'from-green-600 to-emerald-600';
    case 'branco': return 'from-gray-100 to-gray-300';
    case 'rosa': return 'from-pink-600 to-rose-700';
    default: return 'from-gray-700 to-gray-900';
  }
};

const getCorTexto = (cor: string): string => {
  return cor === 'branco' ? 'text-gray-900' : 'text-white';
};

export default function MomentosLiturgicos() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [eventos, setEventos] = useState<Recado[]>([]);
  const [momentosLiturgicos, setMomentosLiturgicos] = useState<EventoLiturgico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDados = () => {
      try {
        const dados = localStorage.getItem('santuario-dados');
        if (dados) {
          const { momentosLiturgicos = [], recados: recadosSalvos = [], eventos: eventosSalvos = [] } = JSON.parse(dados);
          setMomentosLiturgicos(momentosLiturgicos.filter((m: any) => m.ativo));
          setRecados(recadosSalvos.filter((r: any) => r.ativo));
          setEventos(eventosSalvos?.filter((e: any) => e.ativo) || []);
        } else {
          setMomentosLiturgicos(DADOS_INICIAIS);
          setRecados([]);
          setEventos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMomentosLiturgicos(DADOS_INICIAIS);
        setRecados([]);
        setEventos([]);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();

    const aoAtualizar = () => carregarDados();
    window.addEventListener('dadosAtualizados', aoAtualizar);
    return () => window.removeEventListener('dadosAtualizados', aoAtualizar);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
        <Navigation />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando momentos litúrgicos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
      <Navigation />
      <section className="relative w-full overflow-hidden bg-gray-900 mt-20">
        <div className="relative h-[500px] sm:h-[500px] md:h-[500px] lg:h-[750px] overflow-hidden">
          <img src="/BannerML.png" alt="Momentos Litúrgicos" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Momentos Litúrgicos
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md">
                No Santuário de Fátima, cada liturgia é um convite para renovar a fé e sentir o cuidado materno de Maria
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* RENDERIZAÇÃO DINÂMICA NA ORDEM CORRETA */}
        {momentosLiturgicos.map((momento) => (
          <section key={momento.id} className="mb-12">
            <div className="mb-6">
              <div className={`bg-gradient-to-r ${getCorGradiente(momento.cor)} rounded-xl p-6 shadow-lg`}>
                <h1 className={`text-3xl font-bold ${getCorTexto(momento.cor)} mb-1`}>
                  {momento.tituloFaixa}
                </h1>
                <p className={`text-lg ${getCorTexto(momento.cor)}/90`}>
                  {momento.periodo}
                </p>
              </div>
            </div>
            <CarrosselGenerico
              slides={momento.imagens.map(img => ({ imagem: img, titulo: momento.tituloFaixa }))}
              titulo={momento.tituloFaixa}
              cor={momento.cor}
            />
          </section>
        ))}

        {/* EVENTOS */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Próximos Eventos</h2>
          <p className="text-lg text-gray-600 mb-6">Confira os próximos eventos e celebrações de nossa paróquia</p>
          {eventos.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum evento cadastrado no momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventos.map((evento) => (
                <div key={evento.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">{evento.titulo}</h2>
                  <div className="space-y-2 mb-3">
                    {evento.data && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={18} className="text-blue-600" />
                        <span className="text-sm">{evento.data}</span>
                      </div>
                    )}
                    {evento.hora && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={18} className="text-blue-600" />
                        <span className="text-sm">{evento.hora}</span>
                      </div>
                    )}
                    {evento.local && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={18} className="text-blue-600" />
                        <span className="text-sm">{evento.local}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700 text-sm">{evento.conteudo}</p>
                  {evento.imagem && (
                    <div className="mt-3">
                      <img src={evento.imagem} alt={evento.titulo} className="w-full h-40 object-cover rounded-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RECADOS */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recados Importantes</h2>
          {recados.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum recado no momento</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recados.map((recado) => (
                <div key={recado.id} className="bg-white rounded-lg shadow-md p-5 border-l-4 border-orange-500 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{recado.titulo}</h3>
                    <span className="text-xs text-gray-500">{recado.dataCriacao}</span>
                  </div>
                  <p className="text-gray-700 text-sm">{recado.conteudo}</p>
                  {recado.imagem && (
                    <div className="mt-3">
                      <img src={recado.imagem} alt={recado.titulo} className="w-full h-40 object-cover rounded-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}