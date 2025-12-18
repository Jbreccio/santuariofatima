// src/hooks/useSocialFeeds.ts
import { useState, useEffect } from 'react';

export interface SocialFeed {
  vatican: any[];
  youtube: {
    liveNow: boolean;
    videos: { id: string; title: string; thumbnail: string; views: string; url: string }[];
  };
  instagram: {
    id: string;
    caption: string;
    media_url: string;
    permalink: string;
    media_type: 'IMAGE' | 'VIDEO';
    timestamp: string;
  }[];
  facebook: {
    id: string;
    message: string;
    full_picture?: string;
    permalink_url: string;
    created_time: string;
    likes: { summary: { total_count: number } };
  }[];
}

export function useSocialFeeds() {
  const [feeds, setFeeds] = useState<SocialFeed>({
    vatican: [],
    youtube: { liveNow: false, videos: [] },
    instagram: [],
    facebook: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const res = await fetch('/api/social-feeds'); // ← ROTA CORRETA
        if (!res.ok) throw new Error('Falha ao carregar feeds');
        const data = await res.json();
        setFeeds(data.feeds);
      } catch (err: any) {
        console.error('Erro ao carregar redes sociais:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeeds();
  }, []);

  return { feeds, loading, error };
}