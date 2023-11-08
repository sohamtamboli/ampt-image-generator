'use client';

import React from 'react';
import Spinner from '../SVGs/Spinner';

type PromptBarProps = {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
};

const PromptBar = ({
  handleSubmit,
  query,
  setQuery,
  isLoading,
}: PromptBarProps) => {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-1 sm:mx-auto sm:w-[80%] md:mx-auto md:w-[90%]"
      >
        <label htmlFor="prompt" className="sr-only">
          Enter your Prompt to generate image!
        </label>
        <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 md:gap-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            id="prompt"
            rows={3}
            className="mx-1 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your Prompt..."
          ></textarea>
          <button
            disabled={!query.length || isLoading}
            type="submit"
            className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : 'Generate'}
            <span className="sr-only">Send prompt</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default PromptBar;
