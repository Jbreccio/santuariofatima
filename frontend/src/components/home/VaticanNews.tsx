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

  // ----------- FUNDO COM IMAGEM AQUI -----------
  const sectionStyle = {
    backgroundImage: "url('/fundovaticannews.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  };
  // ---------------------------------------------

  if (loading) {
    return (
      <section className="py-16 px-4" style={sectionStyle}>
        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-red-800 drop-shadow-xl">
                Vatican News
              </h2>
              <p className="text-xl text-gray-100 mt-2 drop-shadow">
                Notícias oficiais da Santa Sé
              </p>
            </div>

            <div>
              <img
                src="/images/vaticanNewshome/vaticanNewshom.png"
                alt="Vatican News"
                className="h-24 w-auto opacity-90"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" style={sectionStyle}>
      <div className="max-w-7xl mx-auto">

        {/* LOGO CLICÁVEL - NOVO CÓDIGO */}
        <div className="flex justify-center mb-12">
          <a
            href="https://www.vaticannews.va/pt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="h-20 w-auto max-w-full overflow-hidden">
              <img
                src="/vaticanNewsBanner.png"
                alt="Vatican News"
                className="h-full w-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105 group-hover:shadow-2xl"
              />
            </div>
            <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Clique para acessar o site oficial</span>
              <ExternalLink size={14} />
            </div>
          </a>
        </div>

        {/* GRID de notícias */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-red-100 group"
            >
              <div className="bg-red-100/80 p-4 text-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-red-700 bg-white px-3 py-1 rounded-full border border-red-200">
                    {item.category}
                  </span>
                  <Calendar size={16} className="text-red-500" />
                </div>
                <h3 className="font-bold text-lg line-clamp-2 group-hover:text-red-700 transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="p-4">
                <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                <div className="space-y-2 text-xs text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={12} className="text-red-500" />
                    <span>{item.author}</span>
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
                  className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm group/btn shadow-md hover:shadow-lg"
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
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center mt-6">
            <p className="text-red-600 text-sm">{error}</p>
            <p className="text-red-500 text-xs mt-1">
              Mostrando notícias temporárias enquanto o serviço original não responde.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}