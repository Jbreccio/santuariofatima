// src/api/youtube-live.ts
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const YOUTUBE_CHANNEL_ID = 'UCwTM4qaQO3fsRpKAAZUZ8Ng';

export interface YouTubeVideo {
  id: string;
  title: string;
  link: string;
  published: string;
  isLive: boolean;
  isLiveNow: boolean;
  liveBroadcastContent: 'live' | 'upcoming' | 'none';
  thumbnail: string;
  description: string;
  viewCount?: string;
}

export async function fetchYouTubeVideos() {
  try {
    // 1. Buscar lives ativas
    const liveUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&eventType=live&type=video&maxResults=2&key=${YOUTUBE_API_KEY}`;
    
    // 2. Buscar últimos vídeos
    const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${YOUTUBE_CHANNEL_ID}&order=date&type=video&maxResults=6&key=${YOUTUBE_API_KEY}`;
    
    const [liveRes, videosRes] = await Promise.all([
      fetch(liveUrl),
      fetch(videosUrl)
    ]);
    
    const [liveData, videosData] = await Promise.all([
      liveRes.json(),
      videosRes.json()
    ]);

    const allVideos: YouTubeVideo[] = [];
    let liveNow = false;
    let currentLive: YouTubeVideo | null = null;

    // Processar lives
    if (liveData.items?.length > 0) {
      const liveVideos = liveData.items.map((item: any) => {
        const videoId = item.id.videoId;
        const isCurrentlyLive = item.snippet.liveBroadcastContent === 'live';
        
        const video: YouTubeVideo = {
          id: videoId,
          title: item.snippet.title,
          link: `https://youtube.com/watch?v=${videoId}`,
          published: item.snippet.publishedAt,
          isLive: true,
          isLiveNow: isCurrentlyLive,
          liveBroadcastContent: item.snippet.liveBroadcastContent,
          thumbnail: item.snippet.thumbnails?.high?.url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
          description: item.snippet.description?.substring(0, 120) + '...' || ''
        };
        
        if (isCurrentlyLive) {
          liveNow = true;
          currentLive = video;
        }
        
        return video;
      });
      
      allVideos.push(...liveVideos);
    }

    // Processar vídeos normais
    if (videosData.items?.length > 0) {
      const normalVideos = videosData.items
        .filter((item: any) => item.id.videoId)
        .slice(0, liveNow ? 4 : 6)
        .map((item: any) => {
          const videoId = item.id.videoId;
          return {
            id: videoId,
            title: item.snippet.title,
            link: `https://youtube.com/watch?v=${videoId}`,
            published: item.snippet.publishedAt,
            isLive: false,
            isLiveNow: false,
            liveBroadcastContent: 'none' as const,
            thumbnail: item.snippet.thumbnails?.high?.url || `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            description: item.snippet.description?.substring(0, 100) + '...' || ''
          };
        });
      
      // Evitar duplicados
      const existingIds = new Set(allVideos.map(v => v.id));
      const uniqueVideos = normalVideos.filter(v => !existingIds.has(v.id));
      allVideos.push(...uniqueVideos);
    }

    // Ordenar
    allVideos.sort((a, b) => {
      if (a.isLiveNow && !b.isLiveNow) return -1;
      if (!a.isLiveNow && b.isLiveNow) return 1;
      return new Date(b.published).getTime() - new Date(a.published).getTime();
    });

    return {
      success: true,
      liveNow,
      currentLive,
      videos: allVideos.slice(0, 6),
      lastUpdated: new Date().toISOString()
    };

  } catch (error) {
    console.error('Erro YouTube API:', error);
    return {
      success: false,
      liveNow: false,
      videos: [],
      error: 'Falha ao carregar vídeos'
    };
  }
}