import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import { API_URL } from "../utils/urls";
import CondidateCard from "../components/CondidateCard";
import CompanyCard from "../components/CompanyCard";

function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);
      axios.get(`${API_URL}/companies`).then((res) => {
        setCompanies(res.data);
        setLoading(false);
      });
    };
    fetchCompanies();
  }, []);

  // Returns
  if (loading)
    return (
      <div className="w-screen h-screen py-40">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="">
      <header className="w-full pt-32 pb-10 px-28 bg-slate-50">
        <PageHeader title="All Companies" />
      </header>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-24 px-16 xl:px-28"
      >
        {companies.map((company) => (
          <CompanyCard company={company} key={company.id} />
        ))}
      </ul>
    </div>
  );
}

export default CompaniesPage;
