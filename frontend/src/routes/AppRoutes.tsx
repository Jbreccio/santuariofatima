// routes/AppRoutes.tsx - Atualizado
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Historia from "../pages/Historia";
import Missas from "../pages/Missas";
import Localizacao from "../pages/Localizacao";
import Contato from "../pages/Contato";
import SantoDoDia from "../pages/SantoDoDia";
import Eventos from "../pages/Eventos";
import SobreNos from "../pages/SobreNos";
import Doacoes from "../pages/Doacoes";
import Pastorais from "../pages/Pastorais";
import CalendarioLiturgico from "../pages/CalendarioLiturgico";
import Admin from "../pages/PainelAdmin"; // Renomeado de PainelAdmin
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/historia" element={<Historia />} />
      {/* REMOVA: <Route path="/login" element={<Login />} /> */}
      <Route path="/missas" element={<Missas />} />
      <Route path="/localizacao" element={<Localizacao />} />
      <Route path="/contato" element={<Contato />} />
      <Route path="/eventos" element={<Eventos />} />
      <Route path="/calendarioliturgico" element={<CalendarioLiturgico />} />
      <Route path="/sobrenos" element={<SobreNos />} />
      <Route path="/doacoes" element={<Doacoes />} />
      <Route path="/pastorais" element={<Pastorais />} />
      <Route path="/santododia" element={<SantoDoDia />} />
      
      {/* Rota protegida do Painel Admin */}
      <Route path="/admin" element={<Admin />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}