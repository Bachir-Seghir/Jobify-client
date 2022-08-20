import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/urls";

export default function BlogSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      axios.get(`${API_URL}/articles`).then((res) => {
        setArticles(res.data);
      });
    };
    fetchArticles();
  }, []);

  return (
    <div className="mt-12 max-w-6xl mx-auto grid gap-4 lg:grid-cols-3 items-center">
      {articles.map((post) => (
        <div
          key={post.id}
          className="flex flex-col rounded shadow-md overflow-hidden max-w-[320px]"
        >
          <div className="flex-shrink-0">
            <img className="h-60 w-full object-cover" src={post.cover} alt="" />
          </div>
          <div className="flex-1 bg-white p-6 flex flex-col justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-sky-600">
                <a href={`/${post.topics}`} className="hover:underline">
                  {post.topics}
                </a>
              </p>
              <a href={`/article/${post.id}`} className="block mt-2">
                <p className="text-lg font-semibold text-gray-900">
                  {post.title}
                </p>
                <p className="h-38 mt-3 text-base text-gray-500 overflow-hidden line-clamp-4">
                  {post.excerpt}
                </p>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
