// frontend/api/social-feeds.js (ATUALIZADO)
export default async function handler(req, res) {
  try {
    // Busca TUDO em paralelo (mais rápido)
    const [vaticanNews, youtubeData, instagramData, facebookData] = await Promise.all([
      fetch(`${req.headers.origin}/api/vatican-news`).then(r => r.json()),
      fetch(`${req.headers.origin}/api/youtube-live`).then(r => r.json()),
      fetch(`${req.headers.origin}/api/instagram-feed`).then(r => r.json()), // Crie este depois
      fetch(`${req.headers.origin}/api/facebook-feed`).then(r => r.json())   // Crie este depois
    ]);
    
    res.json({
      success: true,
      feeds: {
        vatican: vaticanNews,
        youtube: youtubeData,
        instagram: instagramData,
        facebook: facebookData
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message,
      // Dados de fallback
      feeds: {
        youtube: { liveNow: false, videos: [] },
        vatican: [],
        instagram: [],
        facebook: []
      }
    });
  }
}