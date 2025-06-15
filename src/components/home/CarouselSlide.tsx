
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
        return 'transform scale-75 opacity-75 z-20 -translate-x-60';
      case 'right':
        return 'transform scale-75 opacity-75 z-20 translate-x-60';
      default:
        return 'transform scale-50 opacity-0 z-10 translate-x-96';
    }
  };

  const slideStyle = getSlideStyle(position);

  return (
    <div
      className={`absolute w-96 h-80 transition-all duration-700 ease-in-out cursor-pointer ${slideStyle}`}
      onClick={() => position !== 'center' ? onSlideClick() : null}
    >
      <Card className="h-full bg-white/95 backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {slide.category}
          </div>
          
          {/* Play Button (Center slides only) */}
          {position === 'center' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                <Play className="h-8 w-8 text-white fill-white" />
              </div>
            </div>
          )}
          
          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
            {slide.price}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-1">
            {slide.title}
          </h3>
          <p className="text-lg text-gray-600 mb-2 line-clamp-1">
            {slide.subtitle}
          </p>
          <p className="text-sm text-gray-700 mb-3 line-clamp-2">
            {slide.description}
          </p>
          
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span>{slide.date}</span>
            <span className="truncate ml-2">{slide.venue}</span>
          </div>
          
          {position === 'center' && (
            <Link to={`/show/${slide.id}`}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300 transform hover:scale-105">
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
