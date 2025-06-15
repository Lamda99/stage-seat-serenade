
import React from 'react';
import CarouselSlide from './CarouselSlide';
import CarouselNavigation from './CarouselNavigation';
import { useCarouselControls } from '@/hooks/useCarouselControls';
import { carouselSlides } from '@/data/carouselData';

const CenterFocusedCarousel = () => {
  const {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    getSlidePosition
  } = useCarouselControls({ totalSlides: carouselSlides.length });

  return (
    <section 
      className="relative h-[600px] bg-gradient-to-br from-gray-900 via-red-900 to-black overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <CarouselNavigation
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        currentIndex={currentIndex}
        totalSlides={carouselSlides.length}
        onGoToSlide={goToSlide}
      />

      {/* Slides Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {carouselSlides.map((slide, index) => {
          const position = getSlidePosition(index);
          
          return (
            <CarouselSlide
              key={slide.id}
              slide={slide}
              position={position}
              onSlideClick={() => goToSlide(index)}
            />
          );
        })}
      </div>

      {/* Title Overlay for Center Slide */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white z-40">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 hero-text-shadow">
          {carouselSlides[currentIndex].title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 hero-text-shadow">
          {carouselSlides[currentIndex].director}
        </p>
      </div>
    </section>
  );
};

export default CenterFocusedCarousel;
