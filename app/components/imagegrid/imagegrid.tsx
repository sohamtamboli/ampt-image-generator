'use client';
import Image from 'next/image';
import React from 'react';
import { DemoImages } from './ImageGridData';

const ImageGrid = () => {
  return (
    <div className="mx-auto mt-4 grid w-[80%] grid-cols-1 gap-4 rounded-lg border-2 border-solid border-gray-50 bg-gray-50 p-4 sm:grid-cols-2 md:w-[90%] md:grid-cols-3 lg:grid-cols-3">
      {DemoImages.map((photo, idx) => (
        <div key={idx} className="rounded-lg shadow-lg">
          <Image
            src={photo}
            alt={'demo image'}
            className="h-auto w-full rounded-lg"
            height={100}
            width={100}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageGrid;
