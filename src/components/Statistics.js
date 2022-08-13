import React from "react";
const stats = [
  { name: "Tech Jobs", stat: "100K +" },
  { name: "Matches Made", stat: "300,000" },
  { name: "Startup-ready condidates", stat: "4M +" },
];
const setTextColor = (i) => {
  switch (i) {
    case 0:
      return "text-sky-600";
    case 1:
      return "text-red-500";
    case 2:
      return "text-green-500";

    default:
      break;
  }
};
function Statistics() {
  return (
    <div className="bg-slate-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Trusted by Freelancers & Recruiters
          </h2>
          <p className="mt-3 text-xl text-gray-600 sm:mt-4">
            Everything you need to kickstart your recruiting - get job posts,
            company branding, and much more tools, for free
          </p>
        </div>
      </div>
      <div className="mt-10 pb-36 bg-white">
        <div className="relative">
          <div className="absolute inset-0 h-1/2 bg-slate-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <dl className="rounded-sm bg-white shadow-lg sm:grid sm:grid-cols-3">
                {stats.map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${
                      i < stats.length - 1 &&
                      "border-b border-gray-100 sm:border-0 sm:border-r"
                    }  p-6 text-center `}
                  >
                    <dt
                      className={`order-2 mt-2 text-lg leading-6 font-medium ${setTextColor(
                        i
                      )}`}
                    >
                      {item.name}
                    </dt>
                    <dd
                      className={`order-1 text-5xl font-extrabold ${setTextColor(
                        i
                      )}`}
                    >
                      {item.stat}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;
