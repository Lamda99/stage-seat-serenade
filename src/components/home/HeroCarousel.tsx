
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ThemedButton from '@/components/ui/themed-button';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: 'Folk लोक',
      subtitle: 'लोकसंगीताचं दिन',
      description: 'मगर भगतलेले गुणगान...',
      director: 'निर्देशक: ओमप्र भूतकर',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80',
      category: 'Folk Music'
    },
    {
      id: 2,
      title: 'रंग',
      subtitle: 'Classical Dance Performance',
      description: 'A mesmerizing journey through traditional Indian dance forms',
      director: 'निर्देशक: राज शर्मा',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1920&q=80',
      category: 'Dance'
    },
    {
      id: 3,
      title: 'संगीत महोत्सव',
      subtitle: 'Music Festival',
      description: 'An evening of classical and folk music',
      director: 'निर्देशक: अनिल देसाई',
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1920&q=80',
      category: 'Music'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            
            {/* Palette-aware overlay */}
            <div className="absolute inset-0 palette-diagonal-overlay" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <div className="show-card-price bg-white text-black px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block">
                  {slide.category}
                </div>
                <h1 className="text-6xl md:text-8xl font-bold mb-2 hero-text-primary">
                  {slide.title}
                </h1>
                <h2 className="hero-text-primary text-2xl md:text-3xl font-semibold mb-4">
                  {slide.subtitle}
                </h2>
                <p className="hero-text-secondary text-lg md:text-xl mb-2 opacity-90">
                  {slide.description}
                </p>
                <p className="hero-text-secondary text-base opacity-80 mb-6">
                  {slide.director}
                </p>
                <ThemedButton 
                  variant="hero-cta"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Book Now
                </ThemedButton>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <ThemedButton
        variant="secondary"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </ThemedButton>
      
      <ThemedButton
        variant="secondary"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </ThemedButton>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
