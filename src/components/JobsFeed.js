import React, { useContext, useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CashIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  LocationMarkerIcon,
} from "@heroicons/react/solid";
import { format } from "timeago.js";
import Pagination from "./Pagination";
import axios from "axios";
import { API_URL } from "../utils/urls";
import LoadingSpinner from "./LoadingSpinner";
import Slider from "./Slider";
import { UserContext } from "../contexts/userContext";
import SuccessFeedback from "./SuccessFeedback";
import { LightningBoltIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const borderColor = (type) => {
  switch (type) {
    case "contract":
      return "border-green-400";
    case "fullTime":
      return "border-sky-300";
    case "partTime":
      return "border-yellow-300";
    default:
      return;
  }
};
const bgColor = (type) => {
  switch (type) {
    case "contract":
      return "bg-green-400";
    case "fullTime":
      return "bg-sky-300";
    case "partTime":
      return "bg-yellow-300";
    default:
      return;
  }
};

function JobsFeed() {
  const { user, jwt, me } = useContext(UserContext);

  const perPage = process.env.REACT_APP_PERPAGE;
  const [currentPage, setCurrentPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [currentFeatIdx, setCurrentFeatIdx] = useState(0);
  const [featuredPos, setFeaturedPos] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pageCount, setPageCount] = useState();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);

  useEffect(() => {
    setSkip(currentPage * perPage - perPage);
  }, [currentPage]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      axios.get(`${API_URL}/jobs`).then((res) => {
        setPosts(res.data.reverse());
        setPageCount(Math.ceil(res.data.length / perPage));
        setLoading(false);
      });
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    setFeaturedPos(posts.filter((item) => item.featured).reverse());
  }, [posts]);

  const handleClick = (e, action) => {
    e.preventDefault();
    // loop
    if (action === "next" && currentFeatIdx === featuredPos.length - 1) {
      setCurrentFeatIdx(0);
    } else if (action === "prev" && currentFeatIdx === 0) {
      setCurrentFeatIdx(featuredPos.length - 1);
    }
    // inc/dec
    if (action === "next" && currentFeatIdx < featuredPos.length - 1) {
      setCurrentFeatIdx(currentFeatIdx + 1);
    } else if (action === "prev" && currentFeatIdx > 0) {
      setCurrentFeatIdx(currentFeatIdx - 1);
    }
  };

  const handlePostClick = (e, post) => {
    setOpen(true);
    setPreviewPost(post);
  };

  const handleApply = (post) => {
    setLoading(true);
    axios
      .put(
        `${API_URL}/jobs/apply/${post.id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setFeedback((state) => ({
          ...state,
          show: true,
          message: "Applied Successfully",
          type: "success",
        }));

        return axios
          .put(
            `${API_URL}/users/me`,
            {
              appliesNbr: user.appliesNbr + 1,
              connects: user.connects - post.connects,
            },
            {
              headers: {
                Authorization: `Bearer ${jwt}`,
              },
            }
          )
          .then(() => {
            me();
          });
      })
      .catch((error) => {
        setLoading(false);
        const { response } = error;
        setFeedback((state) => ({
          ...state,
          show: true,
          message: response.data.message,
          type: "fail",
        }));
      });
  };

  // Returns
  if (loading)
    return (
      <div className="py-40">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 py-12 px-16 xl:px-28">
      <Slider open={open} setOpen={setOpen} post={previewPost} />

      <SuccessFeedback
        open={feedback.show}
        type={feedback.type}
        setFeedback={setFeedback}
      >
        {feedback.message}
      </SuccessFeedback>
      {user?.accountType === "condidate" && (
        <div className="order-1 col-span-1 lg:col-span-3 pb-2 flex items-center">
          <h5 className="text-sm text-gray-900">
            Connects : <strong>{user?.connects}</strong>
          </h5>
          <Link className="text-xs text-sky-500 hover:text-sky-900 ml-2" to="">
            Buy More Connects
          </Link>
        </div>
      )}

      <div className="order-3 lg:order-2 col-span-1 lg:col-span-2 flex flex-col py-6">
        <h3 className="text-2xl font-medium text-gray-900 text-left pb-8">
          Recent Jobs
        </h3>

        <div className="bg-white border border overflow-hidden rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            {posts.slice(skip, skip + perPage).map((post) => (
              <li key={post.id}>
                <div
                  onClick={(e) => handlePostClick(e, post)}
                  className={`cursor-pointer block hover:bg-gray-50 border-l-4 ${borderColor(
                    post.type
                  )}`}
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-zinc-900 truncate capitalize">
                        {post.title}
                      </p>
                      <div
                        className={`ml-2 py-1 flex-shrink-0 flex rounded-sm ${bgColor(
                          post.type
                        )}`}
                      >
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-700 capitalize">
                          {post.experienceLevel}
                        </p>
                      </div>
                      <div
                        className={`ml-auto py-1 flex-shrink-0 flex rounded-sm ${bgColor(
                          post.type
                        )}`}
                      >
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-slate-700 capitalize">
                          {post.type}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <CashIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          ${post.minSalary} -- ${post.maxSalary}
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6 capitalize">
                          <LocationMarkerIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {post.place} / {post.locations}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <ClockIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <p>
                          Posted{" "}
                          <time dateTime={post.created_at}>
                            {format(post.created_at)}
                          </time>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount}
        />
      </div>
      <div className="order-2 lg:order-3 col-span-1 py-6 overflow-hidden relative">
        <div className="flex justify-between pb-8">
          <h3 className="text-2xl font-medium text-gray-900 text-left ">
            Featured Jobs
          </h3>
          <div className="flex items-start gap-1">
            <span>
              <ChevronLeftIcon
                className="h-8 w-8 text-gray-500 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-500 hover:text-white"
                aria-hidden="true"
                onClick={(e) => handleClick(e, "prev")}
              />
            </span>
            <span>
              <ChevronRightIcon
                className=" h-8 w-8 text-gray-500 bg-gray-100 rounded-sm cursor-pointer hover:bg-gray-500 hover:text-white"
                aria-hidden="true"
                onClick={(e) => handleClick(e, "next")}
              />
            </span>
          </div>
        </div>
        <div className="w-max flex overflow-hidden h-[640px]">
          {featuredPos.map((post, i) => (
            <div
              key={post.id}
              className={`${
                currentFeatIdx === i ? "block" : "hidden"
              }   bg-white border overflow-hidden rounded-md h-auto w-full absolute`}
            >
              <div
                className="px-4 py-5 sm:px-6 cursor-pointer hover:bg-gray-50"
                onClick={(e) => handlePostClick(e, post)}
              >
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  {post.title}
                </h3>
                <div className="mt-2 flex-shrink-0 flex rounded-sm">
                  <p
                    className={` capitalize px-2 py-1 inline-flex text-xs leading-5 font-semibold text-slate-700 ${bgColor(
                      post.type
                    )}`}
                  >
                    {post.type}
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="px-6 pt-4 pb-8">
                  <div className="py-4 flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <BriefcaseIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 capitalize"
                        aria-hidden="true"
                      />
                      {post.company.name}
                    </p>
                    <p className="flex items-center text-sm text-gray-500 capitalize">
                      <LocationMarkerIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {post.place} / {post.locations}
                    </p>
                  </div>
                  <div className="py-4 flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <CashIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      ${post.minSalary} -- ${post.maxSalary} / year
                    </p>
                  </div>
                  <div className="py-4 flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <CashIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      ${post.minHourlyPrice} / hour
                    </p>
                  </div>
                  <div className="py-4 flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <CashIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      ${post.maxHourlyPrice} / hour
                    </p>
                    <p className="flex items-center text-sm text-gray-500">
                      <ClockIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {post.minHour}h / week
                    </p>
                  </div>
                  <div className="py-4 flex gap-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <LightningBoltIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {post.connects} Connects
                    </p>
                  </div>

                  <div className="py-5">
                    <dd className="text-md text-gray-600 mt-0 line-clamp-6">
                      <p>{post.description}</p>
                    </dd>
                  </div>
                  <button
                    onClick={() => handleApply(post)}
                    className="w-full items-center text-md font-semibold px-4 py-3 border border-transparent leading-4 rounded-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none "
                  >
                    Apply For This Job
                  </button>
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobsFeed;
