import React from "react";

const data = [
  {
    name: "Judith Black",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "CEO, Tuple",
    brandImg: "https://tailwindui.com/img/logos/tuple-logo-gray-400.svg",
    brandImgAlt: "Tuple",
    message:
      "Jobify offer an amazing service and I couldn’t be happier! They are dedicated to helping recruiters find great candidates, wonderful service!",
  },
  {
    name: "Joseph Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    title: "Full Stack Developer at Mirage",
    brandImg: "https://tailwindui.com/img/logos/mirage-logo-gray-400.svg",
    brandImgAlt: "Mirage",
    message:
      "Without Jobify i’d be homeless, they found me a job and got me sorted out quickly with everything! Can’t quite believe the service level that they offer!",
  },
];
function Testimonials() {
  return (
    <section className="bg-slate-50 mt-28">
      <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none py-16 text-center bg-white">
        <h2 className="text-lg leading-6 font-semibold text-gray-600 tracking-wider ">
          From Our Users
        </h2>
        <p className="text-3xl font-extrabold text-gray-800 sm:text-4xl lg:text-5xl">
          Dreams do come true!
        </p>
        <p className="text-xl text-gray-600">
          Check honest reviews from our customers
        </p>
      </div>
      <div className="max-w-7xl mx-auto md:grid md:grid-cols-2 md:px-6 lg:px-8">
        {data.map((item, i) => (
          <div
            key={i}
            className={`${
              i === data.length - 1
                ? "py-12 px-4 border-t-2 border-white sm:px-6 md:pt-16 md:pb-28 md:pr-0md:pl-10 md:border-t-0 md:border-l lg:pl-16"
                : "py-12 px-4 sm:px-6 md:flex md:flex-col md:pt-16 md:pb-28 md:pl-0 md:pr-10 md:border-r md:border-white lg:pr-16"
            }`}
          >
            <div className="md:flex-shrink-0">
              <img
                className="h-12"
                src={item.brandImg}
                alt={item.brandImgAlt}
              />
            </div>
            <blockquote className="mt-6 md:flex-grow md:flex md:flex-col">
              <div className="relative text-lg font-medium text-gray-700 md:flex-grow">
                <svg
                  className="absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-gray-200"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative">{item.message}</p>
              </div>
              <footer className="mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 inline-flex rounded-full border-2 border-white">
                    <img
                      className="h-12 w-12 rounded-full"
                      src={item.avatar}
                      alt=""
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-base font-medium text-gray-700">
                      {item.name}
                    </div>
                    <div className="text-base font-medium text-gray-500">
                      {item.title}
                    </div>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
