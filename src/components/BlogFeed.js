import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/urls";
import LoadingSpinner from "./LoadingSpinner";
import Pagination from "./Pagination";

export default function BlogFeed({ topic, searchText }) {
  const [articles, setArticles] = useState([]);

  const perPage = process.env.REACT_APP_PERPAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSkip(currentPage * perPage - perPage);
  }, [currentPage, perPage]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      if (searchText) {
        axios
          .get(`${API_URL}/articles?title_contains=${searchText}`)
          .then((res) => {
            setArticles(res.data);
            setPageCount(Math.ceil(res.data.length / perPage));
            setLoading(false);
          });
      } else {
        axios
          .get(
            topic === "all"
              ? `${API_URL}/articles?`
              : `${API_URL}/articles?topics_contains=${topic}`
          )
          .then((res) => {
            setArticles(res.data);
            setPageCount(Math.ceil(res.data.length / perPage));
            setLoading(false);
          });
      }
    };
    fetchArticles();
  }, [topic, searchText]);
  // Returns
  if (loading)
    return (
      <div className="py-32">
        <LoadingSpinner />
      </div>
    );
  return (
    <>
      <div className="mt-12 max-w-6xl mx-auto grid gap-4 lg:grid-cols-3 items-center">
        {articles.slice(skip, skip + perPage).map((post) => (
          <div
            key={post.id}
            className="flex flex-col rounded overflow-hidden max-w-[320px]"
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
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageCount={pageCount}
      />
    </>
  );
}
