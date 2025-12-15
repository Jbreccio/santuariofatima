// src/components/home/CarrosselFotos.tsx
import React, { useState, useEffect } from 'react';

interface Slide {
  id: string;
  imagem: string; // ← nome da propriedade deve ser "imagem" (igual ao PainelAdmin)
  titulo?: string;
  ordem?: number;
  ativo?: boolean;
}

// ✅ DADOS FIXOS (fallback para desenvolvimento ou se localStorage estiver vazio)
const DADOS_FIXOS: Slide[] = [
  { id: 'altarcristo', imagem: '/images/carrosselFotos/altarcristo.png', titulo: 'Altar de Cristo' },
  { id: 'altarlateral', imagem: '/images/carrosselFotos/altarlateral.png', titulo: 'Altar Lateral' },
  { id: 'altarlaterall', imagem: '/images/carrosselFotos/altarlaterall.png', titulo: 'Altar Lateral Esquerdo' },
  { id: 'cruzNovo', imagem: '/images/carrosselFotos/cruzNovo.png', titulo: 'Cruz Nova' },
  { id: 'cruzNovo2', imagem: '/images/carrosselFotos/cruzNovo2.png', titulo: 'Cruz Nova 2' },
  { id: 'rosto', imagem: '/images/carrosselFotos/Rosto.png', titulo: 'Rosto' },
  { id: 'aerea', imagem: '/images/carrosselFotos/Aerea.png', titulo: 'Aerea' },
  { id: 'entradaNovo2', imagem: '/images/carrosselFotos/entradaNovo2.png', titulo: 'Entrada Nova 2' },
  { id: 'entradaNovo', imagem: '/images/carrosselFotos/entradaNovo.png', titulo: 'Entrada Nova' },
  { id: 'fachada1', imagem: '/images/carrosselFotos/fachada1.png', titulo: 'Fachada 1' },
  { id: 'terco', imagem: '/images/carrosselFotos/Terco.png', titulo: 'Terço' },
  { id: 'comunhao', imagem: '/images/carrosselFotos/comunhao.png', titulo: 'Comunhão' },
  { id: 'mesanino', imagem: '/images/carrosselFotos/mesanino.png', titulo: 'Mesanino' },
  { id: 'bible', imagem: '/images/carrosselFotos/bible.png', titulo: 'Bíblia' },
];

export default function CarrosselFotos() {
  const [slides, setSlides] = useState<Slide[]>(DADOS_FIXOS);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarDoStorage = () => {
      try {
        const dados = localStorage.getItem('santuario-dados');
        if (dados) {
          const { carrossel = [] } = JSON.parse(dados);
          // Filtra apenas os ativos e ordena
          const ativos = carrossel
            .filter((item: any) => item.ativo)
            .sort((a: any, b: any) => (a.ordem || 0) - (b.ordem || 0));
          
          if (ativos.length > 0) {
            setSlides(ativos);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar carrossel do localStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarDoStorage();

    // Atualiza quando o PainelAdmin salva
    const aoAtualizar = () => carregarDoStorage();
    window.addEventListener('dadosAtualizados', aoAtualizar);
    return () => window.removeEventListener('dadosAtualizados', aoAtualizar);
  }, []);

  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

  if (loading) return null;

  return (
    <section className="relative w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id || index}
              className="relative flex-shrink-0 w-full flex items-center justify-center"
            >
              {/* FUNDO COM BLUR */}
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover blur-2xl scale-110"
                style={{ backgroundImage: `url(${slide.imagem})` }}
              />
              {/* IMAGEM PRINCIPAL */}
              <img
                src={slide.imagem}
                alt={slide.titulo || `Imagem ${index + 1}`}
                className="relative z-10 w-full max-h-[clamp(280px,60vh,520px)] object-contain select-none"
                onError={(e) => {
                  console.error(`❌ Imagem não carregada: ${slide.imagem}`);
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="h-[400px] w-full bg-gray-200 flex items-center justify-center text-center px-4">
                        <div>
                          <p class="text-red-600 font-bold">Imagem não encontrada!</p>
                          <p class="text-sm text-gray-600 mt-1 truncate">${slide.imagem}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
            </div>
          ))}
        </div>

        {/* BOTÕES DE NAVEGAÇÃO */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              aria-label="Slide anterior"
            >
              ‹
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
              aria-label="Próximo slide"
            >
              ›
            </button>
          </>
        )}

        {/* INDICADORES */}
        {slides.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentSlide ? 'bg-white' : 'bg-gray-400 hover:bg-gray-300'
                }`}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}