import React from "react";

const faqs = [
  {
    id: 1,
    question: "How do I access and edit my Jobify Profile?",
    answer:
      "You can access your Jobify Profile from the  Avatar icon at the top of your Jobify homepage. You can then Click 'Your Profile' inside the dropdown list to access your Jobify Page profile view.",
  },
  {
    id: 2,
    question: "How do I search on Jobify",
    answer:
      "The Jobify  Search bar at the top of HomePage allows you to search for people, jobs, posts, companies, groups, and schools. To search for jobs, you can click the  Jobs Link in the homepage and search for jobs in the Jobs Page.",
  },
];

const Faqs = () => {
  return (
    <div className="bg-white mt-24">
      <div className="max-w-7xl mx-auto py-16 px-4 divide-y-2 divide-gray-200 sm:py-24 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900">
          Frequently asked questions
        </h2>
        <div className="mt-6 pt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-12">
            {faqs.map((faq) => (
              <div key={faq.id}>
                <dt className="text-lg leading-6 font-medium text-gray-900">
                  {faq.question}
                </dt>
                <dd className="mt-2 text-base text-gray-600">{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
