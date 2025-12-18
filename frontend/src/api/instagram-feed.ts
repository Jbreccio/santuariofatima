// api/instagram-feed.js
export default async function handler(req, res) {
  // Em modo DEMO (sem token). Para conteúdo real, configure as variáveis no Vercel.
  const INSTAGRAM_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
  const USER_ID = process.env.INSTAGRAM_USER_ID;

  // MODO DEMO: Se não houver token, retorna dados de exemplo
  if (!INSTAGRAM_TOKEN || !USER_ID) {
    return res.json({
      success: false,
      mode: 'demo',
      posts: [
        {
          id: 'demo_ig_1',
          caption: 'Santuário de Fátima - Momento de paz e reflexão 🌿',
          media_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&h=600&fit=crop',
          permalink: '#',
          media_type: 'IMAGE',
          timestamp: new Date().toISOString()
        },
        {
          id: 'demo_ig_2',
          caption: 'Celebração da comunidade. Todos são bem-vindos! ✨',
          media_url: 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=600&h=600&fit=crop',
          permalink: '#',
          media_type: 'IMAGE',
          timestamp: new Date(Date.now() - 2 * 86400000).toISOString() // 2 dias atrás
        }
      ],
      note: 'Para posts reais, configure INSTAGRAM_ACCESS_TOKEN e INSTAGRAM_USER_ID no Vercel'
    });
  }

  // MODO REAL: Busca dados da API do Instagram
  try {
    const url = `https://graph.instagram.com/${USER_ID}/media?fields=id,caption,media_url,permalink,media_type,timestamp&access_token=${INSTAGRAM_TOKEN}&limit=8`;
    const response = await fetch(url);
    const data = await response.json();

    res.json({
      success: true,
      mode: 'live',
      posts: data.data || []
    });
  } catch (error) {
    console.error('Erro Instagram API:', error);
    res.json({ success: false, error: error.message });
  }
}