import { ChevronLeftIcon } from "@heroicons/react/solid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "../utils/urls";
import LoadingSpinner from "../components/LoadingSpinner";

const ArticlePage = () => {
  const location = useLocation();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArticle = async (id) => {
      setLoading(true);
      axios.get(`${API_URL}/articles/${id}`).then((res) => {
        setArticle(res.data);
        setLoading(false);
      });
    };
    if (location) {
      const id = location.pathname.split("/")[2];
      fetchArticle(id);
    }
  }, [location]);

  // Returns
  if (loading)
    return (
      <div className="w-screen h-screen py-40">
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <div className="relative">
        <img
          src={article?.cover}
          className="w-full h-full absolute object-cover object-right-top -z-2"
        />
        <div className="absolute w-full h-full bg-black opacity-70 -z-2" />

        <div className="relative py-32 px-28">
          <Link
            to="/blog"
            className="text-white cursor-pointer flex items-center hover:text-gray-400 mb-4"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Back to home
          </Link>
          <h3 className="text-3xl my-4 text-white">{article?.title}</h3>
          <h5 className="text-white text-sm font-light">
            Jobify.com |{" "}
            {new Date(article?.created_at).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h5>
        </div>
      </div>

      <div className="p-28 max-w-5xl mx-auto">
        <ReactMarkdown
          children={article?.content}
          remarkPlugins={[remarkGfm]}
        />
      </div>
    </div>
  );
};

export default ArticlePage;
//
