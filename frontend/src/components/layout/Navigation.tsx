import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const normalizedPath = location.pathname.toLowerCase();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 6);
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
    { href: '/santododia', label: 'Santo do Dia' },
    { href: '/doacoes', label: 'Doações' },
    { href: '/momentosliturgicos', label: 'Momentos Litúrgicos' },
    { href: '/missas', label: 'Missas' },
    { href: '/calendarioliturgico', label: 'Calendario Litúrgico' },
    { href: '/contato', label: 'Contato' },
    { href: '/localizacao', label: 'Localização' },
    { href: '/sobrenos', label: 'Sobre Nós' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#4094bb]">
        <div className="max-w-9xl mx-auto px-6 sm:px-3 lg:px-4">
          <div className="flex items-center justify-center h-24">
            <div className="hidden md:flex items-center justify-center w-full">
              <div className="flex items-center justify-center bg-gradient-to-b from-[#051f2c] to-[#2e8cb8] rounded-md px-10 py-2 shadow-sm mx-auto"> 
                {navItems.map((item, index) => (
                  <React.Fragment key={item.href}>
                    <Link
                      to={item.href}
                      className="text-white whitespace-nowrap px-3 py-4 text-[15px] font-medium hover:bg-white/10 rounded transition flex items-center"
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

            <div className="md:hidden absolute left-4">
              <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

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
            </div>
          )}
        </div>
      </nav>
    </>
  );
}