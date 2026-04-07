"use client";

import { useEffect, useState } from "react";

type Article = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: { name: string };
};

const categories = ["AI", "開発", "経済", "世界情勢"];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("AI");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      const res = await fetch(`/api/news?category=${selectedCategory}`);
      const data = await res.json();
      setArticles(data.articles || []);
      setLoading(false);
    };

    fetchNews();
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-2">
        📰 ニュース・トレンドまとめ
      </h1>
      <p className="text-center text-gray-400 mb-8">
        AI・開発・経済・世界情勢のトレンドをまとめてお届け
      </p>

      {/* カテゴリタブ */}
      <div className="flex justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              selectedCategory === cat
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ニュース一覧 */}
      <div className="max-w-2xl mx-auto flex flex-col gap-4">
        {loading ? (
          <p className="text-center text-gray-400">読み込み中...</p>
        ) : (
          articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 rounded-xl p-5 hover:bg-gray-700 transition"
            >
              <span className="text-xs text-blue-400 font-medium">
                {selectedCategory}
              </span>
              <h2 className="text-lg font-semibold mt-1">{article.title}</h2>
              <p className="text-gray-400 text-sm mt-2">
                {article.description}
              </p>
              <p className="text-xs text-gray-500 mt-3">
                {new Date(article.publishedAt).toLocaleDateString("ja-JP")} ·{" "}
                {article.source.name}
              </p>
            </a>
          ))
        )}
      </div>
    </main>
  );
}