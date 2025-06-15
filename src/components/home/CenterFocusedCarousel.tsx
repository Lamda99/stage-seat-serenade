
import React from 'react';
import CarouselSlide from './CarouselSlide';
import CarouselNavigation from './CarouselNavigation';
import { useCarouselControls } from '@/hooks/useCarouselControls';
import { useQuery } from '@tanstack/react-query';
import { Show } from '@/types/show';
import { SlideData } from '@/types/carousel';
import { Skeleton } from '@/components/ui/skeleton';

const fetchFeaturedShows = async (): Promise<Show[]> => {
  const response = await fetch('/api/shows?isFeatured=true&eventType=casual');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.slice(0, 5); // Limit to 5 for a carousel
};

const CenterFocusedCarousel = () => {
  const { data: shows = [], isLoading } = useQuery({
    queryKey: ['featuredShows', 'casual'],
    queryFn: fetchFeaturedShows,
  });

  const {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    getSlidePosition
  } = useCarouselControls({ totalSlides: shows.length });

  const slidesData: SlideData[] = shows.map((s, index) => ({
    id: index, // Using index as mock ID for SlideData compatibility
    title: s.title,
    subtitle: s.subtitle || '',
    description: s.description || '',
    director: s.director || '',
    image: s.image,
    category: s.category,
    price: s.displayPrice || 'N/A',
    date: new Date(s.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
    venue: s.venue,
  }));
  
  if (isLoading) {
    return (
      <section className="relative h-96 sm:h-[500px] md:h-[550px] lg:h-[600px] bg-gradient-to-br from-gray-900 via-red-900 to-black overflow-hidden flex items-center justify-center">
        <Skeleton className="w-96 h-80 rounded-lg bg-gray-700" />
      </section>
    );
  }

  return (
    <section 
      className="relative h-96 sm:h-[500px] md:h-[550px] lg:h-[600px] bg-gradient-to-br from-gray-900 via-red-900 to-black overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
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
        totalSlides={shows.length}
        onGoToSlide={goToSlide}
      />

      <div className="relative w-full h-full flex items-center justify-center px-2 sm:px-4 overflow-visible">
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl flex items-center justify-center">
          {shows.map((show, index) => {
            const position = getSlidePosition(index);
            
            return (
              <CarouselSlide
                key={show._id}
                slide={slidesData[index]}
                position={position}
                onSlideClick={() => goToSlide(index)}
                showId={show._id}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CenterFocusedCarousel;
