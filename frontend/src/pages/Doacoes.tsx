import React from 'react';
import Navigation from "../components/layout/Navigation";
import Footer from "../components/layout/Footer";
import { Link } from 'react-router-dom';

export default function Doacoes() {
  const copyPix = () => {
    const pixKey = '60.909.843/0065-00';
    navigator.clipboard.writeText(pixKey).then(() => {
      alert('✅ Chave PIX copiada com sucesso!\n\n' + pixKey);
    }).catch(() => {
      alert('❌ Erro ao copiar. Por favor, copie manualmente:\n\n' + pixKey);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* 🔵 BANNER RESPONSIVO - IGUAL AOS MOMENTOS LITÚRGICOS */}
      <section className="relative w-full overflow-hidden bg-gray-900 mt-20">
        <div className="relative h-[400px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src="/doacoesbanner.png"
            alt="Doações"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center">
            <div className="text-center px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-2 sm:mb-3 drop-shadow-lg">
                Doações
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto px-4 drop-shadow-md">
                Sua generosidade transforma vidas
              </p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-green-500 to-blue-500"></div>
      </section>

      {/* Conteúdo Principal */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

        {/* FORMAS DE DOAR */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Formas de Doar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* PIX CARD */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z">
                  </path>
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">DOE COM PIX</h3>
              </div>

              <div className="bg-white rounded-lg p-4 md:p-6 mb-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Chave PIX (CNPJ):</p>
                <p className="text-xl md:text-2xl font-bold text-green-600 my-3 md:my-4 break-all">
                  60.909.843/0065-00
                </p>

                <div className="bg-gray-50 rounded-lg p-3 md:p-4 my-3 md:my-4">
                  <p className="text-sm text-gray-700"><strong>1.</strong> Abra seu app do banco</p>
                  <p className="text-sm text-gray-700"><strong>2.</strong> Selecione PIX</p>
                  <p className="text-sm text-gray-700"><strong>3.</strong> Copie a chave ou use o QR Code-PIX abaixo</p>
                </div>

                <button
                  onClick={copyPix}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors duration-200"
                >
                  📋 Copiar Chave PIX
                </button>
              </div>
            </div>

            {/* TRANSFERÊNCIA */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-300 rounded-xl p-6 md:p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                  </path>
                </svg>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">DOE COM TRANSFERÊNCIA</h3>
              </div>

              <div className="bg-white rounded-lg p-4 md:p-6">
                <p className="text-lg font-bold text-gray-900 mb-4">
                  MITRA DIOCESANA DE SANTO AMARO
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-orange-200">
                    <span className="font-semibold text-gray-700">Banco:</span>
                    <span className="font-bold text-orange-600">Itaú</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-orange-200">
                    <span className="font-semibold text-gray-700">Agência:</span>
                    <span className="font-bold text-orange-600">0767</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-gray-700">Conta Corrente:</span>
                    <span className="font-bold text-orange-600">33977-3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QR CODE */}
        <div className="text-center my-8 md:my-10">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            DOE COM QRCODE-PIX
          </h3>

          <img
            src="/dizimo.png"
            alt="QR Code para Doação"
            className="w-40 md:w-48 object-contain mx-auto rounded-lg shadow-md border border-gray-300"
          />
        </div>

        {/* Onde Sua Doação Será Aplicada */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Onde Sua Doação Será Aplicada</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Manutenção do Santuário</h3>
              <p className="text-gray-700 text-sm md:text-base">Conservação, limpeza e melhorias do nosso espaço sagrado</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Catequese</h3>
              <p className="text-gray-700 text-sm md:text-base">Formação de crianças, jovens e adultos na fé cristã</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Ações Sociais</h3>
              <p className="text-gray-700 text-sm md:text-base">Ajuda a famílias e apoio aos grupos de serviço e evangelização</p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-xl p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">Reformas</h3>
              <p className="text-gray-700 text-sm md:text-base">Melhorias na infraestrutura e acessibilidade</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 md:p-6 text-center">
            <p className="text-base md:text-lg text-gray-700 font-semibold italic"> Sua contribuição é fundamental para mantermos viva a missão do Santuário. </p>
          </div>
        </section>

        {/* OUTRAS FORMAS DE AJUDAR */}
        <section className="mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">Outras Formas de Ajudar</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            {/* Doações Financeiras */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Doações Financeiras</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Contribua com doações financeiras para manter as atividades paroquiais.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Doações podem ser feitas durante as missas</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Transferências bancárias (veja detalhes acima)</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> PIX com CNPJ (veja detalhes acima)</li>
              </ul>
            </div>

            {/* Doações de Alimentos */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Doações de Alimentos</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Alimentos não perecíveis para nossas ações sociais.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Arroz, feijão, macarrão</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Leite e produtos lácteos</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Óleo, sal e temperos</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Alimentos infantis</li>
              </ul>
            </div>

            {/* Doações de Roupas */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Doações de Roupas</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Roupas em bom estado para distribuição às famílias necessitadas.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Roupas limpas e em bom estado</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Sapatos e calçados</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Roupas infantis</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Cobertores e edredons</li>
              </ul>
            </div>

            {/* Doações de Higiene */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <h3 className="text-lg md:text-xl font-bold text-gray-900">Doações de Higiene</h3>
              </div>
              <p className="text-gray-600 mb-4 text-sm md:text-base">
                Produtos de higiene e limpeza para as famílias carentes.
              </p>

              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Sabonete e shampoo</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Pasta de dente</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Papel higiênico</li>
                <li className="flex items-start gap-2 text-gray-600 text-sm md:text-base"><span className="text-red-600 mt-1">✓</span> Produtos de limpeza</li>
              </ul>
            </div>
          </div>
        </section>

        {/* INFORMAÇÕES IMPORTANTES */}
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-xl p-6 md:p-8 mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6">Informações Importantes</h2>
          <div className="space-y-3 md:space-y-4 text-gray-700 text-sm md:text-base">
            <p><strong>Horário de Recebimento:</strong> Segunda a sexta, 09h00 às 17h00.</p>
            <p><strong>Transparência:</strong> Todas as doações são registradas e usadas para fins sociais e religiosos.</p>
            <p><strong>Recibos:</strong> Emitimos recibos para declaração de imposto de renda.</p>
          </div>
        </div>

        {/* CTA Final */}
        <div className="bg-gradient-to-r from-blue-600 to-green-500 text-white rounded-xl p-6 md:p-8 text-center shadow-xl mb-12 md:mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Faça Sua Doação</h2>
          <p className="text-lg md:text-xl mb-3 md:mb-4 opacity-70">
            Toda doação ajuda quem mais precisa
          </p>
          <p className="text-xl md:text-2xl font-semibold italic mb-6 md:mb-8">
            🙏 Deus abençoe você e sua família
          </p>
          
          <Link
            to="/contato"
            className="inline-block bg-white text-blue-600 font-bold py-3 px-6 md:px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Entre em Contato
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}