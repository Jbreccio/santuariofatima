// API de Health Check
export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({
    status: "🚀 ONLINE",
    service: "Santuário API - Vercel",
    version: "1.0.0-demo",
    timestamp: new Date().toISOString(),
    note: "Sistema provisório - Sexta: migração para Hostinger 25GB",
    endpoints: {
      health: "/api/health",
      vatican: "/api/vatican/news",
      instagram: "/api/social/instagram",
      youtube: "/api/social/youtube",
      facebook: "/api/social/facebook"
    }
  });
}
