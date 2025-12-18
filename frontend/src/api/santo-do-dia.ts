// src/pages/api/santo-do-dia.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface SantoDoDia {
  date: string;
  name: string;
  description: string;
  imageUrl: string;
  feastLevel: string;
  color: string;
  liturgicalColor: string;
  celebration: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Configurar cache (1 hora)
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');
  
  try {
    const hoje = new Date();
    const mes = hoje.getMonth() + 1;
    const dia = hoje.getDate();
    
    // 🔥 API 100% GRATUITA - Santoral Católico
    const santoralResponse = await fetch(
      `https://www.santoral-catolico.com/api/santo-do-dia/${mes}/${dia}`,
      { headers: { 'User-Agent': 'Santuário de Fátima' } }
    );
    
    if (santoralResponse.ok) {
      const santoralData = await santoralResponse.json();
      
      const santo: SantoDoDia = {
        date: formatarData(hoje),
        name: santoralData.nome || 'Santo do Dia',
        description: santoralData.descricao || 'Celebração litúrgica do dia',
        imageUrl: await buscarImagemSanto(santoralData.nome),
        feastLevel: santoralData.solenidade || 'Memória',
        color: getCorLiturgica(santoralData.cor_liturgica),
        liturgicalColor: santoralData.cor_liturgica || 'Verde',
        celebration: santoralData.celebracao || 'Dia Comum'
      };
      
      return res.json({
        success: true,
        santo,
        source: 'santoral-catolico.com',
        updatedAt: new Date().toISOString()
      });
    }
    
    // Fallback se a API principal falhar
    throw new Error('API principal indisponível');
    
  } catch (error) {
    console.error('Erro API Santo do Dia:', error);
    
    // 🌟 FALLBACK COM DADOS FIXOS (sempre funciona)
    const santoFallback = getSantoFallback();
    
    res.json({
      success: false,
      santo: santoFallback,
      source: 'fallback',
      updatedAt: new Date().toISOString(),
      note: 'Usando dados locais. API externa temporariamente indisponível.'
    });
  }
}

// Função para buscar imagem do santo
async function buscarImagemSanto(nomeSanto: string): Promise<string> {
  try {
    // Tenta buscar da API de santos católicos
    const apiResponse = await fetch(
      `https://api.santos.catholic.org/v1/saints?name=${encodeURIComponent(nomeSanto)}&limit=1`,
      { timeout: 5000 }
    );
    
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      if (data[0]?.image_url) {
        return data[0].image_url;
      }
    }
  } catch (error) {
    // Silencioso, usa fallback
  }
  
  // Imagens de fallback baseadas no nome do santo
  return getImagemFallback(nomeSanto);
}

// Função para imagem de fallback
function getImagemFallback(santoName: string): string {
  const imagensSantos: Record<string, string> = {
    'maria': 'https://images.unsplash.com/photo-1591803064285-63440e7b9c52?w=800&h=600&fit=crop&crop=face',
    'josé': 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop',
    'pedro': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'paulo': 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop',
    'francisco': 'https://images.unsplash.com/photo-1591803064285-63440e7b9c52?w=800&h=600&fit=crop',
    'antônio': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'joão': 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop',
    'teresa': 'https://images.unsplash.com/photo-1591803064285-63440e7b9c52?w=800&h=600&fit=crop',
    'rita': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'lucas': 'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop'
  };
  
  const nomeLower = santoName.toLowerCase();
  for (const [key, url] of Object.entries(imagensSantos)) {
    if (nomeLower.includes(key)) {
      return url;
    }
  }
  
  // Imagem genérica de santo
  const imagensGenericas = [
    'https://images.unsplash.com/photo-1544831378-7b0f63d6f4c1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1591803064285-63440e7b9c52?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1530026405184-8e5b80efc424?w=800&h=600&fit=crop'
  ];
  
  return imagensGenericas[Math.floor(Math.random() * imagensGenericas.length)];
}

// Função para cor litúrgica
function getCorLiturgica(cor: string): string {
  const cores: Record<string, string> = {
    'verde': '#2E7D32',
    'roxo': '#6A1B9A',
    'branco': '#FFFFFF',
    'vermelho': '#C62828',
    'rosa': '#E91E63',
    'dourado': '#FFD700',
    'azul': '#1565C0'
  };
  
  return cores[cor?.toLowerCase()] || '#2E7D32'; // Verde como padrão
}

// Formatar data em português
function formatarData(data: Date): string {
  return data.toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(/^\w/, c => c.toUpperCase());
}

// Santo de fallback (sempre funciona)
function getSantoFallback(): SantoDoDia {
  const hoje = new Date();
  const santosFixos = [
    {
      name: 'Nossa Senhora de Fátima',
      description: 'Aparições de Maria em Fátima, Portugal (1917). "Rezai o Terço todos os dias"',
      feastLevel: 'Memória',
      liturgicalColor: 'Branco',
      celebration: 'Aparições Marianas'
    },
    {
      name: 'São José',
      description: 'Esposo da Virgem Maria, pai adotivo de Jesus, padroeiro da Igreja Universal',
      feastLevel: 'Solenidade',
      liturgicalColor: 'Branco',
      celebration: 'Patriarca da Sagrada Família'
    },
    {
      name: 'São Francisco de Assis',
      description: 'Fundador da Ordem dos Frades Menores, amante da natureza e dos pobres',
      feastLevel: 'Festa',
      liturgicalColor: 'Branco',
      celebration: 'Estigmatização'
    },
    {
      name: 'Santa Teresa de Calcutá',
      description: 'Missionária da Caridade, serva dos mais pobres entre os pobres',
      feastLevel: 'Memória',
      liturgicalColor: 'Branco',
      celebration: 'Dedicação ao Serviço'
    }
  ];
  
  const santoEscolhido = santosFixos[hoje.getDate() % santosFixos.length];
  
  return {
    date: formatarData(hoje),
    name: santoEscolhido.name,
    description: santoEscolhido.description,
    imageUrl: getImagemFallback(santoEscolhido.name),
    feastLevel: santoEscolhido.feastLevel,
    color: getCorLiturgica(santoEscolhido.liturgicalColor),
    liturgicalColor: santoEscolhido.liturgicalColor,
    celebration: santoEscolhido.celebration
  };
}