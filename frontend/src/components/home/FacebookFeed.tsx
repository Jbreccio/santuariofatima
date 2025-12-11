import { useEffect, useState } from "react";

interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
}

export default function FacebookFeed() {
  const [posts, setPosts] = useState<FacebookPost[]>([]);

  useEffect(() => {
    fetch("/mock/facebook.json")
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []));
  }, []);

  return (
    <section className="my-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">📘 Facebook</h2>

      <div className="space-y-4">
        {posts.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-xl bg-white border shadow-sm hover:shadow-md transition"
          >
            <p className="text-gray-800">{p.message}</p>

            <span className="text-xs text-gray-400 block mt-2">
              {new Date(p.created_time).toLocaleString("pt-BR")}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
