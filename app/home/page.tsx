'use client';
import React, { useState } from 'react';
import Layout from '../components/layout';
import ImageGrid from '../components/imagegrid/imagegrid';

interface AutoResizeTextareaProps {
  value: string;
  onChange: (value: string) => void;
}
const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({
  value,
  onChange,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    onChange(e.target.value);

    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <>
      <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"></label>
      <textarea
        id="message"
        value={value}
        onChange={handleInputChange}
        className="block w-full rounded-2xl border border-blue-500 bg-gray-200 p-2.5 text-base text-black shadow-lg shadow-gray-200 ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
        placeholder="Write your thoughts here..."
      ></textarea>
    </>
  );
};

const HomePage: React.FC = () => {
  const [query, setQuery] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(query);
    console.log(query);
  };
  return (
    <Layout>
      <form onSubmit={handleSubmit}>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-4 w-2/4">
            <AutoResizeTextarea value={query} onChange={setQuery} />
          </div>

          <button
            type="submit"
            className=" mb-2 mr-2 w-48 rounded-3xl bg-gray-800  px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 max-sm:w-28"
          >
            Generate
          </button>
        </div>
      </form>
      <ImageGrid />
    </Layout>
  );
};

export default HomePage;
