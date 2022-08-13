import React from "react";
import JobsFeed from "../components/JobsFeed";
import PageHeader from "../components/PageHeader";

function JobsPage() {
  return (
    <div>
      <header className="w-full pt-32 pb-10 px-16 xl:px-28 bg-slate-50">
        <PageHeader title="All Job Posts" />
      </header>

      <JobsFeed />
    </div>
  );
}

export default JobsPage;
