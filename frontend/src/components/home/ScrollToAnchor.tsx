// src/components/home/ScrollToAnchor.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const location = useLocation();

  useEffect(() => {
    console.log('📌 Mudança de página detectada:', location.pathname, location.hash);

    // Função para lidar com âncoras
    const handleScrollToAnchor = () => {
      if (location.hash) {
        // Se tem âncora (ex: /#liturgia)
        const elementId = location.hash.replace('#', '');
        console.log('🔍 Procurando elemento com ID:', elementId);
        
        // Tenta encontrar o elemento
        const element = document.getElementById(elementId);
        
        if (element) {
          console.log('✅ Elemento encontrado, rolando...');
          // Pequeno delay para garantir renderização
          setTimeout(() => {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
            
            // Opcional: Destaque visual
            element.classList.add('highlight-scroll');
            setTimeout(() => {
              element.classList.remove('highlight-scroll');
            }, 2000);
          }, 150);
        } else {
          console.log('❌ Elemento não encontrado');
        }
      } else {
        // Sem hash? Rola PARA O TOPO sempre que muda de página
        console.log('⬆️ Rolando para o topo da nova página');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Executa após um pequeno delay
    const timer = setTimeout(handleScrollToAnchor, 100);
    
    return () => clearTimeout(timer);
  }, [location]); // Isso roda sempre que a location muda

  return null;
}