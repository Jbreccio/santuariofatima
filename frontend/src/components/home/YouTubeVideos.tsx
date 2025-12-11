import { useEffect, useState } from "react";

interface YouTubeItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: { url: string };
    };
    publishedAt: string;
  };
}

export default function YouTubeVideos() {
  const [videos, setVideos] = useState<YouTubeItem[]>([]);

  useEffect(() => {
    fetch("/mock/youtube.json")
      .then((res) => res.json())
      .then((data) => setVideos(data.items || []));
  }, []);

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">🎥 Últimos Vídeos</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div
            key={v.id}
            className="rounded-xl shadow-md bg-white border overflow-hidden hover:shadow-lg transition"
          >
            <img src={v.snippet.thumbnails.medium.url} className="w-full h-48 object-cover" />

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">{v.snippet.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{v.snippet.description}</p>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(v.snippet.publishedAt).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
