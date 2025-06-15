
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ThemedButton from '@/components/ui/themed-button';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { carouselSlides } from '@/data/carouselData';
import { corporateSlides } from '@/data/corporateData';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isCorporate } = useCorporateTheme();
  
  const slides = isCorporate ? corporateSlides : carouselSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    // Reset to first slide when theme changes
    setCurrentSlide(0);
  }, [isCorporate]);

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
            
            {/* Theme-aware overlay */}
            <div className={`absolute inset-0 ${
              isCorporate 
                ? 'bg-gradient-to-r from-blue-900/80 to-slate-900/80' 
                : 'palette-diagonal-overlay'
            }`} />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center max-w-4xl px-4">
                <div className={`px-4 py-1 rounded-full text-sm font-semibold mb-4 inline-block ${
                  isCorporate 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-yellow-500 text-black'
                }`}>
                  {slide.category}
                </div>
                <h1 className={`text-6xl md:text-8xl font-bold mb-2 ${
                  isCorporate 
                    ? 'text-blue-100' 
                    : 'text-yellow-400'
                }`}>
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
                  className={`px-8 py-3 text-lg ${
                    isCorporate 
                      ? 'bg-blue-600 hover:bg-blue-700' 
                      : ''
                  }`}
                >
                  {isCorporate ? 'Register Now' : 'Book Now'}
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
