import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "../components/SuccessFeedback";
import Slider from "./Slider";
import {
  CashIcon,
  ClockIcon,
  LocationMarkerIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { format } from "timeago.js";

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

const SavedJobs = () => {
  const { user, jwt, me } = useContext(UserContext);

  const [savedJobs, setSavedJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [previewPost, setPreviewPost] = useState(null);

  useEffect(() => {
    user && setSavedJobs(user.saved_jobs);
  }, [user]);

  const handleDeletePost = async (id) => {
    axios
      .put(
        `${API_URL}/users/me`,
        {
          saved_jobs: [...savedJobs.filter((item) => item.id !== id)],
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        setSavedJobs(res.data.saved_jobs);
      });
  };

  const handlePostClick = (post) => {
    setOpen(true);
    setPreviewPost(post);
  };

  return (
    <div className="lg:col-span-9 flex flex-col">
      {/* Profile section */}
      <Slider
        open={open}
        setOpen={setOpen}
        post={previewPost}
        inProfile={false}
      />

      <div className="grid grid-cols-4 gap-y-4 py-6 px-4 sm:p-6 lg:pb-8">
        <h2 className="col-span-4 text-lg leading-6 font-medium text-gray-900">
          Saved Posts
        </h2>
        <div className="col-span-3 bg-white border border overflow-hidden rounded-md">
          {!savedJobs.length && (
            <h2 className="p-4 col-span-4 text-sm leading-6 font-medium text-yellow-500">
              No Saved Jobs !
            </h2>
          )}
          <ul role="list" className="divide-y divide-gray-200">
            {savedJobs.map((post) => (
              <li key={post.id}>
                <div
                  className={`relative  block hover:bg-gray-50 border-l-4 ${borderColor(
                    post.type
                  )}`}
                >
                  <TrashIcon
                    className="w-4 h-4 text-red-500 absolute right-1 bottom-5 z-index-100 cursor-pointer hover:text-red-700"
                    onClick={() => handleDeletePost(post.id)}
                  />
                  <div className="pl-4 pr-6 py-4 sm:pl-6 sm:pr-8">
                    <div
                      className="flex items-center cursor-pointer"
                      onClick={() => handlePostClick(post)}
                    >
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
      </div>
    </div>
  );
};

export default SavedJobs;
