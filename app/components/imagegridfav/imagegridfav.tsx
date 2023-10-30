'use client';
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
      <div className=" grid grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id.toString()} className=" rounded-lg shadow-lg">
            <Image
              src={photo.url}
              alt={photo.id.toString()}
              className="h-auto w-full"
              height={10}
              width={10}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGridFav;
