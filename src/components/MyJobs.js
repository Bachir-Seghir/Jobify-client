import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import { ChevronRightIcon, EyeIcon } from "@heroicons/react/solid";
import SuccessFeedback from "./SuccessFeedback";
import { Link } from "react-router-dom";
import { levels, places, types } from "../utils/seedData";
import SelectList from "./SelectList";

const MyJobs = () => {
  // States
  const [jobs, setJobs] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [openApplicants, setOpenApplicants] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ show: false, message: "" });

  // Context invocation
  const { user, jwt, me } = useContext(UserContext);

  // Handle Functions
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSelectedJob((state) => ({ ...state, [name]: value }));
  };

  const handleSubmitChanges = async (e, id) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${API_URL}/jobs/${id}`,
        {
          ...selectedJob,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setFeedback((state) => ({
          ...state,
          show: true,
          message: "Updated",
        }));
        me();
      });
  };

  const handleSelectJob = (id) => {
    const [job] = jobs.filter((job) => job.id === id);
    setSelectedJob(job);
    setOpenApplicants(false);
  };
  const handleOpenApplicant = (id) => {
    const [job] = jobs.filter((job) => job.id === id);
    setSelectedJob(job);
    setOpenApplicants(true);
  };

  const handleDeleteJob = (id) => {
    setLoading(true);
    axios
      .delete(`${API_URL}/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setJobs(jobs.filter((job) => job.id !== id));
        setSelectedJob(null);
        setFeedback((state) => ({
          ...state,
          show: true,
          message: "Deleted",
        }));
        me();
      });
  };
  // useEffect Hooks
  useEffect(() => {
    user && setJobs(user.postedJobs);
  }, [user]);

  // Returns
  if (loading)
    return (
      <div className="py-6 px-4 sm:p-6 lg:pb-8 col-span-9">
        <LoadingSpinner />
      </div>
    );

  if (!user?.subscribed)
    return (
      <div className="py-6 px-4 sm:p-6 lg:pb-8 col-span-9">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Subscribe to a Plan and Add Your First Job Post
          </h2>
        </div>
        <div className="mt-4">
          <Link
            to="/membership"
            className="text-md font-medium text-sky-600 hover:text-gray-500"
          >
            Choose a Plan
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    );
  return (
    <div className="py-6 px-4 sm:p-6 lg:pb-8 col-span-9">
      <SuccessFeedback open={feedback.show}>
        {feedback.message} Succssfully !
      </SuccessFeedback>

      <h2 className="text-lg mb-6 leading-6 font-medium text-gray-900 mb-8">
        All Posted Jobs
      </h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {jobs?.map((job) => (
          <li key={job.id} className="col-span-1 flex shadow-sm rounded-md">
            <div className="flex-1 flex items-center justify-between border border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href=""
                  className="text-gray-900 font-medium hover:text-gray-600 capitalize"
                >
                  {job.title}
                </a>
                <p
                  onClick={() => handleOpenApplicant(job.id)}
                  className="cursor-pointer hover:text-sky-500 text-gray-500"
                >
                  {job.applicants?.length ? job.applicants?.length : 0}{" "}
                  aplicants
                </p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  onClick={() => handleSelectJob(job.id)}
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  <EyeIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {selectedJob && openApplicants && (
        <div className="flow-root mt-6">
          <h2 className="text-lg py-8 mt-6 leading-6 font-medium text-gray-900 capitalize">
            {selectedJob.title} Applicants
          </h2>
          {selectedJob.applicants.length === 0 && (
            <h4 className="text-sm leading-2 font-medium text-red-500">
              No Applications yet !
            </h4>
          )}
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {selectedJob?.applicants.map((applicant) => (
                <li key={applicant.email}>
                  <Link
                    to={`/condidate/${applicant.id}`}
                    state={applicant.id}
                    className="block hover:bg-gray-50"
                  >
                    <div className="flex items-center px-4 py-4 sm:px-6">
                      <div className="min-w-0 flex-1 flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-12 w-12 rounded-full"
                            src={applicant.avatar}
                            alt=""
                          />
                        </div>
                        <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                          <div>
                            <p className="text-sm font-medium text-sky-600 truncate">
                              {applicant.fullname}
                            </p>
                            <p className="mt-2 flex items-center text-sm text-gray-500">
                              <span className="capitalize text-bold">
                                {applicant.title}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
      {selectedJob && !openApplicants && (
        <>
          <h2 className="text-lg mt-12 leading-6 font-medium text-gray-900">
            Edit Job
          </h2>
          <form
            method="POST"
            onSubmit={(e) => handleSubmitChanges(e, selectedJob.id)}
          >
            {/* Title & Description */}
            <div className="mt-6 flex flex-col lg:flex-row">
              <div className="flex-grow grid grid-cols-9 space-y-2 gap-6">
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    value={selectedJob?.title || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>

                <div className="col-span-9 sm:col-span-9">
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    value={selectedJob?.description || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    rows={6}
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
                  ></textarea>
                </div>

                {/* Type & Experience Level */}

                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>

                  <SelectList
                    data={types}
                    value={selectedJob?.type}
                    onChange={(value) =>
                      setSelectedJob((state) => ({ ...state, type: value }))
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-4">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Level
                  </label>

                  <SelectList
                    data={levels}
                    value={selectedJob?.experienceLevel}
                    onChange={(value) =>
                      setSelectedJob((state) => ({
                        ...state,
                        experienceLevel: value,
                      }))
                    }
                  />
                </div>

                {/* Salary Entries */}

                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="minSalary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Min Salary / Year
                  </label>
                  <input
                    value={selectedJob?.minSalary || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="number"
                    name="minSalary"
                    id="minSalary"
                    autoComplete="minSalary"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="maxSalary"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Max Salary / Year
                  </label>
                  <input
                    value={selectedJob?.maxSalary || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="number"
                    name="maxSalary"
                    id="maxSalary"
                    autoComplete="maxSalary"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="maxHourlyPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Max Price / Hour
                  </label>
                  <input
                    value={selectedJob?.maxHourlyPrice || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="number"
                    name="maxHourlyPrice"
                    id="maxHourlyPrice"
                    autoComplete="maxHourlyPrice"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>
                <div className="col-span-3 sm:col-span-2">
                  <label
                    htmlFor="minHourlyPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Min Price / Hour
                  </label>
                  <input
                    value={selectedJob?.minHourlyPrice || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="number"
                    name="minHourlyPrice"
                    id="minHourlyPrice"
                    autoComplete="minHourlyPrice"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>

                {/* Place & Locations */}

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="place"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Place
                  </label>

                  <SelectList
                    data={places}
                    value={selectedJob?.place}
                    onChange={(value) =>
                      setSelectedJob((state) => ({ ...state, place: value }))
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="locations"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Locations
                  </label>
                  <input
                    value={selectedJob?.locations || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="locations"
                    id="locations"
                    autoComplete="locations"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
                <button
                  type="submit"
                  className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                >
                  Save
                </button>
                <button
                  onClick={() => handleDeleteJob(selectedJob.id)}
                  className="ml-5 bg-red-500 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default MyJobs;
