'use client';

import DeleteIcon from "@/public/images/delete.svg";
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface Photo {
  id: Number;
  url: string;
}

const ImageGridFav: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Fetch photos from the API
    fetch('https://api.slingacademy.com/v1/sample-data/photos')
      .then((response) => response.json())
      .then((data) => {
        if (data.photos) {
          const firstNinePhotos = data.photos.slice(0, 9);
          setPhotos(firstNinePhotos as Photo[]);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="mt-4">
      <div className=" grid grid-cols-8 gap-4">
        {photos.map((photo) => (
          <div key={photo.id.toString()} className="relative group rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={photo.url}
              alt={photo.id.toString()}
              className="h-auto w-full transform scale-100 transition-transform duration-300 group-hover:scale-110"
              height="10"
              width="10"
            />
            {/* extra added  */}
            <button className="absolute bottom-2 right-2 text-white p-1 rounded opacity-0 transition-opacity duration-300 group-hover:opacity-100 "
            style={{ width: '40px', height: '40px' }}> <Image
              src={DeleteIcon}
              alt={photo.id.toString()}
              className="h-auto w-full transform scale-100 transition-transform duration-300 group-hover:scale-110"
             
            /> </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridFav;
