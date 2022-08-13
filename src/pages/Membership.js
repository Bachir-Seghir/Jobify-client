import { CheckIcon } from "@heroicons/react/outline";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Faqs from "../components/Faqs";
import Testimonials from "../components/Testimonials";
import axios from "axios";
import { API_URL } from "../utils/urls";
import BuyButton from "../components/BuyButton";
import { UserContext } from "../contexts/userContext";
import PageNotFound from "../components/PageNotFound";

const faqs = [
  {
    id: 1,
    question: "What's the best thing about Switzerland?",
    answer:
      "I don't know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.",
  },
  // More questions...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Membership() {
  const [plans, setPlans] = useState([]);
  const { user, jwt } = useContext(UserContext);

  useEffect(() => {
    axios.get(`${API_URL}/plans`).then((res) => {
      setPlans(res.data);
    });
  }, []);

  if (!user) return <PageNotFound />;
  return (
    <div className="bg-white">
      {/* Header and Page Header */}
      <div className="pt-32 py-16 sm:pt-38 lg:pt-40">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-gray-600 uppercase tracking-wider">
              Subscription Pricing
            </h2>
            <p className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
              The right price for you, whoever you are
            </p>
            <p className="text-xl text-gray-600">
              15 days money-back guarantee
            </p>
          </div>
        </div>
      </div>

      <main>
        {/* Pricing Section */}
        <section className="relative" aria-labelledby="pricing-heading">
          {/* Tiers */}
          <div className="mt-8 pb-12 bg-white sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
            <div className="relative">
              <div className="absolute inset-0 h-3/4 bg-slate-50" />
              <div className="relative z-9 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
                  {plans.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex flex-col rounded-sm shadow-lg overflow-hidden"
                    >
                      <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                        <div>
                          <h3
                            className="inline-flex px-4 py-1 rounded-sm text-sm font-semibold tracking-wide uppercase bg-blue-200 text-slate-600"
                            id="tier-standard"
                          >
                            {tier.title}
                          </h3>
                        </div>
                        <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                          ${tier.price}
                          <span className="ml-1 text-2xl font-medium text-gray-500">
                            /mo
                          </span>
                        </div>
                        <p className="mt-5 text-lg text-gray-500">
                          {tier.description}
                        </p>
                      </div>
                      <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-white space-y-6 sm:p-10 sm:pt-6">
                        <ul role="list" className="space-y-4">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                              <div className="flex-shrink-0">
                                <CheckIcon
                                  className="h-6 w-6 text-green-500"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-3 text-base text-gray-700">
                                {feature}
                              </p>
                            </li>
                          ))}
                        </ul>
                        <BuyButton plan={tier} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
              <div className="max-w-md mx-auto lg:max-w-5xl">
                <div className="rounded-sm bg-gray-50 px-6 py-8 sm:p-10 lg:flex lg:items-center">
                  <div className="flex-1">
                    <div>
                      <h3 className="inline-flex px-4 py-1 rounded-sm text-sm font-semibold tracking-wide uppercase bg-blue-100 text-sky-900">
                        Discounted
                      </h3>
                    </div>
                    <div className="mt-4 text-lg text-gray-600">
                      Get full access to all of standard license features for
                      solo projects that make less than $20k gross revenue for{" "}
                      <span className="font-semibold text-gray-900">$29</span>.
                    </div>
                  </div>
                  <div className="mt-6 rounded-sm shadow lg:mt-0 lg:ml-10 lg:flex-shrink-0">
                    <a
                      href="#"
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-sm text-gray-900 bg-white hover:bg-gray-50"
                    >
                      Buy Discounted License
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <Testimonials />

        {/* FAQ */}
        <Faqs />
      </main>
    </div>
  );
}
