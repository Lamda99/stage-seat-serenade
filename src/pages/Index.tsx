
import React from 'react';
import Header from '../components/layout/Header';
import HeroCarousel from '../components/home/HeroCarousel';
import FeaturedEventsCarousel from '../components/home/FeaturedEventsCarousel';
import EventsSection from '../components/home/EventsSection';
import Footer from '../components/layout/Footer';
import ConnectionStatus from '../components/debug/ConnectionStatus';
import { useCorporateTheme } from '@/components/ui/corporate-theme-provider';
import { useShows } from '@/hooks/useShows';

const Index = () => {
  const { isCorporate } = useCorporateTheme();
  const { data: shows, isLoading, error } = useShows();

  console.log('Shows data:', shows);
  console.log('Loading state:', isLoading);
  console.log('Error state:', error);

  return (
    <div className={`min-h-screen ${
      isCorporate ? 'bg-gradient-to-br from-slate-50 to-blue-50' : 'bg-gradient-to-br from-gray-50 to-orange-50'
    }`}>
      <Header />
      
      {/* Debug Connection Status - Remove this in production */}
      <div className="container mx-auto px-4 py-4">
        <ConnectionStatus />
      </div>
      
      <HeroCarousel />
      <FeaturedEventsCarousel />
      <EventsSection />
      <Footer />
    </div>
  );
};

export default Index;
