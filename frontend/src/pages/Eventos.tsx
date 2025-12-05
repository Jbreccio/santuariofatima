import React, { useState, useEffect } from 'react';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Calendar, MapPin, Clock } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        {/* ✅ EVENTOS - Gerenciados pelo Painel Admin */}
        <section className="mb-16">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Eventos</h1>
          <p className="text-lg text-gray-600 mb-12">
            Confira os próximos eventos e celebrações de nossa paróquia
          </p>

          {eventos.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum evento cadastrado no momento</p>
              <p className="text-sm text-gray-400 mt-1">Os eventos aparecerão aqui quando forem criados</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">{evento.titulo}</h2>
                  <div className="space-y-3 mb-4">
                    {evento.data && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Calendar size={20} className="text-blue-600" />
                        <span>{evento.data}</span>
                      </div>
                    )}
                    {evento.hora && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <Clock size={20} className="text-blue-600" />
                        <span>{evento.hora}</span>
                      </div>
                    )}
                    {evento.local && (
                      <div className="flex items-center gap-3 text-gray-700">
                        <MapPin size={20} className="text-blue-600" />
                        <span>{evento.local}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-700">{evento.conteudo}</p>
                  
                  {evento.imagem && (
                    <div className="mt-4">
                      <img 
                        src={evento.imagem} 
                        alt={evento.titulo}
                        className="w-full h-48 object-cover rounded-lg"
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
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Recados</h2>
          
          {recados.length === 0 ? (
            <div className="text-center py-8 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <p className="text-gray-500">Nenhum recado no momento</p>
              <p className="text-sm text-gray-400 mt-1">Os recados aparecerão aqui quando forem criados</p>
            </div>
          ) : (
            <div className="space-y-6">
              {recados.map((recado) => (
                <div key={recado.id} className="bg-white rounded-lg shadow-md p-6 border-l-4 border-orange-500">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{recado.titulo}</h3>
                    <span className="text-sm text-gray-500">{recado.dataCriacao}</span>
                  </div>
                  <p className="text-gray-700">{recado.conteudo}</p>
                  
                  {recado.imagem && (
                    <div className="mt-4">
                      <img 
                        src={recado.imagem} 
                        alt={recado.titulo}
                        className="w-full h-48 object-cover rounded-lg"
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