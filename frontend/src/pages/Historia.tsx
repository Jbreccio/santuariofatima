import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";

export default function Historia() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />

      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Nossa História</h1>

        {/* Nossa Senhora de Fátima */}
        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Nossa Senhora de Fátima</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <img
                src="/historia.png"
                alt="Nossa Senhora de Fátima"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Nossa Senhora de Fátima é uma das devoções mais importantes da Igreja Católica.
                Aparições ocorreram em 1917 em Fátima, Portugal, a três crianças: Lúcia dos Santos,
                Francisco Marto e Jacinta Marto.
              </p>
              <p>
                Estas aparições deixaram uma mensagem de esperança, conversão e oração para o mundo.
                A Virgem Maria pediu orações pelo fim da guerra e pela paz mundial.
              </p>
              <p>
                A devoção a Nossa Senhora de Fátima espalhou-se por todo o mundo, e muitos milagres
                foram atribuídos à sua intercessão. O Santuário de Fátima é um dos maiores centros
                de peregrinação do mundo.
              </p>
              <p>
                Celebramos a festa de Nossa Senhora de Fátima em 13 de maio, data das primeiras aparições.
              </p>
            </div>
          </div>
        </section>

        {/* História da Paróquia */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">História do Santuário Nossa Senhora de Fátima</h2>
          <div className="text-gray-700 space-y-4">
            <p>
              O Santuario Nossa Senhora de Fátima foi fundada com o objetivo de servir a comunidade
              local e propagar a fé católica. Desde sua criação, tem sido um espaço de encontro,
              oração e comunidade.
            </p>
            <p>
              Ao longo dos anos, nossa paróquia cresceu e se desenvolveu, acompanhando as mudanças
              e necessidades da comunidade. Temos trabalhado para manter viva a fé, promover a
              caridade e servir aos necessitados.
            </p>
            <p>
              Nossa missão é ser um sinal vivo da presença de Deus no mundo, através do testemunho
              de fé, esperança e caridade. Buscamos acolher a todos com braços abertos e oferecer
              um espaço seguro para o crescimento espiritual.
            </p>
            <p>
              Contamos com diversas pastorais e grupos que trabalham em diferentes áreas, desde
              a catequese até o atendimento social, sempre buscando viver os valores do Evangelho.
            </p>
            <p>
              Convidamos você a fazer parte de nossa comunidade e a participar de nossas atividades.
              Juntos, podemos fazer diferença no mundo e testemunhar o amor de Cristo.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
