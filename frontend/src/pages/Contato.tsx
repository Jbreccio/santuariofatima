import { useState } from "react";
import Footer from "../components/layout/Footer";
import { Mail, Phone, MapPin, Send, Clock, FileText, NavigationIcon, MessageCircle } from "lucide-react";

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
    mensagem: "",
  });

  const [enviado, setEnviado] = useState(false);

  const horarios = [
    { dia: "Terça à Sexta-Feira", horario: "08h30 às 12h00 e das 13h00 às 17h30" },
    { dia: "Sábado", horario: "08h00 às 12h00 e das 13h00 às 17h00" },
    { dia: "Domingo", horario: "Fechado" },
  ];

  const procedimentos = [
    {
      titulo: "Solicitação de Certidão",
      passos: [
        "Comparecer à secretaria com documento de identidade",
        "Preencher formulário de solicitação",
        "Informar dados do batismo/casamento/óbito",
        "Pagar taxa (se aplicável)",
        "Retirar certidão no prazo estabelecido",
      ],
      icone: "📄",
    },
    {
      titulo: "Preparação para Batismo",
      passos: [
        "Agendar entrevista com o pároco",
        "Participar de encontro de preparação",
        "Apresentar documentação necessária",
        "Escolher padrinhos",
        "Agendar data do batismo",
      ],
      icone: "💧",
    },
    {
      titulo: "Preparação para Casamento",
      passos: [
        "Agendar entrevista com o pároco",
        "Participar de encontros de preparação",
        "Apresentar documentação necessária",
        "Realizar exame pré-matrimonial",
        "Agendar data da cerimônia",
      ],
      icone: "💍",
    },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    setEnviado(true);
    setFormData({
      nome: "",
      email: "",
      telefone: "",
      assunto: "",
      mensagem: "",
    });
    setTimeout(() => setEnviado(false), 5000);
  };

  const enderecoMaps = "Rua+Darwin,+651+-+Santo+Amaro,+São+Paulo+-+SP,+04741-011";
  const googleMapsUrl = `https://www.google.com/maps?q=${enderecoMaps}&output=embed`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${enderecoMaps}`;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      {/* pt-16 para compensar o Navigation fixo que já está no App.tsx */}
      
      <main className="flex-grow max-w-6xl mx-auto px-4 py-8 sm:py-12 w-full">
        {/* Header com Imagem do Santuário */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-10 mt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/70 z-10"></div>
          <img 
            src="/images/carrosselFotos/fachada1.png" 
            alt="Fachada do Santuário Nossa Senhora de Fátima"
            className="w-full h-64 sm:h-80 md:h-96 object-cover"
            onError={(e) => {
              console.error('❌ Erro ao carregar imagem da igreja');
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (!parent) return;
              
              const fallbackDiv = document.createElement('div');
              fallbackDiv.className = 'w-full h-64 sm:h-80 md:h-96 bg-gradient-to-r from-blue-900 to-purple-900 flex items-center justify-center';
              fallbackDiv.innerHTML = `
                <div class="text-white text-center p-8">
                  <svg class="w-16 h-16 mx-auto mb-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                  <h2 class="text-2xl font-bold mb-2">Santuário Nossa Senhora de Fátima</h2>
                  <p class="text-blue-100">Rua Darwin, 651 - Santo Amaro, São Paulo</p>
                </div>
              `;
              parent.appendChild(fallbackDiv);
            }}
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
              Entre em Contato Conosco
            </h1>
          </div>
        </div>

        {/* Seção: Informações Principais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          {/* Horário de Funcionamento */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Clock className="text-blue-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Horário de Funcionamento</h2>
            </div>
            <div className="space-y-4">
              {horarios.map((horario, idx) => (
                <div key={idx} className="pb-3 border-b border-gray-100 last:border-b-0">
                  <p className="font-semibold text-gray-900 text-sm">{horario.dia}</p>
                  <p className="text-gray-700 text-sm">{horario.horario}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contato Telefone/Email */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-green-100 rounded-lg">
                <Phone className="text-green-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Contato Direto</h2>
            </div>
            <div className="space-y-5">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Telefone</h3>
                <a 
                  href="tel:+551155210312" 
                  className="text-xl font-bold text-gray-800 hover:text-green-600 transition-colors inline-flex items-center gap-2"
                >
                  <span className="p-1.5 bg-green-50 rounded-lg">📞</span>
                  (11) 5521-0312
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email</h3>
                <a 
                  href="mailto:santuarionsradefatima@santoamaro.org.br"
                  className="text-gray-800 hover:text-blue-600 transition-colors break-all inline-flex items-center gap-2"
                >
                  <span className="p-1.5 bg-blue-50 rounded-lg">✉️</span>
                  <span className="text-sm">santuarionsradefatima@santoamaro.org.br</span>
                </a>
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-purple-100 rounded-lg">
                <MapPin className="text-purple-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Endereço</h2>
            </div>
            <div>
              <p className="text-gray-800 mb-3 text-sm">
                Rua Darwin, 651 – Santo Amaro<br />
                04741-011 – São Paulo, SP
              </p>
              <a 
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium text-sm"
              >
                <NavigationIcon size={16} />
                Ver rotas no Google Maps
              </a>
            </div>
          </div>
        </div>

        {/* Formulário de Contato - REDESENHADO */}
        <section className="mb-10">
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg overflow-hidden border border-blue-100">
            {/* Cabeçalho do Formulário */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 sm:p-8 text-white">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <MessageCircle className="text-white" size={24} />
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">Envie-nos uma Mensagem</h2>
                  </div>
                  <p className="text-blue-100 text-sm sm:text-base max-w-2xl">
                    Tem dúvidas, sugestões ou precisa de informações? Preencha o formulário abaixo e entraremos em contato com você o mais breve possível.
                  </p>
                </div>
                <div className="hidden sm:block p-3 bg-white/10 rounded-lg">
                  <Send className="text-white" size={28} />
                </div>
              </div>
            </div>

            {/* Corpo do Formulário */}
            <div className="p-6 sm:p-8">
              {enviado && (
                <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-600 p-4 rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-green-100 rounded-full">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-green-800 font-semibold">Mensagem enviada com sucesso!</p>
                      <p className="text-green-600 text-sm">Entraremos em contato em breve. Obrigado!</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Nome */}
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-sm font-semibold text-gray-900">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="Digite seu nome completo"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900">
                      Email *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="seu.email@exemplo.com"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Mail className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Telefone */}
                  <div className="space-y-2">
                    <label htmlFor="telefone" className="block text-sm font-semibold text-gray-900">
                      Telefone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                        placeholder="(11) 99999-9999"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Phone className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Assunto */}
                  <div className="space-y-2">
                    <label htmlFor="assunto" className="block text-sm font-semibold text-gray-900">
                      Assunto *
                    </label>
                    <div className="relative">
                      <select
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white appearance-none"
                      >
                        <option value="">Selecione um assunto</option>
                        <option value="informacoes">Informações Gerais</option>
                        <option value="sacramentos">Sacramentos</option>
                        <option value="pastorais">Pastorais</option>
                        <option value="eventos">Eventos</option>
                        <option value="doacoes">Doações</option>
                        <option value="certidoes">Certidões</option>
                        <option value="outro">Outro</option>
                      </select>
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mensagem */}
                <div className="space-y-2">
                  <label htmlFor="mensagem" className="block text-sm font-semibold text-gray-900">
                    Mensagem *
                  </label>
                  <div className="relative">
                    <textarea
                      id="mensagem"
                      name="mensagem"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none"
                      placeholder="Escreva sua mensagem aqui..."
                    ></textarea>
                    <div className="absolute left-3 top-3 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Botão de Enviar */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span className="p-1.5 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                      <Send size={18} className="transform group-hover:scale-110 transition-transform" />
                    </span>
                    <span className="text-lg">Enviar Mensagem</span>
                  </button>
                  <p className="text-center text-gray-500 text-sm mt-3">
                    * Campos obrigatórios
                  </p>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Procedimentos da Secretaria */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText className="text-orange-600" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Procedimentos da Secretaria</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {procedimentos.map((procedimento, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-blue-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{procedimento.icone}</span>
                  <h3 className="text-lg font-bold text-gray-900">{procedimento.titulo}</h3>
                </div>
                <ol className="space-y-3">
                  {procedimento.passos.map((passo, pIdx) => (
                    <li key={pIdx} className="flex gap-3">
                      <span className="flex-shrink-0 w-7 h-7 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-sm">
                        {pIdx + 1}
                      </span>
                      <span className="text-gray-700 text-sm">{passo}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Mapa */}
        <section className="bg-white rounded-xl shadow-lg p-5 sm:p-8 mb-8 border border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Localização</h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Rua Darwin, 651 - Santo Amaro, São Paulo - SP</p>
            </div>
            <a 
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow hover:shadow-md mt-3 sm:mt-0 text-sm"
            >
              <NavigationIcon size={16} />
              Obter rotas
            </a>
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src={googleMapsUrl}
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização do Santuário"
              className="w-full"
            ></iframe>
          </div>
        </section>

        {/* Nota Importante */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-1.5 bg-yellow-100 rounded-lg">
              <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="font-bold text-gray-900">Informações Importantes</h3>
          </div>
          <div className="text-gray-700 space-y-2 text-sm pl-2">
            <p className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Para serviços de <strong>certidões</strong>, é necessário agendamento prévio
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Trazer <strong>documentação original</strong> para procedimentos na secretaria
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Para <strong>sacramentos</strong> (Batismo, Casamento), é necessária preparação
            </p>
            <p className="flex items-center gap-2">
              <span className="text-blue-600 font-bold">•</span>
              Em <strong>feriados</strong>, o horário de funcionamento pode ser alterado
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}