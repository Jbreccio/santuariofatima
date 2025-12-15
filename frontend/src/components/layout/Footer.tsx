import { Mail, Phone, MapPin, Home, Calendar, DollarSign, Cross, Book, Users, Church, Info, Contact, Shield, FileText, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import ScrollToAnchor from "../components/home/ScrollToAnchor";
import ScrollToTop from "../components/utils/ScrollToTop";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Layout de 3 colunas: Logo | Navegação+Informações | Contato */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-6">
          
          {/* Coluna 1: Logo e Frase */}
          <div className="md:col-span-1">
            <div className="flex flex-col items-center md:items-start">
              {/* Logo AUMENTADO */}
              <img 
                src="/logo.png"
                alt="Santuário Nossa Senhora de Fátima" 
                className="h-32 w-auto rounded-lg shadow-lg mb-4"
              />
              {/* Título em duas linhas */}
              <div className="text-center md:text-left mb-3">
                <h2 className="text-xl font-bold leading-tight text-white mb-1">
                  Santuário Nossa Senhora
                </h2>
                <h3 className="text-xl font-bold text-white">
                  de Fátima
                </h3>
              </div>
              
              {/* Frase abaixo do título */}
              <div className="mt-3">
                <p className="text-gray-300 text-sm italic leading-relaxed">
                  "Um lar para o coração, uma guia para a alma. Celebrando a fé e a devoção desde 1917."
                </p>
              </div>
            </div>
          </div>

          {/* Coluna 2: Navegação Rápida e Informações */}
          <div className="md:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sub-coluna 1: Navegação Rápida */}
              <div>
                <h3 className="text-base font-bold mb-3 border-b border-gray-700 pb-2">
                  Navegação Rápida
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
                      <Home size={15} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Início</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/historia" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
                      <Book size={15} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Historia</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/pastorais" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
                      <Users size={15} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Pastorais</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/santo-do-dia" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
                      <Church size={15} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Santo do Dia</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/doacoes" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm group">
                      <DollarSign size={15} className="text-blue-400 group-hover:scale-110 transition-transform" />
                      <span>Doações</span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Sub-coluna 2: Informações */}
              <div>
                <h3 className="text-base font-bold mb-3 border-b border-gray-700 pb-2">
                  Informações
                </h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/missas" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                      <Cross size={15} className="text-blue-400" />
                      <span>Missas</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/calendarioliturgico" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                      <Calendar size={15} className="text-blue-400" />
                      <span>Calendario Litúrgico</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/momentosliturgicos" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                      <Church size={15} className="text-blue-400" />
                      <span>Momentos Litúrgicos</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/contato" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                      <Contact size={15} className="text-blue-400" />
                      <span>Contato</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/sobre-nos" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors text-sm">
                      <Info size={15} className="text-blue-400" />
                      <span>Sobre Nós</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Redes Sociais NO CENTRO da coluna do meio */}
            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex flex-col items-center">
                <h3 className="text-base font-bold mb-3 text-center">
                  Siga-nos nas Redes Sociais
                </h3>
                
                <div className="flex gap-4 justify-center mb-2">
                  <a 
                    href="https://www.instagram.com/santuariodefatima?igsh=eGZsMXppNDQ2dzhw" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg hover:opacity-80 transition-all hover:scale-110 transform duration-200 shadow flex items-center justify-center w-12 h-12"
                    style={{
                      background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'
                    }}
                    title="Instagram do Santuário"
                    aria-label="Instagram"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://youtube.com/@santuariodefatimanews?si=pQ6hupSToauGO1IV" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#FF0000] p-3 rounded-lg hover:opacity-80 transition-all hover:scale-110 transform duration-200 shadow flex items-center justify-center w-12 h-12"
                    title="YouTube do Santuário"
                    aria-label="YouTube"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>

                  <a 
                    href="https://pt-br.facebook.com/login.php" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-[#1877F2] p-3 rounded-lg hover:opacity-80 transition-all hover:scale-110 transform duration-200 shadow flex items-center justify-center w-12 h-12"
                    title="Facebook do Santuário"
                    aria-label="Facebook"
                  >
                    <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
                
                <p className="text-gray-400 text-sm text-center">
                  Fique por dentro das nossas atividades e novidades
                </p>
              </div>
            </div>
          </div>

          {/* Coluna 3: Contato */}
          <div className="md:col-span-1">
            <h3 className="text-base font-bold mb-3 border-b border-gray-700 pb-2">
              Contato
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin size={17} className="flex-shrink-0 mt-0.5 text-blue-400" />
                <div>
                  <p className="font-medium mb-0.5 text-sm">Endereço</p>
                  <p className="text-gray-300 text-sm">
                    Rua Darwin, 651<br />
                    Santo Amaro<br />
                    0474-1011 – São Paulo, SP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Phone size={17} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-0.5 text-sm">Telefone</p>
                  <a 
                    href="tel:+551155210812" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    (11) 5521-0812
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={17} className="text-blue-400 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-0.5 text-sm">Email</p>
                  <a 
                    href="mailto:santuariomsradefatima@santcamarco.org.br" 
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    santuariomsradefatima@santcamarco.org.br
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700 my-4 pt-4"></div>

        {/* Seção: Informações Legais */}
        <div className="mb-4">
          <div className="flex justify-center">
            <div className="flex flex-col items-center">
              <h4 className="font-medium mb-2 text-sm">Informações Legais</h4>
              <div className="flex gap-3 text-sm">
                <Link to="/politicadeprivacidade" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <Shield size={12} className="text-blue-400" />
                  <span>Política Privacidade</span>
                </Link>
                <span className="text-gray-600">|</span>
                <Link to="/termosdeuso" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <FileText size={12} className="text-blue-400" />
                  <span>Termos de Uso</span>
                </Link>
                <span className="text-gray-600">|</span>
                <Link to="/faq" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
                  <HelpCircle size={12} className="text-blue-400" />
                  <span>FAQ</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divisor */}
        <div className="border-t border-gray-700 my-4 pt-4"></div>

        {/* Seção: Direitos Autorais */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} <span className="text-white font-medium">Santuário Nossa Senhora de Fátima</span>. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}