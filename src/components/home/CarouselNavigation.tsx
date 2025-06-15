
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarouselNavigationProps {
  onPrevSlide: () => void;
  onNextSlide: () => void;
  currentIndex: number;
  totalSlides: number;
  onGoToSlide: (index: number) => void;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevSlide,
  onNextSlide,
  currentIndex,
  totalSlides,
  onGoToSlide
}) => {
  return (
    <>
      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        onClick={onPrevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        onClick={onNextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => onGoToSlide(index)}
          />
        ))}
      </div>
    </>
  );
};

export default CarouselNavigation;
