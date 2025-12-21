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

            {/* BRASÃO FLUTUANTE – DESKTOP */}
            <img
              src="/brasao3.png"
              alt="Brasão"
              className="
                hidden md:block
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                h-20
                w-auto
                object-contain
                rounded-2xl
                pointer-events-none
              "
            />

            {/* MENU DESKTOP */}
            <div className="hidden md:flex w-full justify-center">
              <div className="
                flex items-center
                bg-gradient-to-b from-[#05142b] to-[#0d2a5c]
                rounded-md
                px-14 py-3
                pl-[140px]
                shadow-sm
              ">
                {navItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      to={item.href}
                      className="text-white whitespace-nowrap px-3 py-4 text-[15px] font-medium hover:bg-white/10 rounded transition"
                    >
                      {item.label}
                    </Link>

                    {index !== navItems.length - 1 && (
                      <span className="text-white/40 mx-1 select-none">|</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* MOBILE HEADER */}
            <div className="md:hidden flex items-center justify-between w-full">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 hover:bg-white/10 rounded"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>

              {/* BRASÃO MOBILE – DIREITA */}
              <img
                src="/brasao3.png"
                alt="Brasão"
                className="h-14 w-auto object-contain rounded-xl"
              />
            </div>
          </div>

          {/* MENU MOBILE */}
          {isOpen && (
            <div className="md:hidden relative bg-gradient-to-b from-[#05142b] to-[#0d2a5c] mt-1 rounded-b-md overflow-hidden">

              {/* BRASÃO COMO FUNDO */}
              <div
                className="absolute inset-0 opacity-15 bg-no-repeat bg-right bg-contain"
                style={{ backgroundImage: 'url("/brasao3.png")' }}
              />

              <div className="relative z-10">
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-white text-base border-b border-white/10 hover:bg-white/5"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
