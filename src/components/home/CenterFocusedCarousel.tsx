
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  director: string;
  image: string;
  category: string;
  price: string;
  date: string;
  venue: string;
}

const CenterFocusedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides: SlideData[] = [
    {
      id: 1,
      title: 'Folk लोक',
      subtitle: 'लोकसंगीताचं दिन',
      description: 'A mesmerizing journey through traditional folk music and storytelling',
      director: 'निर्देशक: ओमप्र भूतकर',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80',
      category: 'Folk Music',
      price: '₹500',
      date: 'Sunday, Jun 15',
      venue: 'Anna Bhau Sathe Auditorium'
    },
    {
      id: 2,
      title: 'रंग',
      subtitle: 'Classical Dance Performance',
      description: 'Experience the beauty of classical Indian dance forms',
      director: 'निर्देशक: राज शर्मा',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
      category: 'Dance',
      price: '₹400',
      date: 'Monday, Jun 16',
      venue: 'Yashwantrao Chavan Auditorium'
    },
    {
      id: 3,
      title: 'संगीत महोत्सव',
      subtitle: 'Music Festival',
      description: 'An evening of classical and contemporary music',
      director: 'निर्देशक: अनिल देसाई',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
      category: 'Music',
      price: '₹350',
      date: 'Tuesday, Jun 17',
      venue: 'Tilak Smarak Mandir'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    const totalSlides = slides.length;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(totalSlides - 1)) return 'right';
    if (diff === -1 || diff === totalSlides - 1) return 'left';
    return 'hidden';
  };

  const getSlideStyle = (position: string) => {
    switch (position) {
      case 'center':
        return 'transform scale-100 opacity-100 z-30 translate-x-0';
      case 'left':
        return 'transform scale-75 opacity-70 z-20 -translate-x-80';
      case 'right':
        return 'transform scale-75 opacity-70 z-20 translate-x-80';
      default:
        return 'transform scale-50 opacity-0 z-10';
    }
  };

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

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-40 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slides Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => {
          const position = getSlidePosition(index);
          const slideStyle = getSlideStyle(position);
          
          return (
            <div
              key={slide.id}
              className={`absolute w-96 h-80 transition-all duration-700 ease-in-out cursor-pointer ${slideStyle}`}
              onClick={() => position !== 'center' ? goToSlide(index) : null}
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
        })}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>

      {/* Title Overlay for Center Slide */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-white z-40">
        <h1 className="text-4xl md:text-6xl font-bold mb-2 hero-text-shadow">
          {slides[currentIndex].title}
        </h1>
        <p className="text-xl md:text-2xl opacity-90 hero-text-shadow">
          {slides[currentIndex].director}
        </p>
      </div>
    </section>
  );
};

export default CenterFocusedCarousel;
