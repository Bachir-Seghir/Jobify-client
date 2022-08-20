import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/PageNotFound";
import ArticlePage from "./pages/ArticlePage";
import Blog from "./pages/Blog";
import CompaniesPage from "./pages/CompaniesPage";
import Condidate from "./pages/Condidate";
import CondidatesPage from "./pages/CondidatesPage";
import Home from "./pages/Home";
import JobsPage from "./pages/JobsPage";
import Membership from "./pages/Membership";
import OrderPage from "./pages/OrderPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import SearchResult from "./pages/SearchResult";
import SigninPage from "./pages/SigninPage";
import Success from "./pages/Success";

// This function scrolls to Top page when routing to another page
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/signin" && location.pathname !== "/register" && (
        <Navbar />
      )}

      <ScrollToTop />
      <Routes>
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/condidates" element={<CondidatesPage />} />
        <Route path="/condidate/:id" element={<Condidate />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/user/:username" element={<ProfilePage />} />
        <Route path="/*" element={<PageNotFound />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<ArticlePage />} />
      </Routes>
      {location.pathname !== "/signin" &&
        location.pathname !== "/register" &&
        location.pathname !== "/order" && <Footer />}
    </>
  );
};

export default App;
