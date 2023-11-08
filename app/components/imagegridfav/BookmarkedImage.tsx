import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react';
import Axios from '../../axiosConfig';
import DeleteImageBtn from '../DeleteImageBtn/DeleteImageBtn';
import ImageModal from './ImageModal';
import { IBookmarkedImagesResponse } from './imagegridfav';

type BookmarkedImageProps = {
  photo: IBookmarkedImagesResponse;
};

const BookmarkedImage = ({ photo }: BookmarkedImageProps) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const queryClient = useQueryClient();

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
        message: 'Something went wrong! Please try logging in again!',
        variant: 'error',
      });
    },
    onSettled: () => {
      console.log('it ran');
      queryClient.invalidateQueries({ queryKey: ['get-favorites'] });
    },
  });

  const deleteImg = (photoId: number) => {
    deleteImage.mutate(photoId);
  };
  return (
    <>
      <div className="relative h-auto max-w-full pb-[100%]">
        <Image
          src={photo.value}
          alt={'fav image'}
          className="relative cursor-pointer rounded-lg"
          layout="fill"
          objectFit="cover"
          priority
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO8Ww8AAj8BXkQ+xPEAAAAASUVORK5CYII="
          onClick={openModal}
        />

        <div className="absolute right-4 top-4">
          <DeleteImageBtn
            deleteImg={deleteImg}
            imgId={photo.id}
            isLoading={deleteImage.isPending}
            isDisabled={deleteImage.isSuccess}
          />
        </div>
      </div>
      <ImageModal isOpen={isOpen} photo={photo} closeModal={closeModal} />
    </>
  );
};

export default BookmarkedImage;
