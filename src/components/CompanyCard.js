import React, { useState, useEffect } from "react";
import { MailIcon, PhoneIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

const CompanyCard = ({ company }) => {
  return (
    <li className="col-span-1 flex flex-col text-center bg-white rounded-sm shadow divide-y divide-gray-200">
      <Link
        to={`/company/${company.id}`}
        state={company.id}
        className="flex-1 flex flex-col p-8"
      >
        <img
          className={`w-32 h-32 flex-shrink-0 mx-auto rounded-full shadow`}
          src={company.user.avatar}
          alt=""
        />
        <h3 className="flex items-center justify-center mt-6 -ml-2 text-gray-900 text-sm font-medium">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              company.available ? "bg-green-400" : "bg-red-500"
            }`}
          />
          {company.fullname}
        </h3>
        <dl className="mt-1 flex-grow flex flex-col justify-between">
          <dt className="sr-only">Title</dt>
          <dd className="text-gray-500 text-sm">{company.title}</dd>
        </dl>
      </Link>
      <div>
        <div className="-mt-px flex flex-col divide-y divide-gray-200">
          <div className="flex-1 flex">
            <a
              href={`mailto:${company.email}`}
              className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
            >
              <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">{company.email}</span>
            </a>
          </div>
          <div className="flex-1 flex">
            <a
              href={`tel:${company.phone}`}
              className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
            >
              <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
              <span className="ml-3">{company.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CompanyCard;
