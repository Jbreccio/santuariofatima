import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react';
import Navigation from '../components/layout/Navigation';
import Footer from '../components/layout/Footer';

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />
      
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Shield size={48} className="text-blue-300" />
            <h1 className="text-4xl font-bold">Política de Privacidade</h1>
          </div>
          <p className="text-xl text-blue-200 max-w-3xl">
            Compromisso do Santuário de Fátima com a proteção dos seus dados
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Introdução */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-green-600" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Nossa Filosofia de Privacidade</h2>
            </div>
            <p className="text-gray-700 mb-4">
              O <strong>Santuário de Nossa Senhora de Fátima</strong> valoriza e respeita sua privacidade. 
              Esta política explica como coletamos, usamos, protegemos e compartilhamos suas informações pessoais.
            </p>
            <p className="text-gray-700">
              Agimos em conformidade com a <strong>Lei Geral de Proteção de Dados (LGPD)</strong> e os 
              princípios éticos da Igreja Católica.
            </p>
          </div>

          {/* Seções */}
          <div className="space-y-8">
            {/* Seção 1 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="text-blue-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">1. Dados que Coletamos</h3>
              </div>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Informações de contato:</strong> Nome, e-mail, telefone (quando você se cadastra para receber notificações)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Dados de navegação:</strong> Endereço IP, tipo de dispositivo, páginas visitadas (para melhorar a experiência)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Informações de orações:</strong> Intenções de oração (apenas se você as compartilhar voluntariamente)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold">•</span>
                  <span><strong>Dados de doações:</strong> Informações necessárias para processar ofertas (com total segurança)</span>
                </li>
              </ul>
            </section>

            {/* Seção 2 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Database className="text-purple-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">2. Como Usamos Seus Dados</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Para Comunicação</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Enviar informações sobre missas e eventos</li>
                    <li>• Notificar sobre novenas e orações especiais</li>
                    <li>• Compartilhar conteúdos espirituais</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-800 mb-2">Para Melhorar Serviços</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Personalizar sua experiência no site</li>
                    <li>• Otimizar conteúdo espiritual</li>
                    <li>• Analisar uso para melhorias</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção 3 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <UserCheck className="text-red-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">3. Seus Direitos</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Acesso</h4>
                  <p className="text-sm text-gray-600">Solicitar cópia dos seus dados</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Correção</h4>
                  <p className="text-sm text-gray-600">Atualizar informações incorretas</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Exclusão</h4>
                  <p className="text-sm text-gray-600">Solicitar remoção dos seus dados</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Revogação</h4>
                  <p className="text-sm text-gray-600">Cancelar consentimento a qualquer momento</p>
                </div>
                <div className="border-l-4 border-red-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Portabilidade</h4>
                  <p className="text-sm text-gray-600">Transferir dados para outro serviço</p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h4 className="font-bold text-gray-800">Oposição</h4>
                  <p className="text-sm text-gray-600">Opor-se ao tratamento de dados</p>
                </div>
              </div>
            </section>

            {/* Seção 4 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="text-orange-600" size={24} />
                <h3 className="text-xl font-bold text-gray-800">4. Contato do Encarregado</h3>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Para exercer seus direitos ou tirar dúvidas sobre privacidade:
                </p>
                <div className="space-y-2">
                  <p><strong>E-mail:</strong> privacidade@santuario-fatima.org</p>
                  <p><strong>Telefone:</strong> (11) 1234-5678</p>
                  <p><strong>Endereço:</strong> Santuário de Fátima, Av. Principal, 1234 - Fátima/SP</p>
                  <p><strong>Horário:</strong> Segunda a sexta, 9h às 17h</p>
                </div>
              </div>
            </section>

            {/* Data de atualização */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-bold text-yellow-800 mb-2">📅 Última Atualização</h4>
              <p className="text-gray-700">
                Esta política foi atualizada em <strong>10 de Dezembro de 2025</strong>.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Recomendamos revisar periodicamente, pois podemos atualizar esta política 
                para refletir mudanças em nossas práticas ou por exigências legais.
              </p>
            </div>
          </div>

          {/* Botão Voltar */}
          <div className="max-w-4xl mx-auto px-4 mt-12 mb-8 text-center">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Voltar para Página Anterior
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}