import BlogFeed from "../components/BlogFeed";
import Faqs from "../components/Faqs";
import Hero from "../components/Hero";
import Pricing from "../components/Pricing";
import Statistics from "../components/Statistics";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="">
      <Hero />
      <Statistics />
      <Pricing />

      <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="absolute inset-0">
          <div className="bg-white h-1/3 sm:h-2/3" />
        </div>
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
              From the blog
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 sm:mt-4">
              Fresh job related news content posted each day
            </p>
          </div>
          <BlogFeed limit />
        </div>
      </div>

      <Testimonials />
      <Faqs />
    </div>
  );
};

export default Home;
