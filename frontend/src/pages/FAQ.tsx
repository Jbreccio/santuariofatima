import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Heart,          
  DollarSign,     
  Church,         
  Users,          
  Globe,
  Clock
} from 'lucide-react';
import Footer from '../components/layout/Footer';

interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: 'geral' | 'oracoes' | 'eventos' | 'doacoes' | 'tecnico' | 'missas';
  icon: React.ReactNode;
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      pergunta: "Quais são os horários das missas no Santuário?",
      resposta: "TERÇA-FEIRA: 07h30 e 19h30 (com confissão 1h antes) | QUARTA-FEIRA: 19h30 (com confissão 1h antes) | QUINTA-FEIRA: 19h30 (com confissão 1h antes) | SEXTA-FEIRA: 19h30 (com confissão 1h antes) | SÁBADO: 16h30 (com confissão 1h antes) | DOMINGO: 08h00, 10h00 (transmitida AO VIVO pelo YouTube) e 18h30.",
      categoria: 'missas',
      icon: <Clock size={20} />
    },
    {
      id: 2,
      pergunta: "Como enviar uma intenção de missa?",
      resposta: "Você pode enviar intenções de missa através da secretaria do Santuário, pessoalmente ou pelo telefone (31) 3451-2476. As intenções são lidas durante as celebrações e podem ser por falecidos, saúde, graças especiais, etc.",
      categoria: 'oracoes',
      icon: <Heart size={20} />
    },
    {
      id: 3,
      pergunta: "O Santuário aceita doações online?",
      resposta: "Sim, aceitamos doações através de nossa plataforma segura no site. As doações são utilizadas para manutenção do Santuário, obras sociais, eventos litúrgicos e formação. Para doações específicas para manutenção, melhorias ou eventos especiais, entre em contato com a secretaria.",
      categoria: 'doacoes',
      icon: <DollarSign size={20} />
    },
    {
      id: 4,
      pergunta: "Quando ocorrem as principais festividades no Santuário?",
      resposta: "13 de MAIO: Festa principal de Nossa Senhora de Fátima com novena preparatória (4 a 12 de maio) | 13 de OUTUBRO: Última aparição de Nossa Senhora em Fátima | FESTAS JUNINAS: Celebrações especiais com missas diferenciadas | FINAL DO ANO: Missas de Natal e Reveillon com horários especiais.",
      categoria: 'eventos',
      icon: <Calendar size={20} />
    },
    {
      id: 5,
      pergunta: "Como faço para me confessar?",
      resposta: "O sacramento da confissão está disponível TODOS OS DIAS 1 HORA ANTES DE CADA MISSA (conforme disponibilidade do padre). Chegue com antecedência para melhor atendimento. Para confissões em outros horários ou orientações especiais, entre em contato com a secretaria pastoral.",
      categoria: 'missas',
      icon: <Users size={20} />
    },
    {
      id: 6,
      pergunta: "Como assistir às missas transmitidas pelo YouTube?",
      resposta: "As missas de DOMINGO às 10h00 são transmitidas AO VIVO pelo canal oficial do Santuário. Acesse: https://youtube.com/@santuariodefatimanews As transmissões ficam disponíveis para assistir posteriormente. Inscreva-se no canal e ative as notificações para não perder nenhuma celebração.",
      categoria: 'tecnico',
      icon: <Globe size={20} />
    },
    {
      id: 7,
      pergunta: "Há estacionamento no Santuário?",
      resposta: "Sim, temos estacionamento gratuito nas proximidades do Santuário. Durante eventos especiais (13 de maio, festas juninas, Natal), recomendamos chegar com antecedência devido à maior demanda. Há vagas reservadas para idosos e pessoas com deficiência próximas à entrada principal.",
      categoria: 'geral',
      icon: <Church size={20} />
    },
    {
      id: 8,
      pergunta: "Os horários de missa mudam em períodos especiais?",
      resposta: "SIM. Os horários podem sofrer alterações em: 13 DE MAIO (Festa Principal), FESTAS JUNINAS, FINAL DE ANO (Natal e Reveillon) e durante o MÊS DE JANEIRO. Fique atento aos avisos no site, redes sociais e comunicados na secretaria do Santuário.",
      categoria: 'missas',
      icon: <Clock size={20} />
    },
    {
      id: 9,
      pergunta: "Posso encomendar uma missa por alguém falecido ou por alguma intenção especial?",
      resposta: "Sim, você pode encomendar missas através da secretaria do Santuário. As missas podem ser encomendadas por falecidos, aniversários, graças recebidas, saúde, etc. Entre em contato pelo telefone (31) 3451-2476 ou pessoalmente na secretaria para mais informações e valores.",
      categoria: 'oracoes',
      icon: <Heart size={20} />
    },
    {
      id: 10,
      pergunta: "O Santuário realiza batizados e casamentos?",
      resposta: "Sim, realizamos batizados e casamentos. Os batizados geralmente ocorrem em datas específicas mensais. Casamentos devem ser agendados com antecedência mínima de 6 meses. Entre em contato com a secretaria pastoral para orientações, documentos necessários e preparativos.",
      categoria: 'eventos',
      icon: <Calendar size={20} />
    },
    {
      id: 11,
      pergunta: "Como faço para me tornar voluntário no Santuário?",
      resposta: "Temos diversas áreas para voluntariado: acolhimento, canto/coral, limpeza, ornamentação, catequese, eventos especiais. Participe de nossas reuniões de formação ou entre em contato pelo e-mail santuarionsradefatima@santoamaro.org.br. Todos são bem-vindos para servir à communauté.",
      categoria: 'geral',
      icon: <Users size={20} />
    },
    {
      id: 12,
      pergunta: "Como entrar em contato com o Santuário?",
      resposta: "TELEFONE: (011) 5521-0312 | E-MAIL: santuarionsradefatima@santoamaro.org.br | ENDEREÇO: Rua Darwin, 651, Santo Amaro CEP 04741-011 – São Paulo, SP | SECRETARIA: Terça à Sexta-Feira - horario: 08h30 às 12h00 e das 13h00 às 17h30 aos Sábados - horario: 08h00 às 12h00 e das 13h00 às 17h00 e aos Domingos - horario: Fechado. Para assuntos específicos: pastoral, eventos, voluntariado, temos contatos dedicados disponíveis no site.",
      categoria: 'geral',
      icon: <Globe size={20} />
    },
    {
      id: 13,
      pergunta: "Há grupos de oração ou movimentos no Santuário?",
      resposta: "Sim, temos diversos grupos: Terço dos Homens (terças-feiras), Apostolado da Oração, Grupo de Jovens, Catequese para crianças e adultos, Grupo de Mães que oram pelos filhos. Consulte a secretaria para horários e dias de reunião de cada grupo.",
      categoria: 'oracoes',
      icon: <Heart size={20} />
    },
    {
      id: 14,
      pergunta: "O site do Santuário é seguro para navegar e fazer doações?",
      resposta: "Sim, utilizamos criptografia SSL em todo o site. Para doações, trabalhamos com processadores de pagamento certificados (PCI DSS). Não armazenamos dados financeiros em nossos servidores. Todas as transações são seguras e você recebe comprovante diretamente em seu celular, por se tratar de uma transferencia bancaria ou doação por PIX o escanemento de QRCODE.",
      categoria: 'tecnico',
      icon: <Globe size={20} />
    },
    {
      id: 15,
      pergunta: "Como receber informações sobre eventos e novenas?",
      resposta: "Acompanhe nossas Redes Sociais ou mande suas duvidas para o email - santuarionsradefatima@santoamaro.org.br.",
      categoria: 'tecnico',
      icon: <Globe size={20} />
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todas as Perguntas', count: faqItems.length },
    { id: 'missas', nome: 'Missas e Horários', count: faqItems.filter(item => item.categoria === 'missas').length },
    { id: 'geral', nome: 'Informações Gerais', count: faqItems.filter(item => item.categoria === 'geral').length },
    { id: 'oracoes', nome: 'Orações e Intenções', count: faqItems.filter(item => item.categoria === 'oracoes').length },
    { id: 'eventos', nome: 'Eventos e Celebrações', count: faqItems.filter(item => item.categoria === 'eventos').length },
    { id: 'doacoes', nome: 'Doações e Contribuições', count: faqItems.filter(item => item.categoria === 'doacoes').length },
    { id: 'tecnico', nome: 'Tecnologia e Site', count: faqItems.filter(item => item.categoria === 'tecnico').length }
  ];

  const itensFiltrados = categoriaAtiva === 'todos' 
    ? faqItems 
    : faqItems.filter(item => item.categoria === categoriaAtiva);

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <HelpCircle size={48} className="text-green-300" />
            <h1 className="text-4xl font-bold">Perguntas Frequentes (FAQ)</h1>
          </div>
          <p className="text-xl text-green-200 max-w-3xl">
            Encontre respostas para as dúvidas mais comuns sobre o Santuário de Nossa Senhora de Fátima
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Busca e categorias */}
          <div className="mb-12">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Encontre sua resposta</h2>
              
              {/* Categorias */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Categorias</h3>
                <div className="flex flex-wrap gap-3">
                  {categorias.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaAtiva(cat.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        categoriaAtiva === cat.id
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat.nome} ({cat.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Barra de busca */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Digite sua pergunta..."
                  className="w-full p-4 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  onChange={(e) => {
                    // Adicionar funcionalidade de busca se necessário
                    console.log(e.target.value);
                  }}
                />
                <HelpCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              </div>
            </div>
          </div>

          {/* Lista de FAQ */}
          <div className="space-y-4">
            {itensFiltrados.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`mt-1 ${
                      item.categoria === 'missas' ? 'text-blue-600' :
                      item.categoria === 'geral' ? 'text-green-600' :
                      item.categoria === 'oracoes' ? 'text-purple-600' :
                      item.categoria === 'eventos' ? 'text-yellow-600' :
                      item.categoria === 'doacoes' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.pergunta}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.categoria === 'missas' ? 'bg-blue-100 text-blue-800' :
                          item.categoria === 'geral' ? 'bg-green-100 text-green-800' :
                          item.categoria === 'oracoes' ? 'bg-purple-100 text-purple-800' :
                          item.categoria === 'eventos' ? 'bg-yellow-100 text-yellow-800' :
                          item.categoria === 'doacoes' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {categorias.find(c => c.id === item.categoria)?.nome || item.categoria}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4 text-gray-400">
                    {openItem === item.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                  </div>
                </button>
                
                {openItem === item.id && (
                  <div className="px-6 pb-6 border-t pt-4">
                    <div className="prose max-w-none">
                      <p className="text-gray-700 whitespace-pre-line">{item.resposta}</p>
                    </div>
                    {item.id === 1 && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">📅 Horários Resumidos:</h4>
                        <ul className="text-blue-700 text-sm space-y-1">
                          <li>• <strong>Terça a Sexta:</strong> 19h30 (com confissão 1h antes)</li>
                          <li>• <strong>Sábado:</strong> 16h30 (com confissão 1h antes)</li>
                          <li>• <strong>Domingo:</strong> 08h00, 10h00 (YouTube AO VIVO), 18h30</li>
                          <li>• <strong>Terça:</strong> Também 07h30</li>
                        </ul>
                      </div>
                    )}
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm text-gray-500">
                        Esta resposta foi útil? 
                        <button className="ml-2 text-green-600 hover:text-green-800 font-medium">Sim</button>
                        <button className="ml-4 text-red-600 hover:text-red-800 font-medium">Não</button>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Ainda com dúvidas? */}
          <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 border border-blue-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ainda com dúvidas sobre horários de missas?</h2>
            <p className="text-gray-700 mb-6">
              Para informações atualizadas sobre horários, mudanças em datas especiais ou confirmações, entre em contato:
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">📞 Por Telefone</h3>
                <p className="text-gray-600 font-medium">(011) 5521-0312</p>
                <p className="text-sm text-gray-500">Terça a Sabado, 8h às 17h</p>
                <p className="text-sm text-gray-500 mt-2">Sábados: 8h às 12h</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                {/* ALTERAÇÃO AQUI: SVG do YouTube igual à página de missas */}
                <div className="flex flex-col items-center justify-center gap-1 mb-3">
                  <div className="text-center">
                    <p className="text-sm font-semibold text-gray-700 mb-0.5">
                      Transmitida
                    </p>
                    <p className="text-sm font-semibold text-red-600 mb-0.5">
                      AO VIVO
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="text-sm text-gray-600 font-medium">
                      pelo
                    </span>
                    <div className="flex items-center gap-1">
                      <svg 
                        className="w-5 h-5 text-red-600 fill-red-600" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                      </svg>
                      <span className="text-sm text-gray-600 font-medium">
                        YouTube
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-3 text-center">Domingos às 10h00</p>
                <a 
                  href="https://youtube.com/@santuariodefatimanews" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium mt-2 inline-block text-center w-full"
                >
                  Acessar canal →
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">📍 Secretaria do Santuário</h3>
                <p className="text-gray-600">Horário de atendimento:</p>
                <p className="text-sm text-gray-500">Segunda a sexta: 8:30h-17:30h</p>
                <p className="text-sm text-gray-500">Sábado: 8h-17h</p>
                <p className="text-sm text-gray-500">Domingo: Fechado</p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-green-600">{faqItems.length}</div>
              <div className="text-sm text-gray-600">Perguntas Respondidas</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-gray-600">Missas Semanais</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-purple-600">1h</div>
              <div className="text-sm text-gray-600">Antecedência Confissão</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-600">100%</div>
              <div className="text-sm text-gray-600">Transmissão Domingo 10h</div>
            </div>
          </div>

          {/* Link para página de missas */}
          <div className="mt-8 text-center">
            <a 
              href="/missas" 
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <Calendar size={20} />
              <span>Ver página completa de Horários de Missas</span>
            </a>
          </div>
        </div>
      </div>
   
      {/* Footer */}
      <Footer />
    </div>
  );
}