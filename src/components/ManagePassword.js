import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/userContext";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import SuccessFeedback from "../components/SuccessFeedback";

const ManagePassword = () => {
  const [inputs, setInputs] = useState({});
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    message: "",
    type: "",
  });
  const [error, setError] = useState(null);
  const { user, jwt, setIsAuth, setJwt } = useContext(UserContext);

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputs((state) => ({ ...state, [name]: value }));
  };

  const handleSubmitChanges = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        `${API_URL}/password`,
        {
          ...inputs,
          id: user?.id,
          identifier: user?.email,
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
          message: "Password Updated Successfully",
          type: "success",
        }));
        setIsAuth(false);
        localStorage.setItem("token", "");
        setJwt("");
      })
      .catch((error) => {
        const { response } = error;
        console.log(response.data);
        setLoading(false);
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
      className="lg:col-span-9"
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
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div>
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Manage Your Password
          </h2>
        </div>
        {error && <p className="pt-2 text-base text-red-400">{error}</p>}
        <div className="mt-6 grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="password"
              id="password"
              autoComplete="given-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="newPassword"
              id="newPassword"
              autoComplete="given-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
          </div>
          <div className="col-span-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="given-password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
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
        </div>
      </div>
    </form>
  );
};

export default ManagePassword;
