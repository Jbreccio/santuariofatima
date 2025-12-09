// routes/AppRoutes.tsx - CORRIGIDO
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Historia from "../pages/Historia";
import Missas from "../pages/Missas";
import Localizacao from "../pages/Localizacao";
import Contato from "../pages/Contato";
import SantoDoDia from "../pages/SantoDoDia";
import MomentosLiturgicos from "../pages/MomentosLiturgicos";
import SobreNos from "../pages/SobreNos";
import Doacoes from "../pages/Doacoes";
import Pastorais from "../pages/Pastorais";
import CalendarioLiturgico from "../pages/CalendarioLiturgico";
import ScrollToAnchor from "@/components/home/ScrollToAnchor";
import ScrollToTop from "@/components/utils/ScrollToTop";

// ✅ IMPORTAÇÃO FALTANDO — ADICIONE ESTA LINHA:
import LoginSecret from "../pages/LoginSecret";

import Admin from "../pages/PainelAdmin";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <> 
      <ScrollToTop />
      <ScrollToAnchor/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/missas" element={<Missas />} />
        <Route path="/localizacao" element={<Localizacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/momentosliturgicos" element={<MomentosLiturgicos />} />
        <Route path="/calendarioliturgico" element={<CalendarioLiturgico />} />
        <Route path="/sobrenos" element={<SobreNos />} />
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/pastorais" element={<Pastorais />} />
        <Route path="/santododia" element={<SantoDoDia />} />
               
        <Route path="/loginsecret" element={<LoginSecret />} />
        
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}