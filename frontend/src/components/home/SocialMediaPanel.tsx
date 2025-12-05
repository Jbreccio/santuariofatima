import React, { useState, useEffect } from 'react';
import { Instagram, Youtube, Facebook, Play, X } from 'lucide-react';

// 1️⃣ Definir interfaces
interface InstagramPost {
  id: string;
  caption?: string;
  media_type?: string;
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp?: string;
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

interface FacebookPost {
  id: string;
  message?: string;
  created_time?: string;
  full_picture?: string;
  permalink_url: string;
}

export default function SocialMediaPanel() {
  // 2️⃣ Tipar os estados corretamente
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [instagramPost, setInstagramPost] = useState<InstagramPost | null>(null);
  const [youtubeLive, setYoutubeLive] = useState<YouTubeVideo | null>(null);
  const [youtubeVideos, setYoutubeVideos] = useState<YouTubeVideo[]>([]);
  const [facebookPost, setFacebookPost] = useState<FacebookPost | null>(null);
  const [loading, setLoading] = useState(true);

  // CONFIGURE SUAS CHAVES DE API AQUI
  const INSTAGRAM_ACCESS_TOKEN = 'SEU_INSTAGRAM_ACCESS_TOKEN';
  const INSTAGRAM_USER_ID = 'SEU_INSTAGRAM_USER_ID';
  const YOUTUBE_API_KEY = 'SUA_YOUTUBE_API_KEY';
  const YOUTUBE_CHANNEL_ID = 'UCYourChannelID';
  const FACEBOOK_ACCESS_TOKEN = 'SEU_FACEBOOK_ACCESS_TOKEN';
  const FACEBOOK_PAGE_ID = 'SEU_PAGE_ID';

  const fetchInstagramPost = async () => {
    try {
      const response = await fetch(
        `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&limit=1&access_token=${INSTAGRAM_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setInstagramPost(data.data[0]);
        return;
      }
    } catch (error) {
      console.error('Erro ao buscar post do Instagram:', error);
    }
    
    setInstagramPost({
      id: '1',
      caption: '🙏 Venha participar de nossas celebrações! Missas diárias às 19h30. #FéEmCristo #SantuárioDeFátima',
      media_url: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=600&fit=crop',
      permalink: 'https://www.instagram.com/santuariodefatima',
    });
  };

  const fetchYouTubeContent = async () => {
    try {
      const liveResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&maxResults=1&key=${YOUTUBE_API_KEY}`
      );
      const liveData = await liveResponse.json();
      
      if (liveData.items && liveData.items.length > 0) {
        setYoutubeLive(liveData.items[0]);
      }

      const videosResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&order=date&type=video&maxResults=4&key=${YOUTUBE_API_KEY}`
      );
      const videosData = await videosResponse.json();
      
      if (videosData.items) {
        setYoutubeVideos(videosData.items);
        return;
      }
    } catch (error) {
      console.error('Erro ao buscar conteúdo do YouTube:', error);
    }

    setYoutubeVideos([
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: 'Missa Dominical - 01/12/2024',
          thumbnails: { 
            high: { url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
          }
        }
      },
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: 'Terço em Família',
          thumbnails: { 
            high: { url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
          }
        }
      },
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: 'Adoração ao Santíssimo',
          thumbnails: { 
            high: { url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
          }
        }
      },
      {
        id: { videoId: 'jNQXAC9IVRw' },
        snippet: {
          title: 'Novena de Fátima',
          thumbnails: { 
            high: { url: 'https://i.ytimg.com/vi/jNQXAC9IVRw/hqdefault.jpg' }
          }
        }
      }
    ]);
  };

  const fetchFacebookPost = async () => {
    try {
      const response = await fetch(
        `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts?fields=id,message,created_time,full_picture,permalink_url&limit=1&access_token=${FACEBOOK_ACCESS_TOKEN}`
      );
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        setFacebookPost(data.data[0]);
        return;
      }
    } catch (error) {
      console.error('Erro ao buscar post do Facebook:', error);
    }

    setFacebookPost({
      id: '1',
      message: '🕊️ Programação da semana: Missas diárias às 19h30. Confissões disponíveis aos sábados (17h-18h) e domingos (9h-10h). Venha fortalecer sua fé conosco!',
      full_picture: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=600&fit=crop',
      permalink_url: 'https://www.facebook.com',
    });
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchInstagramPost(),
        fetchYouTubeContent(),
        fetchFacebookPost()
      ]);
      setLoading(false);
    };

    loadAllData();
    const interval = setInterval(loadAllData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <section 
        className="py-8 sm:py-12 md:py-16 bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('/fundoredessociais.png')" }}
      >
        <div className="absolute inset-0 bg-blue-50 bg-opacity-40"></div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-sm sm:text-base text-gray-600">Carregando conteúdo...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="py-8 sm:py-12 md:py-16 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/fundoredessociais.png')" }}
    >
      <div className="absolute inset-0 bg-blue-50 bg-opacity-40"></div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 relative z-10">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nossas Redes Sociais</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">Acompanhe em tempo real</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 mb-6 sm:mb-8">
          
          {/* INSTAGRAM */}
          <div className="md:col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-white">
                  <Instagram size={20} className="sm:hidden" strokeWidth={2.5} />
                  <Instagram size={24} className="hidden sm:block" strokeWidth={2.5} />
                  <h3 className="font-bold text-base sm:text-lg">Instagram</h3>
                </div>
              </div>
              
              {instagramPost && (
                <a
                  href={instagramPost.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-95 transition-opacity"
                >
                  <img 
                    src={instagramPost.media_type === 'VIDEO' ? instagramPost.thumbnail_url : instagramPost.media_url}
                    alt="Último post"
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-3 sm:line-clamp-4">
                      {instagramPost.caption || 'Nova publicação no Instagram'}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* YOUTUBE AO VIVO */}
          <div className="md:col-span-2 lg:col-span-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-3 sm:p-4">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <Youtube size={24} className="sm:hidden" strokeWidth={2.5} />
                    <Youtube size={28} className="hidden sm:block" strokeWidth={2.5} />
                    <h3 className="font-bold text-base sm:text-xl">YouTube AO VIVO</h3>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
                    <span className="text-xs sm:text-sm font-semibold">LIVE</span>
                  </div>
                </div>
              </div>
              
              <div className="relative bg-black" style={{ paddingBottom: '56.25%' }}>
                {youtubeLive ? (
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${youtubeLive.id.videoId}?autoplay=0&rel=0&modestbranding=1`}
                    title="YouTube Live"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-center p-4 sm:p-8">
                    <div>
                      <Youtube size={48} className="mx-auto mb-3 sm:mb-4 opacity-50 sm:w-16 sm:h-16" />
                      <p className="text-sm sm:text-lg font-semibold mb-1 sm:mb-2">Nenhuma transmissão ao vivo</p>
                      <p className="text-xs sm:text-sm opacity-75">Aguarde nossa próxima celebração</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FACEBOOK */}
          <div className="md:col-span-1 lg:col-span-3">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden h-full">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-4">
                <div className="flex items-center gap-2 text-white">
                  <Facebook size={20} className="sm:hidden" strokeWidth={2.5} />
                  <Facebook size={24} className="hidden sm:block" strokeWidth={2.5} />
                  <h3 className="font-bold text-base sm:text-lg">Facebook</h3>
                </div>
              </div>
              
              {facebookPost && (
                <a
                  href={facebookPost.permalink_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:opacity-95 transition-opacity"
                >
                  {facebookPost.full_picture && (
                    <img 
                      src={facebookPost.full_picture}
                      alt="Último post"
                      className="w-full aspect-square object-cover"
                    />
                  )}
                  <div className="p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-gray-700 line-clamp-3 sm:line-clamp-4">
                      {facebookPost.message || 'Nova publicação no Facebook'}
                    </p>
                  </div>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Vídeos Anteriores */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">Vídeos Anteriores</h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {youtubeVideos.map((video, index) => (
              <div 
                key={index} 
                className="group cursor-pointer" 
                onClick={() => setSelectedVideo(video.id.videoId)}
              >
                <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-black shadow-md hover:shadow-xl transition-shadow">
                  <img 
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 flex items-center justify-center transition-all duration-300">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play size={20} className="text-white ml-0.5 sm:ml-1 sm:w-7 sm:h-7" fill="white" />
                    </div>
                  </div>
                </div>
                <h4 className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-gray-800 line-clamp-2">
                  {video.snippet.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-6 sm:mt-8 text-center">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
            <a 
              href="https://www.instagram.com/santuariodefatima"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              <Instagram size={18} className="sm:w-5 sm:h-5" />
              Seguir no Instagram
            </a>
            <a 
              href="https://youtube.com/@santuariodefatimanews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-red-700 transition-colors shadow-lg"
            >
              <Youtube size={18} className="sm:w-5 sm:h-5" />
              Inscrever-se
            </a>
            <a 
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Facebook size={18} className="sm:w-5 sm:h-5" />
              Seguir no Facebook
            </a>
          </div>
        </div>

        {/* Modal de Vídeo */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-3 sm:p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <div 
              className="w-full max-w-5xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedVideo(null)}
                className="absolute -top-10 right-0 sm:-top-12 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                aria-label="Fechar vídeo"
              >
                <X size={24} />
              </button>

              <div className="relative bg-black rounded-lg sm:rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0&modestbranding=1`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}