import React, { useState, useEffect } from "react";
import { MailIcon, PhoneIcon, StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

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
const CondidateCard = ({ user }) => {
  const [rating, setRating] = useState(0);

  useEffect(() => {
    user && setRating(Math.round(calcTotalRate(user.rate)));
  }, [user]);

  return (
    <li
      className="col-span-1 flex flex-col text-center bg-white rounded-sm shadow divide-y divide-gray-200"
      key={user.id}
    >
      <Link
        to={`/condidate/${user.id}`}
        state={user.id}
        className="flex-1 flex flex-col p-8"
      >
        <img
          className={`w-32 h-32 flex-shrink-0 mx-auto rounded-full`}
          src={user.avatar}
          alt=""
        />
        <h3 className="flex items-center justify-center mt-6 -ml-2 text-gray-900 text-sm font-medium">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              user.available ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {user.fullname}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-sm">{user.title}</dd>
        </dl>
        <div className="mt-4 flex items-center justify-center">
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
      </Link>
      <div>
        <div className="-mt-px flex flex-col divide-y divide-gray-200">
          <div className="flex-1 flex">
            <a
              href={`mailto:${user.email}`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">{user.email}</span>
            </a>
          </div>
          <div className="flex-1 flex">
            <a
              href={`tel:${user.phone}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">{user.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CondidateCard;
