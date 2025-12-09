import React from 'react';
import { Clock, Music, Users, Heart, BookOpen, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/layout/Footer';

export default function MissasPreview() {
  const horarios = [
    {
      dia: "Terça-Feira",
      missas: [
        { hora: "07h30" },
        { hora: "19h30", tipo: "Confissão - Chegue com 1h de antecedência" },
      ],
    },
    {
      dia: "Quarta-Feira",
      missas: [
        { hora: "19h30", tipo: "Confissão - Chegue com 1h de antecedência" },
      ],
    },
    {
      dia: "Quinta-Feira",
      missas: [
        { hora: "19h30", tipo: "Confissão - Chegue com 1h de antecedência" },
      ],
    },
    {
      dia: "Sexta-Feira",
      missas: [
        { hora: "19h30", tipo: "Confissão - Chegue com 1h de antecedência" },
      ],
    },
    {
      dia: "Sábado",
      missas: [
        { hora: "16h30", tipo: "Confissão - Chegue com 1h de antecedência" },
      ],
    },
    {
      dia: "Domingo",
      missas: [
        { hora: "08h00" },
        { hora: "10h00", tipo: "Transmitida AO VIVO", youtube: true, youtubeLink: "https://youtube.com/@santuariodefatimanews?si=pQ6hupSToauGO1IV" },
        { hora: "18h30" },
      ],
    },
  ];

  const informacoes = [
    {
      icon: Music,
      titulo: "Música Litúrgica",
      descricao: "Contamos com um coral paroquial que anima nossas celebrações com belas músicas.",
      color: "from-purple-100 to-purple-50"
    },
    {
      icon: Users,
      titulo: "Comunidade Acolhedora",
      descricao: "Somos uma comunidade acolhedora que recebe a todos com amor e respeito.",
      color: "from-green-100 to-green-50"
    },
    {
      icon: Clock,
      titulo: "Horários Flexíveis",
      descricao: "Oferecemos missas em diferentes horários para atender a todos.",
      color: "from-blue-100 to-blue-50"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">
              Santuário Nossa Senhora de Fátima
            </h1>
          </div>
        </div>
      </header>

      {/* === NOVA SEÇÃO COM IMAGEM DE FAIXA NO TOPO - COM ÍCONE FLUTUANTE === */}
      <section className="relative w-full overflow-hidden bg-gray-900">
        {/* CONTAINER - AJUSTE A ALTURA AQUI */}
        <div className="relative h-[500px] sm:h-[500px] md:h-[500px] lg:h-[750px] overflow-hidden">
          {/* Imagem como faixa */}
          <img 
            src="/missasbunner.png" 
            alt="Entrada do Santuário - Calendário Litúrgico"
            className="absolute inset-0 w-full h-full object-cover object-[center_30%]"
          />
          
          {/* Overlay gradiente */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          
          {/* Conteúdo sobre a faixa - ÍCONE FLUTUANTE */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            
            {/* ÍCONE FLUTUANTE ACIMA DO TEXTO */}
            <div className="relative -top-4 sm:-top-6 md:-top-8 mb-2 sm:mb-3">
              <div className="text-white">
                <Calendar 
                  className="text-white" 
                  size={44} 
                  sm:size={56}
                  md:size={90}
                  strokeWidth={1.8} 
                />
              </div>
            </div>
            
            {/* FRASES ABAIXO DO ÍCONE */}
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Horários de Missas
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md">
                Participe de nossas celebrações e fortaleça sua fé em comunidade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Faixa Original - IMAGEM AMPLIFICADA (se ainda quiser manter) */}
      {/* Se quiser usar apenas uma, remova esta seção abaixo */}
      {false && ( // Alterado para false para não mostrar a seção antiga, mantenha como true se quiser ambas
        <div className="relative w-full overflow-hidden bg-gray-900">
          <div className="relative h-[250px] sm:h-[320px] md:h-[400px] lg:h-[480px] xl:h-[550px] overflow-hidden">
            <div className="relative w-full h-full">
              <img 
                src="/missasbunner.png"
                alt="Banner Missas"
                className="absolute inset-0 w-full h-full object-cover object-[center_25%] sm:object-[center_30%] md:object-[center_35%] scale-110"
                style={{
                  filter: 'brightness(1.08) contrast(1.08) saturate(1.15)',
                  imageRendering: 'crisp-edges'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            </div>
            
            <div className="relative z-10 h-full flex flex-col items-center justify-center pt-24 sm:pt-32 md:pt-40 lg:pt-48">
              <div className="mb-2 sm:mb-3">
                <div className="bg-white/20 backdrop-blur-sm px-4 sm:px-5 py-1.5 sm:py-2 rounded-full shadow-lg border border-white/30">
                  <span className="text-white text-sm sm:text-base font-semibold tracking-wider">
                    + Missas
                  </span>
                </div>
              </div>
              
              <div className="mb-3 sm:mb-4">
                <div className="bg-white/25 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-2xl border border-white/30">
                  <svg 
                    className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M2 12h20" />
                  </svg>
                </div>
              </div>
              
              <div className="text-center px-4 max-w-4xl mx-auto">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                  Horários de Missas
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-3xl mx-auto px-4 drop-shadow-md">
                  Participe de nossas celebrações e fortaleça sua fé em comunidade
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {/* Horários - RESPONSIVO */}
        <section className="mb-10 sm:mb-12">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Horários das Celebrações
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Confira os horários das missas durante a semana
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {horarios.map((dia, idx) => (
              <div 
                key={idx} 
                className="bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 sm:p-4 text-white">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm sm:text-base font-bold truncate">{dia.dia}</h2>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 opacity-80" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                  </div>
                </div>

                <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                  {dia.missas.map((missa, mIdx) => (
                    <div 
                      key={mIdx} 
                      className="bg-white rounded-lg p-3 shadow-xs hover:shadow-sm transition-all duration-200 border-l-3 border-blue-400"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="bg-blue-100 rounded-full p-1 sm:p-1.5">
                          <Clock size={14} sm:size={16} className="text-blue-600" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold text-gray-800">{missa.hora}</span>
                      </div>
                      
                      {missa.tipo && (
                        <div className="mt-2">
                          {missa.youtube ? (
                            <div className="flex flex-col items-center justify-center gap-1">
                              <div className="text-center">
                                <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-0.5">
                                  Transmitida
                                </p>
                                <p className="text-xs sm:text-sm font-semibold text-red-600 mb-0.5">
                                  AO VIVO
                                </p>
                              </div>
                              
                              <div className="flex items-center justify-center gap-1.5 mt-1">
                                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                                  pelo
                                </span>
                                <a 
                                  href={missa.youtubeLink} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 group"
                                >
                                  <svg 
                                    className="w-5 h-5 text-red-600 fill-red-600 group-hover:scale-110 transition-transform" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                                  </svg>
                                  <span className="text-xs sm:text-sm text-gray-600 font-medium group-hover:text-blue-600 transition-colors">
                                    YouTube
                                  </span>
                                </a>
                              </div>
                            </div>
                          ) : (
                            <p className="text-xs sm:text-sm text-gray-600 font-medium leading-tight text-center">
                              {missa.tipo}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Informações - RESPONSIVO */}
        <section className="mb-10 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Por Que Participar?
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Descubra o que torna nossas celebrações especiais
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {informacoes.map((info, idx) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br ${info.color} rounded-xl shadow-sm p-4 sm:p-6 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 shadow-xs mx-auto md:mx-0">
                    <IconComponent className="text-blue-600" size={24} sm:size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center md:text-left">
                    {info.titulo}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base text-center md:text-left">
                    {info.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Confissões - CORRIGIDO E RESPONSIVO */}
        <section className="mb-10 sm:mb-12">
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl shadow-sm overflow-hidden border border-rose-200">
            <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-4 sm:p-6 text-white">
              <div className="flex items-center gap-3">
                <Heart size={24} sm:size={28} />
                <h2 className="text-xl sm:text-2xl font-bold">Confissão</h2>
              </div>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Reconcilie-se com DEUS através do Sacramento da Penitência, no qual recebemos o perdão, a paz e a graça para recomeçar. A Confissão é um encontro de misericórdia em que Cristo nos acolhe, nos cura e nos fortalece no caminho da santidade.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-2">
                    <svg 
                      className="w-5 h-5 text-rose-600" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5"
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M12 2v20M2 12h20" />
                    </svg>
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Horários Regulares</h3>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Todos os dias 1 hora antes da missa (conforme disponibilidade do padre).
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="text-rose-600" size={20} />
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Preparação</h3>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Chegue com 1 hora de antecedência para melhor atendimento.
                  </p>
                </div>
                
                <div className="bg-white rounded-lg p-4 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="text-rose-600" size={20} />
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base">Outros Horários</h3>
                  </div>
                  <p className="text-gray-700 text-xs sm:text-sm">
                    Clique abaixo e entre em contato conosco para horários especiais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avisos Importantes - RESPONSIVO */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 sm:p-6 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="bg-yellow-100 rounded-full p-2 sm:p-3 flex-shrink-0">
                <BookOpen className="text-yellow-600" size={20} sm:size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg sm:text-xl">Atenção!</h3>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  Os horários podem sofrer alterações em feriados ou datas especiais. 
                  Consulte nosso calendário de eventos ou entre em contato para mais informações.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-4 sm:p-6 shadow-sm text-white">
            <h3 className="font-bold text-xl sm:text-3xl mb-3">Venha nos visitar!</h3>
            <p className="mb-4 sm:mb-6 leading-relaxed opacity-95 text-sm sm:text-base">
              Todos são bem-vindos ao Santuário. Traga sua família e amigos para celebrar conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link 
                to="/localizacao"
                className="bg-white text-blue-600 px-4 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm sm:text-base shadow-sm"
              >
                Ver Localização
              </Link>
              
              <Link 
                to="/contato"
                className="bg-blue-800 text-white px-4 py-2.5 rounded-lg font-semibold hover:bg-blue-900 transition-colors text-center text-sm sm:text-base shadow-sm"
              >
                Entre em Contato
              </Link>
            </div>
          </div>
        </section>

        {/* Link para Liturgia */}
        <div className="mt-8 sm:mt-10 text-center">
  <Link 
    to="/#liturgia"  // ← AGORA COM ÂNCORA!
    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base"
    onClick={(e) => {
      // Se já estiver na página inicial, rola suavemente
      if (window.location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById('liturgia');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          // Atualiza a URL com a âncora
          window.history.pushState({}, '', '/#liturgia');
        }
      }
    }}
  >
    <BookOpen size={16} sm:size={18} />
    <span>Ver Liturgia do Dia</span>
  </Link>
</div>
      </main>

      <Footer />
    </div>
  );
}