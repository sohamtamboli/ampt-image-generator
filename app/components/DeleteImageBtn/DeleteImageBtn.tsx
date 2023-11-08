import React from 'react';
import DeleteIcon from '../SVGs/DeleteIcon';
import Spinner from '../SVGs/Spinner';

type DeleteImageBtnProps = {
  isLoading: boolean;
  imgId: number;
  deleteImg: (id: number) => void;
};

const DeleteImageBtn = ({
  imgId,
  isLoading,
  deleteImg,
}: DeleteImageBtnProps) => {
  return (
    <button
      type="button"
      disabled={isLoading}
      onClick={() => deleteImg(imgId)}
      className="absolute right-4 top-4 rounded-lg bg-red-700 px-3 py-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none"
    >
      {isLoading ? <Spinner /> : <DeleteIcon />}
      <span className="sr-only">Delete Image</span>
    </button>
  );
};

export default DeleteImageBtn;
