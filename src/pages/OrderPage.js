import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { API_URL } from "../utils/urls";
import PageNotFound from "../components/PageNotFound";
import LoadingSpinner from "../components/LoadingSpinner";

function OrderPage() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const { user, jwt, me } = useContext(UserContext);
  useEffect(() => {
    me();
  }, []);

  useEffect(() => {
    const getOrder = async () => {
      setLoading(true);
      axios
        .get(`${API_URL}/orders`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          setOrder(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.message);
          setLoading(false);
        });
    };
    user && getOrder();
  }, [user]);

  //loading spinner
  if (loading)
    return (
      <div className="w-screen h-screen">
        <LoadingSpinner />
      </div>
    );
  if (!user) return <PageNotFound />;

  if (!user?.subscribed) {
    navigate("/membership");
  }
  return (
    <main className="relative h-screen">
      <div className="h-80 overflow-hidden lg:absolute lg:w-1/2 lg:h-full lg:pr-4 xl:pr-12">
        <img
          src="https://images.unsplash.com/photo-1486175060817-5663aacc6655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          alt="Jobify-Thank-You"
          className="h-full w-full object-center object-cover"
        />
      </div>

      <div>
        <div className="max-w-2xl mx-auto pt-24 pb-16 px-4 sm:px-6  lg:max-w-7xl lg:px-8  lg:grid lg:grid-cols-2 lg:gap-x-8 xl:gap-x-24">
          <div className="lg:col-start-2">
            <h1 className="text-sm font-medium text-sky-600">
              Payment successful
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              Thanks for Subscription
            </p>
            <p className="mt-2 text-base text-gray-500">
              We appreciate your Subscription. Enjoy posting new job posts to
              attract the best Condidates !
            </p>

            <dl className="mt-16 text-sm font-medium">
              <dt className="text-gray-900">Subscription ID</dt>
              <dd className="mt-2 text-sky-600">{order?.checkout_session}</dd>
            </dl>

            <ul
              role="list"
              className="mt-6 text-sm font-medium text-gray-500 border-t border-gray-200 divide-y divide-gray-200"
            >
              <li className="flex py-6 space-x-6">
                <div className="flex-auto space-y-1">
                  <h3 className="text-gray-900">Plan : {order?.plan.title}</h3>
                </div>
                <p className="flex-none font-medium text-sky-600">
                  ${order?.price}
                </p>
              </li>
              <li className="flex py-6 space-x-6">
                <div className="flex-auto space-y-1">
                  <h3 className="text-gray-900">Status :</h3>
                </div>
                <p className="flex-none font-medium text-green-500 uppercase">
                  {order?.status}
                </p>
              </li>
              <li className="flex py-6 space-x-6">
                <div className="flex-auto space-y-1">
                  <h3 className="text-gray-900">Subscription Date :</h3>
                </div>
                <p className="flex-none font-medium text-gray-500">
                  {order?.created_at.split("T")[0]}
                </p>
              </li>
            </ul>

            <div className="mt-16 border-t border-gray-200 py-6 text-right">
              <Link
                to={`/user/${user?.username}`}
                className="text-sm font-medium text-sky-600 hover:text-gray-500"
              >
                Create Your Company<span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OrderPage;
