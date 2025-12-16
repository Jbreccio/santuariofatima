// frontend/src/pages/FAQ.tsx - VERSÃO COM ÍCONES GARANTIDOS
import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  Heart,          // ✅ Existe - Para orações
  DollarSign,     // ✅ Existe - Para doações
  Church,         // ✅ Existe
  Users,          // ✅ Existe
  Globe           // ✅ Existe
} from 'lucide-react';
import Footer from '../components/layout/Footer';

interface FAQItem {
  id: number;
  pergunta: string;
  resposta: string;
  categoria: 'geral' | 'oracoes' | 'eventos' | 'doacoes' | 'tecnico';
  icon: React.ReactNode;
}

export default function FAQ() {
  const [openItem, setOpenItem] = useState<number | null>(1);
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>('todos');

  const faqItems: FAQItem[] = [
    {
      id: 1,
      pergunta: "Quais são os horários das missas no Santuário?",
      resposta: "As missas são celebradas diariamente: Segunda a sexta às 7h, 12h e 18h. Sábados: 7h, 12h, 16h e 18h. Domingos: 6h, 8h, 10h, 12h, 16h e 18h. Durante festividades especiais, há horários adicionais.",
      categoria: 'geral',
      icon: <Church size={20} />
    },
    {
      id: 2,
      pergunta: "Como enviar uma intenção de oração?",
      resposta: "Você pode enviar intenções de oração através da seção 'Orações' do site, pelo e-mail oracoes@santuario-fatima.org, ou pessoalmente na secretaria do Santuário. Todas as intenções são apresentadas durante as missas.",
      categoria: 'oracoes',
      icon: <Heart size={20} /> // ❤️ Para orações
    },
    {
      id: 3,
      pergunta: "O Santuário aceita doações online?",
      resposta: "Sim, aceitamos doações através de nossa plataforma segura. As doações podem ser únicas ou mensais, e são utilizadas para manutenção do Santuário, obras sociais e formação. Todas as doações são registradas e você recebe recibo para fins fiscais.",
      categoria: 'doacoes',
      icon: <DollarSign size={20} /> // 💵 Para doações
    },
    {
      id: 4,
      pergunta: "Quando ocorre a Festa de Nossa Senhora de Fátima?",
      resposta: "A festa principal ocorre em 13 de maio, com novena preparatória de 4 a 12 de maio. Também celebramos a festa de 13 de outubro (última aparição). Ambas as festas incluem missas solenes, procissão e bênção dos enfermos.",
      categoria: 'eventos',
      icon: <Calendar size={20} />
    },
    {
      id: 5,
      pergunta: "Como faço para me confessar?",
      resposta: "O confessionário está disponível 30 minutos antes de cada missa. Também temos horários específicos: Sábados das 14h às 17h e domingos das 9h às 11h. Para confissão em outras línguas, entre em contato com a secretaria.",
      categoria: 'geral',
      icon: <Users size={20} />
    },
    {
      id: 6,
      pergunta: "O site é seguro para fazer doações?",
      resposta: "Sim, utilizamos criptografia SSL e processadores de pagamento certificados (PCI DSS). Não armazenamos dados de cartão de crédito em nossos servidores. Todas as transações são processadas por gateways de pagamento seguros.",
      categoria: 'tecnico',
      icon: <Globe size={20} />
    },
    {
      id: 7,
      pergunta: "Há estacionamento no Santuário?",
      resposta: "Sim, temos estacionamento gratuito com 200 vagas. Para eventos especiais, disponibilizamos estacionamento adicional. Vagas para idosos e pessoas com deficiência são sinalizadas próximas à entrada.",
      categoria: 'geral',
      icon: <Church size={20} />
    },
    {
      id: 8,
      pergunta: "Como receber as novenas por e-mail?",
      resposta: "Cadastre-se em 'Receba Nossas Novenas' no rodapé do site. Você receberá automaticamente as novenas mensais, reflexões diárias na Quaresma e Advento, e informações sobre festividades.",
      categoria: 'oracoes',
      icon: <Heart size={20} />
    },
    {
      id: 9,
      pergunta: "Posso encomendar uma missa por alguém falecido?",
      resposta: "Sim, você pode encomendar missas através da secretaria, pelo telefone (11) 1234-5678 ou pelo site na seção 'Encomendar Missa'. O valor sugerido é de R$ 30,00, mas aceitamos qualquer oferta.",
      categoria: 'doacoes',
      icon: <DollarSign size={20} />
    },
    {
      id: 10,
      pergunta: "Há transmissão ao vivo das missas?",
      resposta: "Transmitimos todas as missas dominicais às 10h e 18h, além das festas solenes. Acesse nossa página no YouTube 'Santuário de Fátima Live'. As missas ficam disponíveis para assistir posteriormente.",
      categoria: 'tecnico',
      icon: <Globe size={20} />
    },
    {
      id: 11,
      pergunta: "O Santuário realiza batizados e casamentos?",
      resposta: "Sim, realizamos batizados no primeiro domingo de cada mês às 14h. Casamentos devem ser agendados com 6 meses de antecedência. Entre em contato com a secretaria pastoral para os preparativos.",
      categoria: 'eventos',
      icon: <Calendar size={20} />
    },
    {
      id: 12,
      pergunta: "Como faço para me tornar voluntário?",
      resposta: "Temos diversas áreas para voluntariado: acolhimento, catequese, coral, limpeza, jardinagem. Participe de nossa reunião mensal de voluntários (último sábado do mês, 9h) ou entre em contato pelo e-mail voluntarios@santuario-fatima.org.",
      categoria: 'geral',
      icon: <Users size={20} />
    }
  ];

  const categorias = [
    { id: 'todos', nome: 'Todas as Perguntas', count: faqItems.length },
    { id: 'geral', nome: 'Informações Gerais', count: faqItems.filter(item => item.categoria === 'geral').length },
    { id: 'oracoes', nome: 'Orações e Espiritualidade', count: faqItems.filter(item => item.categoria === 'oracoes').length },
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
            Encontre respostas para as dúvidas mais comuns sobre o Santuário
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
                    <div className="text-green-600 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {item.pergunta}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.categoria === 'geral' ? 'bg-blue-100 text-blue-800' :
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
                      <p className="text-gray-700">{item.resposta}</p>
                    </div>
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
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Ainda com dúvidas?</h2>
            <p className="text-gray-700 mb-6">
              Não encontrou a resposta que procurava? Entre em contato conosco.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">📞 Por Telefone</h3>
                <p className="text-gray-600">(11) 55210312</p>
                <p className="text-sm text-gray-500">Segunda a sexta, 8h às 18h</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">📧 Por E-mail</h3>
                <p className="text-gray-600">contato@santuario-fatima.org</p>
                <p className="text-sm text-gray-500">Resposta em até 48h</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-bold text-gray-800 mb-2">📍 Pessoalmente</h3>
                <p className="text-gray-600">Secretaria do Santuário</p>
                <p className="text-sm text-gray-500">Todos os dias, 7h às 20h</p>
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
              <div className="text-2xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Site Disponível</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Satisfação dos Usuários</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow text-center">
              <div className="text-2xl font-bold text-red-600">&lt; 2h</div>
              <div className="text-sm text-gray-600">Tempo Médio de Resposta</div>
            </div>
          </div>
        </div>
      </div>
   
      {/* Footer */}
      <Footer />
      </div>
  );
}
