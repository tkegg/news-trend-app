import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "technology";

  const categoryMap: { [key: string]: string } = {
    AI: "artificial intelligence",
    開発: "software development",
    経済: "economy japan",
    世界情勢: "world news",
  };

  const query = categoryMap[category] || "technology";

  const res = await fetch(
    `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&pageSize=10&apiKey=${process.env.NEWS_API_KEY}`
  );

  const data = await res.json();
  return NextResponse.json(data);
}