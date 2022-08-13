import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  BriefcaseIcon,
  LocationMarkerIcon,
  StarIcon,
} from "@heroicons/react/solid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import { API_URL } from "../utils/urls";
import { format } from "timeago.js";
import { UserContext } from "../contexts/userContext";
import HireModal from "../components/HireModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const calcTotalRate = (rate) => {
  return (
    rate.reduce((tally, item) => {
      return tally + item.stars;
    }, 0) / rate.length
  );
};

function Condidate() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  const userId = location.state;
  const [loading, setLoading] = useState(false);
  const [condidate, setCondidate] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    condidate && setRating(Math.round(calcTotalRate(condidate.rate)));
  }, [condidate]);

  useEffect(() => {
    const fetchCondidate = async () => {
      setLoading(true);
      axios.get(`${API_URL}/users/${userId}`).then((res) => {
        setCondidate(res.data);
        setLoading(false);
      });
    };
    userId && fetchCondidate();
  }, [userId]);

  // Returns
  if (loading)
    return (
      <div className="py-40">
        <LoadingSpinner />
      </div>
    );

  return (
    <main className="py-32">
      <HireModal condidate={condidate} open={open} setOpen={setOpen} />
      {/* Page header */}
      <div className=" px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:px-16 ">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <div className="relative">
              <img
                className="h-32 w-32 rounded-full"
                src={condidate?.avatar}
                alt=""
              />
              <div
                className={`border-2 border-white top-[100px] left-[100px] h-5 w-5 absolute inset-0 shadow-inner rounded-full 
                ${condidate?.available ? "bg-green-400" : "bg-red-500"}`}
                aria-hidden="true"
              />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 ml-8">
              {condidate?.fullname}
            </h1>
            <p className="flex items-center text-sm font-medium text-gray-500 ml-8 mt-2 capitalize">
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              {condidate?.title}
              <span className="flex items-center text-sm font-medium text-gray-500 ml-4 capitalize">
                <LocationMarkerIcon className="h-4 w-4 mr-2" />
                {condidate?.country}
              </span>
            </p>
            <div className="ml-8 mt-4 flex items-center">
              {[0, 1, 2, 3, 4].map((n) => (
                <StarIcon
                  key={n}
                  className={classNames(
                    rating > n ? "text-yellow-400" : "text-gray-200",
                    "h-5 w-5 flex-shrink-0"
                  )}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto px-8 py-2 border border-transparent text-md font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none "
          >
            Hire
          </button>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:px-6 lg:grid-flow-col-dense lg:grid-cols-3 lg:px-16">
        <div className="space-y-6 lg:col-start-1 lg:col-span-2">
          {/* Description list*/}
          <section aria-labelledby="applicant-information-title">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg leading-6 font-medium text-gray-900"
                >
                  Condidate Information
                </h2>
              </div>
              <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Search to Apply For
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.title}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.email}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Salary expectation
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      ${condidate?.salary}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.phone}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Birthday
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.birthday}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                      Website
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.website}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {condidate?.about}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>
        </div>
        <section
          aria-labelledby="Skills-title"
          className="lg:col-start-3 lg:col-span-1"
        >
          <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
            <h2 id="Skills-title" className="text-lg font-medium text-gray-900">
              Skills
            </h2>

            {/* Skills */}
            <div className="mt-6 flow-root">
              <span className="mr-0.5">
                {condidate?.skills?.map((skill) => (
                  <Fragment key={skill.id}>
                    <a
                      href={skill.href}
                      className="m-1 relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                    >
                      <span className=" font-medium text-gray-900">
                        {skill.name}
                      </span>
                    </a>{" "}
                  </Fragment>
                ))}
              </span>
            </div>
          </div>
        </section>

        <div className="lg:col-start-1 lg:col-span-2 py-5">
          <h3 className="px-4 text-lg leading-6 font-medium text-gray-900">
            Work States
          </h3>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Completed Projects
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {condidate?.completedProjects || 0}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Applies
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {condidate?.appliesNbr || 0}
              </dd>
            </div>
            <div className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Accepted Interveiews
              </dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">
                {condidate?.acceptedInterview || 0}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}

export default Condidate;
