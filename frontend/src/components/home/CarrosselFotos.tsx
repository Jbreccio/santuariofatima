// frontend/src/components/home/CarrosselFotos.tsx
import { useState, useEffect } from 'react';

interface Slide {
  id: string;
  image: string;
  title?: string;
  description?: string;
}

const CarrosselFotos = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar imagens do localStorage
  useEffect(() => {
    const carregarCarrossel = () => {
      try {
        const dados = localStorage.getItem('dados-santuario');
        if (dados) {
          const parsed = JSON.parse(dados);
          
          // Buscar imagens do carrossel HOME ativas
          const imagensHome = parsed.carrosselHome || [];
          const imagensAtivas = imagensHome.filter((item: any) => item.ativo === true);
          
          // Ordenar por ordem
          imagensAtivas.sort((a: any, b: any) => a.ordem - b.ordem);
          
          // Converter para formato do carrossel
          const slidesCarregados = imagensAtivas.map((item: any) => ({
            id: item.id,
            image: item.imagem,
            title: item.titulo,
            description: item.descricao
          }));
          
          if (slidesCarregados.length > 0) {
            setSlides(slidesCarregados);
          } else {
            // Fallback: usar imagens padrão
            setSlides([
              { id: '1', image: '/images/carrosselFotos/altarcristo.png', title: 'Altar Principal' },
              { id: '2', image: '/images/carrosselFotos/entradaNovo2.png', title: 'Entrada do Santuário' },
              { id: '3', image: '/images/carrosselFotos/cruzNovo.png', title: 'Cruz' },
            ]);
          }
        } else {
          // Se não houver dados no localStorage, usar imagens padrão
          setSlides([
            { id: '1', image: '/images/carrosselFotos/altarcristo.png', title: 'Altar Principal' },
            { id: '2', image: '/images/carrosselFotos/entradaNovo2.png', title: 'Entrada do Santuário' },
            { id: '3', image: '/images/carrosselFotos/cruzNovo.png', title: 'Cruz' },
          ]);
        }
      } catch (error) {
        console.error('Erro ao carregar carrossel:', error);
        // Fallback em caso de erro
        setSlides([
          { id: '1', image: '/images/carrosselFotos/altarcristo.png', title: 'Altar Principal' },
          { id: '2', image: '/images/carrosselFotos/entradaNovo2.png', title: 'Entrada do Santuário' },
          { id: '3', image: '/images/carrosselFotos/cruzNovo.png', title: 'Cruz' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    carregarCarrossel();
    
    // Atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => {
      carregarCarrossel();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Auto-rotacionamento
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

  if (loading) {
    return (
      <div className="relative w-full max-w-6xl mx-auto p-4 md:p-8">
        <div className="relative overflow-hidden rounded-2xl shadow-xl h-[400px] bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando carrossel...</p>
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="relative w-full max-w-6xl mx-auto p-4 md:p-8">
        <div className="relative overflow-hidden rounded-2xl shadow-xl">
          <div className="h-[400px] bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-500">Nenhuma imagem no carrossel</p>
              <p className="text-sm text-gray-400 mt-1">Adicione imagens pelo Painel Admin</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="relative w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="relative overflow-hidden rounded-2xl shadow-xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map(slide => (
            <div
              key={slide.id}
              className="relative flex-shrink-0 w-full flex items-center justify-center"
            >
              {/* FUNDO COM BLUR */}
              <div
                className="absolute inset-0 bg-center bg-no-repeat bg-cover blur-2xl scale-110"
                style={{ backgroundImage: `url(${slide.image})` }}
              />

              {/* IMAGEM PRINCIPAL */}
              <img
                src={slide.image}
                alt={slide.title || 'Imagem do santuário'}
                className="
                  relative z-10
                  w-full
                  max-h-[clamp(280px,60vh,520px)]
                  object-contain
                  select-none
                "
                onError={(e) => {
                  console.error(`❌ ERRO: Imagem não carregada: ${slide.image}`);
                  e.currentTarget.style.display = 'none';
                  
                  const parent = e.currentTarget.parentElement;
                  if (!parent) return;
                  
                  const errorDiv = document.createElement('div');
                  errorDiv.className =
                    'h-[400px] w-full bg-gray-200 flex items-center justify-center';
                  errorDiv.innerHTML = `
                    <div class="text-center">
                      <p class="text-red-600 font-bold">Imagem não encontrada!</p>
                      <p class="text-sm text-gray-600 mt-1">${slide.image}</p>
                      <p class="text-xs text-gray-500 mt-2">Verifique no Painel Admin</p>
                    </div>
                  `;
                  parent.appendChild(errorDiv);
                }}
              />
              
              {/* TÍTULO E DESCRIÇÃO */}
              {(slide.title || slide.description) && (
                <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  {slide.title && (
                    <h3 className="text-2xl font-bold mb-2">{slide.title}</h3>
                  )}
                  {slide.description && (
                    <p className="text-sm opacity-90">{slide.description}</p>
                  )}
                </div>
              )}
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
                className={`
                  w-3 h-3 rounded-full transition-colors
                  ${idx === currentSlide
                    ? 'bg-white'
                    : 'bg-gray-400 hover:bg-gray-300'}
                `}
                aria-label={`Ir para slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarrosselFotos;