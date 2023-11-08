'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie-player';
import Axios from '../../axiosConfig';
import DeleteImageBtn from '../DeleteImageBtn/DeleteImageBtn';
import DeleteIcon from '../SVGs/DeleteIcon';
import Spinner from '../SVGs/Spinner';
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
  });

  useEffect(() => {
    if (error) {
      enqueueSnackbar({
        message: 'Error fetching images',
        variant: 'error',
      });
    }
  }, [error]);

  console.log(data, 'fav image');

  if (isLoading) {
    return (
      <div className="mt-4 grid h-[100%] w-[100%] place-items-center">
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
