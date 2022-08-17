import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "../components/SuccessFeedback";
import SelectList from "./SelectList";
import { levels, places, types, connects } from "../utils/seedData";
import { Link } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddJob = () => {
  const [inputs, setInputs] = useState({});
  const [postsNbr, setPostsNbr] = useState(null);
  const [featuredNbr, setFeaturedNbr] = useState(null);
  const [canPost, setCanPost] = useState(true);
  //const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  const { user, jwt, me } = useContext(UserContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  useEffect(() => {
    setPostsNbr(user?.jobs?.length);
    setFeaturedNbr(user?.jobs?.filter((post) => post.featured).length);
  }, [user]);

  useEffect(() => {
    if (postsNbr > 2) {
      setCanPost(false);
    }
  }, [postsNbr]);

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${API_URL}/jobs`,
        {
          ...inputs,
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
          message: "Job Post Added Successfully",
          type: "success",
        }));
        me();
      });
  };
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
  if (!user?.company)
    return (
      <div className="py-6 px-4 sm:p-6 lg:pb-8 col-span-9">
        <div>
          <h2 className="text-lg leading-6 font-medium text-red-500">
            Create Your Company and Post your first Job
          </h2>
        </div>
      </div>
    );
  return (
    <form
      className="divide-y divide-gray-200 lg:col-span-9"
      method="POST"
      onSubmit={handleSubmitChanges}
    >
      {/* Profile section */}
      <SuccessFeedback
        open={feedback.show}
        type={feedback.type}
        setFeedback={setFeedback}
      >
        {feedback.message}
      </SuccessFeedback>

      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Add New Job
          </h2>
        </div>

        {canPost ? (
          <>
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
                    placeholder="Frontend web Developer"
                    value={inputs.title || ""}
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
                    value={inputs.description || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="description"
                    id="description"
                    autoComplete="description"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
                  ></textarea>
                </div>

                {/* Type & Experience Level */}

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Type
                  </label>

                  <SelectList
                    data={types}
                    onChange={(value) =>
                      setInputs((state) => ({ ...state, type: value }))
                    }
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="level"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Experience Level
                  </label>

                  <SelectList
                    data={levels}
                    onChange={(value) =>
                      setInputs((state) => ({
                        ...state,
                        experienceLevel: value,
                      }))
                    }
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="connects"
                    className="block text-sm font-medium text-gray-700"
                  >
                    connects
                  </label>

                  <SelectList
                    data={connects}
                    onChange={(value) =>
                      setInputs((state) => ({
                        ...state,
                        connects: value,
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
                    placeholder="$2000 / Year"
                    value={inputs.minSalary || ""}
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
                    placeholder="$2000 / Year"
                    value={inputs.maxSalary || ""}
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
                    placeholder="$35 / Hour"
                    value={inputs.maxHourlyPrice || ""}
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
                    placeholder="$20 / Hour"
                    value={inputs.minHourlyPrice || ""}
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
                    onChange={(value) =>
                      setInputs((state) => ({ ...state, place: value }))
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
                    placeholder="Canada, United State, ..."
                    value={inputs.locations || ""}
                    onChange={(e) => handleInputChange(e)}
                    type="text"
                    name="locations"
                    id="locations"
                    autoComplete="locations"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                  />
                </div>

                <ul role="list" className="mt-2 ">
                  <Switch.Group
                    as="li"
                    className="py-4 flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <Switch.Label
                        as="p"
                        className="text-sm font-medium text-gray-900"
                        passive
                      >
                        Featured
                      </Switch.Label>
                    </div>
                    <Switch
                      checked={inputs.featured || false}
                      onChange={() =>
                        setInputs((state) => ({
                          ...state,
                          featured: !inputs.featured,
                        }))
                      }
                      className={classNames(
                        inputs.featured ? "bg-sky-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          inputs.featured ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </ul>
              </div>
            </div>

            <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
              <button
                type="submit"
                className="ml-5 bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-sm leading-6 font-medium text-red-400">
              Sorry ! You can't post more than 03 jobs at a time
            </h2>
          </div>
        )}
      </div>
    </form>
  );
};

export default AddJob;
