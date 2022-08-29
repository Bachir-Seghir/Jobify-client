import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

function Search() {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("search", { state: searchText });
  };
  return (
    <div className="w-[300px] flex flex-col mt-12 gap-y-4 gap-4 lg:flex-row lg:w-3/6">
      <div className="w-full lg:grow max-w-[400px]">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyUp={(e) => {
            e.key === "Enter" && handleSearch(e);
          }}
          name="keyword"
          id="keyword"
          className="shadow-sm text-md font-medium px-4 py-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-sm"
          placeholder="Keywords : React, PHP, Designer..."
        />
      </div>

      <button
        onClick={(e) => handleSearch(e)}
        className="items-center text-md font-medium px-4 py-3 border border-transparent leading-4 rounded-sm text-sky-900 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 lg:w-[100px]"
      >
        Search
      </button>
    </div>
  );
}

export default Search;
