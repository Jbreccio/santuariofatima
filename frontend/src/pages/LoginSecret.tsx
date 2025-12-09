// LoginSecret.tsx ATUALIZADO
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Shield, Mail, Cross } from 'lucide-react';

export default function LoginSecret() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'idle' | 'credentials' | '2fa' | 'pin'>('idle');
  const [credenciais, setCredenciais] = useState({ usuario: '', senha: '' });
  const [codigo2FA, setCodigo2FA] = useState('');
  const [pinEmail, setPinEmail] = useState('');
  const [error, setError] = useState('');

  // Credenciais de teste
  const CREDENCIAIS_ADMIN = {
    usuario: 'Santuariodefatima',
    senha: 'santuario2025@DEVbeto',
    codigo2FA: '123456',
    pinEmail: '7890',
  };

  const handleLoginFlow = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (step === 'credentials') {
      if (
        credenciais.usuario === CREDENCIAIS_ADMIN.usuario &&
        credenciais.senha === CREDENCIAIS_ADMIN.senha
      ) {
        setStep('2fa');
      } else {
        setError('Usuário ou senha incorretos.');
      }
    } else if (step === '2fa') {
      if (codigo2FA === CREDENCIAIS_ADMIN.codigo2FA) {
        setStep('pin');
      } else {
        setError('Código do Google Authenticator inválido.');
      }
    } else if (step === 'pin') {
      if (pinEmail === CREDENCIAIS_ADMIN.pinEmail) {
        localStorage.setItem('admin_token', 'authenticated');
        localStorage.setItem('admin_user', credenciais.usuario);
        navigate('/admin');
      } else {
        setError('PIN de e-mail incorreto.');
      }
    }
  };

  const handleBack = () => {
    if (step === '2fa') setStep('credentials');
    if (step === 'pin') setStep('2fa');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex">
      {/* LADO ESQUERDO: Botão Login e Formulário */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        {/* TELA INICIAL: só o painel escuro com botão LOGIN */}
        {step === 'idle' && (
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] rounded-xl p-10 text-center shadow-2xl">
              <div className="flex justify-center mb-6">
                <Cross className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Santuário de Fátima</h1>
              <p className="text-white/80 text-sm mb-8">Acesso Administrativo</p>
              
              <button
                onClick={() => setStep('credentials')}
                className="flex items-center justify-center gap-3 bg-white text-[#051f2c] font-bold py-4 px-8 rounded-lg w-full hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl"
              >
                <LogIn size={22} />
                LOGIN ADMINISTRATIVO
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              Área restrita à coordenação pastoral
            </p>
            <p className="text-center text-gray-400 text-xs mt-2">
              Quatro camadas de segurança
            </p>
          </div>
        )}

        {/* ETAPAS DE LOGIN (Modal) */}
        {(step === 'credentials' || step === '2fa' || step === 'pin') && (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl w-full max-w-md p-8">
            {/* Botão para voltar à tela inicial */}
            <button
              onClick={() => setStep('idle')}
              className="text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-2"
            >
              ← Voltar
            </button>

            <div className="flex justify-center mb-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      (step === 'credentials' && i === 1) ||
                      (step === '2fa' && i <= 2) ||
                      (step === 'pin' && i <= 3)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-8 h-0.5 mx-1 ${
                        (step === '2fa' && i >= 1) || step === 'pin'
                          ? 'bg-blue-600'
                          : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-4 rounded-lg text-sm mb-6 flex items-start">
                <AlertCircle size={18} className="mt-0.5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginFlow} className="space-y-6">
              {step === 'credentials' && (
                <>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Usuário
                    </label>
                    <input
                      type="text"
                      autoFocus
                      value={credenciais.usuario}
                      onChange={(e) => setCredenciais({ ...credenciais, usuario: e.target.value })}
                      placeholder="Digite seu usuário"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      value={credenciais.senha}
                      onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                      placeholder="Digite sua senha"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-lg font-semibold text-lg transition-colors"
                  >
                    Próxima Etapa
                  </button>
                </>
              )}

              {step === '2fa' && (
                <>
                  <div className="text-center">
                    <Shield className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-800 text-xl">Google Authenticator</h3>
                    <p className="text-gray-600 mt-2">Digite o código de 6 dígitos do aplicativo</p>
                  </div>
                  
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={codigo2FA}
                    onChange={(e) => setCodigo2FA(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full p-4 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest"
                    autoFocus
                  />
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
                    >
                      Próximo
                    </button>
                  </div>
                </>
              )}

              {step === 'pin' && (
                <>
                  <div className="text-center">
                    <Mail className="w-14 h-14 text-blue-600 mx-auto mb-4" />
                    <h3 className="font-bold text-gray-800 text-xl">PIN de Confirmação</h3>
                    <p className="text-gray-600 mt-2">Verifique o PIN enviado para seu e-mail institucional</p>
                  </div>
                  
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={pinEmail}
                    onChange={(e) => setPinEmail(e.target.value.replace(/\D/g, ''))}
                    placeholder="7890"
                    className="w-full p-4 border border-gray-300 rounded-lg text-center text-2xl font-mono tracking-widest"
                    autoFocus
                  />
                  
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium"
                    >
                      Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
                    >
                      Acessar Painel
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
      </div>

      {/* LADO DIREITO: Imagem de Nossa Senhora - AGORA COM SUA IMAGEM */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-blue-900 to-blue-700 items-center justify-center p-12">
        <div className="text-center">
          <div className="mb-8">
            <div className="w-80 h-80 mx-auto rounded-full overflow-hidden border-8 border-white/20 shadow-2xl">
              {/* 🔥 SUA IMAGEM AQUI - caminho correto */}
              <img 
                src="/snsfoval.png.jpg" 
                alt="Nossa Senhora de Fátima"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e);
                  // Fallback se a imagem não carregar
                  e.currentTarget.src = 'https://placehold.co/400x400/1e3a8a/ffffff?text=Santuário+de+Fátima';
                }}
              />
            </div>
          </div>
          
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Santuário de Fátima</h2>
            <p className="text-white/80 text-lg italic">
              "Rezai o terço todos os dias para alcançar a paz..."
            </p>
            <p className="text-white/60 mt-4">Paróquia Santuário de Fátima</p>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/50 text-sm">
              Sistema Administrativo do Santuário<br />
              Desenvolvido com fé e dedicação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}