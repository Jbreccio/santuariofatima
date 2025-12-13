import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import Navigation from "../components/layout/Navigation";
import { useState } from "react";
import CarrosselFotos from "../components/home/CarrosselFotos";
import RecadosHome from "../components/home/RecadosHome";
import LiturgiaDiaria from "../components/home/LiturgiaDiaria";
import VaticanNewsSection from "../components/home/VaticanNews";
import { useAuth } from "../contexts/AuthContext";
import SocialMediaPanel from "../components/home/SocialMediaPanel";
import Footer from "../components/layout/Footer";

export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const youtubeVideos = [
    { id: '1', title: 'Missa Dominical Completa', views: '15.2K visualizações', thumbnail: '📺', videoId: 'dQw4w9WgXcQ' },
    { id: '2', title: 'Catequese Especial', views: '8.5K visualizações', thumbnail: '⛪', videoId: 'dQw4w9WgXcQ' },
    { id: '3', title: 'Cerimônia de Batizado', views: '22.1K visualizações', thumbnail: '💒', videoId: 'dQw4w9WgXcQ' },
    { id: '4', title: 'Missa dos Enfermos', views: '12.8K visualizações', thumbnail: '🙏', videoId: 'dQw4w9WgXcQ' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pt-16">
      
      {/* MENU FIXO */}
      <Navigation />

      {/* HERO SECTION */}
      <section className="relative h-[70vh] sm:h-screen flex items-center overflow-hidden">

        {/* IMAGEM SEM FAIXAS PRETAS */}
        <img
          src="/FatimaAltar.png"
          alt="Nossa Senhora de Fátima"
          className="
            absolute inset-0 
            w-full h-full 
            object-cover 
            object-center
            select-none
          "
        />

        {/* CAMADA ESCURA */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* TEXTO NO LADO DIREITO */}
        <div className="relative z-10 w-full flex justify-end px-6 md:px-16">
          <div className="text-white text-right max-w-xl">

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Santuário <br />
              Nossa Senhora <br />
              de Fátima
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed mt-4">
              Bem-vindo ao nosso espaço de fé,<br />
              comunidade e espiritualidade
            </p>

          </div>
        </div>
      </section>

      {/* CARROSSEL */}
      <CarrosselFotos />

      {/* VATICAN NEWS */}
      <VaticanNewsSection />

      {/* LITURGIA COM ID PARA ÂNCORA */}
      <section id="liturgia" className="mb-8 sm:mb-10">
        <LiturgiaDiaria />
      </section>
      
      {/* REDES SOCIAIS */}
      <SocialMediaPanel />
      
      {/* POPUPS */}
      <RecadosHome />
      
      {/* RODAPÉ */}      
      <Footer />
    </div>
  );
}