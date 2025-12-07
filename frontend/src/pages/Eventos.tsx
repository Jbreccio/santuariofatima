import React, { useState, useEffect, useRef } from 'react';
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
  titulo: string;
  descricao?: string;
  imagem: string;
  link?: string;
}

const CarrosselCinzas = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 'cinzas1', image: '/Cinzas1.png', title: 'Cinzas 2025' },
    { id: 'cinzas02', image: '/Cinzas02.png', title: 'Celebração das Cinzas' },
    { id: 'cinzas03', image: '/Cinzas03.png', title: 'Momento de Reflexão' },
    { id: 'cinzas4', image: '/Cinzas4.png', title: 'Comunidade em Oração' },
    { id: 'cinzas5', image: '/Cinzas5.png', title: 'Renovação Espiritual' },
    { id: 'cinzas6', image: '/Cinzas6.png', title: 'Preparação Pascal' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

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
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Imagem principal */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gray-100">
                        <div class="text-center">
                          <p class="text-gray-500">Imagem não encontrada</p>
                          <p class="text-sm text-gray-400">${slide.image}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Overlay para título */}
              {slide.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-center">{slide.title}</h3>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controles */}
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

        {/* Indicadores */}
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
      </div>
    </div>
  );
};

const CarrosselJubileo = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { id: 'jubileo1', image: '/Jubileo.png', title: 'Ano Jubilar 2025' },
    { id: 'jubileo2', image: '/Jubileo2.png', title: 'Celebração Jubilar' },
    { id: 'jubileo3', image: '/Jubileo3.png', title: 'Peregrinação' },
    { id: 'jubileo4', image: '/Jubileo4.png', title: 'Encontro de Fé' },
    { id: 'jubileo5', image: '/Jubileo5.png', title: 'Graças e Bênçãos' },
    { id: 'jubileo6', image: '/Jubileo6.png', title: 'Renovação Espiritual' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length);

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
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Imagem principal */}
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-contain p-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-gray-100">
                        <div class="text-center">
                          <p class="text-gray-500">Imagem não encontrada</p>
                          <p class="text-sm text-gray-400">${slide.image}</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />
              {/* Overlay para título */}
              {slide.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-semibold text-center">{slide.title}</h3>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Controles */}
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

        {/* Indicadores */}
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
      </div>
    </div>
  );
};

export default function Eventos() {
  const [recados, setRecados] = useState<Recado[]>([]);
  const [eventos, setEventos] = useState<Recado[]>([]);

  // Carregar dados do localStorage
  useEffect(() => {
    const salvos = localStorage.getItem('recados-santuario');
    if (salvos) {
      const todosRecados: Recado[] = JSON.parse(salvos);
      const ativos = todosRecados.filter(r => r.ativo);
      
      // Separar eventos e recados
      setEventos(ativos.filter(r => r.tipo === 'evento'));
      setRecados(ativos.filter(r => r.tipo === 'recado'));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-blue-50">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        {/* === SEÇÃO CINZAS 2025 COM CARROSSEL === */}
        <section className="mb-12">
          {/* CONTAINER ROXO COM MARGEM SUPERIOR ADICIONADA */}
          <div className="mb-6 mt-20"> {/* ADICIONADO mt-4 AQUI */}
            <div className="bg-gradient-to-r from-purple-900 to-purple-700 rounded-xl p-6 shadow-lg">
              <h1 className="text-3xl font-bold text-white mb-1">CINZAS 2025</h1>
              <p className="text-lg text-purple-100">
                Tempo de conversão, oração e penitência. Prepare-se para a Quaresma.
              </p>
            </div>
          </div>

          {/* Carrossel de Cinzas - Altura fixa 300px */}
          <CarrosselCinzas />
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

          {/* Carrossel de Jubileo - Altura fixa 300px */}
          <CarrosselJubileo />
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
              <p className="text-sm text-gray-400 mt-1">Os eventos aparecerão aqui quando forem criados</p>
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
              <p className="text-sm text-gray-400 mt-1">Os recados aparecerão aqui quando forem criados</p>
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