import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import {
  CheckCircleIcon,
  ExclamationIcon,
  MailIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "./SuccessFeedback";
import { Link } from "react-router-dom";

const CreateCompany = () => {
  const [company, setCompany] = useState(null);
  const [inputs, setInputs] = useState({});
  const { user, jwt } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });

  // query the user's company if exist
  useEffect(() => {
    user?.company && setCompany(user.company);
  }, []);

  const handleDelete = (id) => {
    setLoading(true);
    axios
      .delete(`${API_URL}/companies/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
      .then((res) => {
        setLoading(false);
        setCompany(null);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
      });
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value, type } = e.target;
    setInputs((state) => ({
      ...state,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${API_URL}/companies`,
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
          message: "Company Created Successfully",
          type: "success",
        }));
        setCompany(res.data);
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
            Subscribe to a Plan and Create Your Company
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
      <h2 className="text-lg mb-6 leading-6 font-medium text-gray-900 mb-8">
        {company ? "Company Information" : "Create New Company"}
      </h2>

      {/* If the User has an existed company , will show company information and he can't create another one */}
      {company && (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <li>
              <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      className="h-14 w-14 rounded-full border border-2 border-gray-200"
                      src={company.user.avatar}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                    <div>
                      <p className="text-xl font-medium text-sky-600">
                        {company.name}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500">
                        <MailIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="truncate">{company.email}</span>
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <div>
                        <p className="text-sm text-gray-900">
                          Created on{" "}
                          <time dateTime={company.created_at}>
                            {company.created_at.split("T")[0]}
                          </time>
                        </p>
                        <p className="mt-2 flex items-center text-sm text-gray-500">
                          <CheckCircleIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            aria-hidden="true"
                          />
                          {company.companySize} Employee
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <TrashIcon
                    onClick={() => handleDelete(company.id)}
                    className="h-5 w-5 text-gray-400 hover:text-red-400 cursor-pointer"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </li>
          </ul>
          <h2 className="flex items-center text-sm mb-6 leading-6 font-medium text-yellow-400 mt-8 px-6">
            <ExclamationIcon className="text-yellow-400 h-6 w-6 mr-3" />
            You can create only one Company Per Account.
          </h2>
        </div>
      )}

      {/* If the User do not have a company , will show company Create Form */}
      {!company && (
        <form
          className="grid grid-cols-12 gap-4"
          method="POST"
          onSubmit={handleSubmitChanges}
        >
          <SuccessFeedback
            open={feedback.show}
            type={feedback.type}
            setFeedback={setFeedback}
          >
            {feedback.message}
          </SuccessFeedback>

          <div className="grid grid-cols-2 col-span-6 space-y-4">
            <div className="col-span-2  ">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Company Name
              </label>
              <input
                value={inputs.name || ""}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="name"
                id="name"
                autoComplete="name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="companySize"
                className="block text-sm font-medium text-gray-700"
              >
                Company Size
              </label>
              <input
                value={inputs.companySize || 0}
                onChange={(e) => handleInputChange(e)}
                type="number"
                name="companySize"
                id="companySize"
                autoComplete="companySize"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="col-span-6 flex flex-col justify-center items-center">
            <p
              className="text-sm font-medium text-gray-700 mb-6"
              aria-hidden="true"
            >
              Logo
            </p>
            <div className="mt-1 lg:hidden">
              <div className="flex items-center">
                <div
                  className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                  aria-hidden="true"
                >
                  <img
                    className="rounded-full h-full w-full"
                    src={user?.avatar}
                    alt=""
                  />
                </div>
                <div className="ml-5 rounded-md shadow-sm">
                  <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                    <label
                      htmlFor="mobile-user-photo"
                      className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                    >
                      <span>Change</span>
                      <span className="sr-only"> user photo</span>
                    </label>
                    <input
                      id="mobile-user-photo"
                      name="user-photo"
                      type="file"
                      className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden relative rounded-full overflow-hidden lg:block w-40 h-40">
              <img
                className="relative rounded-full w-40 h-40"
                src={user?.avatar}
                alt=""
              />
              <label
                htmlFor="desktop-user-photo"
                className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
              >
                <span>Change</span>
                <span className="sr-only"> user photo</span>
                <input
                  type="file"
                  id="desktop-user-photo"
                  name="user-photo"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                />
              </label>
            </div>
          </div>
          <div className="grid grid-cols-12 col-span-12 gap-4">
            <div className="col-span-12 mb-4 ">
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Contacts
              </h2>
            </div>
            <div className="col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Company Email
              </label>
              <input
                value={inputs.email || ""}
                onChange={(e) => handleInputChange(e)}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
            <div className="col-span-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Company Phone
              </label>
              <input
                value={inputs.phone || ""}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="phone"
                id="phone"
                autoComplete="phone"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
            <div className="col-span-4">
              <label
                htmlFor="company-site"
                className="block text-sm font-medium text-gray-700"
              >
                Company Website
              </label>
              <input
                value={inputs.website || ""}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="website"
                id="website"
                autoComplete="website"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
            <div className="col-span-12">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Company Address
              </label>
              <input
                value={inputs.address || ""}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="address"
                id="address"
                autoComplete="address"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
            <div className="col-span-12">
              <label
                htmlFor="specialities"
                className="block text-sm font-medium text-gray-700"
              >
                specialities
              </label>
              <input
                value={inputs.specialities || ""}
                onChange={(e) => handleInputChange(e)}
                type="text"
                name="specialities"
                id="specialities"
                autoComplete="specialities"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
              />
            </div>
          </div>

          <div className="mt-4 py-4 px-4 flex justify-end sm:px-6 col-span-12">
            <button
              type="submit"
              className="ml-5 bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateCompany;
