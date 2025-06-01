"use client";
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { useEffect } from "react";

type OutputFilesProps = {
  imagesArr: any[];
};
const OutputFiles = ({ imagesArr }: OutputFilesProps) => {
  const [imagesIDArr, setImagesIDArr] = useState<string[]>([]);
  const [images, setImages] = useState(imagesIDArr);
  useEffect(() => {
    const newArr = imagesArr.map((item) => item.imageID);
    setImagesIDArr(newArr);
    setImages(imagesIDArr);
  }, [imagesArr]);

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextSlide = (): void => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <>
      {images.length > 0 && (
        <div className="relative w-full h-[400px] border-2 border-gray-400 bg-white/10 backdrop-blur-3xl rounded-lg flex gap-2 items-center justify-center cursor-none text-white">
          {images.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
                  <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-6 h-6">
                  <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-1">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={`w-[5px] h-[5px] rounded-full transition-all duration-500 ease-in-out ${index === currentIndex ? "bg-white scale-125" : "bg-white/50"}`}
                    onClick={() => setCurrentIndex(index)}
                  ></span>
                ))}
              </div>
            </>
          )}
          <div className="w-full h-full">
            <CldImage
              key={images[currentIndex]}
              src={images[currentIndex]}
              alt={`image ${currentIndex}`}
              loading="lazy"
              fill
              className="transition-all duration-300 ease-in-out animate-fadeIn"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default OutputFiles;
