import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { API_URL } from "../utils/urls";

function SigninPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  // Context API
  const { setIsAuth, setJwt, user } = useContext(UserContext);

  // this async function handles the login POST Request :
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${API_URL}/auth/local`, {
        identifier: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((res) => {
        // set the Authenticated status to true
        setIsAuth(true);
        // store the JWT token on the state & localStorage
        setJwt(res.data.jwt);
        localStorage.setItem("token", res.data.jwt);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoginError(err);
        setLoading(false);
      });
  };

  //loading spinner
  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <img
          className="block z-index-2 h-12 w-auto mb-4"
          src="https://drive.google.com/uc?export=view&id=1UsbTcP9u-KK7lJYDjSD3HgcuWiP5laLF"
          alt="Jobify"
        />
        <svg
          role="status"
          className="mr-2 w-16 h-16 text-gray-300 animate-spin fill-sky-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  // if a signed in user hardcoded the route '/signin' it will routed to '/'
  user && navigate("/");

  return (
    <div>
      <div className="flex h-screen">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <Link to="/">
                <img
                  className=" lg:block h-12 w-auto"
                  src="https://drive.google.com/uc?export=view&id=1UsbTcP9u-KK7lJYDjSD3HgcuWiP5laLF"
                  alt="Jobify"
                />
              </Link>
              <h2 className="mt-6 text-3xl font-extrabold text-slate-700">
                Sign in
              </h2>
              {loginError && (
                <h4 className="text-red-500 mt-4">
                  Invalid Credentials, check your Email or Password
                </h4>
              )}
            </div>

            <div className="mt-8">
              <div className="mt-6">
                <form method="POST" onSubmit={handleSubmit}>
                  <fieldset
                    disabled={false}
                    className={`space-y-6 ${loading && "opacity-30"}`}
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          id="email"
                          name="email"
                          type="email"
                          ref={emailRef}
                          autoComplete="email"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          ref={passwordRef}
                          autoComplete="current-password"
                          required
                          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-sky-600 focus:border-sky-600 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-sky-600 focus:ring-sky-600 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-sky-600 hover:text-sky-600"
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-sky-600 hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                      >
                        Sign in
                      </button>
                    </div>
                  </fieldset>
                </form>
                <div className="mt-10 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      New To Jobify ?
                      <Link
                        to="/register?mode=condidate"
                        className="font-medium text-sky-600 hover:text-sky-600 ml-2 "
                      >
                        Join Now
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1646617747561-9b91464e780a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
