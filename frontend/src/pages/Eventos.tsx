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
  intervaloPopup?: number;
  local?: string;
  data?: string;
  hora?: string;
}

interface CarrosselItem {
  id: string;
  imagem: string;
  titulo?: string;
  descricao?: string;
  ordem: number;
  ativo: boolean;
  local: string;
}

const CarrosselCinzas = ({ slides }: { slides: CarrosselItem[] }) => {
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

  if (slides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
        <div className="relative h-[300px] overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Nenhuma imagem disponível</p>
            <p className="text-sm text-gray-400 mt-1">Adicione imagens pelo Painel Admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="relative h-[300px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              {/* Imagem de fundo com blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: `url(${slide.imagem})` }}
              />
              {/* Imagem principal */}
              <img
                src={slide.imagem}
                alt={slide.titulo || 'Imagem Cinzas'}
                className="absolute inset-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gray-100">
                        <div class="text-center">
                          <p class="text-gray-500">Imagem não encontrada</p>
                          <p class="text-sm text-gray-400">${slide.imagem}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Overlay para título */}
              {slide.titulo && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-center">{slide.titulo}</h3>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controles - só mostra se tiver mais de 1 slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicadores - só mostra se tiver mais de 1 slide */}
        {slides.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const CarrosselJubileo = ({ slides }: { slides: CarrosselItem[] }) => {
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

  if (slides.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
        <div className="relative h-[300px] overflow-hidden flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500">Nenhuma imagem disponível</p>
            <p className="text-sm text-gray-400 mt-1">Adicione imagens pelo Painel Admin</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg bg-white">
      <div className="relative h-[300px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              {/* Imagem de fundo com blur */}
              <div 
                className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
                style={{ backgroundImage: `url(${slide.imagem})` }}
              />
              {/* Imagem principal */}
              <img
                src={slide.imagem}
                alt={slide.titulo || 'Imagem Jubileu'}
                className="absolute inset-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gray-100">
                        <div class="text-center">
                          <p class="text-gray-500">Imagem não encontrada</p>
                          <p class="text-sm text-gray-400">${slide.imagem}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Overlay para título */}
              {slide.titulo && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-center">{slide.titulo}</h3>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controles - só mostra se tiver mais de 1 slide */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center backdrop-blur-sm"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicadores - só mostra se tiver mais de 1 slide */}
        {slides.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentSlide ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Eventos() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [eventos, setEventos] = useState<Recado[]>([]);
  const [carrosselCinzas, setCarrosselCinzas] = useState<CarrosselItem[]>([]);
  const [carrosselJubileu, setCarrosselJubileu] = useState<CarrosselItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar dados do localStorage
  useEffect(() => {
    const carregarDados = () => {
      try {
        // Tenta carregar do NOVO sistema (dados-santuario)
        const dadosNovos = localStorage.getItem('dados-santuario');
        if (dadosNovos) {
          const parsed = JSON.parse(dadosNovos);
          
          // Carregar carrossel Cinzas
          const cinzas = parsed.carrosselCinzas || [];
          const cinzasAtivas = cinzas.filter((item: any) => item.ativo === true);
          cinzasAtivas.sort((a: any, b: any) => a.ordem - b.ordem);
          setCarrosselCinzas(cinzasAtivas);
          
          // Carregar carrossel Jubileu
          const jubileu = parsed.carrosselJubileu || [];
          const jubileuAtivas = jubileu.filter((item: any) => item.ativo === true);
          jubileuAtivas.sort((a: any, b: any) => a.ordem - b.ordem);
          setCarrosselJubileu(jubileuAtivas);
          
          // Carregar eventos e recados do NOVO sistema
          if (parsed.eventos) {
            const eventosAtivos = parsed.eventos.filter((item: any) => item.ativo === true);
            setEventos(eventosAtivos);
          }
          
          if (parsed.recados) {
            const recadosAtivos = parsed.recados.filter((item: any) => item.ativo === true);
            setRecados(recadosAtivos);
          }
          
          setLoading(false);
          return;
        }
        
        // Se não encontrar no novo sistema, tenta carregar do ANTIGO (recados-santuario)
        const dadosAntigos = localStorage.getItem('recados-santuario');
        if (dadosAntigos) {
          const todosRecados: Recado[] = JSON.parse(dadosAntigos);
          const ativos = todosRecados.filter(r => r.ativo);
          
          // Separar eventos e recados
          setEventos(ativos.filter(r => r.tipo === 'evento'));
          setRecados(ativos.filter(r => r.tipo === 'recado'));
          
          // Para carrosséis, usa imagens padrão se não houver no novo sistema
          if (carrosselCinzas.length === 0) {
            setCarrosselCinzas([
              { id: 'cinzas1', imagem: '/Cinzas1.png', titulo: 'Cinzas 2025', ordem: 0, ativo: true, local: 'eventos-cinzas' },
              { id: 'cinzas02', imagem: '/Cinzas02.png', titulo: 'Celebração das Cinzas', ordem: 1, ativo: true, local: 'eventos-cinzas' },
              { id: 'cinzas03', imagem: '/Cinzas03.png', titulo: 'Momento de Reflexão', ordem: 2, ativo: true, local: 'eventos-cinzas' },
              { id: 'cinzas4', imagem: '/Cinzas4.png', titulo: 'Comunidade em Oração', ordem: 3, ativo: true, local: 'eventos-cinzas' },
              { id: 'cinzas5', imagem: '/Cinzas5.png', titulo: 'Renovação Espiritual', ordem: 4, ativo: true, local: 'eventos-cinzas' },
              { id: 'cinzas6', imagem: '/Cinzas6.png', titulo: 'Preparação Pascal', ordem: 5, ativo: true, local: 'eventos-cinzas' }
            ]);
          }
          
          if (carrosselJubileu.length === 0) {
            setCarrosselJubileu([
              { id: 'jubileo1', imagem: '/Jubileo.png', titulo: 'Ano Jubilar 2025', ordem: 0, ativo: true, local: 'eventos-jubileu' },
              { id: 'jubileo2', imagem: '/Jubileo2.png', titulo: 'Celebração Jubilar', ordem: 1, ativo: true, local: 'eventos-jubileu' },
              { id: 'jubileo3', imagem: '/Jubileo3.png', titulo: 'Peregrinação', ordem: 2, ativo: true, local: 'eventos-jubileu' },
              { id: 'jubileo4', imagem: '/Jubileo4.png', titulo: 'Encontro de Fé', ordem: 3, ativo: true, local: 'eventos-jubileu' },
              { id: 'jubileo5', imagem: '/Jubileo5.png', titulo: 'Graças e Bênçãos', ordem: 4, ativo: true, local: 'eventos-jubileu' },
              { id: 'jubileo6', imagem: '/Jubileo6.png', titulo: 'Renovação Espiritual', ordem: 5, ativo: true, local: 'eventos-jubileu' }
            ]);
          }
        } else {
          // Se não houver dados no localStorage, usa imagens padrão
          setCarrosselCinzas([
            { id: 'cinzas1', imagem: '/Cinzas1.png', titulo: 'Cinzas 2025', ordem: 0, ativo: true, local: 'eventos-cinzas' },
            { id: 'cinzas02', imagem: '/Cinzas02.png', titulo: 'Celebração das Cinzas', ordem: 1, ativo: true, local: 'eventos-cinzas' },
            { id: 'cinzas03', imagem: '/Cinzas03.png', titulo: 'Momento de Reflexão', ordem: 2, ativo: true, local: 'eventos-cinzas' },
            { id: 'cinzas4', imagem: '/Cinzas4.png', titulo: 'Comunidade em Oração', ordem: 3, ativo: true, local: 'eventos-cinzas' },
            { id: 'cinzas5', imagem: '/Cinzas5.png', titulo: 'Renovação Espiritual', ordem: 4, ativo: true, local: 'eventos-cinzas' },
            { id: 'cinzas6', imagem: '/Cinzas6.png', titulo: 'Preparação Pascal', ordem: 5, ativo: true, local: 'eventos-cinzas' }
          ]);
          
          setCarrosselJubileu([
            { id: 'jubileo1', imagem: '/Jubileo.png', titulo: 'Ano Jubilar 2025', ordem: 0, ativo: true, local: 'eventos-jubileu' },
            { id: 'jubileo2', imagem: '/Jubileo2.png', titulo: 'Celebração Jubilar', ordem: 1, ativo: true, local: 'eventos-jubileu' },
            { id: 'jubileo3', imagem: '/Jubileo3.png', titulo: 'Peregrinação', ordem: 2, ativo: true, local: 'eventos-jubileu' },
            { id: 'jubileo4', imagem: '/Jubileo4.png', titulo: 'Encontro de Fé', ordem: 3, ativo: true, local: 'eventos-jubileu' },
            { id: 'jubileo5', imagem: '/Jubileo5.png', titulo: 'Graças e Bênçãos', ordem: 4, ativo: true, local: 'eventos-jubileu' },
            { id: 'jubileo6', imagem: '/Jubileo6.png', titulo: 'Renovação Espiritual', ordem: 5, ativo: true, local: 'eventos-jubileu' }
          ]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        // Em caso de erro, usa imagens padrão
        setCarrosselCinzas([
          { id: 'cinzas1', imagem: '/Cinzas1.png', titulo: 'Cinzas 2025', ordem: 0, ativo: true, local: 'eventos-cinzas' },
          { id: 'cinzas02', imagem: '/Cinzas02.png', titulo: 'Celebração das Cinzas', ordem: 1, ativo: true, local: 'eventos-cinzas' },
          { id: 'cinzas03', imagem: '/Cinzas03.png', titulo: 'Momento de Reflexão', ordem: 2, ativo: true, local: 'eventos-cinzas' },
          { id: 'cinzas4', imagem: '/Cinzas4.png', titulo: 'Comunidade em Oração', ordem: 3, ativo: true, local: 'eventos-cinzas' },
          { id: 'cinzas5', imagem: '/Cinzas5.png', titulo: 'Renovação Espiritual', ordem: 4, ativo: true, local: 'eventos-cinzas' },
          { id: 'cinzas6', imagem: '/Cinzas6.png', titulo: 'Preparação Pascal', ordem: 5, ativo: true, local: 'eventos-cinzas' }
        ]);
        
        setCarrosselJubileu([
          { id: 'jubileo1', imagem: '/Jubileo.png', titulo: 'Ano Jubilar 2025', ordem: 0, ativo: true, local: 'eventos-jubileu' },
          { id: 'jubileo2', imagem: '/Jubileo2.png', titulo: 'Celebração Jubilar', ordem: 1, ativo: true, local: 'eventos-jubileu' },
          { id: 'jubileo3', imagem: '/Jubileo3.png', titulo: 'Peregrinação', ordem: 2, ativo: true, local: 'eventos-jubileu' },
          { id: 'jubileo4', imagem: '/Jubileo4.png', titulo: 'Encontro de Fé', ordem: 3, ativo: true, local: 'eventos-jubileu' },
          { id: 'jubileo5', imagem: '/Jubileo5.png', titulo: 'Graças e Bênçãos', ordem: 4, ativo: true, local: 'eventos-jubileu' },
          { id: 'jubileo6', imagem: '/Jubileo6.png', titulo: 'Renovação Espiritual', ordem: 5, ativo: true, local: 'eventos-jubileu' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    carregarDados();
    
    // Atualizar quando houver mudanças no localStorage
    const handleStorageChange = () => {
      carregarDados();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
        <Navigation />
        <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando eventos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* === SEÇÃO CINZAS 2025 COM CARROSSEL === */}
        <section className="mb-12">
          {/* CONTAINER ROXO COM MARGEM SUPERIOR ADICIONADA */}
          <div className="mb-6 mt-20">
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white mb-1">CINZAS 2025</h1>
              <p className="text-lg text-purple-100">
                Tempo de conversão, oração e penitência. Prepare-se para a Quaresma.
              </p>
            </div>
          </div>

          {/* Carrossel de Cinzas - Carregado do Painel Admin */}
          <CarrosselCinzas slides={carrosselCinzas} />
        </section>

        {/* === SEÇÃO ANO JUBILAR 2025 COM CARROSSEL === */}
        <section className="mb-12">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white mb-1">ANO JUBILAR 2025</h1>
              <p className="text-lg text-amber-100">
                Ano de graça, perdão e renovação espiritual. Viva esta experiência de fé conosco.
              </p>
            </div>
          </div>

          {/* Carrossel de Jubileo - Carregado do Painel Admin */}
          <CarrosselJubileo slides={carrosselJubileu} />
        </section>

        {/* ✅ EVENTOS - Gerenciados pelo Painel Admin */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Próximos Eventos</h2>
          <p className="text-lg text-gray-600 mb-6">
            Confira os próximos eventos e celebrações de nossa paróquia
          </p>

          {eventos.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum evento cadastrado no momento</p>
              <p className="text-sm text-gray-400 mt-1">
                {localStorage.getItem('dados-santuario') 
                  ? 'Crie eventos pelo Painel Admin' 
                  : 'Os eventos aparecerão aqui quando forem criados'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="bg-white rounded-lg shadow-md p-5 border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300"
                >
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
                      <img 
                        src={evento.imagem} 
                        alt={evento.titulo}
                        className="w-full h-40 object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ✅ RECADOS - Gerenciados pelo Painel Admin */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Recados Importantes</h2>
          
          {recados.length === 0 ? (
            <div className="text-center py-6 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum recado no momento</p>
              <p className="text-sm text-gray-400 mt-1">
                {localStorage.getItem('dados-santuario') 
                  ? 'Crie recados pelo Painel Admin' 
                  : 'Os recados aparecerão aqui quando forem criados'}
              </p>
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
                      <img 
                        src={recado.imagem} 
                        alt={recado.titulo}
                        className="w-full h-40 object-cover rounded-md"
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