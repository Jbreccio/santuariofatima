import { useState, useEffect } from 'react';

interface Slide {
  id: string;
  image: string;
  title?: string;
}

const CarrosselFotos = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    { id: 'altarcristo', image: '/images/carrosselFotos/altarcristo.png' },
    { id: 'altarlateral', image: '/images/carrosselFotos/altarlateral.png' },
    { id: 'altarlaterall', image: '/images/carrosselFotos/altarlaterall.png' },
    { id: 'cruzNovo', image: '/images/carrosselFotos/cruzNovo.png' },
    { id: 'cruzNovo2', image: '/images/carrosselFotos/cruzNovo2.png' },
    { id: 'rosto', image: '/images/carrosselFotos/Rosto.png' },
    { id: 'aerea', image: '/images/carrosselFotos/aerea.png' },
    { id: 'entradaNovo2', image: '/images/carrosselFotos/entradaNovo2.png' },
    { id: 'entradaNovo', image: '/images/carrosselFotos/entradaNovo.png' },
    { id: 'people', image: '/images/carrosselFotos/people.png' },
    { id: 'fachada1', image: '/images/carrosselFotos/fachada1.png' },
    { id: 'fachada2', image: '/images/carrosselFotos/fachada2.png' },
    { id: 'terco', image: '/images/carrosselFotos/Terco.png' },
    { id: 'comunhao', image: '/images/carrosselFotos/comunhao.png' },
    { id: 'mesanino', image: '/images/carrosselFotos/mesanino.png' },
    { id: 'bible', image: '/images/carrosselFotos/bible.png' },  
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide(prev => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

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
                alt={`Imagem ${slide.id}`}
                className="
                  relative z-10
                  w-full
                  max-h-[clamp(280px,60vh,520px)]
                  object-contain
                  select-none
                "
                onError={(e) => {
                  console.error(`❌ ERRO: Não encontrei a imagem: ${slide.image}`);
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
                      <a href="${slide.image}" target="_blank" class="text-blue-500 underline text-xs mt-2 block">
                        Testar link
                      </a>
                    </div>
                  `;
                  parent.appendChild(errorDiv);
                }}
                onLoad={() => {
                  console.log(`✅ SUCESSO: Imagem carregada: ${slide.image}`);
                }}
              />
            </div>
          ))}
        </div>

        {/* BOTÃO ESQUERDO */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          aria-label="Slide anterior"
        >
          ‹
        </button>

        {/* BOTÃO DIREITO */}
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          aria-label="Próximo slide"
        >
          ›
        </button>

        {/* INDICADORES */}
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
      </div>
    </section>
  );
};

export default CarrosselFotos;
