import React, { useContext, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";

import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "../components/SuccessFeedback";
import { PlusIcon, XCircleIcon } from "@heroicons/react/solid";
import UploadAvatar from "./UploadAvatar";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  const { user, jwt, me } = useContext(UserContext);
  const [inputs, setInputs] = useState({ ...user });
  const [skills, setSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);

  useEffect(() => {
    const getSkills = async () => {
      axios.get(`${API_URL}/skills`).then((res) => {
        setSkills(res.data);
      });
    };
    getSkills();
  }, []);

  useEffect(() => {
    user && setMySkills(user.skills);
  }, [user]);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs((state) => ({
      ...state,
      [name]:
        name === "username" ? value.replace(/ /g, "").toLowerCase() : value,
    }));
  };

  const handleDeleteSkill = async (e, id) => {
    setMySkills(mySkills.filter((skill) => skill.id !== id));
  };
  const handleAddSkill = async (e, skill) => {
    setMySkills((state) => [...state, skill]);
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${API_URL}/users/me`,
        {
          ...inputs,
          skills: mySkills,
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
          message: "Profile Updated Successfully",
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
            Profile
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row">
          <div className="flex-grow grid grid-cols-9 space-y-2 gap-6">
            <div className="col-span-9 lg:col-span-6">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <div className="mt-1 rounded-md shadow-sm flex">
                <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                  jobify.com/
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  autoComplete="username"
                  className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300 text-gray-400"
                  defaultValue={inputs.username}
                  onChange={(e) => handleInputChange(e)}
                />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                defaultValue={inputs.email}
                onChange={(e) => handleInputChange(e)}
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
              />
            </div>

            <div className="flex items-center col-span-9 lg:col-span-6">
              <label
                htmlFor="accountType"
                className="text-sm font-medium text-gray-700"
              >
                Account Type :
              </label>
              <h3 className="ml-1 block px-3 text-sm text-gray-600 font-bold capitalize">
                {inputs.accountType || ""}
              </h3>
            </div>
          </div>
          <UploadAvatar />
        </div>

        {user.accountType === "condidate" && (
          <>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  defaultValue={inputs.title}
                  onChange={(e) => handleInputChange(e)}
                  type="title"
                  name="title"
                  id="title"
                  autoComplete="title"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                />
              </div>
              <div className="col-span-12 sm:col-span-6">
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  defaultValue={inputs.fullname}
                  onChange={(e) => handleInputChange(e)}
                  type="text"
                  name="fullname"
                  id="fullname"
                  autoComplete="given-fullname"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-400"
                />
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <input
                    id="address"
                    type="text"
                    name="address"
                    rows={3}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md text-gray-400"
                    defaultValue={inputs.address || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <div className="mt-1">
                  <input
                    id="website"
                    type="text"
                    name="website"
                    rows={3}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md text-gray-400"
                    defaultValue={inputs.website || ""}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <input
                  defaultValue={inputs.age}
                  onChange={(e) => handleInputChange(e)}
                  type="number"
                  name="age"
                  id="age"
                  autoComplete="age"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                />
              </div>
              <div className="col-span-4">
                <label
                  htmlFor="birth"
                  className="block text-sm font-medium text-gray-700"
                >
                  Birthday
                </label>
                <input
                  defaultValue={inputs.birthday}
                  onChange={(e) => handleInputChange(e)}
                  type="date"
                  name="birthday"
                  id="birthday"
                  autoComplete="birthday"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                />
              </div>
              <div className="col-span-12 sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  defaultValue={inputs.phone}
                  onChange={(e) => handleInputChange(e)}
                  type="phone"
                  name="phone"
                  id="phone"
                  autoComplete="phone"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm text-gray-500"
                />
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  My Skills
                </label>
                <div className="flex flex-wrap items-center py-2 gap-3">
                  {mySkills?.map((skill) => (
                    <div key={skill.id} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <XCircleIcon
                          className="w-4 h-4 text-red-400 cursor-pointer hover:text-red-700"
                          onClick={(e) => handleDeleteSkill(e, skill.id)}
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <span className="font-medium text-gray-700">
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-12">
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Add Skills
                </label>
                <div className="flex flex-wrap items-center py-2 gap-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <PlusIcon
                          className="w-4 h-4 text-sky-400 cursor-pointer hover:text-sky-700"
                          onClick={(e) => handleAddSkill(e, skill)}
                        />
                      </div>
                      <div className="ml-2 text-sm">
                        <label
                          htmlFor="comments"
                          className="font-medium text-gray-700"
                        >
                          {skill.name}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-12">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About me
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md text-gray-400"
                    defaultValue={inputs.about}
                    onChange={(e) => handleInputChange(e)}
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Brief description for your profile. URLs are hyperlinked.
                </p>
              </div>
            </div>

            <div className="pt-6">
              <div>
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    Privacy
                  </h2>
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
                        Available to hire
                      </Switch.Label>
                      <Switch.Description className="text-sm text-gray-500">
                        You can manage your avilablity to hire.
                      </Switch.Description>
                    </div>
                    <Switch
                      checked={inputs.available}
                      onChange={() =>
                        setInputs((state) => ({
                          ...state,
                          available: !inputs.available,
                        }))
                      }
                      className={classNames(
                        inputs.available ? "bg-sky-600" : "bg-gray-200",
                        "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-600"
                      )}
                    >
                      <span className="sr-only">Use setting</span>
                      <span
                        aria-hidden="true"
                        className={classNames(
                          inputs.available ? "translate-x-5" : "translate-x-0",
                          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                        )}
                      />
                    </Switch>
                  </Switch.Group>
                </ul>
              </div>
            </div>
          </>
        )}
        <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
          <button
            type="button"
            className="bg-white border border-gray-300 rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-5 bg-sky-600 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProfile;
