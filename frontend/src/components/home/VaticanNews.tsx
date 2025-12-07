import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, User } from 'lucide-react';

interface VaticanNewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  author?: string;
  category?: string;
}

export default function VaticanNewsSection() {
  const [news, setNews] = useState<VaticanNewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaticanNews = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent('https://www.vaticannews.va/pt.rss.xml')}`
        );

        if (!response.ok) throw new Error('Erro ao carregar notícias');

        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');

        const newsItems: VaticanNewsItem[] = [];

        items.forEach((item, index) => {
          if (index < 4) {
            const title = item.querySelector('title')?.textContent || 'Sem título';
            const description = item.querySelector('description')?.textContent || 'Sem descrição';
            const link = item.querySelector('link')?.textContent || '#';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const author = item.querySelector('author')?.textContent || 'Vatican News';
            const category = item.querySelector('category')?.textContent || 'Geral';

            newsItems.push({
              id: `news-${index}`,
              title,
              description: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
              link,
              pubDate,
              author,
              category
            });
          }
        });

        setNews(newsItems);
        setError(null);
      } catch (err) {
        console.error('Erro ao buscar notícias:', err);
        setError('Não foi possível carregar as notícias do Vatican News');

        setNews([
          {
            id: '1',
            title: 'Papa Francisco: Mensagem de Esperança',
            description: 'Em sua mais recente audiência, o Papa Francisco falou sobre fé e esperança.',
            link: 'https://www.vaticannews.va/pt/papa-francisco.html',
            pubDate: new Date().toISOString(),
            author: 'Vatican News',
            category: 'Papa Francisco'
          },
          {
            id: '2',
            title: 'Igreja no Mundo: Novos Desafios',
            description: 'A Igreja Católica continua sua missão evangelizadora enfrentando novos desafios.',
            link: 'https://www.vaticannews.va/pt/igreja.html',
            pubDate: new Date().toISOString(),
            author: 'Vatican News',
            category: 'Igreja no Mundo'
          },
          {
            id: '3',
            title: 'Espiritualidade para o Dia a Dia',
            description: 'Reflexões para viver a fé no cotidiano.',
            link: 'https://www.vaticannews.va/pt/espiritualidade.html',
            pubDate: new Date().toISOString(),
            author: 'Vatican News',
            category: 'Espiritualidade'
          },
          {
            id: '4',
            title: 'Cultura e Fé: Diálogo Necessário',
            description: 'A importância do diálogo entre fé e cultura.',
            link: 'https://www.vaticannews.va/pt/cultura.html',
            pubDate: new Date().toISOString(),
            author: 'Vatican News',
            category: 'Cultura'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchVaticanNews();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return 'Data não disponível';
    }
  };

  // ESTILO DO FUNDO MODIFICADO
  const sectionStyle = {
    backgroundImage: "url('/vaticanNewshome3.png')",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    minHeight: "700px",
    display: "flex",
    alignItems: "center"
  };

  if (loading) {
    return (
      <section 
        className="relative px-4 flex items-center justify-center"
        style={sectionStyle}
      >
        {/* Overlay mais claro para melhor visibilidade */}
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex justify-center mb-12">
            <div className="h-24 w-auto max-w-full">
              <img
                src="/vaticanNewsBanner.png"
                alt="Vatican News"
                className="h-full w-auto object-contain opacity-80"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-gray-300 rounded mb-4"></div>
                <div className="h-3 bg-gray-300 rounded mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative px-4 flex items-center justify-center py-12"
      style={sectionStyle}
    >
      {/* Overlay leve para melhor contraste */}
      <div className="absolute inset-0 bg-black/10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* LOGO CLICÁVEL */}
        <div className="flex justify-center mb-12">
          <a
            href="https://www.vaticannews.va/pt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="h-24 w-auto max-w-full overflow-hidden">
              <img
                src="/vaticanNewsBanner.png"
                alt="Vatican News"
                className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Clique para acessar o site oficial</span>
              <ExternalLink size={14} />
            </div>
          </a>
        </div>

        {/* GRID de notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-white/50 group transform hover:-translate-y-1"
            >
              <div className="bg-gradient-to-r from-red-50 to-pink-50 p-5 text-gray-800 border-b border-red-100">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-red-700 bg-white px-3 py-1.5 rounded-full border border-red-200 shadow-sm">
                    {item.category}
                  </span>
                  <Calendar size={16} className="text-red-500" />
                </div>
                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="p-5">
                <p className="text-gray-700 text-sm mb-5 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2.5 text-xs text-gray-600 mb-5">
                  <div className="flex items-center gap-2">
                    <User size={12} className="text-red-500" />
                    <span className="font-medium">{item.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={12} className="text-red-500" />
                    <span>{formatDate(item.pubDate)}</span>
                  </div>
                </div>

                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm group/btn shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <span>Ler Notícia Completa</span>
                  <ExternalLink
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform duration-300"
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-white/90 backdrop-blur-sm border border-red-200 rounded-xl p-4 text-center mt-8 shadow-lg">
            <p className="text-red-600 text-sm font-medium">{error}</p>
            <p className="text-red-500 text-xs mt-1">
              Mostrando notícias temporárias enquanto o serviço original não responde.
            </p>
          </div>
        )}

        {/* Rodapé da seção */}
        <div className="text-center mt-12 pt-6 border-t border-white/20">
          <p className="text-white text-sm opacity-80">
            Fonte oficial: Vatican News - Santa Sé
          </p>
        </div>
      </div>
    </section>
  );
}