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
      <BlogFeed />
      <Testimonials />
      <Faqs />
    </div>
  );
};

export default Home;
