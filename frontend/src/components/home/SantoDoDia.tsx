// frontend/src/components/home/SantoDoDia.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, BookOpen, Star, RefreshCw, AlertCircle } from 'lucide-react';

interface SantoData {
  date: string;
  name: string;
  description: string;
  imageUrl: string;
  feastLevel: string;
  color: string;
  liturgicalColor: string;
  celebration: string;
}

export default function SantoDoDia() {
  const [santo, setSanto] = useState<SantoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  const buscarSantoDoDia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/santo-do-dia');
      const data = await response.json();
      
      if (data.success && data.santo) {
        setSanto(data.santo);
        setLastUpdate(new Date().toLocaleTimeString('pt-BR'));
      } else {
        setError('Não foi possível carregar o santo do dia');
        // Usa dados de fallback da API
        if (data.santo) {
          setSanto(data.santo);
        }
      }
    } catch (err) {
      console.error('Erro ao buscar santo:', err);
      setError('Erro de conexão com o servidor');
      // Dados locais de emergência
      setSanto(getSantoEmergencia());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarSantoDoDia();
    
    // Atualiza a cada hora
    const interval = setInterval(buscarSantoDoDia, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Dados de emergência (se tudo falhar)
  const getSantoEmergencia = (): SantoData => {
    return {
      date: new Date().toLocaleDateString('pt-BR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      name: 'Nossa Senhora de Fátima',
      description: 'Mãe de Jesus, apareceu em Fátima em 1917 aos três pastorinhos. Sua mensagem de oração, penitência e conversão continua atual.',
      imageUrl: 'https://images.unsplash.com/photo-1591803064285-63440e7b9c52?w=800&h=600&fit=crop',
      feastLevel: 'Memória',
      color: '#FFFFFF',
      liturgicalColor: 'Branco',
      celebration: 'Aparições Marianas'
    };
  };

  // Cor da borda baseada na cor litúrgica
  const getBorderColor = (color: string) => {
    const colorMap: Record<string, string> = {
      '#2E7D32': 'border-green-500',
      '#6A1B9A': 'border-purple-500',
      '#FFFFFF': 'border-gray-300',
      '#C62828': 'border-red-500',
      '#E91E63': 'border-pink-500',
      '#FFD700': 'border-yellow-500',
      '#1565C0': 'border-blue-500'
    };
    return colorMap[color] || 'border-green-500';
  };

  // Cor do texto da solenidade
  const getFeastColor = (feastLevel: string) => {
    switch (feastLevel.toLowerCase()) {
      case 'solenidade': return 'bg-red-100 text-red-800';
      case 'festa': return 'bg-blue-100 text-blue-800';
      case 'memória': return 'bg-green-100 text-green-800';
      case 'memória obrigatória': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-b from-white to-amber-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
              Santo do Dia
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full"></div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="lg:w-2/5">
                <div className="bg-gray-200 rounded-xl h-64 lg:h-80 w-full"></div>
              </div>
              <div className="lg:w-3/5">
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gradient-to-b from-white to-amber-50 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400"></div>
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200 rounded-full opacity-20"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-200 rounded-full opacity-20"></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Cabeçalho */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-100 to-rose-100 mb-4 shadow-lg">
            <Star className="h-8 w-8 text-amber-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
            Santo do Dia
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Conheça a história e inspiração do santo celebrado hoje na Igreja
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-rose-400 mx-auto rounded-full mt-4"></div>
        </div>

        {/* Card Principal */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-amber-100">
          {/* Cabeçalho do Card */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-5 flex flex-col sm:flex-row items-center justify-between text-white">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
              <Calendar className="h-6 w-6" />
              <div>
                <h3 className="font-bold text-xl">Celebração Litúrgica</h3>
                <p className="text-sm opacity-90">{santo?.date || 'Carregando data...'}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {lastUpdate && (
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                  Atualizado: {lastUpdate}
                </span>
              )}
              <button
                onClick={buscarSantoDoDia}
                disabled={loading}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Atualizar
              </button>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="p-6 md:p-8">
            {error && !santo ? (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-6 w-6 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-red-800 mb-2">Erro ao carregar dados</h4>
                    <p className="text-red-700">{error}</p>
                    <button
                      onClick={buscarSantoDoDia}
                      className="mt-4 bg-red-100 hover:bg-red-200 text-red-800 font-medium px-4 py-2 rounded-lg transition-colors"
                    >
                      Tentar novamente
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {santo && (
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Coluna da Imagem */}
                <div className="lg:w-2/5">
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <img
                      src={santo.imageUrl}
                      alt={santo.name}
                      className="w-full h-64 lg:h-80 object-cover transform hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop';
                      }}
                    />
                    
                    {/* Badge da Solenidade */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${getFeastColor(santo.feastLevel)}`}>
                        {santo.feastLevel.toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Badge da Cor Litúrgica */}
                    <div className="absolute top-4 right-4">
                      <div 
                        className="px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg"
                        style={{ backgroundColor: santo.color }}
                      >
                        {santo.liturgicalColor.toUpperCase()}
                      </div>
                    </div>
                    
                    {/* Overlay gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  
                  {/* Informações extras abaixo da imagem */}
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-amber-50 rounded-lg p-4 text-center border border-amber-100">
                      <div className="text-amber-800 font-bold text-lg">{santo.feastLevel}</div>
                      <div className="text-amber-600 text-sm">Nível da Celebração</div>
                    </div>
                    <div className="bg-rose-50 rounded-lg p-4 text-center border border-rose-100">
                      <div className="text-rose-800 font-bold text-lg">{santo.celebration}</div>
                      <div className="text-rose-600 text-sm">Tipo de Celebração</div>
                    </div>
                  </div>
                </div>

                {/* Coluna do Texto */}
                <div className="lg:w-3/5">
                  <div className="mb-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 font-serif">
                      {santo.name}
                    </h3>
                    <div className={`h-1 w-20 rounded-full mb-4`} style={{ backgroundColor: santo.color }}></div>
                    
                    <div className="flex items-center gap-2 text-gray-600 mb-6">
                      <BookOpen className="h-5 w-5" />
                      <span className="text-lg italic">"Vida e Inspiração"</span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {santo.description}
                    </p>
                  </div>
                  
                  {/* Seção de Oração */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <h4 className="font-bold text-gray-900 text-xl mb-4 flex items-center gap-2">
                      <Star className="h-5 w-5 text-amber-600" />
                      Oração do Dia
                    </h4>
                    <div className="bg-amber-50 rounded-xl p-5 italic text-gray-700 border-l-4 border-amber-400">
                      "Ó {santo.name.split(' ')[0]}, que pela graça de Deus vos tornastes exemplo de virtude, 
                      intercedei por nós junto ao Pai para que, seguindo vossos passos, alcancemos a vida eterna. 
                      Amém."
                      <div className="mt-4 text-sm text-gray-500 text-right">
                        — Oração tradicional católica
                      </div>
                    </div>
                  </div>
                  
                  {/* Rodapé Informativo */}
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Fonte:</span> Calendário Litúrgico Romano
                      </div>
                      <div className="text-xs text-gray-500">
                        As celebrações são atualizadas diariamente conforme o calendário oficial da Igreja
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Nota Informativa */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Este conteúdo é atualizado automaticamente às 00:00 UTC. 
            As celebrações seguem o Calendário Romano Geral.
          </p>
        </div>
      </div>
    </section>
  );
}