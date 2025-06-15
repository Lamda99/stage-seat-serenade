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
  showId: string;
}

const CarouselSlide: React.FC<CarouselSlideProps> = ({ slide, position, onSlideClick, showId }) => {
  const getSlideStyle = (position: SlidePosition) => {
    switch (position) {
      case 'center':
        return 'transform scale-100 opacity-100 z-30 translate-x-0';
      case 'left':
        return 'transform scale-75 opacity-25 z-20 -translate-x-64 sm:-translate-x-80 lg:-translate-x-96';
      case 'right':
        return 'transform scale-75 opacity-25 z-20 translate-x-64 sm:translate-x-80 lg:translate-x-96';
      default:
        return 'transform scale-50 opacity-0 z-10 translate-x-full';
    }
  };

  const slideStyle = getSlideStyle(position);

  return (
    <div
      className={`absolute w-72 h-64 sm:w-80 sm:h-72 md:w-88 md:h-76 lg:w-96 lg:h-80 transition-all duration-700 ease-in-out cursor-pointer ${slideStyle}`}
      onClick={() => position !== 'center' ? onSlideClick() : undefined}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
        <div className="relative h-32 sm:h-36 md:h-40 lg:h-48 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Category Badge */}
          <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-red-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
            {slide.category}
          </div>
          
          {/* Play Button (Center slides only) */}
          {position === 'center' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 sm:p-3 lg:p-4 hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Play className="h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-white fill-white" />
              </div>
            </div>
          )}
          
          {/* Price Tag */}
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-yellow-500 text-black px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
            {slide.price}
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2 line-clamp-1">
            {slide.title}
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-1 sm:mb-2 line-clamp-1">
            {slide.subtitle}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 line-clamp-2 hidden sm:block">
            {slide.description}
          </p>
          
          <div className="flex justify-between items-center text-xs sm:text-sm text-gray-600 mb-2 sm:mb-4">
            <span className="truncate">{slide.date}</span>
            <span className="truncate ml-2 max-w-24 sm:max-w-32">{slide.venue}</span>
          </div>
          
          {position === 'center' && (
            <Link to={`/show/${showId}`}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base">
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
