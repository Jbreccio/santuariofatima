import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import socialRoutes from './src/routes/social.routes';

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rota de saúde (teste rápido)
app.get('/api/health', (req, res) => {
  res.json({
    status: "🚀 BACKEND ONLINE",
    service: "Santuário de Fátima - Feeds Sociais",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rota principal
app.get('/', (req, res) => {
  res.json({
    message: '✅ Backend do Santuário de Fátima',
    description: 'Sistema de feeds sociais em tempo real',
    endpoints: {
      health: '/api/health',
      all_feeds: '/api/social/feeds',
      youtube: '/api/social/youtube',
      instagram: '/api/social/instagram',
      facebook: '/api/social/facebook',
      vatican: '/api/social/vatican-news',
      config: '/api/social/config'
    }
  });
});

// Rotas das redes sociais
app.use('/api/social', socialRoutes);

// Rota 404 para endpoints não encontrados
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint não encontrado',
    path: req.originalUrl,
    available_endpoints: ['/api/health', '/api/social/feeds']
  });
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`\n✅ BACKEND RODANDO NA PORTA ${PORT}`);
  console.log(`👉 Local: http://localhost:${PORT}`);
  console.log(`👉 Health: http://localhost:${PORT}/api/health`);
  console.log(`👉 Feeds: http://localhost:${PORT}/api/social/feeds`);
  console.log(`📱 Modo: ${process.env.NODE_ENV || 'development'}\n`);
  
  // Mostra status das configurações
  console.log('🔧 CONFIGURAÇÕES:');
  console.log(`   Vatican News: ${process.env.VATICAN_NEWS_RSS_URL ? '✅' : '❌'}`);
  console.log(`   YouTube: ${process.env.YOUTUBE_API_KEY ? '✅' : '❌'}`);
  console.log(`   Instagram: ${process.env.INSTAGRAM_ACCESS_TOKEN ? '✅' : '❌'}`);
  console.log(`   Facebook: ${process.env.FACEBOOK_PAGE_TOKEN ? '✅' : '❌'}`);
});