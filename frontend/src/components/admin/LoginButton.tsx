// components/admin/LoginButton.tsx - VERSÃO FINAL COM REDIRECIONAMENTO
import React, { useState } from 'react';
import { LogIn, X, User, Lock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

export default function LoginButton() {
  const navigate = useNavigate(); // Hook para navegação
  const [showModal, setShowModal] = useState(false);
  const [credenciais, setCredenciais] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');
  const [imgError, setImgError] = useState(false);

  // Caminho absoluto para a imagem na pasta public
  const logoImage = '/logo.png';

  // CREDENCIAIS PARA ACESSAR O PAINEL ADMIN
  const CREDENCIAIS_ADMIN = {
    usuario: 'Santuariodefatima', // Use esta
    senha: 'santuario2025@DEVbeto' // Use esta
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação das credenciais
    if (credenciais.usuario === CREDENCIAIS_ADMIN.usuario && 
        credenciais.senha === CREDENCIAIS_ADMIN.senha) {
      // Login bem-sucedido
      console.log('✅ Login realizado com sucesso! Redirecionando para o Painel Admin...');
      
      // 1. Fecha o modal
      setShowModal(false);
      setCredenciais({ usuario: '', senha: '' });
      
      // 2. Salva token de autenticação (opcional, mas recomendado)
      localStorage.setItem('admin_token', 'authenticated');
      localStorage.setItem('admin_user', credenciais.usuario);
      
      // 3. Redireciona usando navigate (melhor que window.location)
      navigate('/admin'); // Redireciona para a rota /admin que aponta para PainelAdmin
      
    } else {
      setError('❌ Credenciais inválidas! Verifique usuário e senha.');
    }
  };

  const handleForgotPassword = () => {
    alert(`🔐 Recuperação de Senha\n\nEntre em contato com o administrador do sistema.\n\nEmail: admin@santuario.com\nTelefone: (XX) XXXX-XXXX`);
  };

  const handleQuickLogin = () => {
    // Preenche automaticamente as credenciais
    setCredenciais({
      usuario: CREDENCIAIS_ADMIN.usuario,
      senha: CREDENCIAIS_ADMIN.senha
    });
  };

  return (
    <>
      {/* Botão no Menu */}
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        <LogIn size={18} />
        <span>Área Admin</span>
      </button>

      {/* Modal Completo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            {/* Cabeçalho com botão fechar */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-800">Painel Administrativo</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setCredenciais({ usuario: '', senha: '' });
                  setError('');
                  setImgError(false);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Conteúdo do Modal */}
            <div className="px-6 pb-6 pt-4">
              {/* Imagem do Santuário */}
              <div className="mb-6 text-center">
                <div className="relative mx-auto max-w-xs">
                  {imgError ? (
                    <div className="w-full h-40 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-300">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-800 mb-1">SANTUÁRIO</div>
                        <div className="text-xl text-gray-700 mb-1">DE FÁTIMA</div>
                        <div className="text-md text-blue-600 font-semibold mt-2">Painel Administrativo</div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <img 
                        src={logoImage} 
                        alt="Santuário de Fátima" 
                        className="w-full h-auto rounded-xl shadow-lg"
                        onError={() => setImgError(true)}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Formulário de Login */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg">
                    <div className="flex items-center">
                      <AlertCircle size={18} className="mr-2 flex-shrink-0" />
                      <span className="font-medium text-sm">{error}</span>
                    </div>
                  </div>
                )}

                {/* Campo Usuário */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usuário Administrativo
                  </label>
                  <input
                    type="text"
                    required
                    value={credenciais.usuario}
                    onChange={(e) => setCredenciais({...credenciais, usuario: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Digite o usuário"
                  />
                </div>

                {/* Campo Senha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Senha de Acesso
                  </label>
                  <input
                    type="password"
                    required
                    value={credenciais.senha}
                    onChange={(e) => setCredenciais({...credenciais, senha: e.target.value})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    placeholder="Digite a senha"
                  />
                </div>

                {/* Botão Entrar */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center mt-2"
                >
                  <LogIn size={18} className="mr-2" />
                  ACESSAR PAINEL ADMIN
                </button>

                {/* Botão Esqueci minha senha */}
                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>

              {/* Informações de ajuda */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <AlertCircle size={16} className="text-blue-500 mr-2" />
                  <span className="font-bold text-gray-800">Acesso Restrito</span>
                </div>
                <p className="text-sm text-gray-600">
                  Somente para administradores do Santuário
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}