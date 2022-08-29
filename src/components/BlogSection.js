import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../utils/urls";

export default function BlogSection() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      axios.get(`${API_URL}/articles`).then((res) => {
        setArticles(res.data.slice(0, 3));
      });
    };
    fetchArticles();
  }, []);

  return (
    <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white h-1/3 sm:h-2/3" />
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
            From the blog
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
            Fresh job related news content posted each day
          </p>
        </div>
        <div className="mt-12 max-w-6xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-items-center">
          {articles.map((post) => (
            <div
              key={post.id}
              className="flex flex-col rounded shadow-md overflow-hidden max-w-[320px]"
            >
              <div className="flex-shrink-0">
                <img
                  className="h-60 w-full object-cover"
                  src={post.cover}
                  alt=""
                />
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
        <div className="mt-12 py-2 w-full flex items-center justify-center">
          <Link
            to="/blog"
            className="text-sky-600 text-sm text-center hover:text-gray-700"
          >
            Visit the Blog
          </Link>
        </div>
      </div>
    </div>
  );
}
