// server.js - Backend SIMPLES e FUNCIONAL
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "🚀 ONLINE",
    service: "Santuário Backend",
    timestamp: new Date().toISOString(),
    endpoints: [
      "/api/health",
      "/api/vatican/news", 
      "/api/social/instagram",
      "/api/social/youtube"
    ]
  });
});

// Rota do Vatican News
app.get("/api/vatican/news", (req, res) => {
  res.json({
    success: true,
    source: "mock",
    data: [
      {
        title: "Sistema Santuário em Demonstração",
        description: "Backend funcionando via Node.js local",
        timestamp: new Date().toISOString()
      }
    ]
  });
});

// Rota do Instagram
app.get("/api/social/instagram", (req, res) => {
  res.json({
    success: true,
    data: [
      {
        id: "demo_001",
        caption: "Sistema funcionando! 🎉",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400"
      }
    ]
  });
});

// Inicia servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend rodando: http://localhost:${PORT}`);
  console.log(`✅ Health Check: http://localhost:${PORT}/api/health`);
});
