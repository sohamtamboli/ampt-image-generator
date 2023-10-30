'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
interface Photo {
  id: Number
  url: string
}

const ImageGrid: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    // Fetch photos from the API
    fetch(
      'https://api.slingacademy.com/v1/sample-data/photos',
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.photos) {
          const firstNinePhotos = data.photos.slice(0, 9);
          setPhotos(firstNinePhotos as Photo[]) 
        }
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <div className="mt-14">
    <div className=" mx-auto grid h-3/6 w-3/5 grid-cols-3 gap-4 p-4 pt-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 border-4   border-solid rounded-lg">
      {photos.map((photo) => (
        <div
          key={photo.id.toString()}
          className=" rounded-lg shadow-lg"
        >
            <Image
            src={photo.url}
            alt={photo.id.toString()}
          
            className="h-auto w-full"
            height={100}
            width={100}
            />
         
        </div>
      ))}
    </div>
    </div>
  )
}

export default ImageGrid