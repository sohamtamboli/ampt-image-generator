'use client'
import React, { useState } from 'react'

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('')
 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setQuery(query)
    console.log(query)
  }

  return (
    <div className="ml-96 flex-auto justify-center">
      <form onSubmit={handleSubmit}>
        <label
          htmlFor="default-search"
          className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div className="">
          <div className="relative  ">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="mt-20 flex w-9/12 rounded-3xl border border-gray-300 bg-gray-50 p-5 pl-10 text-base text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Type your command ,we will generate images for you"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              
            />
            <button
              type="submit"
              className="absolute mr-96 bottom-2.5 right-2.5 rounded-3xl  bg-blue-700 px-5 py-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Generate
            </button>
          </div>
        </div>
      </form>
    
    </div>
  )
}

export default SearchBar