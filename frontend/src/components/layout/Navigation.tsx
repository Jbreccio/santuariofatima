import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const normalizedPath = location.pathname.toLowerCase();

  useEffect(() => {
    const handleScroll = () => {};
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (normalizedPath.includes('loginsecret')) {
    return null;
  }

  const navItems = [
    { href: '/', label: 'Início' },
    { href: '/historia', label: 'História' },
    { href: '/pastorais', label: 'Pastorais' },
    { href: '/santo-do-dia', label: 'Santo do Dia' },
    { href: '/doacoes', label: 'Doações' },
    { href: '/momentosliturgicos', label: 'Momentos Litúrgicos' },
    { href: '/missas', label: 'Missas' },
    { href: '/calendarioliturgico', label: 'Calendário Litúrgico' },
    { href: '/contato', label: 'Contato' },
    { href: '/localizacao', label: 'Localização' },
    { href: '/sobre-nos', label: 'Sobre Nós' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#040b1a]">
        <div className="max-w-9xl mx-auto px-6 sm:px-3 lg:px-4">
          <div className="relative flex items-center justify-center h-24">

            {/* MENU DESKTOP - COM LOGO COMO PRIMEIRO ITEM */}
            <div className="hidden md:flex w-full justify-center">
              <div className="
                flex items-center
                bg-gradient-to-b from-[#05142b] to-[#0d2a5c]
                rounded-md
                px-8 py-2
                shadow-sm
              ">
                
                {/* LOGO DENTRO DO MENU - APENAS COM BORDAS ARREDONDADAS */}
                <Link to="/" className="flex items-center mr-4">
                  <img
                    src="/brasao3.png"
                    alt="Brasão"
                    className="
                      h-14 
                      w-auto 
                      object-contain 
                      rounded-lg /* APENAS ISSO - bordas arredondadas */
                    "
                    style={{ 
                      filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                    }}
                  />
                </Link>
                
                {/* SEPARADOR ENTRE LOGO E INÍCIO */}
                <span className="text-white/40 mr-2 select-none">|</span>
                
                {navItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      to={item.href}
                      className="text-white whitespace-nowrap px-2 py-4 text-[14px] font-medium hover:bg-white/10 rounded transition"
                    >
                      {item.label}
                    </Link>

                    {index !== navItems.length - 1 && (
                      <span className="text-white/40 mx-0.5 select-none">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* MOBILE HEADER - LOGO À DIREITA */}
            <div className="md:hidden flex items-center justify-between w-full px-4">
              {/* BOTÃO MENU À ESQUERDA */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-white/10 rounded"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>

              {/* LOGO MOBILE À DIREITA - APENAS COM BORDAS ARREDONDADAS */}
              <img
                src="/brasao3.png"
                alt="Brasão"
                className="
                  h-12 
                  w-auto 
                  object-contain 
                  rounded-lg /* APENAS ISSO - bordas arredondadas */
                "
                style={{ 
                  filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                }}
              />
            </div>
          </div>

          {/* MENU MOBILE COM LOGO DE FUNDO */}
          {isOpen && (
            <div className="md:hidden relative bg-gradient-to-b from-[#05142b] to-[#0d2a5c] mt-1 rounded-b-md overflow-hidden min-h-[500px]">

              {/* LOGO COMO FUNDO */}
              <div
                className="absolute inset-0"
                style={{ 
                  backgroundImage: 'url("/brasao3.png")',
                  backgroundSize: '80% auto',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right center',
                  opacity: 0.15,
                  filter: 'brightness(1.2) contrast(0.9)'
                }}
              />

              {/* CONTEÚDO DO MENU */}
              <div className="relative z-10 pt-6">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-6 py-4 text-white text-lg border-b border-white/10 hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              
              {/* RODAPÉ DO MENU MOBILE */}
              <div className="relative z-10 mt-8 text-center pb-6">
                <div className="inline-block px-4 py-2 rounded-lg border border-white/10">
                  <p className="text-white/70 text-sm">
                    Santuário de Fátima
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}