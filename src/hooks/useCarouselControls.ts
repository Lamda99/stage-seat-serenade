
import { useState, useEffect } from 'react';

interface UseCarouselControlsProps {
  totalSlides: number;
  autoPlayInterval?: number;
}

export const useCarouselControls = ({ totalSlides, autoPlayInterval = 5000 }: UseCarouselControlsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getSlidePosition = (index: number) => {
    const diff = index - currentIndex;
    
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(totalSlides - 1)) return 'right';
    if (diff === -1 || diff === totalSlides - 1) return 'left';
    return 'hidden';
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isAutoPlaying, autoPlayInterval]);

  return {
    currentIndex,
    isAutoPlaying,
    setIsAutoPlaying,
    nextSlide,
    prevSlide,
    goToSlide,
    getSlidePosition
  };
};
