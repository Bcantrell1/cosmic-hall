'use client';

import { Button } from '@headlessui/react';
import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const images = [
  '/home1.jpg',
  '/home2.jpg',
  '/home3.jpg',
];

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const lastSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative box-border p-6 w-full container mx-auto">
      <div className="w-full h-[300px] md:h-[500px] relative overflow-hidden rounded-lg">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          fill
          className="object-cover"
          priority
					sizes='(max-width: 768px) 100vw, 80vw'
        />
      </div>

      <Button
        onClick={lastSlide}
        className="absolute top-1/2 left-8 md:left-10 transform -translate-y-1/2 bg-transparent text-white p-1.5 md:p-2 rounded-full hover:bg-indigo-700 transition-colors"
        aria-label="Last Slide"
      >
				<ChevronLeftCircle />
      </Button>

      <Button
        onClick={nextSlide}
        className="absolute top-1/2 right-8 md:right-10 transform -translate-y-1/2 bg-transparent text-white p-1.5 md:p-2 rounded-full hover:bg-indigo-700 transition-colors"
        aria-label="Next Slide"
      >
				<ChevronRightCircle />
      </Button>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <Button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex
                ? 'bg-indigo-500'
                : 'bg-gray-400 hover:bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
