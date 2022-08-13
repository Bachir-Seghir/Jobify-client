import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import PageNotFound from "../components/PageNotFound";
import { UserContext } from "../contexts/userContext";
import { API_URL } from "../utils/urls";
import LoadingSpinner from "../components/LoadingSpinner";

function Success() {
  const location = useLocation();
  const search = location.search;
  const session_id = new URLSearchParams(search).get("session_id");
  const [loading, setLoading] = useState(false);
  const { user, jwt } = useContext(UserContext);
  const navigate = useNavigate();

  const updateMeSubscribe = async () => {
    axios.put(
      `${API_URL}/users/me`,
      {
        subscribed: true,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
  };

  const confirmOrder = async () => {
    axios.post(`${API_URL}/orders/confirm`, {
      checkout_session: session_id,
    });
  };

  useEffect(() => {
    if (user) {
      setLoading(true);
      // check if the extracted session_id from search matchs the checkout_session from the backend
      if (user.order?.checkout_session === session_id) {
        console.log("confirm order");
        confirmOrder();
        console.log("update me");
        updateMeSubscribe();
      }
    }
    setLoading(false);
  }, [user]);

  if (!user) return <PageNotFound />;

  if (loading)
    return (
      <div className="h-screen w-screen">
        <LoadingSpinner />
      </div>
    );

  //if (user.subscribed) navigate("/order");

  return (
    <main className="relative min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
        <img
          src="https://tailwindui.com/img/ecommerce-images/confirmation-page-06-hero.jpg"
          alt="TODO"
          className="h-full w-full object-center object-cover"
        />
      </div>

      <div>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:py-32 lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-indigo-600">
              Payment successful
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for Subscription
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your Subscription. Enjoy posting new job posts to
              attract the best Condidates !
            </p>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                to="/order"
                className="text-sm font-medium text-sky-600 hover:text-gray-500"
              >
                Check Your Subscription Status
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Success;
