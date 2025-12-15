import { Router } from 'express';
import axios from 'axios';
import Parser from 'rss-parser';

const router = Router();
const parser = new Parser();

// Cache simples em memória
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Helper para cache
function getCached(key: string) {
  const cached = cache[key];
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

function setCached(key: string, data: any) {
  cache[key] = { data, timestamp: Date.now() };
}

// GET /api/social/feeds - TODOS OS FEEDS
router.get('/feeds', async (req, res) => {
  try {
    const limit = parseInt(process.env.SOCIAL_FEEDS_LIMIT || '3');
    
    // Busca feeds em paralelo (ou mock se não configurado)
    const [youtube, instagram, facebook, vatican] = await Promise.allSettled([
      getYouTubeVideos(limit),
      getInstagramPosts(limit),
      getFacebookPosts(limit),
      getVaticanNews(limit)
    ]);
    
    res.json({
      status: "✅ ONLINE",
      timestamp: new Date().toISOString(),
      feeds: {
        youtube: youtube.status === 'fulfilled' ? youtube.value : { error: 'YouTube não configurado' },
        instagram: instagram.status === 'fulfilled' ? instagram.value : { error: 'Instagram não configurado' },
        facebook: facebook.status === 'fulfilled' ? facebook.value : { error: 'Facebook não configurado' },
        vatican_news: vatican.status === 'fulfilled' ? vatican.value : { error: 'Vatican News não configurado' }
      },
      config_status: {
        youtube: !!process.env.YOUTUBE_API_KEY,
        instagram: !!process.env.INSTAGRAM_ACCESS_TOKEN,
        facebook: !!process.env.FACEBOOK_PAGE_TOKEN,
        vatican: !!process.env.VATICAN_NEWS_RSS_URL
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar feeds',
      message: error instanceof Error ? error.message : 'Erro desconhecido'
    });
  }
});

// GET /api/social/youtube - Vídeos do YouTube
router.get('/youtube', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 3;
    const videos = await getYouTubeVideos(limit);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar vídeos do YouTube' });
  }
});

// GET /api/social/instagram - Posts do Instagram
router.get('/instagram', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 6;
    const posts = await getInstagramPosts(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts do Instagram' });
  }
});

// GET /api/social/facebook - Posts do Facebook
router.get('/facebook', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 4;
    const posts = await getFacebookPosts(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar posts do Facebook' });
  }
});

// GET /api/social/vatican-news - Notícias do Vaticano
router.get('/vatican-news', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 5;
    const news = await getVaticanNews(limit);
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notícias do Vaticano' });
  }
});

// GET /api/social/config - Status das configurações
router.get('/config', (req, res) => {
  res.json({
    youtube: {
      configured: !!process.env.YOUTUBE_API_KEY,
      has_channel: !!process.env.YOUTUBE_CHANNEL_ID
    },
    instagram: {
      configured: !!process.env.INSTAGRAM_ACCESS_TOKEN,
      has_user_id: !!process.env.INSTAGRAM_USER_ID
    },
    facebook: {
      configured: !!process.env.FACEBOOK_PAGE_TOKEN,
      has_page_id: !!process.env.FACEBOOK_PAGE_ID
    },
    vatican: {
      configured: !!process.env.VATICAN_NEWS_RSS_URL,
      url: process.env.VATICAN_NEWS_RSS_URL || 'Não configurado'
    }
  });
});

// Funções dos serviços (versão simplificada)
async function getYouTubeVideos(limit: number) {
  const cacheKey = `youtube_${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  
  if (!apiKey || !channelId) {
    // Dados de demonstração
    const demoVideos = [
      {
        id: 'demo_yt_1',
        title: 'Celebração no Santuário de Fátima - Demo',
        description: 'Vídeo demonstrativo do sistema de feeds',
        thumbnail: 'https://placehold.co/320x180/003366/FFFFFF?text=YouTube+Demo',
        url: 'https://youtube.com/watch?v=demo',
        publishedAt: new Date().toISOString(),
        views: '1.2K'
      }
    ].slice(0, limit);
    
    setCached(cacheKey, demoVideos);
    return demoVideos;
  }
  
  try {
    // Implementação real aqui (usando axios)
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet&order=date&maxResults=${limit}&type=video`
    );
    
    const videos = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description.substring(0, 100) + '...',
      thumbnail: item.snippet.thumbnails.medium.url,
      url: `https://youtube.com/watch?v=${item.id.videoId}`,
      publishedAt: item.snippet.publishedAt
    }));
    
    setCached(cacheKey, videos);
    return videos;
  } catch (error) {
    // Fallback para demo
    return [
      {
        id: 'error_yt_1',
        title: 'YouTube - Configure sua API Key',
        description: 'Adicione YOUTUBE_API_KEY no .env',
        thumbnail: 'https://placehold.co/320x180/FF0000/FFFFFF?text=Configure+.env',
        url: '#',
        publishedAt: new Date().toISOString(),
        views: 'Configuração necessária'
      }
    ];
  }
}

async function getInstagramPosts(limit: number) {
  const cacheKey = `instagram_${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  
  if (!token || !userId) {
    const demoPosts = [
      {
        id: 'demo_ig_1',
        caption: 'Santuário de Fátima - Demo Instagram',
        media_url: 'https://placehold.co/600x600/003366/FFFFFF?text=Instagram+Demo',
        permalink: 'https://instagram.com/p/demo',
        timestamp: new Date().toISOString(),
        likes: 42
      }
    ].slice(0, limit);
    
    setCached(cacheKey, demoPosts);
    return demoPosts;
  }
  
  // Implementação real aqui
  // ...
  
  return []; // Placeholder
}

async function getFacebookPosts(limit: number) {
  const cacheKey = `facebook_${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const token = process.env.FACEBOOK_PAGE_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  
  if (!token || !pageId) {
    const demoPosts = [
      {
        id: 'demo_fb_1',
        message: 'Página do Santuário - Demo Facebook',
        created_time: new Date().toISOString(),
        permalink_url: 'https://facebook.com/demo',
        likes: 15
      }
    ].slice(0, limit);
    
    setCached(cacheKey, demoPosts);
    return demoPosts;
  }
  
  // Implementação real aqui
  // ...
  
  return []; // Placeholder
}

async function getVaticanNews(limit: number) {
  const cacheKey = `vatican_${limit}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;
  
  const rssUrl = process.env.VATICAN_NEWS_RSS_URL;
  
  if (!rssUrl) {
    const demoNews = [
      {
        id: 'demo_vatican_1',
        title: 'Notícias do Vaticano - Demo',
        link: 'https://www.vaticannews.va',
        content: 'Sistema de feeds em funcionamento',
        pubDate: new Date().toISOString()
      }
    ].slice(0, limit);
    
    setCached(cacheKey, demoNews);
    return demoNews;
  }
  
  try {
    const feed = await parser.parseURL(rssUrl);
    const news = feed.items.slice(0, limit).map((item: any) => ({
      id: `vatican_${Date.now()}`,
      title: item.title || 'Notícia do Vaticano',
      link: item.link || '#',
      content: item.contentSnippet || item.description || '',
      pubDate: item.pubDate || new Date().toISOString()
    }));
    
    setCached(cacheKey, news);
    return news;
  } catch (error) {
    console.error('Erro Vatican News:', error);
    return [
      {
        id: 'error_vatican_1',
        title: 'Erro ao buscar notícias do Vaticano',
        link: '#',
        content: 'Verifique a URL do RSS',
        pubDate: new Date().toISOString()
      }
    ];
  }
}

export default router;