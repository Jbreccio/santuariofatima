// components/carrossel/CarrosselCustom.tsx
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarrosselSlide {
  id: string;
  imagem: string;
  titulo?: string;
  ordem: number;
  ativo: boolean;
}

interface CarrosselCustomProps {
  slides: CarrosselSlide[];
  tempoTransicao?: number;
  showIndicators?: boolean;
  showControls?: boolean;
}

export function CarrosselCustom({ 
  slides, 
  tempoTransicao = 8000,
  showIndicators = true,
  showControls = true
}: CarrosselCustomProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slidesOrdenados = [...slides].sort((a, b) => a.ordem - b.ordem);
  
  useEffect(() => {
    if (slidesOrdenados.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slidesOrdenados.length);
      }, tempoTransicao);
      return () => clearInterval(interval);
    }
  }, [slidesOrdenados.length, tempoTransicao]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slidesOrdenados.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slidesOrdenados.length) % slidesOrdenados.length);

  if (slidesOrdenados.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="relative h-[350px] overflow-hidden flex items-center justify-center">
          <div className="text-center p-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Nenhuma imagem disponível</p>
            <p className="text-sm text-gray-400 mt-1">Adicione imagens pelo Painel Admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-xl">
      <div className="relative h-[400px] md:h-[450px] overflow-hidden">
        {slidesOrdenados.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            {/* Imagem principal */}
            <img
              src={slide.imagem}
              alt={slide.titulo || 'Imagem litúrgica'}
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                console.error('❌ Erro ao carregar:', slide.imagem);
                e.currentTarget.src = '/placeholder-image.jpg';
                e.currentTarget.className = 'absolute inset-0 w-full h-full object-contain p-8 bg-gray-100';
              }}
            />
            
            {/* Overlay gradiente para texto */}
            {slide.titulo && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-bold text-white text-center drop-shadow-lg">{slide.titulo}</h3>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Controles de navegação */}
        {showControls && slidesOrdenados.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Imagem anterior"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Próxima imagem"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Indicadores de posição */}
        {showIndicators && slidesOrdenados.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {slidesOrdenados.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Ir para imagem ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de imagens */}
        <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm">
          {currentSlide + 1} / {slidesOrdenados.length}
        </div>
      </div>
    </div>
  );
}