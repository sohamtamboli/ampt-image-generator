'use client';

import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Axios from '../axiosConfig';
import GeneratedImage from '../components/GeneratedImage/GeneratedImage';
import PromptCard from '../components/PromptCard/PromptCard';
import ImageGrid from '../components/imagegrid/imagegrid';
import Layout from '../components/layout';
import PromptBar from '../components/promtbar/promtbar';

type IGenImgPayload = {
  prompt: string;
};

type IGeneratedImageResponse = {
  data: {
    id: number;
    imageUrl: string;
  };
  success: boolean;
};

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [showImgGrid, setShowImgGrid] = useState(false);
  const [savedPrompt, setSavedPrompt] = useState('');
 const handlePromptClick = (clickedPrompt:string) => {
   setQuery(clickedPrompt);
 };
  const {
    mutate,
    data: hookData,
    isPending,
    isSuccess,
  } = useMutation({
    mutationFn: async (
      payload: IGenImgPayload,
    ): Promise<IGeneratedImageResponse> => {
      const imgContainer = await Axios(`/api/image-generater`, {
        method: 'POST',
        data: payload,
      });
      return imgContainer.data;
    },
    onSuccess: () => {
      enqueueSnackbar({
        message: 'Generated an Image!',
        variant: 'success',
      });
      setQuery('');
    },
    onError: (error) => {
      console.log(error, 'errorr');
      // console.log(err, 'err');
      enqueueSnackbar({
        message: 'Something went wrong! Please try logging in again!',
        variant: 'error',
      });
    },
  });

  useEffect(() => {
    setShowImgGrid(true);

    if (isPending || isSuccess) setShowImgGrid(false);

    return () => {
      setShowImgGrid(true);
    };
  }, [isPending, isSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavedPrompt(query);

    const payload: IGenImgPayload = {
      prompt: query,
    };
    mutate(payload);
  };

  // console.log({ hookData });

  return (
    <Layout>
      <div className="my-10 flex flex-col gap-3 md:flex-row md:gap-6">
        <div className="md:flex-[0.65]">
          <div className="mb-10">
            <PromptBar
              handleSubmit={handleSubmit}
              query={query}
              setQuery={setQuery}
              isLoading={isPending}
            />
          </div>
          <div className="">
            {showImgGrid ? (
              <ImageGrid />
            ) : (
              <GeneratedImage
                isLoading={isPending}
                imageData={hookData?.data}
                prompt={savedPrompt}
              />
            )}
          </div>
        </div>
        <div className="flex h-fit justify-center md:flex-[0.35]">
          <PromptCard onPromptClick={handlePromptClick} />
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
