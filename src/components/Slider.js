/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  XIcon,
  ClockIcon,
  LocationMarkerIcon,
  LightningBoltIcon,
} from "@heroicons/react/outline";
import { TrendingUpIcon } from "@heroicons/react/solid";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { UserContext } from "../contexts/userContext";
import SuccessFeedback from "./SuccessFeedback";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Slider({ open, setOpen, post, inProfile }) {
  const { user, jwt, me } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [savedJobs, setSavedJobs] = useState([]);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  // This effect sets feedback state to default values on each toggle open
  // because Slider component will not re-render each time open changes the value
  useEffect(() => {
    setFeedback((state) => ({
      ...state,
      show: false,
      message: "",
      type: "",
    }));
  }, [open]);

  useEffect(() => {
    user && setSavedJobs(user.saved_jobs);
  }, [user]);

  const handleApply = (id) => {
    setLoading(true);
    axios
      .put(
        `${API_URL}/jobs/apply/${id}`,
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
  const handleSave = async (post) => {
    const [existedPost] = savedJobs.filter((item) => item.id === post.id);
    if (!existedPost) {
      setSavedJobs((state) => [...state, post]);
      axios
        .put(
          `${API_URL}/users/me`,
          {
            saved_jobs: [...savedJobs, post],
          },
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
            message: "Post Saved",
            type: "success",
          }));
          me();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="fixed inset-0" />
        <SuccessFeedback
          open={feedback.show}
          type={feedback.type}
          setFeedback={setFeedback}
        >
          {feedback.message}
        </SuccessFeedback>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-xl">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <h2
                          id="slide-over-heading"
                          className="text-lg font-medium text-gray-900"
                        >
                          {inProfile ? "Applied for" : "Post Description"}
                        </h2>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-sky-600"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Main */}
                    <div>
                      <div className="pb-1 sm:pb-6">
                        <div>
                          <div className="px-4  sm:flex sm:items-end sm:px-6">
                            <div className="sm:flex-1">
                              <div>
                                <div className="flex items-center">
                                  <h3 className="capitalize text-xl font-bold text-gray-900 sm:text-2xl">
                                    {post?.title}
                                  </h3>
                                  <span
                                    className={`ml-2.5 inline-block h-2 w-2 flex-shrink-0 rounded-full 
                                  ${
                                    post?.active ? "bg-green-400" : "bg-red-400"
                                  }
                                  `}
                                  >
                                    <span className="sr-only">Active</span>
                                  </span>
                                </div>
                                <p className="text-sm text-gray-500">
                                  Company{" "}
                                  <strong>@{post?.company?.name}</strong>
                                </p>
                              </div>
                              {!inProfile && (
                                <div className="mt-5 flex flex-wrap space-y-3 sm:space-y-0 sm:space-x-3">
                                  <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => handleApply(post.id)}
                                    className="disabled:opacity-50 inline-flex w-full flex-shrink-0 items-center justify-center rounded-sm border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none sm:flex-1"
                                  >
                                    Apply
                                  </button>
                                  <button
                                    type="button"
                                    disabled={loading}
                                    onClick={() => handleSave(post)}
                                    className="disabled:opacity-25 inline-flex w-full flex-1 items-center justify-center rounded-sm border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
                                  >
                                    Save
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pt-5 pb-5 sm:px-0 sm:pt-0">
                        <dl className="grid grid-cols-2 gap-6 px-4  sm:px-6">
                          <div className="col-span-2">
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Description
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p>{post?.description}</p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Location
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                                <LocationMarkerIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {post?.place} / {post?.locations}
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Type
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                                <ClockIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {post?.type}
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Experience Level
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                                <TrendingUpIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {post?.experienceLevel}
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Yearly Salaray
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                ${post?.minSalary} to ${post?.maxSalary}
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Hourly Price
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                ${post?.minHourlyPrice}/h to $
                                {post?.maxHourlyPrice}/h
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Applicants
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                                <ClockIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {post?.applicants?.length}
                              </p>
                            </dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500 sm:w-40 sm:flex-shrink-0">
                              Connects
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                              <p className="mt-2 flex items-center text-sm text-gray-500 capitalize">
                                <LightningBoltIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {post?.connects}
                              </p>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
