
import React from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { SlideData, SlidePosition } from '@/types/carousel';

interface CarouselSlideProps {
  slide: SlideData;
  position: SlidePosition;
  onSlideClick: () => void;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, position, onSlideClick }) => {
  const getSlideStyle = (position: SlidePosition) => {
    switch (position) {
      case 'center':
        return 'transform scale-100 opacity-100 z-30 translate-x-0';
      case 'left':
        return 'transform scale-75 opacity-25 z-20 -translate-x-48 xs:-translate-x-56 sm:-translate-x-64 md:-translate-x-80 lg:-translate-x-96 xl:-translate-x-104 2xl:-translate-x-128 3xl:-translate-x-[36rem] 4xl:-translate-x-[42rem] ultrawide:-translate-x-[48rem]';
      case 'right':
        return 'transform scale-75 opacity-25 z-20 translate-x-48 xs:translate-x-56 sm:translate-x-64 md:translate-x-80 lg:translate-x-96 xl:translate-x-104 2xl:translate-x-128 3xl:translate-x-[36rem] 4xl:translate-x-[42rem] ultrawide:translate-x-[48rem]';
      default:
        return 'transform scale-50 opacity-0 z-10 translate-x-full';
    }
  };

  const slideStyle = getSlideStyle(position);

  return (
    <div
      className={`absolute w-64 h-56 xs:w-72 xs:h-64 sm:w-80 sm:h-72 md:w-88 md:h-76 lg:w-96 lg:h-80 xl:w-104 xl:h-88 2xl:w-[28rem] 2xl:h-96 3xl:w-[32rem] 3xl:h-[26rem] 4xl:w-[36rem] 4xl:h-[30rem] ultrawide:w-[40rem] ultrawide:h-[34rem] transition-all duration-700 ease-in-out cursor-pointer ${slideStyle}`}
      onClick={() => position !== 'center' ? onSlideClick() : null}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
        <div className="relative h-28 xs:h-32 sm:h-36 md:h-40 lg:h-48 xl:h-52 2xl:h-56 3xl:h-64 4xl:h-72 ultrawide:h-80 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <div className="absolute top-1 left-1 xs:top-2 xs:left-2 sm:top-4 sm:left-4 bg-red-600 text-white px-1 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm lg:text-base font-semibold">
            {slide.category}
          </div>
          
          {/* Play Button (Center slides only) */}
          {position === 'center' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-1 xs:p-2 sm:p-3 lg:p-4 xl:p-5 2xl:p-6 3xl:p-7 4xl:p-8 ultrawide:p-10 hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Play className="h-3 w-3 xs:h-4 xs:w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 3xl:h-14 3xl:w-14 4xl:h-16 4xl:w-16 ultrawide:h-20 ultrawide:w-20 text-white fill-white" />
              </div>
            </div>
          )}
          
          {/* Price Tag */}
          <div className="absolute bottom-1 right-1 xs:bottom-2 xs:right-2 sm:bottom-4 sm:right-4 bg-yellow-500 text-black px-1 py-0.5 xs:px-2 xs:py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm lg:text-base font-bold">
            {slide.price}
          </div>
        </div>

        <div className="p-2 xs:p-3 sm:p-4 lg:p-6 xl:p-8 2xl:p-10 3xl:p-12 4xl:p-14 ultrawide:p-16">
          <h3 className="text-sm xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl ultrawide:text-7xl font-bold text-gray-800 mb-1 sm:mb-2 lg:mb-3 xl:mb-4 line-clamp-1">
            {slide.title}
          </h3>
          <p className="text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl ultrawide:text-5xl text-gray-600 mb-1 sm:mb-2 lg:mb-3 xl:mb-4 line-clamp-1">
            {slide.subtitle}
          </p>
          <p className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl ultrawide:text-4xl text-gray-700 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 line-clamp-2 hidden sm:block">
            {slide.description}
          </p>
          
          <div className="flex justify-between items-center text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl ultrawide:text-4xl text-gray-600 mb-2 sm:mb-4 lg:mb-6 xl:mb-8">
            <span className="truncate">{slide.date}</span>
            <span className="truncate ml-2 max-w-16 xs:max-w-24 sm:max-w-32 lg:max-w-40 xl:max-w-48 2xl:max-w-56 3xl:max-w-64 4xl:max-w-72 ultrawide:max-w-80">{slide.venue}</span>
          </div>
          
          {position === 'center' && (
            <Link to={`/show/${slide.id}`}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 text-xs xs:text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl ultrawide:text-5xl py-1 xs:py-2 sm:py-3 lg:py-4 xl:py-5 2xl:py-6 3xl:py-7 4xl:py-8 ultrawide:py-10">
                Book Now
              </Button>
            </Link>
          )}
        </div>
      </Card>
    </div>
  );
};

export default CarouselSlide;
