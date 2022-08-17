import React, { useEffect, useState } from "react";
import SelectList from "../components/SelectList";
import { levels } from "../utils/seedData";
import BlogFeed from "../components/BlogFeed";
import Pagination from "../components/Pagination";

const Blog = () => {
  const [topic, setTopic] = useState("");

  const perPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [pageCount, setPageCount] = useState(2);

  useEffect(() => {
    setSkip(currentPage * perPage - perPage);
  }, [currentPage]);

  return (
    <div className="py-32 ">
      {/* Header section  */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-12 grid grid-cols-12 gap-3">
        <div className="col-span-5">
          <h1 className="text-3xl font-medium text-gray-900">
            Insights & Tips for Recruiters
          </h1>
          <p className="pt-2 text-sm text-gray-700">
            Discover the latest trends
          </p>
        </div>
        <div className="col-span-5">
          <p className="text-xs text-gray-900">Find an article</p>
          <div className="flex flex-row gap-x-2 mt-2">
            <input
              type="text"
              //value={searchText}
              //onChange={(e) => setSearchText(e.target.value)}
              //onKeyUp={(e) => handleSearch(e)}
              name="keyword"
              id="keyword"
              className="max-w-[280px] shadow-sm text-sm font-medium px-3 py-2 focus:ring-sky-500 focus:border-sky-500 block border-gray-300 rounded-sm"
              placeholder="Search blog post..."
            />

            <button
              //onClick={handleSearch}
              className="items-center text-sm font-medium px-2 py-2 border border-transparent leading-4 rounded-sm text-sky-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:w-[100px]"
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-900">Browse by topic</p>

          <div className="">
            <SelectList data={levels} onChange={(value) => setTopic(value)} />
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="mt-12 bg-sky-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl sm:tracking-tight"
              id="newsletter-headline"
            >
              Sign up for our newsletter
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
              Get exclusive industry analysis, reports and inspirations directly
              to your inbox!
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500"
                >
                  Notify me
                </button>
              </div>
            </form>
            <p className="mt-3 text-sm text-gray-300">
              We care about the protection of your data. Read our{" "}
              <a
                href="/privacy-policy"
                className="text-white font-medium underline"
              >
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Articles */}
      <div className="relative pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              All Articles
            </h2>
          </div>
          <BlogFeed skip={skip} perPage={perPage} />
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
    </div>
  );
};

export default Blog;
