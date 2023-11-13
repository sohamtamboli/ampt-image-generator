'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import Axios from '../../axiosConfig';
import PulseLoader from '../PulseLoader/PulseLoader';
import CloseBookmark from '../SVGs/CloseBookmark';
import OpenBookmark from '../SVGs/OpenBookmark';
import Spinner from '../SVGs/Spinner';

type GeneratedImageProps = {
  isLoading: boolean;
  imageData:
    | {
        id: number;
        imageUrl: string;
      }
    | undefined;
  prompt: string;
};

type IBookMarkImage = {
  imageId: number;
};

const GeneratedImage = ({
  isLoading,
  imageData,
  prompt,
}: GeneratedImageProps) => {
  const [disableBtn, setDisableBtn] = useState(false);
  const [bookmarkSuccess, setBookmarkSuccess] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setBookmarkSuccess(false);
      setDisableBtn(false);
    }
  }, [isLoading]);

  const bookmarkImage = useMutation({
    mutationFn: async (payload: IBookMarkImage) => {
      const imgId = await Axios(`/api/bookmark/image`, {
        method: 'POST',
        data: payload,
      });
      return imgId;
    },
    onSuccess: () => {
      enqueueSnackbar({
        message: 'Image Bookmarked!',
        variant: 'success',
      });
    },
    onError: () => {
      enqueueSnackbar({
        message: 'Something went wrong! Please try logging in again!',
        variant: 'error',
      });
    },
    onSettled: () => {
      setDisableBtn(true);
      setBookmarkSuccess(true);
      // bookmarkImage.reset();
    },
  });

  const handleBookmarkImage = () => {
    // setDisableBtn(true);
    if (imageData?.id) {
      const payload: IBookMarkImage = {
        imageId: imageData?.id,
      };
      bookmarkImage.mutate(payload);
    }
  };

  return (
    <>
      <div className="jusify-center mx-1 flex items-center rounded-lg border-2 border-solid  border-gray-50 bg-gray-50 p-4 sm:mx-auto sm:w-[80%] md:mx-auto md:w-[90%] ">
        {isLoading ? (
          <PulseLoader />
        ) : (
          <>
            {imageData?.imageUrl ? (
              <div className="flex flex-col gap-4 sm:flex-col md:flex-row ">
                {/* div added here */}
                <div className=" relative  aspect-square h-[600px] w-[600px] flex-[0.7]">
                  <Image
                    src={imageData?.imageUrl}
                    priority
                    alt="generated image"
                    className="aspect-square  flex-1"
                    layout="fill"
                    objectFit="cover"
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ww8AAj8BXkQ+xPEAAAAASUVORK5CYII="
                  />
                </div>
                <div className="flex-[0.3]  ">
                  {/* break-all-added  with conditional statment*/}
                  <h3
                    className={`${
                      prompt && prompt.length > 15 && !/\s/.test(prompt)
                        ? 'break-all'
                        : ''
                    }`}
                  >
                    <b>Prompt:</b>
                    <br />
                    <span>{prompt ?? 'not found'}</span>
                  </h3>

                  <button
                    type="button"
                    disabled={disableBtn || bookmarkImage.isPending}
                    onClick={handleBookmarkImage}
                    className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none disabled:cursor-not-allowed dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {bookmarkImage.isPending ? (
                      <Spinner />
                    ) : bookmarkSuccess ? (
                      <CloseBookmark />
                    ) : (
                      <OpenBookmark />
                    )}
                    {bookmarkSuccess ? 'Bookmarked!' : 'Bookmark'}
                  </button>
                  <div className="mt-6 text-blue-500 underline">
                    {bookmarkSuccess && (
                      <Link href="/favourites">Go to Bookmarks</Link>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <PulseLoader />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default GeneratedImage;
