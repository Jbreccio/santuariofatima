import { Link } from "wouter";
import { ExternalLink } from "lucide-react";
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { useState } from "react";
import CarrosselFotos from "../components/home/CarrosselFotos";
import RecadosHome from "../components/home/RecadosHome";
import LiturgiaDiaria from "@/components/home/LiturgiaDiaria";
import VaticanNewsSection from "../components/home/VaticanNews";
import { useAuth } from "../contexts/AuthContext";
import SocialMediaPanel from "@/components/home/SocialMediaPanel";

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

      {/* HERO SECTION AJUSTADO */}
      <section className="relative h-[85vh] sm:h-screen flex items-center justify-center overflow-hidden">

        <img
          src="/nossa-senhora-fatima.png"
          alt="Nossa Senhora de Fátima"
          className="
            absolute inset-0 w-full h-full object-cover
            object-[center_25%]
            sm:object-center
            md:object-[center_40%]
          "
        />

        {/* Camada escura para contraste */}
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center text-white px-4 sm:px-6 md:px-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Santuário Nossa Senhora de Fátima
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto">
            Bem-vindo ao nosso espaço de fé, comunidade e espiritualidade
          </p>
        </div>
      </section>

      {/* CARROSSEL FOTOS */}
      <CarrosselFotos />

      {/* VATICAN NEWS */}
      <VaticanNewsSection />

      {/* LITURGIA DIÁRIA */}
      <LiturgiaDiaria />

      {/* REDES SOCIAIS */}
      <SocialMediaPanel />
      
      {/* POPUPS AUTOMÁTICOS */}
      <RecadosHome />

      <Footer />
    </div>
  );
}
