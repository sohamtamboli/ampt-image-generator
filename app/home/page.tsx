'use client';
import React, { useState } from 'react';
import Layout from '../components/layout';
import ImageGrid from '../components/imagegrid/imagegrid';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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
    <Textarea
      className="rounded-3xl border-blue-500 bg-gray-200 p-5 pl-10 text-base text-black shadow-lg shadow-gray-200 ring-blue-500 focus:border-blue-500 focus:ring-blue-500"
      placeholder="Type your prompt here we will generate image for you."
      id="default-search"
      value={value}
      onChange={handleInputChange}
    />
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
      {/* <PromtBar /> */}
      <form onSubmit={handleSubmit}>
        <div className="mt-16 flex flex-col items-center">
          <div className="mb-4 w-2/4">
            <AutoResizeTextarea value={query} onChange={setQuery} />
          </div>
          <Button type="submit" className="w-48 rounded-3xl max-sm:w-28">
            Generate
          </Button>
        </div>
      </form>
      <ImageGrid />
    </Layout>
  );
};

export default HomePage;
