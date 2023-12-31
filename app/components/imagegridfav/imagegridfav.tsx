'use client';

import { useQuery } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import Axios from '../../axiosConfig';
import Lottie_Loader from '../loader/lottie-loader.json';
import BookmarkedImage from './BookmarkedImage';

export type IBookmarkedImagesResponse = {
  id: number;
  value: string;
  promt: string;
};

const ImageGridFav: React.FC = () => {
  const { isLoading, error, data } = useQuery<IBookmarkedImagesResponse[]>({
    queryKey: ['get-favorites'],
    queryFn: async () => {
      const res = await Axios.get('/api/bookmark/image');
      return res.data;
    },
    enabled: true,
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar({
        message: 'Error fetching images',
        variant: 'error',
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="mt-4  flex h-[100%] items-center justify-center sm:grid sm:h-[100%] sm:place-items-center">
        {/* <Spinner large /> */}
        <Lottie
          loop
          animationData={Lottie_Loader}
          play
          style={{ width: 950, height: 450 }}
        />
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 w-[100%] md:mx-auto md:w-[80%]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {data?.map((photo) => (
            <BookmarkedImage key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGridFav;
