// src/components/YouTubeSection.tsx
import { useEffect, useState } from 'react';
import { Play, Radio, Calendar, Eye } from 'lucide-react';
import { fetchYouTubeVideos, type YouTubeVideo } from '../api/youtube-live';

export default function YouTubeSection() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const loadVideos = async () => {
    setLoading(true);
    const result = await fetchYouTubeVideos();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    loadVideos();
    
    // Atualizar periodicamente
    const interval = setInterval(loadVideos, data?.liveNow ? 30000 : 120000);
    return () => clearInterval(interval);
  }, [data?.liveNow]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!data || !data.videos.length) {
    return (
      <div className="text-center py-12">
        <Radio className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">Nenhum vídeo disponível</h3>
      </div>
    );
  }

  const { liveNow, currentLive, videos } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* BANNER AO VIVO */}
      {liveNow && currentLive && (
        <div className="mb-10 animate-pulse">
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 md:p-8 shadow-2xl border-4 border-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-ping"></div>
                <span className="font-bold text-red-700">AO VIVO AGORA</span>
              </div>
              <span className="text-white/90 text-sm">
                <Eye className="w-4 h-4 inline mr-1" />
                Assistindo agora
              </span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${currentLive.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={currentLive.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              
              <div className="text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {currentLive.title}
                </h2>
                <p className="text-white/80 mb-6">{currentLive.description}</p>
                <a
                  href={currentLive.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-red-700 font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                >
                  <Play className="w-5 h-5" />
                  Assistir no YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GRADE DE VÍDEOS */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {liveNow ? 'Vídeos Recentes' : 'Últimos Vídeos do Canal'}
          </h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar className="w-5 h-5" />
            <span className="text-sm">Atualizado automaticamente</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video: YouTubeVideo) => (
            <div
              key={video.id}
              className={`bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 ${
                video.isLiveNow ? 'border-red-500' : 'border-transparent'
              }`}
            >
              {/* THUMBNAIL */}
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
                
                {/* BADGE AO VIVO */}
                {video.isLiveNow && (
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-bold text-sm">AO VIVO</span>
                    </div>
                  </div>
                )}
                
                {/* BOTÃO PLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="bg-red-600 p-4 rounded-full transform hover:scale-110 transition">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* INFORMAÇÕES */}
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2 line-clamp-2">
                  {video.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {video.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(video.published).toLocaleDateString('pt-BR')}
                  </span>
                  
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                      video.isLiveNow
                        ? 'bg-red-100 text-red-700 hover:bg-red-200'
                        : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    }`}
                  >
                    {video.isLiveNow ? (
                      <>
                        <Radio className="w-4 h-4" />
                        Assistir
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        Assistir
                      </>
                    )}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ATUALIZAÇÃO AUTOMÁTICA */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>
          Sistema automático • {liveNow ? 'Atualizando a cada 30s' : 'Atualizando a cada 2min'} • 
          <button 
            onClick={loadVideos}
            className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Atualizar agora
          </button>
        </p>
      </div>
    </div>
  );
}