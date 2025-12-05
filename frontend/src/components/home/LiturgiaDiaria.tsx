import { useState, useEffect } from 'react';

// 1️⃣ Defina a interface (tipo) da liturgia
interface LiturgiaData {
  data: string;
  tempoLiturgico: string;
  semana: string;
  corLiturgica: string;
  santos: string[];
  leituras: {
    primeira: {
      titulo: string;
      texto: string;
    };
    salmo: {
      refrao: string;
      versiculo: string;
    };
    evangelho: {
      titulo: string;
      texto: string;
    };
  };
}

const LiturgiaDiaria = () => {
  // 2️⃣ Use o tipo correto no useState
  const [liturgia, setLiturgia] = useState<LiturgiaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiturgia = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const data: LiturgiaData = {
        data: new Date().toLocaleDateString('pt-BR'),
        tempoLiturgico: 'Tempo Comum',
        semana: '32ª Semana do Tempo Comum',
        corLiturgica: 'Verde',
        santos: ['São Leão Magno', 'Santa Margarida da Escócia'],
        leituras: {
          primeira: {
            titulo: 'Primeira Leitura (Ef 4,1-7.11-13)',
            texto: 'Irmãos, eu, prisioneiro no Senhor, vos exorto: vivei de maneira digna da vocação a que fostes chamados, com toda a humildade e mansidão, suportando-vos uns aos outros com paciência no amor.'
          },
          salmo: {
            refrao: 'O Senhor fez maravilhas em favor do seu povo.',
            versiculo: 'Sl 125'
          },
          evangelho: {
            titulo: 'Evangelho (Mt 25,14-30)',
            texto: 'Naquele tempo, disse Jesus aos seus discípulos: "Um homem ia viajar para o estrangeiro. Chamou seus servos e lhes confiou seus bens."'
          }
        }
      };
      
      setLiturgia(data);
      setLoading(false);
    };

    fetchLiturgia();
  }, []);

  if (loading) {
    return (
      <section className="py-12 bg-gradient-to-br from-blue-50 to-blue-100 my-8 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-blue-900 mb-3 flex items-center justify-center gap-3 font-display">
              <span className="text-4xl">📖</span>
              Liturgia Diária
            </h2>
            <p className="text-gray-600 text-lg">Carregando a Palavra de Deus...</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white/70 p-8 rounded-2xl shadow-sm backdrop-blur-sm border border-blue-100">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded-full animate-pulse w-3/4 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full animate-pulse w-1/2 mx-auto"></div>
                  <div className="h-3 bg-gray-200 rounded-full animate-pulse w-2/3 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 3️⃣ Verificação de segurança (caso liturgia ainda seja null)
  if (!liturgia) {
    return (
      <section className="py-12 bg-gradient-to-br from-red-50 to-red-100 my-8 rounded-3xl">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-red-600 text-lg">Erro ao carregar a liturgia.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="my-8">
      {/* Header com imagem da bíblia e rosário */}
      <div className="relative w-full overflow-hidden h-48 md:h-64">
        <img 
          src="/Missas.png" // ← use a sua imagem real aqui
          alt="Bíblia e Rosário"
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold font-display drop-shadow-lg mb-2">
              Liturgia Diária
            </h2>
            <p className="text-xl md:text-2xl font-serif drop-shadow-md">{liturgia.data}</p>
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="bg-gradient-to-br from-[#FFF8E1] via-[#FAFAD2] to-[#FFEBCD] py-8">
        <div className="max-w-6xl mx-auto px-4">

          {/* Informações principais */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-blue-100 text-center min-w-[160px]">
              <span className="text-lg text-gray-600 block mb-2 font-serif">Tempo Litúrgico</span>
              <span className="font-semibold text-blue-800 text-xl font-display">{liturgia.tempoLiturgico}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-green-100 text-center min-w-[160px]">
              <span className="text-lg text-gray-600 block mb-2 font-serif">Cor Litúrgica</span>
              <span className="font-semibold text-green-800 text-xl font-display">{liturgia.corLiturgica}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-purple-100 text-center min-w-[160px]">
              <span className="text-lg text-gray-600 block mb-2 font-serif">Semana</span>
              <span className="font-semibold text-purple-800 text-xl font-display">{liturgia.semana}</span>
            </div>
          </div>

          {/* Leituras */}
          <div className="space-y-6">

            {/* Primeira Leitura */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-8 border-green-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 p-1.5 rounded-lg">
                    <span className="text-lg">📜</span>
                  </div>
                  <h4 className="text-base font-bold text-gray-800 font-serif">
                    {liturgia.leituras.primeira.titulo}
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md font-serif">
                  Primeira Leitura
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed text-sm bg-green-50/50 p-3 rounded-lg border border-green-100 font-serif">
                <p className="italic">{liturgia.leituras.primeira.texto}</p>
              </div>
            </div>

            {/* Salmo Responsorial */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-8 border-blue-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-2 rounded-xl">
                    <span className="text-xl">🎵</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 font-display">
                    Salmo {liturgia.leituras.salmo.versiculo}
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md font-serif">
                  Salmo Responsorial
                </div>
              </div>
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 shadow-inner">
                  <p className="text-blue-800 italic font-bold text-xl mb-3 font-display">
                    "{liturgia.leituras.salmo.refrao}"
                  </p>
                  <p className="text-blue-600 text-base font-serif">— {liturgia.leituras.salmo.versiculo} —</p>
                </div>
              </div>
            </div>

            {/* Evangelho do Dia */}
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl border-l-8 border-purple-500">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-2 rounded-xl">
                    <span className="text-xl">✝️</span>
                  </div>
                  <h4 className="text-lg font-bold text-gray-800 font-display">
                    {liturgia.leituras.evangelho.titulo}
                  </h4>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap shadow-md font-serif">
                  Evangelho do Dia
                </div>
              </div>
              <div className="text-gray-700 leading-relaxed text-base bg-purple-50/50 p-4 rounded-xl border border-purple-100 font-serif">
                <p className="italic">{liturgia.leituras.evangelho.texto}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LiturgiaDiaria;