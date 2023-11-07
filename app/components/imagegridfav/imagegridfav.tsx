'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React from 'react';
import Axios from '../../axiosConfig';
import Spinner from '../SVGs/Spinner';

type IBookmarkedImagesResponse = {
  id: number;
  value: string;
};

const ImageGridFav: React.FC = () => {
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<IBookmarkedImagesResponse[]>({
    queryKey: ['get-favorites'],
    queryFn: async () => {
      const res = await Axios.get('/api/bookmark/image');
      return res.data;
    },
  });

  console.log(data, 'fav image');

  const deleteImage = useMutation({
    mutationFn: async (payload: number) => {
      return await Axios(`/api/bookmark/image/${payload}`, {
        method: 'DELETE',
      });
    },
    onSuccess: () => {
      enqueueSnackbar({
        message: 'Image Deleted!',
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar({
        message: 'Something went wrong!',
        variant: 'error',
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const deleteImg = (photoId: number) => {
    deleteImage.mutate(photoId);
  };

  if (isLoading) {
    return (
      <div className="mt-4 grid h-[100%] w-[100%] place-items-center">
        <Spinner large />
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 w-[100%] md:mx-auto md:w-[80%]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {data?.map((photo) => (
            <div
              key={photo.id}
              className="relative h-auto max-w-full pb-[100%]"
            >
              <Image
                src={photo.value}
                alt={'fav image'}
                className="relative rounded-lg"
                layout="fill"
                objectFit="cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ww8AAj8BXkQ+xPEAAAAASUVORK5CYII="
              />

              <button
                type="button"
                onClick={() => deleteImg(photo.id)}
                className="absolute right-4 top-4 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
                </svg>
                <span>{photo.id}</span>
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ImageGridFav;
