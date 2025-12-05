import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Users, Heart, BookOpen, Music, Home, Droplet, HeartHandshake, Radio } from "lucide-react";

export default function Pastorais() {
  const pastorais = [
    {
      id: 1,
      nome: "Pastoral de Acolhida",
      icon: Heart,
      descricao: "Responsável por acolher visitantes e novos membros da comunidade.",
      atividades: [
        "Recepção de visitantes",
        "Integração de novos membros",
        "Visitas pastorais",
      ],
      color: "from-pink-500 to-pink-600"
    },
    {
      id: 2,
      nome: "Pastoral da Catequese",
      icon: BookOpen,
      descricao: "Dedica-se ao ensino da fé e formação religiosa.",
      atividades: [
        "Aulas de catecismo",
        "Preparação para sacramentos",
        "Formação de catequistas",
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      id: 3,
      nome: "Pastoral da Música",
      icon: Music,
      descricao: "Responsável pela música litúrgica e celebrações.",
      atividades: [
        "Coral paroquial",
        "Ensaios de músicas litúrgicas",
        "Apresentações em celebrações",
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      id: 4,
      nome: "Pastoral Social",
      icon: Users,
      descricao: "Trabalha com ações sociais e atendimento aos necessitados.",
      atividades: [
        "Distribuição de alimentos",
        "Atendimento social",
        "Campanhas beneficentes",
      ],
      color: "from-green-500 to-green-600"
    },
    {
      id: 5,
      nome: "Pastoral da Saúde",
      icon: Heart,
      descricao: "Acompanha enfermos e oferece suporte espiritual.",
      atividades: [
        "Visitas a hospitais",
        "Acompanhamento de doentes",
        "Oração pelos enfermos",
      ],
      color: "from-red-500 to-red-600"
    },
    {
      id: 6,
      nome: "Pastoral Familiar",
      icon: Home,
      descricao: "Fortalece os laços familiares e oferece orientação.",
      atividades: [
        "Encontros familiares",
        "Preparação para casamento",
        "Orientação familiar",
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      id: 7,
      nome: "Pastoral do Batismo",
      icon: Droplet,
      descricao: "Prepara famílias para o sacramento do batismo e acompanha os batizados.",
      atividades: [
        "Preparação de pais e padrinhos",
        "Celebrações de batismo",
        "Acompanhamento pós-batismal",
      ],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      id: 8,
      nome: "Pastoral dos Noivos",
      icon: HeartHandshake,
      descricao: "Prepara casais para o sacramento do matrimônio.",
      atividades: [
        "Cursos de preparação matrimonial",
        "Encontros de noivos",
        "Acompanhamento de casais",
      ],
      color: "from-rose-500 to-rose-600"
    },
    {
      id: 9,
      nome: "PASCOM - Pastoral da Comunicação",
      icon: Radio,
      descricao: "Responsável pela comunicação e evangelização através das mídias.",
      atividades: [
        "Gestão das redes sociais",
        "Transmissões ao vivo",
        "Produção de conteúdo",
      ],
      color: "from-indigo-500 to-indigo-600"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Nossas Pastorais</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça as pastorais que trabalham para fortalecer nossa comunidade e levar o amor de Cristo a todos
          </p>
        </div>

        {/* Grid de Pastorais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {pastorais.map((pastoral) => {
            const IconComponent = pastoral.icon;
            return (
              <div
                key={pastoral.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Header com gradiente */}
                <div className={`bg-gradient-to-r ${pastoral.color} p-6 text-white`}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white bg-opacity-20 rounded-full p-3">
                      <IconComponent size={28} strokeWidth={2} />
                    </div>
                    <h2 className="text-xl font-bold">{pastoral.nome}</h2>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <p className="text-gray-700 mb-4 leading-relaxed">{pastoral.descricao}</p>
                  
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <span className="w-1 h-5 bg-blue-500 rounded"></span>
                      Atividades:
                    </h3>
                    <ul className="space-y-2">
                      {pastoral.atividades.map((atividade, idx) => (
                        <li key={idx} className="text-gray-600 flex items-start gap-2 text-sm">
                          <span className="text-blue-600 mt-1 font-bold">•</span>
                          {atividade}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer do card - REMOVIDO O BOTÃO */}
                <div className="px-6 pb-6">
                  {/* Botão removido - espaço vazio ou pode remover esta div se quiser */}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Quer Participar?</h2>
          <p className="text-lg mb-6">
            Entre em contato conosco para saber como participar de uma de nossas pastorais
          </p>
          <a
            href="/contato"
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Entre em Contato
          </a>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}