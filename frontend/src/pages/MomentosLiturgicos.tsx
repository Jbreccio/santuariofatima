// pages/MomentosLiturgicos.tsx — VERSÃO COMPLETA E CORRIGIDA
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

interface EventoLiturgico {
  id: string;
  periodo: string;
  cor: string;
  tituloFaixa: string;
  imagens: string[];
  ativo: boolean;
  ordem: number;
}

// ✅ DADOS INICIAIS NA ORDEM EXATA SOLICITADA
const DADOS_INICIAIS: EventoLiturgico[] = [
  {
    id: 'momento-liturgico-solenidade',
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
    ativo: true,
    ordem: 1
  },
  {
    id: 'ano-jubilar',
    periodo: 'Ano Jubilar',
    cor: 'verde',
    tituloFaixa: 'ANO JUBILAR',
    imagens: [
      '/Jubileo.png',
      '/Jubileo2.png',
      '/Jubileo3.png',
      '/Jubileo4.png',
      '/Jubileo5.png',
      '/Jubileo6.png',
      '/Jubileo7.png',
      '/Jubileo8.png'
    ],
    ativo: true,
    ordem: 2
  },
  {
    id: 'proximo-domingo-ramos',
    periodo: 'Próximo Domingo de Ramos',
    cor: 'vermelho',
    tituloFaixa: 'PRÓXIMO DOMINGO DE RAMOS',
    imagens: [
      '/altarfrente.png',
      '/snsf.png',
      '/ramos01.png',
      '/ramos02.png',
      '/ramos03.png',
      '/ramos04.png',
      '/ramos05.png'
    ],
    ativo: true,
    ordem: 3
  },
  {
    id: 'quarta-cinzas',
    periodo: 'Quarta-feira de Cinzas',
    cor: 'roxo',
    tituloFaixa: 'QUARTA-FEIRA DE CINZAS',
    imagens: [
      '/Cinzas1.png',
      '/Cinzas02.png',
      '/Cinzas03.png',
      '/Cinzas4.png',
      '/Cinzas5.png',
      '/Cinzas6.png'
    ],
    ativo: true,
    ordem: 4
  }
];

// ✅ FUNÇÃO PARA ORDENAR
const ordenarMomentos = (momentos: EventoLiturgico[]): EventoLiturgico[] => {
  return [...momentos].sort((a, b) => a.ordem - b.ordem);
};

// ✅ CARROSSEL RESPONSIVO
interface CarrosselProps {
  slides: { imagem: string; titulo?: string }[];
  titulo: string;
  cor: string;
}

const CarrosselResponsivo: React.FC<CarrosselProps> = ({ slides, titulo, cor }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchStart - touchEnd < -50) {
      prevSlide();
    }
  };

  if (slides.length === 0) return null;

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
      <div 
        className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full'
            }`}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105" 
                style={{ backgroundImage: `url(${slide.imagem})` }}
              />
              <img 
                src={slide.imagem} 
                alt={slide.titulo || titulo} 
                className="absolute inset-0 w-full h-full object-contain p-2 sm:p-4 md:p-6"
                loading="lazy"
              />
            </div>
          </div>
        ))}
        
        {slides.length > 1 && (
          <>
            <button 
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-10"
              aria-label="Slide anterior"
            >
              <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center backdrop-blur-sm transition-all duration-200 z-10"
              aria-label="Próximo slide"
            >
              <ChevronRight size={20} className="sm:w-6 sm:h-6" />
            </button>
          </>
        )}
        
        {slides.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 sm:gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentSlide 
                    ? 'bg-white w-6 sm:w-8 h-2 sm:h-3' 
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2 sm:w-3 sm:h-3'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-4 md:p-6">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
          {titulo}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-gray-600">
            {slides.length} imagem{slides.length !== 1 ? 'ns' : ''}
          </span>
          <span className="text-xs sm:text-sm text-gray-500">
            {currentSlide + 1}/{slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

// ✅ FUNÇÕES DE CORES
const getCorGradiente = (cor: string): string => {
  switch (cor) {
    case 'roxo': return 'from-purple-800 to-purple-600';
    case 'amarelo': return 'from-amber-500 to-orange-500';
    case 'vermelho': return 'from-red-600 to-red-800';
    case 'verde': return 'from-green-500 to-emerald-500';
    case 'branco': return 'from-gray-100 to-gray-300';
    case 'rosa': return 'from-pink-500 to-rose-600';
    default: return 'from-gray-600 to-gray-800';
  }
};

const getCorTexto = (cor: string): string => {
  return cor === 'branco' ? 'text-gray-900' : 'text-white';
};

// ✅ COMPONENTE PRINCIPAL
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
          
          const momentosComOrdem = momentosLiturgicos.map((m: any, index: number) => ({
            ...m,
            ordem: m.ordem || index + 1
          }));
          
          const momentosOrdenados = ordenarMomentos(momentosComOrdem.filter((m: any) => m.ativo));
          setMomentosLiturgicos(momentosOrdenados);
          setRecados(recadosSalvos.filter((r: any) => r.ativo));
          setEventos(eventosSalvos?.filter((e: any) => e.ativo) || []);
        } else {
          setMomentosLiturgicos(ordenarMomentos(DADOS_INICIAIS));
          setRecados([]);
          setEventos([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setMomentosLiturgicos(ordenarMomentos(DADOS_INICIAIS));
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
      
      {/* BANNER RESPONSIVO */}
      <section className="relative w-full overflow-hidden bg-gray-900 mt-16 sm:mt-20">
        <div className="relative h-[300px] xs:h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src="/BannerML.png" 
            alt="Momentos Litúrgicos" 
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Momentos Litúrgicos
              </h1>
              <p className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-md px-2">
                No Santuário de Fátima, cada liturgia é um convite para renovar a fé e sentir o cuidado materno de Maria
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
      </section>

      {/* CONTEÚDO PRINCIPAL RESPONSIVO */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-3 xs:px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* MOMENTOS LITÚRGICOS */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {momentosLiturgicos.map((momento) => (
            <section key={momento.id} className="scroll-mt-20">
              <div className="mb-4 sm:mb-6">
                <div className={`bg-gradient-to-r ${getCorGradiente(momento.cor)} rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-lg`}>
                  <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold ${getCorTexto(momento.cor)} mb-1 sm:mb-2`}>
                    {momento.tituloFaixa}
                  </h2>
                  <p className={`text-sm sm:text-base md:text-lg ${getCorTexto(momento.cor)}/90`}>
                    {momento.periodo}
                  </p>
                </div>
              </div>
              
              <CarrosselResponsivo
                slides={momento.imagens.map(img => ({ imagem: img, titulo: momento.tituloFaixa }))}
                titulo={momento.tituloFaixa}
                cor={momento.cor}
              />
            </section>
          ))}
        </div>

        {/* EVENTOS */}
        <section className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
            Próximos Eventos
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
            Confira os próximos eventos e celebrações de nossa paróquia
          </p>
          
          {eventos.length === 0 ? (
            <div className="text-center py-8 sm:py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum evento cadastrado no momento</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {eventos.map((evento) => (
                <div 
                  key={evento.id} 
                  className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 border-l-4 border-blue-600"
                >
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {evento.titulo}
                  </h3>
                  
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    {evento.data && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Calendar size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{evento.data}</span>
                      </div>
                    )}
                    {evento.hora && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <Clock size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">{evento.hora}</span>
                      </div>
                    )}
                    {evento.local && (
                      <div className="flex items-center gap-2 text-gray-700">
                        <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                        <span className="text-xs sm:text-sm line-clamp-2">{evento.local}</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-700 text-xs sm:text-sm line-clamp-3 mb-3">
                    {evento.conteudo}
                  </p>
                  
                  {evento.imagem && (
                    <div className="mt-3">
                      <img 
                        src={evento.imagem} 
                        alt={evento.titulo} 
                        className="w-full h-32 sm:h-40 object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* RECADOS */}
        <section className="mt-12 sm:mt-16 md:mt-20">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-900">
            Recados Importantes
          </h2>
          
          {recados.length === 0 ? (
            <div className="text-center py-6 sm:py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum recado no momento</p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">
              {recados.map((recado) => (
                <div 
                  key={recado.id} 
                  className="bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 sm:p-5 border-l-4 border-orange-500"
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-2">
                      {recado.titulo}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">
                      {recado.dataCriacao}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 text-sm sm:text-base">
                    {recado.conteudo}
                  </p>
                  
                  {recado.imagem && (
                    <div className="mt-3 sm:mt-4">
                      <img 
                        src={recado.imagem} 
                        alt={recado.titulo} 
                        className="w-full h-40 sm:h-48 object-cover rounded-md"
                        loading="lazy"
                      />
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