import React from 'react';
import { Clock, Music, Users, Calendar, Heart, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom'; // ← MUDE PARA react-router-dom
import Footer from '../components/layout/Footer';

export default function MissasPreview() {
  const horarios = [
    {
      dia: "Terça-Feira",
      missas: [
        { hora: "07h30", tipo: "Missa Matinal" },
        { hora: "19h30", tipo: "Missa Vespertina" },
      ],
    },
    {
      dia: "Quarta-Feira",
      missas: [
        { hora: "19h30", tipo: "Missa Vespertina" },
      ],
    },
    {
      dia: "Quinta-Feira",
      missas: [
        { hora: "19h30", tipo: "Missa Vespertina" },
      ],
    },
    {
      dia: "Sexta-Feira",
      missas: [
        { hora: "19h30", tipo: "Missa Vespertina" },
      ],
    },
    {
      dia: "Sábado",
      missas: [
        { hora: "16h30", tipo: "Missa Vespertina" },
      ],
    },
    {
      dia: "Domingo",
      missas: [
        { hora: "08h00", tipo: "Missa Matinal" },
        { hora: "10h00", tipo: "Missa Principal" },
        { hora: "18h30", tipo: "Missa Vespertina" },
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
      {/* Header Simples */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-900">Santuário Nossa Senhora de Fátima</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-block mb-3">
            <Calendar className="text-blue-600 mx-auto" size={40} strokeWidth={1.5} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 text-gray-900">Horários de Missas</h1>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Participe de nossas celebrações eucarísticas e fortaleça sua fé em comunidade
          </p>
        </div>

        {/* Horários - 6 QUADRADOS EM 1 LINHA (em telas grandes) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-10">
          {horarios.map((dia, idx) => (
            <div 
              key={idx} 
              className="bg-gradient-to-br from-white to-blue-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-200"
            >
              {/* Header do Card - MENOR */}
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold truncate">{dia.dia}</h2>
                  <Calendar className="opacity-70" size={16} />
                </div>
              </div>

              {/* Conteúdo - MENOR */}
              <div className="p-3 space-y-2">
                {dia.missas.map((missa, mIdx) => (
                  <div 
                    key={mIdx} 
                    className="bg-white rounded-lg p-2 shadow-xs hover:shadow-sm transition-all duration-300 border-l-3 border-blue-400"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-blue-100 rounded-full p-1">
                        <Clock size={14} className="text-blue-600" />
                      </div>
                      <span className="text-lg font-bold text-gray-800">{missa.hora}</span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium ml-7 truncate">{missa.tipo}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Informações Adicionais */}
        <section className="mb-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Por Que Participar?</h2>
            <p className="text-sm text-gray-600">Descubra o que torna nossas celebrações especiais</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {informacoes.map((info, idx) => {
              const IconComponent = info.icon;
              return (
                <div 
                  key={idx} 
                  className={`bg-gradient-to-br ${info.color} rounded-xl shadow-sm p-5 hover:scale-102 transition-transform duration-300`}
                >
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-3 shadow-xs">
                    <IconComponent className="text-blue-600" size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{info.titulo}</h3>
                  <p className="text-gray-700 leading-relaxed text-sm">{info.descricao}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Confissões */}
        <section className="mb-10">
          <div className="bg-gradient-to-r from-rose-50 to-orange-50 rounded-xl shadow-sm overflow-hidden border border-rose-200">
            <div className="bg-gradient-to-r from-rose-400 to-orange-400 p-4 text-white">
              <div className="flex items-center gap-2">
                <Heart size={24} />
                <h2 className="text-xl font-bold">Sacramento da Confissão</h2>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-700 mb-4 text-sm">
                Reconcilie-se com Deus através do Sacramento da Penitência. Confira os horários disponíveis:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white rounded-lg p-3 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="text-rose-600" size={18} />
                    <h3 className="font-bold text-gray-900 text-sm">Sábados</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">1 Hora antes da missa vespertina</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="text-rose-600" size={18} />
                    <h3 className="font-bold text-gray-900 text-sm">Domingos</h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">1 Hora antes da missa principal</p>
                </div>

                <div className="bg-white rounded-lg p-3 shadow-xs border-l-3 border-rose-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="text-rose-600" size={18} />
                    <h3 className="font-bold text-gray-900 text-sm">Outros Horários</h3>
                  </div>
                  <p className="text-gray-700 text-sm">Agendamento prévio</p>
                  <p className="text-xs text-gray-500 mt-1">Entre em contato conosco</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avisos Importantes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nota sobre alterações */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 shadow-sm border-l-4 border-yellow-500">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-100 rounded-full p-2 flex-shrink-0">
                <BookOpen className="text-yellow-600" size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Atenção!</h3>
                <p className="text-gray-700 leading-relaxed text-sm">
                  Os horários podem sofrer alterações em feriados ou datas especiais. 
                  Consulte nosso calendário de eventos ou entre em contato para mais informações.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action - CORRIGIDO */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 shadow-sm text-white">
            <h3 className="font-bold text-xl mb-2">Venha nos visitar!</h3>
            <p className="mb-4 leading-relaxed opacity-90 text-sm">
              Todos são bem-vindos ao Santuário. Traga sua família e amigos para celebrar conosco.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Links do react-router-dom */}
              <Link 
                to="/localizacao"
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center text-sm"
              >
                Ver Localização
              </Link>
              
              <Link 
                to="/eventos"
                className="bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors text-center text-sm"
              >
                Próximos Eventos
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}