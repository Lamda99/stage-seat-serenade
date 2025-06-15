
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const FeaturedEventsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const featuredEvents = [
    {
      id: 1,
      title: 'Folk आख्यान - Cultural Evening',
      subtitle: 'मृगनकं - नाटक',
      date: 'Saturday, 28 Jun at 7:00 PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80',
      venue: 'Anna Bhau Sathe Auditorium',
      price: '₹200 onwards',
      category: 'Theatre',
      language: 'Marathi',
      featured: true
    },
    {
      id: 2,
      title: 'श्यासात राजं, ध्यासात राजं',
      subtitle: 'Classical Drama Performance',
      date: 'Monday, 9 Jun at 9:30 pm',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      venue: 'Yashwantrao Chavan Auditorium',
      price: '₹300 onwards',
      category: 'Drama',
      language: 'Marathi',
      featured: true
    },
    {
      id: 3,
      title: 'Folk लोक - Music Festival',
      subtitle: 'Traditional Folk Music Evening',
      date: 'Sunday, June 8, 09:30PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      venue: 'Tilak Smarak Mandir',
      price: '₹250 onwards',
      category: 'Music',
      language: 'Hindi/Marathi',
      featured: true
    },
    {
      id: 4,
      title: 'Mahapur - Contemporary Play',
      subtitle: 'Modern Theatre Experience',
      date: 'Saturday, June 14, 08:30PM',
      rating: '1K',
      image: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80',
      venue: 'Balgandharva Theatre',
      price: '₹400 onwards',
      category: 'Play',
      language: 'Marathi',
      featured: true
    },
    {
      id: 5,
      title: 'Akshar akshar tuzeech aahe',
      subtitle: 'Poetry & Literature Night',
      date: 'Sunday, June 8, 09:30PM',
      rating: '14.3K',
      image: 'https://images.unsplash.com/photo-1466442929976-97f336a657be?auto=format&fit=crop&w=800&q=80',
      venue: 'Ganesh Kala Krida Manch',
      price: '₹180 onwards',
      category: 'Poetry',
      language: 'Marathi',
      featured: true
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const getSlidePosition = (index) => {
    const diff = index - currentIndex;
    const totalSlides = featuredEvents.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(totalSlides - 1)) return 'right';
    if (diff === -1 || diff === totalSlides - 1) return 'left';
    return 'hidden';
  };

  const getSlideStyle = (position) => {
    switch (position) {
      case 'center':
        return 'transform scale-100 opacity-100 z-20';
      case 'left':
        return 'transform scale-75 opacity-60 z-10 -translate-x-1/2';
      case 'right':
        return 'transform scale-75 opacity-60 z-10 translate-x-1/2';
      default:
        return 'transform scale-50 opacity-0 z-0';
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the best cultural performances and entertainment events in your city
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-96 flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Navigation Arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 z-30 bg-white/90 border-gray-200 text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 z-30 bg-white/90 border-gray-200 text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
            onClick={nextSlide}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Slides */}
          <div className="relative w-full h-full flex items-center justify-center">
            {featuredEvents.map((event, index) => {
              const position = getSlidePosition(index);
              const slideStyle = getSlideStyle(position);
              
              return (
                <div
                  key={event.id}
                  className={`absolute w-80 h-80 transition-all duration-500 ease-in-out cursor-pointer ${slideStyle}`}
                  onClick={() => position !== 'center' ? goToSlide(index) : null}
                >
                  <Card className="h-full hover:shadow-2xl transition-shadow duration-300 bg-white">
                    <Link to={`/show/${event.id}`} className="block h-full">
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        
                        {/* Featured Badge */}
                        <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          FEATURED
                        </div>
                        
                        {/* Rating Badge */}
                        <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{event.rating}</span>
                        </div>

                        {/* Category Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                          {event.category}
                        </div>
                      </div>

                      <CardContent className="p-4 h-32">
                        <h3 className="font-bold text-lg mb-2 text-gray-800 line-clamp-2">
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <Clock className="h-4 w-4 mr-1" />
                          <span className="truncate">{event.date}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="truncate">{event.venue}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-sm font-semibold text-red-600">{event.price}</span>
                          <span className="text-xs text-gray-500">{event.language}</span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-red-600 scale-125' 
                  : 'bg-gray-300 hover:bg-red-400'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Link to="/events">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Explore All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventsCarousel;
