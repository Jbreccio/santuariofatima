// frontend/api/youtube-live.js
import Parser from 'rss-parser';

export default async function handler(req, res) {
  const parser = new Parser();
  
  // SUBSTITUA pelo ID REAL do canal do Santuário de Fátima
  // Como encontrar: https://commentpicker.com/youtube-channel-id.php
  const CHANNEL_ID = 'UCwTM4qaQO3fsRpKAAZUZ8Ng';
  
  try {
    const feed = await parser.parseURL(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`
    );
    
    // Processa os vídeos
    const allVideos = feed.items.slice(0, 4).map(video => {
      const videoId = video.id.split(':')[2];
      return {
        id: videoId,
        title: video.title,
        link: video.link,
        published: video.pubDate,
        isLive: video.title.toLowerCase().includes('live') || 
                video.title.toLowerCase().includes('ao vivo') ||
                video.title.toLowerCase().includes('direct'),
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        description: video.contentSnippet?.substring(0, 100) + '...' || ''
      };
    });
    
    // Verifica se há transmissão ao vivo AGORA
    const liveNow = allVideos.filter(v => v.isLive).length > 0;
    
    res.json({
      success: true,
      liveNow,
      videos: allVideos,
      channelTitle: feed.title,
      lastUpdated: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Erro YouTube RSS:', error);
    
    // Dados DEMO caso falhe
    res.json({
      success: false,
      liveNow: false,
      videos: [
        {
          id: 'demo1',
          title: 'Missa no Santuário de Fátima - Demo',
          link: '#',
          isLive: false,
          thumbnail: '/placeholder-youtube.jpg',
          description: 'Demonstração do feed do YouTube'
        },
        {
          id: 'demo2',
          title: '🚨 AO VIVO AGORA: Missa Dominical',
          link: '#',
          isLive: true,
          thumbnail: '/placeholder-live.jpg',
          description: 'Transmissão ao vivo em andamento'
        }
      ],
      channelTitle: 'Santuário de Fátima (Modo Demo)',
      note: 'Configure o CHANNEL_ID para dados reais'
    });
  }
} 