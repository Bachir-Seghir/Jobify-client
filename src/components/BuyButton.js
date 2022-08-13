import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { STRIP_PK, API_URL } from "../utils/urls";
import axios from "axios";
import { UserContext } from "../contexts/userContext";

const stripePromise = loadStripe(STRIP_PK);

function BuyButton({ plan }) {
  const { jwt } = useContext(UserContext);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const res = await axios.post(`${API_URL}/orders`, plan, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });
  };
  return (
    <button
      onClick={handleCheckout}
      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-sm text-sky-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      Get Started
    </button>
  );
}

export default BuyButton;
