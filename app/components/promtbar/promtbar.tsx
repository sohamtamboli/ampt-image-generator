'use client';
import React, { useState } from 'react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(query);
    console.log(query);
  };

  return (
    <div className="ml-72 flex-auto justify-center">
      <form onSubmit={handleSubmit}>
        <div className="relative ">
          <input
            type="search"
            id="default-search"
            className=" mt-20 flex w-9/12 rounded-3xl border border-blue-500  bg-gray-700 p-5 pl-10 text-base text-white placeholder-gray-400 shadow-lg shadow-gray-200 ring-blue-500 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Type your command ,we will generate images for you"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute bottom-2.5 right-2.5 mr-80 rounded-3xl  bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
