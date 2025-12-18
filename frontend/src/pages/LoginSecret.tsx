import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, AlertCircle, Shield, Mail, Cross, UserPlus } from 'lucide-react';

export default function LoginSecret() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'idle' | 'credentials' | '2fa' | 'pin' | 'cadastro'>('idle');
  const [credenciais, setCredenciais] = useState({ usuario: '', senha: '' });
  const [codigo2FA, setCodigo2FA] = useState('');
  const [pinEmail, setPinEmail] = useState('');
  const [error, setError] = useState('');
  const [sucessoCadastro, setSucessoCadastro] = useState('');

  // Estados para cadastro
  const [dadosCadastro, setDadosCadastro] = useState({
    nome: '',
    email: '',
    celular: '',
    senha: '',
    confirmarSenha: ''
  });

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
        navigate('/paineladmin');
      } else {
        setError('PIN de e-mail incorreto.');
      }
    }
  };

  // Função para cadastro de novo usuário
  const handleCadastro = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSucessoCadastro('');

    // Validações
    if (!dadosCadastro.nome.trim()) {
      setError('O nome é obrigatório');
      return;
    }

    if (!dadosCadastro.email.includes('@')) {
      setError('E-mail inválido');
      return;
    }

    if (dadosCadastro.celular && dadosCadastro.celular.length < 10) {
      setError('Celular inválido');
      return;
    }

    if (dadosCadastro.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (dadosCadastro.senha !== dadosCadastro.confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    // Simular cadastro bem-sucedido
    try {
      // Em produção, aqui você faria uma chamada API
      const usuariosExistentes = JSON.parse(localStorage.getItem('admin_users') || '[]');
      
      // Verificar se email já existe
      if (usuariosExistentes.some((user: any) => user.email === dadosCadastro.email)) {
        setError('Este e-mail já está cadastrado');
        return;
      }

      // Adicionar novo usuário
      const novoUsuario = {
        id: Date.now(),
        nome: dadosCadastro.nome.trim(),
        email: dadosCadastro.email.trim(),
        celular: dadosCadastro.celular.trim(),
        senha: dadosCadastro.senha, // EM PRODUÇÃO: CRIPTOGRAFAR!
        dataCadastro: new Date().toISOString(),
        ativo: true,
        nivel: 'editor' // ou 'admin' conforme necessidade
      };

      usuariosExistentes.push(novoUsuario);
      localStorage.setItem('admin_users', JSON.stringify(usuariosExistentes));

      // Limpar formulário
      setDadosCadastro({
        nome: '',
        email: '',
        celular: '',
        senha: '',
        confirmarSenha: ''
      });

      setSucessoCadastro('✅ Usuário cadastrado com sucesso! Em breve você receberá instruções para ativar a autenticação em duas etapas.');

      // Voltar para login após 3 segundos
      setTimeout(() => {
        setStep('idle');
      }, 3000);

    } catch (error) {
      setError('Erro ao cadastrar usuário. Tente novamente.');
    }
  };

  const handleBack = () => {
    if (step === '2fa') setStep('credentials');
    if (step === 'pin') setStep('2fa');
    if (step === 'cadastro') {
      setStep('idle');
      setDadosCadastro({
        nome: '',
        email: '',
        celular: '',
        senha: '',
        confirmarSenha: ''
      });
      setError('');
      setSucessoCadastro('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-slate-100 flex">
      {/* LADO ESQUERDO: Botão Login e Formulário */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8">
        {/* TELA INICIAL: só o painel escuro com botão LOGIN */}
        {step === 'idle' && (
          <div className="w-full max-w-md">
            <div className="bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] rounded-xl p-10 text-center shadow-2xl">
              {/* LOGO NO CENTRO DO BOTÃO */}
              <div className="flex justify-center mb-6">
                <div className="w-60 h-60 rounded-full overflow-hidden border-4 border-white/30 shadow-lg">
                  <img 
                    src="/logo.png" 
                    alt="Santuário de Fátima"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/80x80/1e3a8a/ffffff?text=SF';
                    }}
                  />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-white mb-2"></h1>
              <p className="text-white/80 text-sm mb-8">Acesso Administrativo</p>
              
              <button
                onClick={() => setStep('credentials')}
                className="flex items-center justify-center gap-3 bg-white text-[#051f2c] font-bold py-4 px-8 rounded-lg w-full hover:bg-gray-100 transition-colors text-lg shadow-lg hover:shadow-xl mb-4"
              >
                <LogIn size={22} />
                LOGIN
              </button>

              {/* BOTÃO PARA CADASTRO NOVO - ADICIONADO AQUI */}
              <button
                onClick={() => setStep('cadastro')}
                className="flex items-center justify-center gap-3 bg-transparent border-2 border-white text-white font-bold py-3.5 px-8 rounded-lg w-full hover:bg-white/10 transition-colors"
              >
                <UserPlus size={20} />
                CADASTRAR NOVO USUÁRIO
              </button>
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-6">
              Área restrita à coordenação pastoral
            </p>
            <p className="text-center text-gray-400 text-xs mt-2">
              Sistema Administrativo do Santuário<p></p>
                Desenvolvido com fé e dedicação
            </p>
          </div>
        )}

        {/* ETAPA DE CADASTRO - NOVA */}
        {step === 'cadastro' && (
          <div className="bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] rounded-2xl shadow-2xl w-full max-w-md p-8">
            {/* CABEÇALHO DO MODAL COM LOGO */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={handleBack}
                className="text-white hover:text-gray-300 flex items-center gap-2"
              >
                ← Voltar
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src="/logo.png" 
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-bold text-lg">Cadastro de Usuário</span>
              </div>
            </div>

            {sucessoCadastro && (
              <div className="bg-green-500/20 border border-green-400 text-white p-4 rounded-lg text-sm mb-6 flex items-start backdrop-blur-sm">
                <AlertCircle size={18} className="mt-0.5 mr-3 flex-shrink-0" />
                <span>{sucessoCadastro}</span>
              </div>
            )}

            {error && !sucessoCadastro && (
              <div className="bg-red-500/20 border border-red-400 text-white p-4 rounded-lg text-sm mb-6 flex items-start backdrop-blur-sm">
                <AlertCircle size={18} className="mt-0.5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleCadastro} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Cadastro de Novo Usuário</h2>
                <p className="text-white/80">Preencha os dados para criar uma conta administrativa</p>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  autoFocus
                  value={dadosCadastro.nome}
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, nome: e.target.value })}
                  placeholder="Digite seu nome completo"
                  className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  value={dadosCadastro.email}
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, email: e.target.value })}
                  placeholder="seu.email@santuario.com"
                  className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                  required
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Celular (WhatsApp)
                </label>
                <input
                  type="tel"
                  value={dadosCadastro.celular}
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, celular: e.target.value.replace(/\D/g, '') })}
                  placeholder="(11) 99999-9999"
                  className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                />
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Senha *
                </label>
                <input
                  type="password"
                  value={dadosCadastro.senha}
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, senha: e.target.value })}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                  minLength={6}
                  required
                />
                <p className="text-white/60 text-xs mt-1">Mínimo 6 caracteres</p>
              </div>
              
              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Confirmar Senha *
                </label>
                <input
                  type="password"
                  value={dadosCadastro.confirmarSenha}
                  onChange={(e) => setDadosCadastro({ ...dadosCadastro, confirmarSenha: e.target.value })}
                  placeholder="Digite a senha novamente"
                  className="w-full p-3 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                  required
                />
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-white hover:bg-gray-100 text-blue-700 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                >
                  {sucessoCadastro ? '✓ Cadastro Concluído' : 'Cadastrar Usuário'}
                </button>
              </div>

              <div className="text-center pt-4 border-t border-white/20">
                <p className="text-white/70 text-sm">
                  Após o cadastro, você receberá instruções para configurar a autenticação em duas etapas
                </p>
              </div>
            </form>
          </div>
        )}

        {/* ETAPAS DE LOGIN (Modal) - COM MELHORIAS */}
        {(step === 'credentials' || step === '2fa' || step === 'pin') && (
          <div className="bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] rounded-2xl shadow-2xl w-full max-w-md p-8">
            {/* CABEÇALHO DO MODAL COM LOGO */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setStep('idle')}
                className="text-white hover:text-gray-300 flex items-center gap-2"
              >
                ← Voltar
              </button>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src="/logo.png" 
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-bold text-lg">Painel Admin</span>
              </div>
            </div>

            {/* BARRA DE PROGRESSO */}
            <div className="flex justify-center mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      (step === 'credentials' && i === 1) ||
                      (step === '2fa' && i <= 2) ||
                      (step === 'pin' && i <= 3)
                        ? 'bg-white text-blue-700'
                        : 'bg-white/20 text-white/60'
                    }`}
                  >
                    {i}
                  </div>
                  {i < 3 && (
                    <div
                      className={`w-10 h-1 mx-2 ${
                        (step === '2fa' && i >= 1) || step === 'pin'
                          ? 'bg-white'
                          : 'bg-white/20'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400 text-white p-4 rounded-lg text-sm mb-6 flex items-start backdrop-blur-sm">
                <AlertCircle size={18} className="mt-0.5 mr-3 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLoginFlow} className="space-y-6">
              {step === 'credentials' && (
                <>
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">Credenciais de Acesso</h2>
                    <p className="text-white/80">Digite seu usuário e senha</p>
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Usuário
                    </label>
                    <input
                      type="text"
                      autoFocus
                      value={credenciais.usuario}
                      onChange={(e) => setCredenciais({ ...credenciais, usuario: e.target.value })}
                      placeholder="Digite seu usuário"
                      className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">
                      Senha
                    </label>
                    <input
                      type="password"
                      value={credenciais.senha}
                      onChange={(e) => setCredenciais({ ...credenciais, senha: e.target.value })}
                      placeholder="Digite sua senha"
                      className="w-full p-4 bg-white/10 border border-white/20 text-white rounded-lg focus:ring-2 focus:ring-white focus:border-white placeholder:text-white/50"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-white hover:bg-gray-100 text-blue-700 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
                    >
                      Próxima →
                    </button>
                  </div>
                  
                  <div className="text-center pt-4">
                    <button
                      type="button"
                      onClick={() => setStep('idle')}
                      className="text-white/70 hover:text-white text-sm"
                    >
                      ← Voltar para a tela inicial
                    </button>
                  </div>
                </>
              )}

              {step === '2fa' && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-xl">Google Authenticator</h3>
                    <p className="text-white/80 mt-2">Digite o código de 6 dígitos do aplicativo</p>
                  </div>
                  
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={codigo2FA}
                    onChange={(e) => setCodigo2FA(e.target.value.replace(/\D/g, ''))}
                    placeholder="123456"
                    className="w-full p-5 bg-white/10 border border-white/20 text-white rounded-lg text-center text-3xl font-mono tracking-widest placeholder:text-white/30 focus:ring-2 focus:ring-white"
                    autoFocus
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3.5 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      ← Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-white text-blue-700 py-3.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-lg"
                    >
                      Próximo →
                    </button>
                  </div>
                </>
              )}

              {step === 'pin' && (
                <>
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                      <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-bold text-white text-xl">PIN de Confirmação</h3>
                    <p className="text-white/80 mt-2">Verifique o PIN enviado para seu e-mail institucional</p>
                  </div>
                  
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={4}
                    value={pinEmail}
                    onChange={(e) => setPinEmail(e.target.value.replace(/\D/g, ''))}
                    placeholder="7890"
                    className="w-full p-5 bg-white/10 border border-white/20 text-white rounded-lg text-center text-3xl font-mono tracking-widest placeholder:text-white/30 focus:ring-2 focus:ring-white"
                    autoFocus
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-3.5 border-2 border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                    >
                      ← Voltar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3.5 rounded-lg font-medium transition-colors shadow-lg"
                    >
                      ✅ Acessar Painel
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        )}
      </div>

      {/* LADO DIREITO: COM O MESMO GRADIENTE DO BOTÃO LOGIN */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] items-center justify-center p-12">
        <div className="text-center max-w-lg">
          <div className="mb-10">
            <div className="w-96 h-96 mx-auto rounded-full overflow-hidden border-8 border-white/30 shadow-2xl">
              <img 
                src="/snsfoval.png.jpg" 
                alt="Santuário de Fátima"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem:', e);
                  e.currentTarget.src = 'https://placehold.co/400x400/1e3a8a/ffffff?text=Santuário+de+Fátima';
                }}
              />
            </div>
          </div>
          
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-6 tracking-tight">Santuário de Fátima</h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p- border border-white/20">
              <p className="text-white/90 text-xl italic leading-relaxed mb-4">
                "Rezai o terço todos os dias para alcançar a paz para o mundo e o fim da guerra"
              </p>
              <p className="text-white/70">— Nossa Senhora de Fátima, 13 de maio de 1917</p>
            </div>
          
          </div>
               
        </div>
      </div>
    </div>
  );
}