// src/pages/SantoDoDia.tsx
import React, { useState, useEffect } from 'react';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

// ✅ DADOS COMPLETOS DE SANTOS (expanda conforme necessário)
const SANTOS_COMPLETOS: Record<string, any> = {
  // Dezembro
  '01-12': {
    nome: 'Santo Elói',
    descricao: 'Padroeiro dos ourives e ferreiros',
    historia: `Bispo de Noyon, conhecido por sua habilidade como ourives e por sua caridade. 
      Foi conselheiro do rei Dagoberto I e fundou vários mosteiros. 
      Nasceu em 588 em Chaptelat, França, e morreu em 660.`,
    imagem: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Saint_Eloi.jpg/800px-Saint_Eloi.jpg'
  },
  '02-12': {
    nome: 'Beata Maria Ângela Astorch',
    descricao: 'Mística e abadessa clarissa',
    historia: `Religiosa espanhola conhecida por suas experiências místicas e vida de oração. 
      Foi abadessa do convento de Murcia e destacou-se por sua espiritualidade profunda. 
      Nasceu em 1592 e morreu em 1665.`,
    imagem: null
  },
  '03-12': {
    nome: 'São Francisco Xavier',
    descricao: 'Padroeiro das Missões',
    historia: `Missionário jesuíta que evangelizou a Ásia no século XVI. 
      Co-fundador da Companhia de Jesus, levou o Evangelho à Índia, Japão e outras regiões asiáticas. 
      É considerado um dos maiores missionários da história da Igreja.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg'
  },
  '04-12': {
    nome: 'São João Damasceno',
    descricao: 'Doutor da Igreja',
    historia: `Teólogo e poeta siríaco, defensor do culto às imagens sagradas. 
      Escreveu importantes obras teológicas e é considerado o último dos Padres gregos. 
      Nasceu em 675 e morreu em 749.`,
    imagem: null
  },
  '05-12': {
    nome: 'São Sabas',
    descricao: 'Abade e fundador de mosteiros',
    historia: `Fundador do mosteiro de Mar Saba na Palestina, importante figura do monaquismo cristão. 
      Organizou a vida monástica na Terra Santa e escreveu regras para os monges.`,
    imagem: null
  },
  '06-12': {
    nome: 'São Nicolau',
    descricao: 'Bispo de Mira, inspiração do Papai Noel',
    historia: `Bispo grego do século IV conhecido por sua generosidade e milagres. 
      Padroeiro das crianças, marinheiros e comerciantes. 
      Sua festa é celebrada em 6 de dezembro em muitos países europeus.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/06/2019-12-06-s-nicola-di-bari/1575638335837.JPG'
  },
  '07-12': {
    nome: 'Santo Ambrósio',
    descricao: 'Doutor da Igreja, bispo de Milão',
    historia: `Um dos quatro grandes Doutores da Igreja latina, influente teólogo e bispo. 
      Batizou Santo Agostinho e defendeu a ortodoxia contra heresias. 
      Nasceu em 340 e morreu em 397.`,
    imagem: null
  },
  '08-12': {
    nome: 'Imaculada Conceição',
    descricao: 'Dogma mariano',
    historia: `Celebração do dogma que declara Maria concebida sem pecado original. 
      Proclamado pelo Papa Pio IX em 1854. 
      Padroeira de Portugal e de várias dioceses ao redor do mundo.`,
    imagem: null
  },
  '09-12': {
    nome: 'São Juan Diego',
    descricao: 'Vidente de Nossa Senhora de Guadalupe',
    historia: `Indígena mexicano que testemunhou as aparições de Nossa Senhora em 1531. 
      Sua tilma com a imagem de Nossa Senhora é venerada na Basílica de Guadalupe. 
      Canonizado em 2002 pelo Papa João Paulo II.`,
    imagem: null
  },
  '10-12': {
    nome: 'Nossa Senhora de Loreto',
    descricao: 'Padroeira dos aviadores',
    historia: `Devoção mariana associada à Santa Casa de Nazaré, que segundo a tradição foi transportada por anjos até Loreto, Itália. 
      A Santa Casa é considerada o lar onde a Sagrada Família viveu.`,
    imagem: null
  },
  '11-12': {
    nome: 'São Dâmaso I',
    descricao: 'Papa do século IV',
    historia: `Papa que combateu heresias e promoveu a liturgia romana. 
      Encomendou a tradução da Bíblia para o latim (Vulgata) a São Jerônimo. 
      Nasceu em 305 e morreu em 384.`,
    imagem: null
  },
  '12-12': {
    nome: 'Nossa Senhora de Guadalupe',
    descricao: 'Padroeira das Américas',
    historia: `Aparições marianas no México em 1531 a São Juan Diego. 
      A imagem milagrosa na tilma é um símbolo importante da evangelização das Américas. 
      Sua festa é celebrada em 12 de dezembro.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/12/12/2019-12-12-nostra-signora-di-guadalupe/1576145367638.JPG'
  },
  '13-12': {
    nome: 'Santa Luzia',
    descricao: 'Virgem e mártir',
    historia: `Mártir siciliana do século IV, padroeira da visão e dos cegos. 
      Seu nome significa "luz" e é invocada contra doenças oculares. 
      Foi martirizada durante a perseguição do imperador Diocleciano.`,
    imagem: null
  },
  '14-12': {
    nome: 'São João da Cruz',
    descricao: 'Doutor da Igreja, místico',
    historia: `Reformador carmelita, poeta místico espanhol do século XVI. 
      Co-fundador dos Carmelitas Descalços com Santa Teresa de Ávila. 
      É considerado um dos maiores poetas místicos da literatura espanhola.`,
    imagem: null
  },
  '15-12': {
    nome: 'Santa Maria di Rosa',
    descricao: 'Fundadora das Servas da Caridade',
    historia: `Religiosa italiana que dedicou sua vida ao cuidado dos doentes e necessitados, especialmente durante epidemias. 
      Fundou a Congregação das Servas da Caridade em 1839.`,
    imagem: null
  },
  '25-12': {
    nome: 'Natal do Senhor',
    descricao: 'Nascimento de Jesus Cristo',
    historia: `Celebração do nascimento de Jesus Cristo em Belém. 
      A festa mais importante do calendário cristão, celebra a Encarnação do Verbo de Deus. 
      É celebrada em 25 de dezembro em todo o mundo.`,
    imagem: null
  },

  // Outros meses (adicione conforme necessário)
  '30-11': {
    nome: 'Santo André, Apóstolo',
    descricao: 'Irmão de São Pedro',
    historia: `Um dos doze apóstolos, pregou na Grécia e foi martirizado em cruz em forma de X. 
      Padroeiro da Escócia, Grécia e Rússia.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2020/11/30/2020-11-30-santo-andrea/jcr:content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg'
  },
  '04-10': {
    nome: 'São Francisco de Assis',
    descricao: 'Fundador dos Franciscanos',
    historia: `Renunciou à riqueza para viver em pobreza, amante da natureza e dos animais. 
      Recebeu os estigmas e é um dos santos mais populares da Igreja.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/10/04/2019-10-04-s-francesco-d-assisi/1570205197236.jpg'
  },
  '13-06': {
    nome: 'Santo Antônio de Pádua',
    descricao: 'Doutor da Igreja',
    historia: `Pregador franciscano português, conhecido como "santo dos milagres". 
      Doutor da Igreja e padroeiro dos objetos perdidos.`,
    imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/06/13/2019-06-13-s-antonio-da-padova/1560428267794.jpg'
  },
  '13-05': {
    nome: 'Nossa Senhora de Fátima',
    descricao: 'Aparições em Fátima',
    historia: `Aparições de Nossa Senhora a três pastorinhos em Fátima, Portugal, em 1917. 
      Mensagens de oração, penitência e conversão.`,
    imagem: null
  },
  '23-04': {
    nome: 'São Jorge',
    descricao: 'Mártir e guerreiro',
    historia: `Soldado romano martirizado por sua fé cristã. 
      Padroeiro da Inglaterra, Portugal e dos escoteiros. 
      Conhecido pela lenda do dragão.`,
    imagem: null
  },
  '05-09': {
    nome: 'Santa Teresa de Calcutá',
    descricao: 'Missionária da Caridade',
    historia: `Fundadora das Missionárias da Caridade, dedicou sua vida aos mais pobres entre os pobres em Calcutá, Índia. 
      Prêmio Nobel da Paz em 1979.`,
    imagem: null
  },
  '22-10': {
    nome: 'São João Paulo II',
    descricao: 'Papa peregrino',
    historia: `Pontificado de 27 anos, viajou por todo o mundo promovendo a paz e a dignidade humana. 
      Canonizado em 2014.`,
    imagem: null
  }
};

// ✅ Lista de todos os santos para busca por nome
const TODOS_SANTOS = Object.entries(SANTOS_COMPLETOS).map(([data, santo]) => ({
  ...santo,
  data // formato "dd-mm"
}));

export default function SantoDoDia() {
  const [santoDoDia, setSantoDoDia] = useState<any>(null);
  const [dataAtual, setDataAtual] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [buscaSanto, setBuscaSanto] = useState('');
  const [santoEncontrado, setSantoEncontrado] = useState<any>(null);
  const [dataSelecionada, setDataSelecionada] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [mesSelecionado, setMesSelecionado] = useState(new Date().getMonth() + 1); // mês atual

  // ✅ Função para buscar santo do dia
  const buscarSantoDoDia = () => {
    setCarregando(true);
    try {
      const hoje = new Date();
      const dia = String(hoje.getDate()).padStart(2, '0');
      const mes = String(hoje.getMonth() + 1).padStart(2, '0');
      const ano = hoje.getFullYear();
      
      setDataAtual(`${dia}/${mes}/${ano}`);
      const dataKey = `${dia}-${mes}`;
      
      const santo = SANTOS_COMPLETOS[dataKey] || {
        nome: 'Santos do Dia',
        descricao: 'Celebração dos santos da Igreja',
        historia: 'A Igreja celebra diariamente a memória dos santos que são modelos de vida cristã e intercessores junto a Deus.',
        imagem: null
      };
      
      setSantoDoDia(santo);
    } catch (error) {
      console.error('Erro ao buscar santo do dia:', error);
      setSantoDoDia({
        nome: 'Santos do Dia',
        descricao: 'Celebração dos santos da Igreja',
        historia: 'A Igreja celebra diariamente a memória dos santos que são modelos de vida cristã e intercessores junto a Deus.',
        imagem: null
      });
    } finally {
      setCarregando(false);
    }
  };

  // ✅ Busca por nome
  const buscarSantoPorNome = () => {
    if (!buscaSanto.trim()) {
      setSantoEncontrado(null);
      return;
    }
    
    setBuscando(true);
    setTimeout(() => {
      const santo = TODOS_SANTOS.find(s => 
        s.nome.toLowerCase().includes(buscaSanto.toLowerCase())
      );
      
      setSantoEncontrado(santo || {
        nome: 'Santo não encontrado',
        descricao: 'Não encontramos este santo em nossa base de dados.',
        historia: 'Verifique se o nome está correto ou tente buscar por outra data.',
        imagem: null
      });
      setBuscando(false);
    }, 500);
  };

  // ✅ Busca por data
  const buscarSantoPorData = (dia: number, mes: number) => {
    setBuscando(true);
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes).padStart(2, '0');
    setDataSelecionada(`${diaStr}/${mesStr}`);
    
    setTimeout(() => {
      const dataKey = `${diaStr}-${mesStr}`;
      const santo = SANTOS_COMPLETOS[dataKey];
      
      if (santo) {
        setSantoEncontrado({
          ...santo,
          data: dataKey
        });
      } else {
        setSantoEncontrado({
          nome: 'Santo não encontrado',
          descricao: 'Não há santo registrado para esta data em nossa base.',
          historia: 'A Igreja celebra a memória de todos os santos cuja festa ocorre neste dia.',
          imagem: null
        });
      }
      setBuscando(false);
    }, 500);
  };

  // ✅ Funções de calendário
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month, 0).getDate();
  };

  const isToday = (day: number, month: number) => {
    const hoje = new Date();
    return day === hoje.getDate() && month === hoje.getMonth() + 1;
  };

  const gerarDiasDoMes = () => {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const diasNoMes = getDaysInMonth(mesSelecionado, ano);
    return Array.from({ length: diasNoMes }, (_, i) => i + 1);
  };

  const nomesMeses = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // ✅ Efeito inicial
  useEffect(() => {
    buscarSantoDoDia();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-100">
      <Navigation />

      {/* 🔵 BANNER RESPONSIVO */}
      <section className="relative w-full overflow-hidden bg-gray-900 mt-20">
        <div className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src="/santododia6.png"
            alt="Santo do Dia"
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              e.currentTarget.src = '/santododia.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Santo do Dia
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md">
                Descubra o Santo celebrado hoje na Igreja Católica
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500"></div>
      </section>

      {/* Conteúdo Principal */}
      <div className="max-w-5xl mx-auto px-4 sm:px-5 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="space-y-5 sm:space-y-6 md:space-y-8">
          
          {/* Card com informações do Santo do Dia */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-4 sm:p-5 md:p-8 border border-blue-200">
            {carregando ? (
              <div className="flex items-center justify-center h-32 sm:h-36 md:h-40">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-blue-200 border-t-blue-600 mx-auto mb-3"></div>
                  <p className="text-blue-700 text-sm sm:text-base font-medium">Carregando santo do dia...</p>
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
                      <div className="w-full h-48 sm:h-52 md:h-56 lg:h-64 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-200 to-indigo-300 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-lg">
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
              </div>
            ) : null}
          </div>

          {/* Busca de Santos */}
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
              <div className="flex items-center justify-between mb-4">
                <label className="block text-lg sm:text-xl font-semibold text-blue-800">
                  Buscar por data - {nomesMeses[mesSelecionado - 1]}
                </label>
                <select
                  value={mesSelecionado}
                  onChange={(e) => setMesSelecionado(Number(e.target.value))}
                  className="px-3 py-2 border border-blue-200 rounded-lg text-blue-800 bg-white"
                >
                  {nomesMeses.map((mes, index) => (
                    <option key={index} value={index + 1}>{mes}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4">
                {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day, i) => (
                  <div key={i} className="text-center text-xs sm:text-sm font-bold text-blue-700 p-2">{day}</div>
                ))}
                {gerarDiasDoMes().map((dia) => (
                  <button 
                    key={dia} 
                    onClick={() => buscarSantoPorData(dia, mesSelecionado)}
                    disabled={buscando}
                    className={`p-2 sm:p-3 border rounded-lg text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 bg-white/80 hover:shadow-md ${
                      isToday(dia, mesSelecionado) 
                        ? 'border-blue-500 bg-blue-100 text-blue-800' 
                        : 'border-blue-200 text-blue-800 hover:bg-blue-100 hover:border-blue-400'
                    }`}
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

      <Footer />
    </div>
  );
}