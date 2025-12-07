import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Heart, Users, Target, Lightbulb, BookOpen, Users2, HandHeart, Church } from "lucide-react";
import { useState } from 'react';

export default function SobreNos() {
  const valores = [
    {
      icon: Heart,
      titulo: "Devoção",
      descricao: "Cultivamos uma profunda devoção a Nossa Senhora de Fátima, seguindo sua mensagem de amor e paz.",
    },
    {
      icon: Users,
      titulo: "Acolhimento",
      descricao: "Acolhemos fiéis de todas as origens, criando um ambiente onde todos se sentem bem-vindos.",
    },
    {
      icon: Target,
      titulo: "Missão",
      descricao: "Promovemos a mensagem de amor, paz e esperança de Nossa Senhora de Fátima.",
    },
    {
      icon: Lightbulb,
      titulo: "Esperança",
      descricao: "Somos um farol de esperança para todos que buscam conforto espiritual.",
    },
  ];

  const equipe = [
    {
      funcao: "Pároco",
      nome: "Padre Beto Badiani",
      descricao: "Líder espiritual e guia da comunidade",
      imagem: "/padrebeto.png",
    },
    {
      funcao: "Vigário",
      nome: "Padre Andres",
      descricao: "Assistente do pároco e confessor",
      imagem: "/Andres.png",
    },
    {
      funcao: "Coordenadora",
      nome: "Rose Oliveira",
      descricao: "Responsável pela administração do Santuário",
      imagem: "/rose-placeholder.png",
    },
  ];

  const pastorais = [
    {
      icon: BookOpen,
      titulo: "Formação Espiritual",
      descricao: "Grupos de estudo bíblico, catequese e preparação para sacramentos.",
    },
    {
      icon: Users2,
      titulo: "Ação Social",
      descricao: "Programas de assistência social e distribuição de alimentos às famílias necessitadas.",
    },
    {
      icon: HandHeart,
      titulo: "Voluntariado",
      descricao: "Oportunidades para paroquianos contribuírem com seus talentos no serviço pastoral.",
    },
    {
      icon: Church,
      titulo: "Liturgia e Acólitos",
      descricao: "Coordenação das celebrações litúrgicas e formação de ministros.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-blue-50">
      <Navigation />

      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center md:text-left">
          Sobre o Santuário
        </h1>
        <p className="text-lg text-gray-600 mb-12 text-center md:text-left">
          Conheça a história, missão e valores do nosso Santuário
        </p>

        {/* Quem Somos */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-black-200">
            SANTUÁRIO NOSSA SENHORA DE FÁTIMA
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              <strong>QUEM SOMOS</strong><br />
              Santuário Nossa Senhora de Fátima, Diocese de Santo Amaro, é um local de 
              devoção e espiritualidade que acolhe fiéis de todas as origens. Aqui, buscamos 
              promover a mensagem de amor, paz e esperança de Nossa Senhora de 
              Fátima, inspirando a comunidade a viver uma vida de fé e compaixão.
            </p>
          </div>
        </section>

        {/* Nossa Visão e Fé */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">NOSSA VISÃO</h2>
            <p className="text-gray-700">
              Em Santuário Nossa Senhora de Fátima, buscamos ser um farol de esperança 
              e um centro de acolhimento para todos que buscam conforto espiritual. Nossa 
              visão é criar um ambiente onde todos se sintam bem-vindos para buscar a 
              presença divina e fortalecer sua conexão com Deus.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">NOSSA FÉ</h2>
            <p className="text-gray-700">
              A nossa fé é enraizada na mensagem de amor e paz de Nossa Senhora de 
              Fátima. Acreditamos na importância da oração, da caridade e do amor ao 
              próximo como pilares fundamentais para uma vida significativa e em comunhão 
              com Deus.
            </p>
          </div>
        </section>

        {/* Nossa Comunidade */}
        <section className="bg-gradient-to-r from-green-50 to-emerald-100 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">NOSSA COMUNIDADE</h2>
          <div className="text-gray-700">
            <p>
              Nossa comunidade é formada por indivíduos dedicados à vivência da fé e ao 
              serviço ao próximo. Juntos, compartilhamos momentos de oração, reflexão e 
              solidariedade, construindo laços fraternos e acolhedores.
            </p>
          </div>
        </section>

        {/* História */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">SOBRE NÓS</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              O Santuário Nossa Senhora de Fátima, desde sua fundação em 1996, tornou-se 
              um farol de fé e esperança para todos os que o visitam. Este lugar sagrado 
              é um refúgio de oração e reflexão, onde os corações se unem em busca de paz 
              e comunhão com Deus e Sua Santa Mãe.
            </p>
          </div>
        </section>

        {/* Valores */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valores.map((valor, idx) => {
              const IconComponent = valor.icon;
              return (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <IconComponent className="text-blue-600 mx-auto mb-4" size={32} />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{valor.titulo}</h3>
                  <p className="text-gray-700 text-sm">{valor.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Equipe */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Nossa Equipe Pastoral</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {equipe.map((membro, idx) => {
              const [imgError, setImgError] = useState(false);
              return (
                <div key={idx} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full border-4 border-blue-100">
                    {imgError ? (
                      <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                        <span className="text-4xl">🙏</span>
                      </div>
                    ) : (
                      <img
                        src={membro.imagem}
                        alt={membro.nome}
                        className="w-full h-full object-cover"
                        onError={() => setImgError(true)}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{membro.nome}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{membro.funcao}</p>
                  <p className="text-gray-700 text-sm">{membro.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Pastorais */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Nossas Pastorais</h2>
          <div className="bg-white rounded-lg shadow-md p-8 mb-6">
            <div className="space-y-4 text-gray-700 mb-8">
              <p>
                <strong>PASTORAIS</strong><br />
                Em nosso Santuário, cada uma das pastorais tem o objetivo de servir à 
                comunidade, promovendo a vivência e o crescimento espiritual, fortalecendo os 
                laços de fraternidade e solidariedade entre os membros da paróquia.
              </p>
              <p>
                Elas são fundamentais para o funcionamento e a vitalidade da vida paroquial, 
                assegurando que a missão da Igreja seja cumprida de maneira plena e eficaz.
              </p>
              <p>
                Um ótimo caminho para os paroquianos desejosos em contribuir com as obras 
                da Santa Igreja e com a Paróquia é por meio do trabalho voluntário nas 
                pastorais, onde o paroquiano pode doar competências que já tem ou 
                desenvolver novas por meio do serviço pastoral na área em que tiver afinidade.
              </p>
              <p>
                Nesse caso o paroquiano pode procurar diretamente a coordenação paroquial. 
                Caso o voluntário não tenha preferência, o padre poderá informar quais 
                pastorais demandam mais voluntários.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pastorais.map((pastoral, idx) => {
                const IconComponent = pastoral.icon;
                return (
                  <div key={idx} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <IconComponent className="text-blue-600 mb-4" size={28} />
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{pastoral.titulo}</h3>
                    <p className="text-gray-700 text-sm">{pastoral.descricao}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Convite Final */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Junte-se a Nossa Comunidade</h2>
          <p className="mb-6">
            Venha fazer parte do Santuário Nossa Senhora de Fátima e viva uma experiência 
            única de fé, comunidade e espiritualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/missas" 
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Horários de Missas
            </a>
            <a 
              href="/contato" 
              className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Entre em Contato
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}