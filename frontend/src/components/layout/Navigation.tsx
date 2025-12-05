import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [credenciais, setCredenciais] = useState({ usuario: '', senha: '' });
  const [error, setError] = useState('');

  const CREDENCIAIS_ADMIN = {
    usuario: 'Santuariodefatima',
    senha: 'santuario2025@DEVbeto'
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 6);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (
      credenciais.usuario === CREDENCIAIS_ADMIN.usuario &&
      credenciais.senha === CREDENCIAIS_ADMIN.senha
    ) {
      // Salvar autenticação
      localStorage.setItem('admin_token', 'authenticated');
      localStorage.setItem('admin_user', credenciais.usuario);
      setShowLoginModal(false);
      setCredenciais({ usuario: '', senha: '' });
      window.location.href = '/admin';
    } else {
      setError('❌ Credenciais inválidas!');
    }
  };

  const handleForgotPassword = () => {
    alert('Para recuperar sua senha, entre em contato com a administração.');
  };

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/historia', label: 'História' },
    { href: '/pastorais', label: 'Pastorais' },
    { href: '/santododia', label: 'Santo do Dia' },
    { href: '/doacoes', label: 'Doações' },
    { href: '/eventos', label: 'Eventos' },
    { href: '/missas', label: 'Missas' },
    { href: '/calendarioliturgico', label: 'Calendario Litugico' },
    { href: '/contato', label: 'Contato' },
    { href: '/localizacao', label: 'Localização' },
    { href: '/sobrenos', label: 'Sobre Nós' },
  ];

  return (
    <>
      {/* ============ SEU NAVIGATION EXATAMENTE COMO ESTAVA ============ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          bg-[#2e8cb8]`}
      >
        <div className="max-w-7x1 mx-auto px-8">
          <div className="flex items-center justify-between h-24">
            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center bg-gradient-to-b from-[#3298c8] to-[#2e8cb8] rounded-md px-2 py-1 shadow-sm">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      to={item.href}
                      className="text-white whitespace-nowrap px-5 py-4 text-sm font-medium hover:bg-white/10 rounded transition"
                    >
                      {item.label}
                    </Link>

                    {index !== navItems.length - 1 && (
                      <span className="h-6 w-px bg-white/30 mx-1" aria-hidden />
                    )}
                  </React.Fragment>
                ))}

                {/* separador antes do login */}
                <span className="h-8 w-px bg-white/30 mx-2" />

                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 text-white px-4 py-3 text-sm font-medium hover:bg-white/10 rounded transition"
                >
                  <LogIn size={20} />
                  <span className="whitespace-nowrap">Login</span>
                </button>
              </div>
            </div>

            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {isOpen && (
            <div className="md:hidden bg-[#2e8cb8] mt-1 rounded-b-md overflow-hidden">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-white text-base border-b border-white/10"
                >
                  {item.label}
                </Link>
              ))}

              <button
                onClick={() => {
                  setIsOpen(false);
                  setShowLoginModal(true);
                }}
                className="w-full text-left px-4 py-3 text-white"
              >
                <LogIn size={16} className="inline-block mr-2" />
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ============ MODAL REDUZIDO (MESMO LAYOUT) ============ */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden mx-4">
            {/* Cabeçalho REDUZIDO */}
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Acesso Restrito</h3>
              <button 
                onClick={() => {
                  setShowLoginModal(false);
                  setCredenciais({ usuario: '', senha: '' });
                  setError('');
                }}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                &times;
              </button>
            </div>

            {/* Conteúdo REDUZIDO */}
            <div className="p-4">
              {/* Imagem MENOR */}
              <div className="mb-4 text-center">
                <img 
                  src="/logo.png" 
                  alt="Santuário de Fátima" 
                  className="w-32 h-32 object-contain mx-auto mb-2"
                />
                <h2 className="text-lg font-bold text-gray-800">Acesso Administrativo</h2>
                <p className="text-gray-600 text-xs mt-1">Digite suas credenciais</p>
              </div>

              {/* Formulário REDUZIDO */}
              <form onSubmit={handleLogin} className="space-y-3">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-2 rounded text-sm">
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Usuário
                  </label>
                  <input
                    type="text"
                    required
                    value={credenciais.usuario}
                    onChange={(e) => setCredenciais({...credenciais, usuario: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Digite o usuário"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Senha
                  </label>
                  <input
                    type="password"
                    required
                    value={credenciais.senha}
                    onChange={(e) => setCredenciais({...credenciais, senha: e.target.value})}
                    className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Digite a senha"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded transition-colors"
                >
                  🔐 Entrar no Painel
                </button>

                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:text-blue-800 text-xs"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>
            </div>

            {/* Informações REDUZIDAS */}
            <div className="p-3 bg-yellow-50 border-t border-yellow-200 text-xs">
              <p className="text-yellow-800">
                <strong>Acesso:</strong> Coordenação e Administração
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}