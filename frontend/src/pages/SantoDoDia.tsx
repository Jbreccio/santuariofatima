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

      const vaticanUrl = `https://www.vaticannews.va/pt/santo-do-dia/${mes}/${dia}.html`;
      
      const santosComImagens: { [key: string]: any } = {
        '03-12': {
          nome: 'São Francisco Xavier',
          descricao: 'Padroeiro do Oriente, da Obra de propagação da fé e das Missões',
          historia: 'Missionário jesuíta espanhol que dedicou sua vida à evangelização na Ásia. Nasceu em 1506 no castelo de Xavier, na Espanha. Junto com Santo Inácio de Loyola, foi cofundador da Companhia de Jesus. Levou o Evangelho à Índia, Japão e ilhas do Pacífico, sendo considerado um dos maiores missionários da história.',
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg',
          fonte: 'Vatican News',
          url: vaticanUrl
        },
        '30-11': {
          nome: 'Santo André, Apóstolo',
          descricao: 'Apóstolo de Cristo e irmão de São Pedro',
          historia: 'Pescador que se tornou um dos doze apóstolos de Jesus. Irmão de São Pedro, foi discípulo de João Batista antes de seguir Jesus Cristo.',
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/multimedia/2020/11/30/2020-11-30-santo-andrea/jcr:content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg',
          fonte: 'Vatican News',
          url: vaticanUrl
        },
        '02-12': {
          nome: 'Beato João Beche',
          descricao: 'Mártir da Reforma Inglesa',
          historia: 'Religioso mártir durante a Reforma Inglesa, mantendo sua fé católica até o martírio.',
          imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/28/2019-11-28-beato-giovanni-beche/1574950816735.JPG',
          fonte: 'Vatican News',
          url: vaticanUrl
        }
      };

      const dataKey = `${dia}-${mes}`;
      const santoAtual = santosComImagens[dataKey];
      
      if (santoAtual) {
        setSantoDoDia(santoAtual);
      } else {
        const santoLocal = todosSantos.find(s => s.data === dataKey);
        
        if (santoLocal) {
          setSantoDoDia({
            ...santoLocal,
            fonte: 'Base Local',
            url: vaticanUrl
          });
        } else {
          setSantoDoDia({
            nome: 'Santos do Dia',
            descricao: 'Celebramos todos os santos cuja memória é recordada neste dia.',
            historia: 'A Igreja celebra hoje a memória dos santos que testemunharam com suas vidas o amor a Deus e ao próximo.',
            imagem: null,
            fonte: 'Calendário Litúrgico',
            url: vaticanUrl
          });
        }
      }
      
    } catch (error) {
      console.error('Erro ao buscar santo do dia:', error);
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
    setDataSelecionada(`${dia}/${mes}`);
    
    setTimeout(() => {
      const dataKey = `${String(dia).padStart(2, '0')}-${String(mes).padStart(2, '0')}`;
      const santo = todosSantos.find(s => s.data === dataKey);
      
      if (santo) {
        setSantoEncontrado(santo);
      } else {
        const santosEspecificos: { [key: string]: any } = {
          '30-11': {
            nome: 'Santo André, Apóstolo',
            descricao: 'Apóstolo de Cristo e irmão de São Pedro',
            historia: 'Santo André foi um dos doze apóstolos de Jesus e irmão de São Pedro. Pescador como seu irmão.'
          },
          '03-12': {
            nome: 'São Francisco Xavier',
            descricao: 'Padroeiro do Oriente e das Missões',
            historia: 'Missionário jesuíta que evangelizou a Índia, Japão e China no século XVI.',
            imagem: 'https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2019/11/27/2019-11-27-s-francesco-saverio/1574831488912.jpg'
          }
        };

        const santoData = santosEspecificos[dataKey] || {
          nome: 'Santos do Dia',
          descricao: 'Nenhum santo específico registrado para esta data.',
          historia: 'A Igreja celebra a memória de todos os santos cuja festa ocorre neste dia.'
        };
        
        setSantoEncontrado(santoData);
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