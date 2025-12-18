import React from 'react';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { MapPin, Phone, Mail, Clock, Car, Bus, Footprints, Train } from 'lucide-react';

export default function Localizacao() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* 🔵 BANNER RESPONSIVO - IGUAL ÀS OUTRAS PÁGINAS */}
      <section className="relative w-full overflow-hidden bg-gray-900 mt-20">
        <div className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src="/images/carrosselFotos/vistadecima.png"
            alt="Localização do Santuário"
            className="absolute inset-0 w-full h-full object-cover object-center"
            onError={(e) => {
              const img = e.currentTarget;
              img.onerror = null;
              img.src = '/fachada2.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Localização
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md">
                Encontre o caminho até nosso Santuário
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
      </section>

      {/* Conteúdo Principal */}
      <main className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          {/* Informações */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Endereço */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-blue-600" size={24} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Endereço</h3>
              </div>
              <div className="text-gray-700 space-y-1">
                <p>Rua Darwin, 651</p>
                <p>Santo Amaro</p>
                <p>04741-011 – São Paulo, SP</p>
              </div>
            </div>

            {/* Telefone */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="text-blue-600" size={24} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Telefone</h3>
              </div>
              <div className="text-gray-700">
                <p>(11) 5521-0312</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-blue-600" size={24} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Email</h3>
              </div>
              <div className="text-gray-700">
                <p>santuarionsradefatima@santoamaro.org.br</p>
              </div>
            </div>

            {/* Horário */}
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="text-blue-600" size={24} />
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Horário</h3>
              </div>
              <div className="text-gray-700 space-y-3">
                <div>
                  <p className="font-semibold">Terça à Sexta-Feira</p>
                  <p>08h30 às 12h00 e das 13h00 às 17h30</p>
                </div>
                <div>
                  <p className="font-semibold">Sábado:</p>
                  <p>08h00 às 12h00 e das 13h00 às 17h00</p>
                </div>
                <div>
                  <p className="font-semibold">Domingo:</p>
                  <p>Confira os horários de missas</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mapa e Imagem da Igreja */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mapa do Google */}
            <div className="bg-gray-300 rounded-lg shadow-sm h-72 md:h-96 overflow-hidden">
              <iframe
                className="w-full h-full"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.391391366212!2d-46.72231172468649!3d-23.75008146608715!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce4f8a97dce2c5%3A0x5e1d6c8d8f8f8f8f!2sRua%20Darwin%2C%20651%20-%20Santo%20Amaro%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2004741-011!5e0!3m2!1spt-BR!2sbr!4v1690000000000!5m2!1spt-BR!2sbr"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização do Santuário"
              ></iframe>
            </div>
            <p className="text-gray-500 text-sm">
              *O mapa acima mostra a localização exata da paróquia.
            </p>

            {/* ✨ IMAGEM DA IGREJA - AJUSTADA PARA NÃO CORTAR O TOPO */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Container com altura flexível para mostrar imagem completa */}
              <div className="w-full h-auto">
                <img 
                  src="/images/carrosselFotos/fachada1.png" 
                  alt="Fachada do Santuário Nossa Senhora de Fátima"
                  className="w-full h-auto max-h-[400px] md:max-h-[500px] object-contain"
                  onError={(e) => {
                    console.error('❌ Erro ao carregar imagem da igreja');
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = '/fachada2.png';
                  }}
                />
              </div>
              <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                <p className="text-center text-gray-700 font-medium">
                  Santuário Nossa Senhora de Fátima - Fachada Principal
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Como Chegar */}
        <section className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Como Chegar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            
            {/* De Carro */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Car className="text-blue-600" size={24} />
                De Carro
              </h3>
              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                <p>
                  <strong>Estacionamento:</strong> Disponível na rua. Procure pelas vagas de estacionamento rotativo próximo à entrada do santuário.
                </p>
                <p><strong>Vias de Acesso:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Marginal Pinheiros (sentido Santo Amaro)</li>
                  <li>Avenida Santo Amaro</li>
                  <li>Avenida Adolfo Pinheiro</li>
                </ul>
                <p className="text-sm text-blue-600">
                  <strong>Dica:</strong> Recomendamos chegar com 15 minutos de antecedência para encontrar vagas com mais facilidade.
                </p>
              </div>
            </div>
            
            {/* De Ônibus */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Bus className="text-blue-600" size={24} />
                De Ônibus
              </h3>
              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                <p><strong>Principais Linhas:</strong></p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {['675A-10', '677A-10', '702P-10', '775J-10', '877M-10'].map((line) => (
                    <span key={line} className="bg-blue-600 text-white px-2 py-1 rounded-full text-sm font-medium">
                      {line}
                    </span>
                  ))}
                </div>
                <p><strong>Parada mais próxima:</strong> A aproximadamente 100 metros do santuário, na Rua Darwin.</p>
                <p><strong>Terminal de Ônibus:</strong> Terminal Santo Amaro (15 minutos a pé)</p>
              </div>
            </div>
            
            {/* De Metrô */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Train className="text-blue-600" size={24} />
                De Metrô
              </h3>
              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                <p><strong>Estações mais próximas:</strong></p>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-lime-500 text-white px-2 py-1 rounded text-xs font-bold">L5</span>
                    <span className="font-medium">Adolfo Pinheiro</span>
                    <span className="text-sm text-gray-500">(800m - 10 min a pé)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">L1</span>
                    <span className="font-medium">Santo Amaro</span>
                    <span className="text-sm text-gray-500">(1,2 km - 15 min a pé)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">L5</span>
                    <span className="font-medium">Alto da Boa Vista</span>
                    <span className="text-sm text-gray-500">(1,5 km - 18 min a pé)</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg mb-3">
                  <p className="text-sm font-semibold text-blue-800 mb-1">🌟 Melhor Opção:</p>
                  <p className="text-sm text-blue-700">
                    <strong>Estação Adolfo Pinheiro (L5-Lilás)</strong> é a mais próxima! 
                    Apenas 10 minutos a pé pela Avenida Adolfo Pinheiro.
                  </p>
                </div>
                
                <p><strong>Conexões de Ônibus:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2 text-sm">
                  <li>Da estação <strong>Adolfo Pinheiro</strong>: Ônibus 775J-10 (1 parada)</li>
                  <li>Da estação <strong>Santo Amaro</strong>: Ônibus 677A-10 ou 775J-10 (2 paradas)</li>
                </ul>
                <p className="text-sm text-blue-600 mt-3">
                  <strong>Dica:</strong> Use o app "Moovit" ou "Cittamobi" para rotas integradas metrô+ônibus.
                </p>
              </div>
            </div>
            
            {/* A Pé */}
            <div className="bg-gray-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Footprints className="text-blue-600" size={24} />
                A Pé
              </h3>
              <div className="space-y-3 text-gray-700 text-sm md:text-base">
                <p><strong>Localização:</strong> Área central de Santo Amaro, de fácil acesso e bem sinalizada.</p>
                <p><strong>Próximo a:</strong></p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Comércios locais</li>
                  <li>Farmácias</li>
                  <li>Restaurantes</li>
                  <li>Bancos</li>
                </ul>
                <p><strong>Acessibilidade:</strong> Calçadas rebaixadas e acesso para cadeirantes disponível.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Acessibilidade */}
        <section className="bg-blue-50 rounded-lg p-4 md:p-6 border-l-4 border-blue-600">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Acessibilidade</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {[
              "Rampas de acesso para cadeirantes",
              "Banheiros acessíveis",
              "Estacionamento para deficientes",
              "Elevador disponível",
              "Assentos reservados para idosos e gestantes"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3 text-gray-700 text-sm md:text-base">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                {item}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}