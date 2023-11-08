import React from 'react';
import DeleteIcon from '../SVGs/DeleteIcon';
import Spinner from '../SVGs/Spinner';

type DeleteImageBtnProps = {
  isLoading: boolean;
  isDisabled: boolean;
  imgId: number;
  deleteImg: (id: number) => void;
};

const DeleteImageBtn = ({
  imgId,
  isLoading,
  isDisabled,
  deleteImg,
}: DeleteImageBtnProps) => {
  return (
    <button
      type="button"
      disabled={isLoading || isDisabled}
      onClick={() => deleteImg(imgId)}
      className="rounded-lg bg-red-700 px-3 py-3 text-sm font-medium text-white hover:bg-red-800 focus:outline-none disabled:cursor-not-allowed"
    >
      {isLoading ? <Spinner /> : <DeleteIcon />}
      <span className="sr-only">Delete Image</span>
    </button>
  );
};

export default DeleteImageBtn;
