// frontend/src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import ScrollToAnchor from "../components/home/ScrollToAnchor";
import ScrollToTop from "../components/utils/ScrollToTop";

// Importe TODAS as páginas (não esqueça nenhuma!)
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
import Faq from "../pages/Faq";
import TermosdeUso from "../pages/TermosdeUso";
import PoliticadePrivacidade from "../pages/PoliticadePrivacidade";
import LoginSecret from "../pages/LoginSecret";
import PainelAdmin from "../pages/PainelAdmin"; // ← CORRIJA: "../pages/"
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <> 
      
      <ScrollToTop />
      <ScrollToAnchor/>
      <Routes>
        {/* ROTAS PRINCIPAIS - VERIFIQUE OS PATHS! */}
        <Route path="/" element={<Home />} />
        <Route path="/historia" element={<Historia />} />
        <Route path="/missas" element={<Missas />} />
        <Route path="/localizacao" element={<Localizacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/momentosliturgicos" element={<MomentosLiturgicos />} />
        <Route path="/calendarioliturgico" element={<CalendarioLiturgico />} />
        
       
        <Route path="/sobre-nos" element={<SobreNos />} />
        
        <Route path="/doacoes" element={<Doacoes />} />
        <Route path="/pastorais" element={<Pastorais />} />
        
       
        <Route path="/santo-do-dia" element={<SantoDoDia />} />
        
        {/* ROTAS SECUNDÁRIAS */}
        <Route path="/faq" element={<Faq />} />
        <Route path="/termosdeuso" element={<TermosdeUso />} />
        <Route path="/politicadeprivacidade" element={<PoliticadePrivacidade />} />
        <Route path="/loginsecret" element={<LoginSecret />} />
        
                       <Route path="/paineladmin" element={<PainelAdmin />} />
        <Route path="/admin" element={<PainelAdmin />} />
        {/* 404 - SEMPRE ÚLTIMA */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}