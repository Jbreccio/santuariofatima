import React, { useState, useEffect } from 'react';
import {
  Play,
  Maximize2,
  Clock,
  Eye,
  Heart
} from 'lucide-react';

/* ======================= */
interface InstagramPost {
  id: string;
  caption?: string;
  media_url: string;
  permalink: string;
}

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    thumbnails: {
      high: { url: string };
    };
  };
}

export default function SocialMediaPanel() {
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>([
    {
      id: '1',
      caption: 'Missa Dominical Completa com a comunidade',
      media_url: 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=600',
      permalink: 'https://www.instagram.com/santuariodefatima'
    },
    {
      id: '2',
      caption: 'Momento de oração e reflexão no santuário',
      media_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600',
      permalink: 'https://www.instagram.com/santuariodefatima'
    },
    {
      id: '3',
      caption: 'Celebração especial da comunidade jovem',
      media_url: 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=600',
      permalink: 'https://www.instagram.com/santuariodefatima'
    }
  ]);
  
  const [youtubeLive, setYoutubeLive] = useState<YouTubeVideo | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [liveVideoPlaying, setLiveVideoPlaying] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState<'live' | 'none'>('none');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const YOUTUBE_CHANNEL_ID = 'UCwTM4qaQO3fsRpKAAZUZ8Ng';

  /* ======================= */
  const fetchYouTubeViaRSS = async () => {
    try {
      // 🔴 REMOVA OS ESPAÇOS DAS URLS!
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`;
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

      const response = await fetch(proxyUrl);
      const data = await response.json();

      const parser = new DOMParser();
      const xml = parser.parseFromString(data.contents, 'text/xml');
      const items = xml.getElementsByTagName('entry');

      const videos: YouTubeVideo[] = [];
      let live: YouTubeVideo | null = null;

      for (let i = 0; i < Math.min(items.length, 8); i++) {
        const videoId = items[i].getElementsByTagName('yt:videoId')[0]?.textContent || '';
        const title = items[i].getElementsByTagName('title')[0]?.textContent || '';

        const video: YouTubeVideo = {
          id: { videoId },
          snippet: {
            title,
            thumbnails: {
              high: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }
            }
          }
        };

        if (!live && title.toLowerCase().includes('ao vivo')) {
          live = video;
          setLiveStatus('live');
        }

        videos.push(video);
      }

      setYoutubeLive(live || videos[0]);
      setLiveVideoPlaying((live || videos[0]).id.videoId);
      setYoutubeVideos(videos.slice(0, 4));
    } catch {
      console.error('Erro ao carregar RSS');
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchYouTubeViaRSS();
      setLoading(false);
    };
    load();
  }, []);

  // ✅ ESCUTA A TECLA ESC PARA SAIR DO FULLSCREEN
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && document.fullscreenElement) {
        document.exitFullscreen?.();
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  const toggleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (!document.fullscreenElement && iframe) {
      iframe.requestFullscreen?.();
      setIsFullscreen(true);
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-gray-600">
        Carregando transmissões…
      </div>
    );
  }

  return (
    <section
      className="py-12 md:py-16 bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('/fundoredessociais.png')",
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}
    >
      <div className="absolute inset-0 bg-blue-50/40" />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* ================= LINHA 1: YOUTUBE AO VIVO + 4 CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 mb-8 md:mb-12">
          
          {/* YOUTUBE AO VIVO */}
          <div className="lg:col-span-7">
            <div className="bg-gray-950 rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl overflow-hidden ring-1 ring-red-900/40 h-full">
              <div className="bg-gradient-to-r from-red-800 via-red-700 to-red-800 p-3 md:p-4 text-white flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <div className="bg-red-600 p-1.5 md:p-2 rounded">
                      <svg className="w-5 h-5 md:w-6 md:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                      </svg>
                    </div>
                    <span className="text-base md:text-xl">YouTube AO VIVO</span>
                  </div>
                </div>
                {liveStatus === 'live' && (
                  <span className="text-xs bg-red-600 px-2 md:px-3 py-1 rounded-full animate-pulse font-bold">
                    🔴 AO VIVO
                  </span>
                )}
              </div>

              {/* PLAYER COM BOTÃO DE SAIR INTEGRADO */}
              <div
                className="relative bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.9)]"
                style={{ paddingBottom: '56.25%' }}
              >
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${liveVideoPlaying}?autoplay=0&rel=0&modestbranding=1&controls=1`}
                  title="Transmissão ao vivo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />

                {/* Botão de AMPLIAR (só aparece FORA do fullscreen) */}
                {!isFullscreen && (
                  <button
                    onClick={toggleFullscreen}
                    className="absolute bottom-3 right-3 bg-black/80 hover:bg-black text-white p-2 rounded-lg border border-white/20 z-10"
                  >
                    <Maximize2 size={20} />
                  </button>
                )}

                {/* Botão de SAIR (só aparece DENTRO do fullscreen) */}
                {isFullscreen && (
                  <button
                    onClick={() => {
                      document.exitFullscreen?.();
                      setIsFullscreen(false);
                    }}
                    className="absolute top-3 right-3 bg-black/80 hover:bg-black text-white p-2 rounded-lg border border-white/20 z-10 backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 9l-4 4-4-4" />
                      <path d="M15 15l-4-4-4 4" />
                    </svg>
                  </button>
                )}
              </div>

              <div className="bg-gray-900 text-gray-200 p-3 md:p-4 text-sm border-t border-gray-800">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-red-700 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-sm md:text-base truncate">{youtubeLive?.snippet.title}</h4>
                    <p className="text-xs md:text-sm text-gray-400 truncate">Santuário Oficial de Fátima</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 CARDS DO YOUTUBE */}
          <div className="lg:col-span-5">
            <div className="h-full flex flex-col">
              <div className="bg-gradient-to-r from-red-700 to-red-600 p-2 md:p-3 text-white rounded-t-xl md:rounded-t-2xl shadow mb-2">
                <h3 className="text-base md:text-lg font-bold flex items-center gap-2">
                  <div className="bg-white p-1 rounded flex-shrink-0">
                    <svg className="w-4 h-4 md:w-5 md:h-5 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                  </div>
                  <span className="text-sm md:text-base">Vídeos em Destaque</span>
                </h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4 h-full">
                {youtubeVideos.map((video, i) => (
                  <a
                    key={i}
                    href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-blue-50 rounded-lg md:rounded-xl shadow hover:shadow-md transition-all duration-300 overflow-hidden border border-blue-100 hover:border-red-200 h-full"
                  >
                    <div className="flex h-full">
                      <div className="w-2/5 relative overflow-hidden flex-shrink-0">
                        <div className="h-full w-full bg-blue-100 relative">
                          <img
                            src={video.snippet.thumbnails.high.url}
                            alt={video.snippet.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] md:text-xs px-2 py-0.5 rounded">
                            {i === 0 ? 'TOP' : `#${i+1}`}
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                            <div className="bg-red-600 text-white p-1.5 md:p-2 rounded-full">
                              <Play className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-3/5 p-2.5 md:p-3 bg-blue-50 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-gray-800 line-clamp-3 md:line-clamp-4 mb-2 break-words">
                            {video.snippet.title}
                          </h4>
                        </div>
                        <div className="flex items-center text-[10px] md:text-xs text-gray-500 gap-2">
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Clock className="w-3 h-3" />
                            <span>Há {i+1} dia{i !== 0 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <Eye className="w-3 h-3" />
                            <span>{Math.floor(Math.random() * 2) + 1}K views</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= 3 CARDS DO INSTAGRAM ================= */}
        <div className="bg-gradient-to-r from-blue-50/50 to-purple-50/50 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 border border-blue-200/50">
          <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
            <a 
              href="https://www.instagram.com/santuariodefatima" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 md:p-3 rounded-lg hover:opacity-80 transition-all hover:scale-110 transform duration-200 shadow flex items-center justify-center w-10 h-10 md:w-12 md:h-12 flex-shrink-0"
              style={{
                background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
              }}
              title="Instagram do Santuário"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">Instagram</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {instagramPosts.map((post) => (
              <a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/70 backdrop-blur-sm rounded-lg md:rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-blue-100/50 hover:border-purple-300"
              >
                <div className="relative aspect-square bg-gradient-to-br from-blue-50/50 to-purple-50/50 overflow-hidden">
                  <img
                    src={post.media_url}
                    alt="Instagram post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-3 h-3 md:w-4 md:h-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                    </svg>
                  </div>
                </div>
                <div className="p-3 bg-transparent">
                  <p className="text-xs md:text-sm text-gray-700 mb-2 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-500" />
                      <span>{Math.floor(Math.random() * 200) + 30} curtidas</span>
                    </div>
                    <span className="text-purple-600 font-medium text-xs">Ver mais</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}