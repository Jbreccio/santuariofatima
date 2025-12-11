import { useEffect, useState } from "react";

interface InstagramItem {
  id: string;
  caption: string;
  media_url: string;
  timestamp: string;
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramItem[]>([]);

  useEffect(() => {
    fetch("/mock/instagram.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []));
  }, []);

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">📷 Instagram</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="rounded-xl overflow-hidden shadow-md bg-white border hover:shadow-lg transition"
          >
            <img src={p.media_url} className="w-full h-48 object-cover" />

            <div className="p-3">
              <p className="text-sm text-gray-800 line-clamp-2">{p.caption}</p>
              <span className="text-xs text-gray-400">
                {new Date(p.timestamp).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
