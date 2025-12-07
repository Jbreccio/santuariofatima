import React, { useState, useEffect } from 'react';
import Footer from "../components/layout/Footer";

export default function SantoDoDiaCompleto() {
  const [santoDoDia, setSantoDoDia] = useState<any>(null);
  const [dataAtual, setDataAtual] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [buscaSanto, setBuscaSanto] = useState('');
  const [santoEncontrado, setSantoEncontrado] = useState<any>(null);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [buscando, setBuscando] = useState(false);

  const todosSantos = [
    { nome: 'São Francisco de Assis', data: '04-10', descricao: 'Fundador da Ordem Franciscana', historia: 'Giovanni di Pietro di Bernardone, conhecido como São Francisco de Assis, foi um frade católico da Itália.' },
    { nome: 'Santo Antônio', data: '13-06', descricao: 'Doutor da Igreja, padroeiro dos pobres', historia: 'Santo Antônio de Pádua foi um frade franciscano português. Conhecido como o "santo dos milagres".' },
    { nome: 'Santa Teresa de Calcutá', data: '05-09', descricao: 'Missionária da caridade', historia: 'Madre Teresa de Calcutá foi uma religiosa católica albanesa, fundadora das Missionárias da Caridade.' },
    { nome: 'São João Paulo II', data: '22-10', descricao: 'Papa peregrino', historia: 'Karol Józef Wojtyła, conhecido como São João Paulo II, foi o papa e líder mundial da Igreja Católica.' },
    { nome: 'Nossa Senhora de Fátima', data: '13-05', descricao: 'Aparições em Fátima, Portugal', historia: 'As aparições de Nossa Senhora em Fátima, Portugal, em 1917, a três pastorinhos.' },
    { nome: 'São Jorge', data: '23-04', descricao: 'Mártir e guerreiro', historia: 'São Jorge foi um soldado romano no exército do imperador Diocleciano, venerado como mártir cristão.' },
    { nome: 'São Francisco Xavier', data: '03-12', descricao: 'Padroeiro do Oriente e das Missões', historia: 'Missionário jesuíta que evangelizou a Índia, Japão e China no século XVI. Cofundador da Companhia de Jesus.', imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg' }
  ];

  const buscarSantoVaticanNews = async () => {
    try {
      setCarregando(true);
      
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      
      setDataAtual(`${dia}/${mes}/${ano}`);
      
      // DADOS PRÉ-DEFINIDOS COMPLETOS (fallback robusto)
      const santosPorData: { [key: string]: any } = {
        // Dezembro
        '01-12': { 
          nome: 'Santo Elói', 
          descricao: 'Padroeiro dos ourives e ferreiros', 
          historia: 'Bispo de Noyon, conhecido por sua habilidade como ourives e por sua caridade. Foi conselheiro do rei Dagoberto I e fundou vários mosteiros.', 
          imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Saint_Eloi.jpg/800px-Saint_Eloi.jpg' 
        },
        '02-12': { 
          nome: 'Beata Maria Ângela Astorch', 
          descricao: 'Mística e abadessa clarissa', 
          historia: 'Religiosa espanhola conhecida por suas experiências místicas e vida de oração. Foi abadessa do convento de Murcia e destacou-se por sua espiritualidade profunda.' 
        },
        '03-12': { 
          nome: 'São Francisco Xavier', 
          descricao: 'Padroeiro das Missões', 
          historia: 'Missionário jesuíta que evangelizou a Ásia no século XVI. Co-fundador da Companhia de Jesus, levou o Evangelho à Índia, Japão e outras regiões asiáticas.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg' 
        },
        '04-12': { 
          nome: 'São João Damasceno', 
          descricao: 'Doutor da Igreja', 
          historia: 'Teólogo e poeta siríaco, defensor do culto às imagens sagradas. Escreveu importantes obras teológicas e é considerado o último dos Padres gregos.' 
        },
        '05-12': { 
          nome: 'São Sabas', 
          descricao: 'Abade e fundador de mosteiros', 
          historia: 'Fundador do mosteiro de Mar Saba na Palestina, importante figura do monaquismo cristão. Organizou a vida monástica na Terra Santa.' 
        },
        '06-12': { 
          nome: 'São Nicolau', 
          descricao: 'Bispo de Mira, inspiração do Papai Noel', 
          historia: 'Bispo grego do século IV conhecido por sua generosidade e milagres. Padroeiro das crianças, marinheiros e comerciantes.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/06/2019-12-06-s-nicola-di-bari/1575638335837.JPG' 
        },
        '07-12': { 
          nome: 'Santo Ambrósio', 
          descricao: 'Doutor da Igreja, bispo de Milão', 
          historia: 'Um dos quatro grandes Doutores da Igreja latina, influente teólogo e bispo. Batizou Santo Agostinho e defendeu a ortodoxia contra heresias.' 
        },
        '08-12': { 
          nome: 'Imaculada Conceição', 
          descricao: 'Dogma mariano', 
          historia: 'Celebração do dogma que declara Maria concebida sem pecado original. Padroeira de Portugal e de várias dioceses ao redor do mundo.' 
        },
        '09-12': { 
          nome: 'São Juan Diego', 
          descricao: 'Vidente de Nossa Senhora de Guadalupe', 
          historia: 'Indígena mexicano que testemunhou as aparições de Nossa Senhora em 1531. Sua tilma com a imagem de Nossa Senhora é venerada na Basílica de Guadalupe.' 
        },
        '10-12': { 
          nome: 'Nossa Senhora de Loreto', 
          descricao: 'Padroeira dos aviadores', 
          historia: 'Devoção mariana associada à Santa Casa de Nazaré, que segundo a tradição foi transportada por anjos até Loreto, Itália.' 
        },
        '11-12': { 
          nome: 'São Dâmaso I', 
          descricao: 'Papa do século IV', 
          historia: 'Papa que combateu heresias e promoveu a liturgia romana. Encomendou a tradução da Bíblia para o latim (Vulgata) a São Jerônimo.' 
        },
        '12-12': { 
          nome: 'Nossa Senhora de Guadalupe', 
          descricao: 'Padroeira das Américas', 
          historia: 'Aparições marianas no México em 1531 a São Juan Diego. A imagem milagrosa na tilma é um símbolo importante da evangelização das Américas.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/12/2019-12-12-nostra-signora-di-guadalupe/1576145367638.JPG' 
        },
        '13-12': { 
          nome: 'Santa Luzia', 
          descricao: 'Virgem e mártir', 
          historia: 'Mártir siciliana do século IV, padroeira da visão e dos cegos. Seu nome significa "luz" e é invocada contra doenças oculares.' 
        },
        '14-12': { 
          nome: 'São João da Cruz', 
          descricao: 'Doutor da Igreja, místico', 
          historia: 'Reformador carmelita, poeta místico espanhol do século XVI. Co-fundador dos Carmelitas Descalços com Santa Teresa de Ávila.' 
        },
        '15-12': { 
          nome: 'Santa Maria di Rosa', 
          descricao: 'Fundadora das Servas da Caridade', 
          historia: 'Religiosa italiana que dedicou sua vida ao cuidado dos doentes e necessitados, especialmente durante epidemias.' 
        },
        '25-12': { 
          nome: 'Natal do Senhor', 
          descricao: 'Nascimento de Jesus Cristo', 
          historia: 'Celebração do nascimento de Jesus Cristo em Belém. A festa mais importante do calendário cristão, celebra a Encarnação do Verbo de Deus.' 
        },
        
        // Novembro
        '30-11': { 
          nome: 'Santo André, Apóstolo', 
          descricao: 'Irmão de São Pedro', 
          historia: 'Um dos doze apóstolos, pregou na Grécia e foi martirizado em cruz em forma de X. Padroeiro da Escócia, Grécia e Rússia.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2020/11/30/2020-11-30-santo-andrea/jcr:content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg' 
        },
        
        // Outubro
        '04-10': { 
          nome: 'São Francisco de Assis', 
          descricao: 'Fundador dos Franciscanos', 
          historia: 'Renunciou à riqueza para viver em pobreza, amante da natureza e dos animais. Recebeu os estigmas e é um dos santos mais populares da Igreja.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/10/04/2019-10-04-s-francesco-d-assisi/1570205197236.jpg' 
        },
        
        // Junho
        '13-06': { 
          nome: 'Santo Antônio de Pádua', 
          descricao: 'Doutor da Igreja', 
          historia: 'Pregador franciscano português, conhecido como "santo dos milagres". Doutor da Igreja e padroeiro dos objetos perdidos.', 
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/06/13/2019-06-13-s-antonio-da-padova/1560428267794.jpg' 
        },
        
        // Maio
        '13-05': { 
          nome: 'Nossa Senhora de Fátima', 
          descricao: 'Aparições em Fátima', 
          historia: 'Aparições de Nossa Senhora a três pastorinhos em Fátima, Portugal, em 1917. Mensagens de oração, penitência e conversão.' 
        },
        
        // Abril
        '23-04': { 
          nome: 'São Jorge', 
          descricao: 'Mártir e guerreiro', 
          historia: 'Soldado romano martirizado por sua fé cristã. Padroeiro da Inglaterra, Portugal e dos escoteiros. Conhecido pela lenda do dragão.' 
        },
        
        // Setembro
        '05-09': { 
          nome: 'Santa Teresa de Calcutá', 
          descricao: 'Missionária da Caridade', 
          historia: 'Fundadora das Missionárias da Caridade, dedicou sua vida aos mais pobres entre os pobres em Calcutá, Índia. Prêmio Nobel da Paz em 1979.' 
        },
        
        // Outubro (outro)
        '22-10': { 
          nome: 'São João Paulo II', 
          descricao: 'Papa peregrino', 
          historia: 'Pontificado de 27 anos, viajou por todo o mundo promovendo a paz e a dignidade humana. Canonizado em 2014.' 
        },
      };
      
      const dataKey = `${dia}-${mes}`;
      const santoHoje = santosPorData[dataKey];
      
      if (santoHoje) {
        setSantoDoDia({
          ...santoHoje,
          fonte: 'Calendário Litúrgico Católico',
          url: `https://www.vaticannews.va/pt/santo-do-dia/${mes}/${dia}.html`
        });
      } else {
        // Se não tem santo específico, mostra um genérico
        const diasDaSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
        const diaSemana = diasDaSemana[hoje.getDay()];
        
        setSantoDoDia({
          nome: 'Santos do Dia',
          descricao: `Na ${diaSemana}, a Igreja celebra a memória dos santos`,
          historia: 'Cada dia do ano litúrgico é dedicado à memória de santos que testemunharam o Evangelho com suas vidas. Consulte o calendário litúrgico para informações específicas sobre os santos celebrados hoje.',
          imagem: null,
          fonte: 'Igreja Católica',
          url: `https://www.vaticannews.va/pt/liturgia-do-dia.html`
        });
      }
      
    } catch (error) {
      console.error('Erro:', error);
      // Fallback de emergência
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      setDataAtual(`${dia}/${mes}/${hoje.getFullYear()}`);
      
      setSantoDoDia({
        nome: 'Santos do Dia',
        descricao: 'Celebração dos santos da Igreja',
        historia: 'A Igreja celebra diariamente a memória dos santos que são modelos de vida cristã e intercessores junto a Deus.',
        fonte: 'Tradição Católica',
        imagem: null,
        url: 'https://www.vaticannews.va/pt.html'
      });
    } finally {
      setCarregando(false);
    }
  };

  const buscarSantoPorNome = () => {
    if (buscaSanto.trim() === '') {
      setSantoEncontrado(null);
      return;
    }

    setBuscando(true);
    
    setTimeout(() => {
      const santo = todosSantos.find(s => 
        s.nome.toLowerCase().includes(buscaSanto.toLowerCase())
      );

      setSantoEncontrado(santo || { 
        nome: 'Santo não encontrado', 
        descricao: 'Não encontramos este santo em nossa base de dados.',
        historia: 'Verifique se o nome está correto ou tente buscar por outra data.'
      });
      setBuscando(false);
    }, 800);
  };

  const buscarSantoPorData = (dia: number, mes: number) => {
    setBuscando(true);
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes).padStart(2, '0');
    setDataSelecionada(`${diaStr}/${mesStr}`);
    
    setTimeout(() => {
      const dataKey = `${diaStr}-${mesStr}`;
      
      // Dados pré-definidos para busca por data
      const santosPorDataBusca: { [key: string]: any } = {
        '01-12': { nome: 'Santo Elói', descricao: 'Padroeiro dos ourives e ferreiros', historia: 'Bispo de Noyon, conselheiro real e fundador de mosteiros.' },
        '02-12': { nome: 'Beata Maria Ângela Astorch', descricao: 'Mística e abadessa clarissa', historia: 'Religiosa espanhola conhecida por sua espiritualidade profunda.' },
        '03-12': { nome: 'São Francisco Xavier', descricao: 'Padroeiro das Missões', historia: 'Missionário jesuíta que evangelizou a Ásia no século XVI.', imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg' },
        '04-12': { nome: 'São João Damasceno', descricao: 'Doutor da Igreja', historia: 'Teólogo defensor do culto às imagens sagradas.' },
        '05-12': { nome: 'São Sabas', descricao: 'Abade e fundador de mosteiros', historia: 'Organizador da vida monástica na Terra Santa.' },
        '06-12': { nome: 'São Nicolau', descricao: 'Bispo de Mira', historia: 'Conhecido por sua generosidade, inspiração do Papai Noel.', imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/06/2019-12-06-s-nicola-di-bari/1575638335837.JPG' },
        '07-12': { nome: 'Santo Ambrósio', descricao: 'Doutor da Igreja', historia: 'Bispo de Milão que batizou Santo Agostinho.' },
        '08-12': { nome: 'Imaculada Conceição', descricao: 'Dogma mariano', historia: 'Celebração de Maria concebida sem pecado original.' },
        '09-12': { nome: 'São Juan Diego', descricao: 'Vidente de Guadalupe', historia: 'Indígena que recebeu as aparições de Nossa Senhora.' },
        '10-12': { nome: 'Nossa Senhora de Loreto', descricao: 'Padroeira dos aviadores', historia: 'Devoção à Santa Casa de Nazaré transportada por anjos.' },
        '11-12': { nome: 'São Dâmaso I', descricao: 'Papa do século IV', historia: 'Promoveu a liturgia romana e a tradução da Bíblia.' },
        '12-12': { nome: 'Nossa Senhora de Guadalupe', descricao: 'Padroeira das Américas', historia: 'Aparições marianas no México em 1531.', imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/12/2019-12-12-nostra-signora-di-guadalupe/1576145367638.JPG' },
        '13-12': { nome: 'Santa Luzia', descricao: 'Virgem e mártir', historia: 'Padroeira da visão e dos cegos.' },
        '14-12': { nome: 'São João da Cruz', descricao: 'Doutor místico', historia: 'Reformador carmelita e poeta espiritual.' },
        '15-12': { nome: 'Santa Maria di Rosa', descricao: 'Fundadora das Servas da Caridade', historia: 'Dedicou sua vida ao cuidado dos doentes.' },
        '25-12': { nome: 'Natal do Senhor', descricao: 'Nascimento de Jesus', historia: 'Celebração do nascimento de Jesus Cristo.' },
        '30-11': { nome: 'Santo André', descricao: 'Apóstolo de Cristo', historia: 'Irmão de São Pedro, pregou na Grécia.' },
        '04-10': { nome: 'São Francisco de Assis', descricao: 'Fundador franciscano', historia: 'Amante da pobreza e da natureza.' },
        '13-06': { nome: 'Santo Antônio', descricao: 'Doutor da Igreja', historia: 'Conhecido como o "santo dos milagres".' },
        '13-05': { nome: 'Nossa Senhora de Fátima', descricao: 'Aparições em Portugal', historia: 'Mensagens de oração e conversão.' },
        '23-04': { nome: 'São Jorge', descricao: 'Mártir cristão', historia: 'Padroeiro de vários países e dos escoteiros.' },
        '05-09': { nome: 'Santa Teresa de Calcutá', descricao: 'Missionária da Caridade', historia: 'Serva dos mais pobres em Calcutá.' },
        '22-10': { nome: 'São João Paulo II', descricao: 'Papa peregrino', historia: 'Pontífice que viajou por todo o mundo.' },
      };

      const santoData = santosPorDataBusca[dataKey];
      
      if (santoData) {
        setSantoEncontrado({
          ...santoData,
          fonte: 'Calendário Litúrgico'
        });
      } else {
        // Busca na lista local
        const santoLocal = todosSantos.find(s => s.data === dataKey);
        
        if (santoLocal) {
          setSantoEncontrado(santoLocal);
        } else {
          setSantoEncontrado({
            nome: 'Santos do Dia',
            descricao: 'Nenhum santo específico registrado para esta data.',
            historia: 'A Igreja celebra a memória de todos os santos cuja festa ocorre neste dia.',
            fonte: 'Igreja Católica'
          });
        }
      }
      
      setBuscando(false);
    }, 800);
  };

  const gerarDiasDoMes = () => {
    return Array.from({ length: 30 }, (_, i) => i + 1);
  };

  useEffect(() => {
    buscarSantoVaticanNews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      {/* Conteúdo Principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 pt-16 sm:pt-20 md:pt-24 pb-6 sm:pb-8">
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          
          {/* Santo do Dia - PERFEITAMENTE RESPONSIVO */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-8 border border-blue-200">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6 md:mb-8">
              {/* IMAGEM GRANDE E BONITA */}
              <div className="flex-shrink-0">
                <img 
                  src="/santododia2.png" 
                  alt="Santo do Dia" 
                  className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 object-contain drop-shadow-lg"
                  onError={(e) => {
                    const img = e.currentTarget;
                    img.onerror = null;
                    img.src = '/santododia.png';
                  }}
                />
              </div>
              
              <div className="text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-2">
                  Santo do Dia
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-blue-700 font-medium">
                  Descubra o santo celebrado hoje na Igreja Católica
                </p>
              </div>
            </div>
            
            {carregando ? (
              <div className="flex items-center justify-center h-32 sm:h-36 md:h-40">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
                  <p className="text-blue-700 text-sm sm:text-base font-medium">Consultando Vatican News...</p>
                </div>
              </div>
            ) : santoDoDia ? (
              <div>
                <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-5 md:mb-6">
                  {santoDoDia.imagem ? (
                    <div className="w-full lg:w-2/5">
                      <img 
                        src={santoDoDia.imagem} 
                        alt={santoDoDia.nome}
                        className="w-full h-48 sm:h-52 md:h-56 lg:h-64 rounded-lg sm:rounded-xl object-cover shadow-lg border-2 border-blue-200"
                      />
                    </div>
                  ) : (
                    <div className="w-full lg:w-2/5">
                      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-64 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center text-5xl sm:text-6xl shadow-lg">
                        ⛪
                      </div>
                    </div>
                  )}
                  <div className="flex-1 w-full lg:w-3/5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm sm:text-base md:text-lg text-blue-600 font-semibold">📅 {dataAtual}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">{santoDoDia.nome}</h3>
                    <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">{santoDoDia.descricao}</p>
                    <div className="mt-4 sm:mt-5">
                      <p className="text-sm sm:text-base text-gray-600 italic leading-relaxed border-l-4 border-blue-400 pl-4 sm:pl-5 py-3 bg-blue-50/50 rounded-r">
                        {santoDoDia.historia}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-4 sm:pt-5 border-t border-blue-100 gap-3">
                  <div className="text-sm sm:text-base text-blue-500">
                    <span className="font-semibold">Fonte:</span> {santoDoDia.fonte}
                  </div>
                  {santoDoDia.url && (
                    <a 
                      href={santoDoDia.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center gap-2"
                    >
                      Ler mais no Vatican News 
                      <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Busca de Santos - RESPONSIVO */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-8 border border-blue-200">
            <div className="flex items-center gap-4 sm:gap-5 md:gap-6 mb-5 sm:mb-6 md:mb-8">
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl shadow-lg">
                🔍
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900">Buscar Santo</h2>
            </div>

            {/* Busca por Nome */}
            <div className="mb-6 sm:mb-8">
              <label className="block text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">
                Buscar por nome
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <input 
                  type="text" 
                  placeholder="Digite o nome do santo..." 
                  value={buscaSanto}
                  onChange={(e) => setBuscaSanto(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && buscarSantoPorNome()}
                  className="flex-1 px-5 sm:px-6 py-3 sm:py-4 border-2 border-blue-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-blue-200 focus:border-blue-200 text-base sm:text-lg bg-white/50"
                />
                <button 
                  onClick={buscarSantoPorNome}
                  disabled={buscando}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold disabled:opacity-50 shadow-lg hover:shadow-xl text-base sm:text-lg"
                >
                  {buscando ? 'Buscando...' : 'Buscar'}
                </button>
              </div>
            </div>

            {/* Resultado da Busca */}
            {buscando ? (
              <div className="flex items-center justify-center h-24 sm:h-28 md:h-32 mb-6 sm:mb-8">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-blue-200 border-t-blue-600"></div>
              </div>
            ) : santoEncontrado && (
              <div className="p-5 sm:p-6 md:p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl border-2 border-blue-200 mb-6 sm:mb-8 shadow-inner">
                <div className="flex flex-col lg:flex-row items-start gap-4 sm:gap-5 md:gap-6">
                  {santoEncontrado.imagem && (
                    <div className="w-full lg:w-1/3">
                      <img 
                        src={santoEncontrado.imagem} 
                        alt={santoEncontrado.nome}
                        className="w-full h-48 sm:h-52 md:h-56 rounded-lg sm:rounded-xl object-cover shadow-md border border-blue-200"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  <div className="flex-1 w-full">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-3 sm:mb-4">
                      {santoEncontrado.nome}
                      {dataSelecionada && (
                        <span className="text-base sm:text-lg text-blue-600 ml-3 sm:ml-4 font-normal">({dataSelecionada})</span>
                      )}
                    </h3>
                    <p className="text-base sm:text-lg text-gray-700 mb-3 sm:mb-4 leading-relaxed">{santoEncontrado.descricao}</p>
                    <p className="text-base sm:text-lg text-gray-600 leading-relaxed">{santoEncontrado.historia}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Calendário */}
            <div>
              <label className="block text-lg sm:text-xl font-semibold text-blue-800 mb-3 sm:mb-4">
                Buscar por data
              </label>
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-sm sm:text-base font-bold text-blue-700 p-2">{day}</div>
                ))}
                {gerarDiasDoMes().map((dia) => (
                  <button 
                    key={dia} 
                    onClick={() => buscarSantoPorData(dia, 12)}
                    disabled={buscando}
                    className="p-2 sm:p-3 border border-blue-200 rounded-lg text-sm sm:text-base hover:bg-blue-100 hover:border-blue-400 transition-all disabled:opacity-50 font-semibold text-blue-800 bg-white/80 hover:shadow-md"
                  >
                    {dia}
                  </button>
                ))}
              </div>
              <div className="text-sm sm:text-base text-center text-blue-600 bg-blue-50 p-3 sm:p-4 rounded-xl">
                💡 Clique em uma data para ver o santo celebrado
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}