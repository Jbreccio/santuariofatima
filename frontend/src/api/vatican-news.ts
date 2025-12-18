// src/pages/api/vatican-news.ts
import Parser from 'rss-parser';
import type { NextApiRequest, NextApiResponse } from 'next';

interface VaticanNewsItem {
  id: string;
  title: string;
  link: string;
  date: string;
  description: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL('https://www.vaticannews.va/pt.rss.xml');
    
    const news: VaticanNewsItem[] = feed.items.slice(0, 5).map(item => ({
      id: item.guid || item.link || '',
      title: item.title || '',
      link: item.link || '',
      date: item.isoDate || item.pubDate || '',
      description: item.contentSnippet?.substring(0, 150) + '...' || ''
    }));

    res.json({
      success: true,
      news,
      lastUpdated: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro Vatican News RSS:', error);
    res.json({
      success: false,
      news: [
        {
          id: 'demo_v1',
          title: 'Papa Francisco celebra missa no Vaticano',
          link: 'https://www.vaticannews.va',
          date: new Date().toISOString(),
          description: 'Últimas notícias da Santa Sé'
        }
      ],
      note: 'Feed em modo de demonstração'
    });
  }
}