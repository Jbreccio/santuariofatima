// frontend/src/pages/termos-uso.tsx
import React from 'react';
import { FileText, Scale, AlertCircle, BookOpen, Heart, Cross } from 'lucide-react';

export default function TermosUso() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Cabeçalho */}
      <div className="bg-gradient-to-r from-purple-900 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <Scale size={48} className="text-purple-300" />
            <h1 className="text-4xl font-bold">Termos de Uso</h1>
          </div>
          <p className="text-xl text-purple-200 max-w-3xl">
            Condições para uso do portal do Santuário de Nossa Senhora de Fátima
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Aviso importante */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="text-blue-600 mt-1" size={24} />
              <div>
                <h3 className="text-lg font-bold text-blue-800 mb-2">Aviso Importante</h3>
                <p className="text-blue-700">
                  Ao acessar e usar este site, você concorda com estes Termos de Uso. 
                  Se não concordar, por favor, não utilize nosso portal.
                </p>
              </div>
            </div>
          </div>

          {/* Seções */}
          <div className="space-y-8">
            {/* Seção 1 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <FileText className="text-blue-600" size={28} />
                <h2 className="text-2xl font-bold text-gray-800">1. Aceitação dos Termos</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>
                  O portal do <strong>Santuário de Nossa Senhora de Fátima</strong> é um serviço 
                  religioso e informativo mantido pela comunidade católica.
                </p>
                <p>
                  Estes Termos regulam o uso do site, aplicativos e serviços relacionados. 
                  O uso continuado implica aceitação das alterações futuras.
                </p>
              </div>
            </section>

            {/* Seção 2 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">2. Propósito do Site</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="text-green-600" size={24} />
                    <h3 className="font-bold text-green-800">Finalidades Principais</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <Heart size={16} className="text-red-500 mt-1" />
                      <span>Divulgação da mensagem de Fátima</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Cross size={16} className="text-gray-700 mt-1" />
                      <span>Orientação espiritual católica</span>
                    </li>
                    <li>• Informações sobre missas e eventos</li>
                    <li>• Compartilhamento de orações e novenas</li>
                    <li>• Formação doutrinária</li>
                  </ul>
                </div>
                <div className="bg-red-50 p-5 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <AlertCircle className="text-red-600" size={24} />
                    <h3 className="font-bold text-red-800">Restrições</h3>
                  </div>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Não é plataforma comercial</li>
                    <li>• Não vende produtos religiosos</li>
                    <li>• Não oferece consultas pessoais</li>
                    <li>• Não substitui direção espiritual</li>
                    <li>• Não realiza milagres online</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Seção 3 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">3. Conduta do Usuário</h2>
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-green-700 mb-3">✅ Condutas Permitidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Uso Pessoal</h4>
                    <p className="text-sm text-gray-700">Acesso para oração e informação</p>
                  </div>
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Compartilhamento</h4>
                    <p className="text-sm text-gray-700">Divulgação de conteúdos espirituais</p>
                  </div>
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Participação</h4>
                    <p className="text-sm text-gray-700">Envios de intenções de oração</p>
                  </div>
                  <div className="border border-green-200 bg-green-50 p-4 rounded-lg">
                    <h4 className="font-bold text-green-800 mb-2">Feedback</h4>
                    <p className="text-sm text-gray-700">Sugestões construtivas</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-red-700 mb-3">❌ Condutas Proibidas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Conteúdo Ofensivo</h4>
                    <p className="text-sm text-gray-700">Discurso de ódio ou blasfêmia</p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Uso Comercial</h4>
                    <p className="text-sm text-gray-700">Venda não autorizada</p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Ataques Técnicos</h4>
                    <p className="text-sm text-gray-700">Hacking ou sobrecarga do site</p>
                  </div>
                  <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">Informação Falsa</h4>
                    <p className="text-sm text-gray-700">Divulgação de fake news</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 4 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">4. Conteúdo Espiritual</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Todo conteúdo espiritual fornecido segue o <strong>Magistério da Igreja Católica</strong> 
                  e as orientações da <strong>Congregação para a Doutrina da Fé</strong>.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-bold text-yellow-800 mb-2">⚠️ Aviso de Isenção</h4>
                  <p className="text-sm">
                    As informações aqui contidas são para orientação geral. 
                    Para questões pessoais de fé ou consciência, consulte um sacerdote ou diretor espiritual.
                  </p>
                </div>
              </div>
            </section>

            {/* Seção 5 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">5. Direitos Autorais</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Os conteúdos originais do site são propriedade do Santuário de Fátima. 
                  Imagens, textos e vídeos podem estar protegidos por direitos autorais.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-bold text-blue-800 mb-2">✅ Permissões</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Compartilhamento para fins não comerciais</li>
                      <li>• Uso em atividades pastorais</li>
                      <li>• Citação com atribuição</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-bold text-red-800 mb-2">❌ Proibições</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Modificação sem autorização</li>
                      <li>• Uso comercial sem licença</li>
                      <li>• Atribuição incorreta</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Seção 6 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">6. Limitação de Responsabilidade</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  O Santuário não se responsabiliza por:
                </p>
                <ul className="space-y-2 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Interrupções técnicas temporárias do site</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Conteúdo de sites externos linkados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Interpretações pessoais dos conteúdos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-500">•</span>
                    <span>Ações de terceiros usando nosso site</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Seção 7 */}
            <section className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">7. Contato e Reclamações</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Para questões sobre estes Termos ou reclamações:
                </p>
                <div className="space-y-2">
                  <p><strong>E-mail:</strong> juridico@santuario-fatima.org</p>
                  <p><strong>Telefone:</strong> (11) 1234-5678 (ramal 2)</p>
                  <p><strong>Correspondência:</strong> Setor Jurídico, Santuário de Fátima, Av. Principal, 1234</p>
                  <p><strong>Horário:</strong> Segunda a sexta, 9h às 17h</p>
                </div>
              </div>
            </section>

            {/* Data de vigência */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-bold text-purple-800 mb-2">📜 Vigência</h4>
              <p className="text-gray-700">
                Estes Termos entram em vigor em <strong>10 de Dezembro de 2025</strong> e 
                permanecem válidos até serem substituídos.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Alterações serão comunicadas com 30 dias de antecedência quando possível.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}